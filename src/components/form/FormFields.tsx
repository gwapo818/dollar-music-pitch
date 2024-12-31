import React from "react";
import { Music, Mic, BookText, Quote, Radio, User, Target } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GenreSelect } from "./GenreSelect";

export const FormFields = ({ form }: { form: any }) => {
  return (
    <>
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

      <GenreSelect form={form} />

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
    </>
  );
};