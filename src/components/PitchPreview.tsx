import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { polishPitch } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";

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
};

const PitchPreview = ({ data }: PitchPreviewProps) => {
  const [polishedPitch, setPolishedPitch] = useState<string>("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<number>(0);
  const { toast } = useToast();
  const { songTitle, artists, genre, theme, lyrics, production, background, targetPlaylist } = data;
  
  // Build the initial pitch paragraph
  let pitchContent = "";
  
  if (genre) {
    pitchContent += `A ${genre} track that stands out in the current music landscape. `;
  }

  if (theme) {
    pitchContent += `${theme} `;
  }

  if (lyrics) {
    pitchContent += `Lyrics like "${lyrics}" capture the essence of the song. `;
  }

  if (production) {
    pitchContent += `${production} `;
  }

  if (background) {
    pitchContent += `${background} `;
  }

  if (targetPlaylist) {
    pitchContent += `Perfect for ${targetPlaylist} playlists.`;
  }

  const enhancePitch = useCallback(async () => {
    if (!pitchContent || isPolishing) return;
    
    setIsPolishing(true);
    try {
      const enhanced = await polishPitch(pitchContent);
      setPolishedPitch(enhanced);
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

  useEffect(() => {
    // Update timestamp when content changes
    const currentTime = Date.now();
    setLastUpdateTimestamp(currentTime);

    // Set a timeout to check if enough time has passed since the last update
    const timeoutId = setTimeout(() => {
      const timeSinceLastUpdate = Date.now() - currentTime;
      // Only proceed if this was the last update and 2 seconds have passed
      if (timeSinceLastUpdate >= 2000 && currentTime === lastUpdateTimestamp && pitchContent) {
        enhancePitch();
      }
    }, 2000); // Wait 2 seconds after the last change

    return () => clearTimeout(timeoutId);
  }, [pitchContent, enhancePitch, lastUpdateTimestamp]);

  // Only render if there's at least a title
  if (!songTitle) return null;

  const titleLine = artists ? `${songTitle} – ${artists}` : songTitle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-6 space-y-4 text-left">
          <h2 className="text-xl font-bold">{titleLine}</h2>
          
          {(polishedPitch || pitchContent) && (
            <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
              {polishedPitch || pitchContent}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PitchPreview;