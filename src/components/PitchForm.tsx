import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FormFields } from "./form/FormFields";

type PitchFormData = {
  songTitle: string;
  artists: string;
  genre: string;
  theme: string;
  lyrics: string;
  production: string;
  background: string;
  targetPlaylist: string;
};

const REQUIRED_FIELDS_COUNT = 5;
const COUNTDOWN_DELAY = 30;
const COUNTDOWN_DURATION = 3;

const PitchForm = ({ onSubmit }: { onSubmit: (data: PitchFormData, enhance?: boolean) => void }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [countdownProgress, setCountdownProgress] = useState(0);
  const [shouldStartCountdown, setShouldStartCountdown] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const form = useForm<PitchFormData>({
    defaultValues: {
      songTitle: "",
      artists: "",
      genre: "",
      theme: "",
      lyrics: "",
      production: "",
      background: "",
      targetPlaylist: "",
    },
  });

  // Watch form changes for real-time preview and countdown trigger
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value && !isSubmitting) {
        onSubmit(value as PitchFormData, false);
        
        const filledFieldsCount = Object.values(value).filter(Boolean).length;
        setShouldStartCountdown(filledFieldsCount >= REQUIRED_FIELDS_COUNT);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onSubmit, isSubmitting]);

  // Handle countdown timer
  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;
    let countdownInterval: ReturnType<typeof setInterval>;
    
    if (shouldStartCountdown && !countdownStarted) {
      delayTimer = setTimeout(() => {
        setCountdownStarted(true);
        const startTime = Date.now();
        countdownInterval = setInterval(() => {
          const elapsed = (Date.now() - startTime) / 1000;
          const progress = Math.min((elapsed / COUNTDOWN_DURATION) * 100, 100);
          
          setCountdownProgress(progress);
          
          if (progress >= 100) {
            clearInterval(countdownInterval);
            handleSubmit(form.getValues());
          }
        }, 50);
      }, COUNTDOWN_DELAY * 1000);
    }

    return () => {
      clearTimeout(delayTimer);
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      setCountdownProgress(0);
    };
  }, [shouldStartCountdown, countdownStarted]);

  const handleSubmit = async (data: PitchFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      onSubmit(data, true);
      toast.success("Pitch created successfully!");
      setCountdownStarted(false);
      setCountdownProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <FormFields form={form} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <Button
            type="submit"
            className={`w-full relative overflow-hidden bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] hover:from-[#8B5CF6] hover:to-[#C4B5FD] text-white font-medium py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] hover:shadow-xl ${
              isSubmitting ? 'opacity-75' : ''
            }`}
            disabled={isSubmitting}
          >
            {countdownProgress > 0 && (
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#8B5CF6] to-[#C4B5FD] opacity-75"
                initial={{ width: "0%" }}
                animate={{ width: `${countdownProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            )}
            <span className="relative z-10">
              {isSubmitting ? "Generating..." : "Generate Pitch"}
            </span>
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default PitchForm;