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
  const [shouldEnhance, setShouldEnhance] = useState(false);

  const handleFormUpdate = (data: PitchData, enhance: boolean = false) => {
    setPitchData(data);
    setShouldEnhance(enhance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-app-dark via-[#232838] to-[#1A1F2C] text-white py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">
            Dollar Music Pitch
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Craft compelling music pitches that get noticed
          </p>
          <div className="mt-6 max-w-2xl mx-auto text-sm text-white/80 space-y-2">
            <p>
              Fill in the form below to create a professional pitch for your music. The more details you provide, the better your pitch will be.
            </p>
            <p>
              Once you've filled in at least 5 fields, our AI will automatically enhance your pitch to make it more engaging and professional.
            </p>
            <p>
              You can then copy or export your pitch to use it in your promotional materials.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <PitchForm onSubmit={handleFormUpdate} />
          </div>
          <div className="lg:sticky lg:top-8 space-y-8">
            <PitchPreview data={pitchData} shouldEnhance={shouldEnhance} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;