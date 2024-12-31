import React from "react";
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

const PitchForm = ({ onSubmit }: { onSubmit: (data: PitchFormData, enhance?: boolean) => void }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
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

  // Watch form changes for real-time preview only
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value && !isSubmitting) {
        onSubmit(value as PitchFormData, false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onSubmit, isSubmitting]);

  const handleSubmit = async (data: PitchFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Only enhance the pitch once when the button is clicked
      onSubmit(data, true);
      toast.success("Pitch created successfully!");
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
        >
          <Button
            type="submit"
            className="w-full bg-spotify-accent hover:bg-spotify-accent/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generating..." : "Generate Pitch"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default PitchForm;