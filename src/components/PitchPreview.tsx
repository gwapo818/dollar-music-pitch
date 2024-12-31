import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { polishPitch } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw, CircuitBoard } from "lucide-react";

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

const SPOTIFY_CHAR_LIMIT = 500;

const PitchPreview = ({ data, shouldEnhance }: PitchPreviewProps) => {
  const [polishedPitch, setPolishedPitch] = useState<string>("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [hasEnhanced, setHasEnhanced] = useState(false);
  const { toast } = useToast();
  const { songTitle, artists, genre, theme, lyrics, production, background, targetPlaylist } = data;
  
  // Build the initial pitch paragraph
  let pitchContent = "";
  
  if (songTitle) {
    pitchContent += `"${songTitle}"`;
    if (artists) {
      pitchContent += ` by ${artists}`;
    }
    pitchContent += " is ";
  }

  if (genre) {
    pitchContent += `a ${genre} track that stands out in the current music landscape. `;
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

  // Reset enhancement state when pitch content changes
  React.useEffect(() => {
    if (!shouldEnhance) {
      setHasEnhanced(false);
    }
  }, [shouldEnhance, pitchContent]);

  // Only enhance when shouldEnhance is true and hasn't been enhanced yet
  React.useEffect(() => {
    if (shouldEnhance && pitchContent && !hasEnhanced) {
      enhancePitch(false);
    }
  }, [shouldEnhance, pitchContent, enhancePitch, hasEnhanced]);

  // Only render if there's at least a title
  if (!songTitle) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className="glass-card overflow-hidden bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] border-[#9b87f5]/20">
        <CardContent className="p-6 space-y-4 text-left relative">
          <div className="absolute top-0 right-0 p-4">
            <CircuitBoard className="w-6 h-6 text-[#9b87f5]/30" />
          </div>
          
          {(polishedPitch || pitchContent) && (
            <motion.p 
              className="text-white/90 whitespace-pre-wrap leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {polishedPitch || pitchContent}
            </motion.p>
          )}
          
          {hasEnhanced && (
            <motion.div 
              className="absolute bottom-4 right-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isPolishing}
                className="gap-2 bg-[#9b87f5]/10 border-[#9b87f5]/30 hover:bg-[#9b87f5]/20 hover:border-[#9b87f5]/40 text-[#D6BCFA]"
              >
                <RefreshCw className={`h-4 w-4 ${isPolishing ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PitchPreview;