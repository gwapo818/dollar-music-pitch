import { useState } from "react";
import PitchForm from "@/components/PitchForm";
import PitchPreview from "@/components/PitchPreview";
import { motion } from "framer-motion";

type PitchData = {
  songTitle: string;
  artists: string;
  genre: string;
  theme: string;
  lyrics: string;
  production: string;
  background: string;
  targetPlaylist: string;
};

const Index = () => {
  const [pitchData, setPitchData] = useState<PitchData>({
    songTitle: "",
    artists: "",
    genre: "",
    theme: "",
    lyrics: "",
    production: "",
    background: "",
    targetPlaylist: "",
  });

  const handleFormSubmit = (data: PitchData) => {
    setPitchData(data);
  };

  return (
    <div className="min-h-screen bg-spotify-dark text-white py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Spotify Playlist Pitch Creator</h1>
          <p className="mt-4 text-lg text-white/60">
            Create professional pitches for your music
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <PitchForm onSubmit={handleFormSubmit} />
          </div>
          <div className="lg:sticky lg:top-8 space-y-8">
            <PitchPreview data={pitchData} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;