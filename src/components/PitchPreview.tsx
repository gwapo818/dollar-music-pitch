import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const enhancePitch = async () => {
      if (pitchContent) {
        try {
          const enhanced = await polishPitch(pitchContent);
          setPolishedPitch(enhanced);
        } catch (error) {
          toast({
            title: "Error polishing pitch",
            description: "Using original pitch instead",
            variant: "destructive",
          });
          setPolishedPitch(pitchContent);
        }
      }
    };

    // Debounce the API call to avoid too many requests
    clearTimeout(timeoutId);
    timeoutId = setTimeout(enhancePitch, 1000);

    return () => clearTimeout(timeoutId);
  }, [pitchContent, toast]);

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