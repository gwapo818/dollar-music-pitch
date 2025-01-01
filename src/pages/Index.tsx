import { useState } from "react";
import PitchForm from "@/components/PitchForm";
import PitchPreview from "@/components/PitchPreview";
import { motion } from "framer-motion";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import TermsOfService from "@/components/TermsOfService";

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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] via-[#b8a4f8] to-[#D6BCFA] drop-shadow-lg"
            >
              Dollar Music Pitch
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl md:text-2xl font-medium text-white/80 tracking-wide"
            >
              Craft compelling music pitches that get noticed
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 max-w-2xl mx-auto space-y-4"
            >
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Fill in the form below to create a professional pitch for your music. The more details you provide, the better your pitch will be.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Once you've filled in at least 5 fields, our AI will automatically enhance your pitch to make it more engaging and professional.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                You can then copy or export your pitch to use it in your promotional materials.
              </p>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-8">
              <PitchForm onSubmit={handleFormUpdate} />
            </div>
            <div className="space-y-8">
              <PitchPreview data={pitchData} shouldEnhance={shouldEnhance} />
            </div>
          </div>

          {/* Legal Section */}
          <div className="border-t border-white/10 mt-16 flex justify-center space-x-4">
            <PrivacyPolicy />
            <TermsOfService />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
