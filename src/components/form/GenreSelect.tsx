import React from "react";
import { Tag } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const GENRES = [
  "Adult Contemporary", "Alternative", "Alternative Rap", "Ambient", "Blues",
  "Breakbeat", "Children's Music", "Christmas", "Christian & Gospel", "Classical",
  "Country", "Dance", "Dancehall", "Electro House", "Electronic", "Electronica",
  "Experimental", "Folk", "Funk", "Hip-Hop/Rap", "Holiday", "House", "Indie Rock",
  "Jazz", "K-Pop", "Latin", "Metal", "New Age", "Pop", "Pop/Rock", "R&B/Soul",
  "Reggae", "Reggaeton", "Regional Mexicano", "Rock", "Salsa", "Singer/Songwriter",
  "Soft Rock", "Soundtrack", "Spoken Word", "Techno", "World"
];

export const GenreSelect = ({ form }: { form: any }) => {
  const selectedGenres = form.watch("genre")?.split(",").filter(Boolean) || [];

  const handleGenreSelect = (genre: string) => {
    const currentGenres = selectedGenres;
    let newGenres;

    if (currentGenres.includes(genre)) {
      newGenres = currentGenres.filter((g: string) => g !== genre);
    } else if (currentGenres.length < 3) {
      newGenres = [...currentGenres, genre];
    } else {
      return; // Don't add if already at 3 genres
    }

    form.setValue("genre", newGenres.join(","));
  };

  return (
    <FormField
      control={form.control}
      name="genre"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Genres (Select up to 3)
          </FormLabel>
          <div className="space-y-2">
            <Select
              onValueChange={handleGenreSelect}
              value=""
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {GENRES.map((genre) => (
                  <SelectItem
                    key={genre}
                    value={genre}
                    disabled={selectedGenres.length >= 3 && !selectedGenres.includes(genre)}
                  >
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map((genre: string) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre}
                  <span className="ml-1">×</span>
                </Badge>
              ))}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};