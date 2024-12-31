import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { polishPitch } from "@/utils/openai";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

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

const SPOTIFY_CHAR_LIMIT = 300;

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

  // Trim the pitch to respect Spotify's character limit
  if (pitchContent.length > SPOTIFY_CHAR_LIMIT) {
    pitchContent = pitchContent.substring(0, SPOTIFY_CHAR_LIMIT - 3) + "...";
  }

  const enhancePitch = useCallback(async () => {
    if (!pitchContent || isPolishing) return;
    
    setIsPolishing(true);
    try {
      const enhanced = await polishPitch(pitchContent);
      // Ensure the enhanced pitch also respects the character limit
      const trimmedEnhanced = enhanced.length > SPOTIFY_CHAR_LIMIT 
        ? enhanced.substring(0, SPOTIFY_CHAR_LIMIT - 3) + "..."
        : enhanced;
      setPolishedPitch(trimmedEnhanced);
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
    enhancePitch();
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
      enhancePitch();
    }
  }, [shouldEnhance, pitchContent, enhancePitch, hasEnhanced]);

  // Only render if there's at least a title
  if (!songTitle) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-6 space-y-4 text-left">
          <div className="flex justify-between items-center">
            <div className="text-white/60 text-sm">
              {SPOTIFY_CHAR_LIMIT - (polishedPitch || pitchContent).length} characters remaining
            </div>
            {hasEnhanced && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isPolishing}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isPolishing ? 'animate-spin' : ''}`} />
                Regenerate
              </Button>
            )}
          </div>
          
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