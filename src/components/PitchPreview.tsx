import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { polishPitch } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from "jspdf";
import PitchActionButtons from "./pitch/PitchActionButtons";
import PitchContent from "./pitch/PitchContent";
import LoadingAnimation from "./pitch/LoadingAnimation";
import PitchChat from "./pitch/PitchChat";
import PitchContainer from "./pitch/PitchContainer";
import PitchHeader from "./pitch/PitchHeader";

type PitchPreviewProps = {
  data: {
    songTitle: string;
    artists: string;
    genre: string;
    theme: string;
    lyrics: string;
    production: string;
    background: string;
    targetPlaylist: string;
  };
  shouldEnhance: boolean;
};

const PitchPreview = ({ data, shouldEnhance }: PitchPreviewProps) => {
  const [polishedPitch, setPolishedPitch] = useState<string>("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [hasEnhanced, setHasEnhanced] = useState(false);
  const { toast } = useToast();
  
  // Build the initial pitch paragraph
  const buildInitialPitch = () => {
    const { songTitle, artists, genre, theme, lyrics, production, background, targetPlaylist } = data;
    let content = "";
    
    if (songTitle) {
      content += `"${songTitle}"`;
      if (artists) content += ` by ${artists}`;
      content += " is ";
    }
    if (genre) content += `a ${genre} track that stands out in the current music landscape. `;
    if (theme) content += `${theme} `;
    if (lyrics) content += `Lyrics like "${lyrics}" capture the essence of the song. `;
    if (production) content += `${production} `;
    if (background) content += `${background} `;
    if (targetPlaylist) content += `Perfect for ${targetPlaylist} playlists.`;
    
    return content;
  };

  const pitchContent = buildInitialPitch();

  const enhancePitch = useCallback(async (isRegeneration: boolean = false) => {
    if (!pitchContent || isPolishing) return;
    
    setIsPolishing(true);
    try {
      const enhanced = await polishPitch(pitchContent, isRegeneration);
      setPolishedPitch(enhanced);
      setHasEnhanced(true);
    } catch (error: any) {
      console.error('Error enhancing pitch:', error);
      
      if (error.message.includes("quota exceeded")) {
        toast({
          title: "AI Enhancement Unavailable",
          description: "Using original pitch content due to API limits.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error Polishing Pitch",
          description: "Using original pitch instead",
          variant: "destructive",
        });
      }
      
      setPolishedPitch(pitchContent);
    } finally {
      setIsPolishing(false);
    }
  }, [pitchContent, isPolishing, toast]);

  const handleRegenerate = () => {
    setHasEnhanced(false);
    setPolishedPitch("");
    enhancePitch(true);
  };

  const handleCopy = async () => {
    const textToCopy = polishedPitch || pitchContent;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied!",
        description: "Pitch copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    const doc = new jsPDF();
    const textToExport = polishedPitch || pitchContent;
    
    doc.setFontSize(16);
    doc.text("Music Pitch", 20, 20);
    
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(textToExport, 170);
    doc.text(splitText, 20, 40);
    
    doc.save("music-pitch.pdf");
    
    toast({
      title: "Exported!",
      description: "Your pitch has been exported to PDF",
    });
  };

  React.useEffect(() => {
    if (!shouldEnhance) {
      setHasEnhanced(false);
    }
  }, [shouldEnhance, pitchContent]);

  React.useEffect(() => {
    if (shouldEnhance && pitchContent && !hasEnhanced) {
      enhancePitch(false);
    }
  }, [shouldEnhance, pitchContent, enhancePitch, hasEnhanced]);

  if (!shouldEnhance || !data.songTitle) return null;

  return (
    <PitchContainer>
      <PitchHeader />
      
      {isPolishing ? (
        <LoadingAnimation />
      ) : (
        <PitchContent content={polishedPitch || pitchContent} />
      )}
      
      <div className="relative pb-12">
        <motion.div 
          className="absolute bottom-0 right-0 max-w-full px-4 sm:px-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <PitchActionButtons
            onRegenerate={handleRegenerate}
            onCopy={handleCopy}
            onExport={handleExport}
            isPolishing={isPolishing}
            hasEnhanced={hasEnhanced}
          />
        </motion.div>
      </div>

      {hasEnhanced && (
        <PitchChat
          currentPitch={polishedPitch || pitchContent}
          onUpdatePitch={setPolishedPitch}
        />
      )}
    </PitchContainer>
  );
};

export default PitchPreview;