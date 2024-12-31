import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Music, Mic, Tag, BookText, Quote, Radio, User, Target } from "lucide-react";
import { motion } from "framer-motion";

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

  // Watch all form fields for changes
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      // Pass the current form values to parent component without enhancement
      onSubmit(value as PitchFormData, false);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, onSubmit]);

  const handleSubmit = (data: PitchFormData) => {
    // Pass the form data with enhancement flag
    onSubmit(data, true);
    toast.success("Pitch created successfully!");
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
          <FormField
            control={form.control}
            name="songTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  Song Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your song title"
                    className="form-input-transition"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artists"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Featured Artists
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Featured artists (comma separated)"
                    className="form-input-transition"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Genre
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the genre"
                    className="form-input-transition"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <BookText className="w-4 h-4" />
                  Song Theme or Story
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's your song about?"
                    className="form-input-transition min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lyrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Quote className="w-4 h-4" />
                  Notable Lyrics
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share some memorable lyrics"
                    className="form-input-transition min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="production"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Radio className="w-4 h-4" />
                  Production Details
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the production and instrumentation"
                    className="form-input-transition min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="background"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Artist Background
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className="form-input-transition min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetPlaylist"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Target Playlist
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Which playlist are you targeting?"
                    className="form-input-transition"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            className="w-full bg-spotify-accent hover:bg-spotify-accent/90"
          >
            Generate Pitch
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default PitchForm;