import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xl font-semibold">Pitch Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {data.songTitle && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Song Title</h3>
              <p className="text-lg font-semibold">{data.songTitle}</p>
            </div>
          )}

          {data.artists && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Featured Artists</h3>
              <p>{data.artists}</p>
            </div>
          )}

          {data.genre && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Genre</h3>
              <p>{data.genre}</p>
            </div>
          )}

          {data.theme && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Theme/Story</h3>
              <p className="whitespace-pre-wrap">{data.theme}</p>
            </div>
          )}

          {data.lyrics && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Notable Lyrics</h3>
              <p className="whitespace-pre-wrap">{data.lyrics}</p>
            </div>
          )}

          {data.production && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Production Details</h3>
              <p className="whitespace-pre-wrap">{data.production}</p>
            </div>
          )}

          {data.background && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Artist Background</h3>
              <p className="whitespace-pre-wrap">{data.background}</p>
            </div>
          )}

          {data.targetPlaylist && (
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/60">Target Playlist</h3>
              <p>{data.targetPlaylist}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PitchPreview;