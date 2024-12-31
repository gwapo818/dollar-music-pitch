import React from "react";
import { Tag, Plus, Search } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
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
    setSearchValue("");
  };

  const handleAddCustomGenre = () => {
    if (!searchValue.trim() || selectedGenres.length >= 3) return;
    handleGenreSelect(searchValue.trim());
    setOpen(false);
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                  disabled={selectedGenres.length >= 3}
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    {selectedGenres.length >= 3 
                      ? "Maximum genres selected" 
                      : "Search or add genre..."}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search genres..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandEmpty className="p-2">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={handleAddCustomGenre}
                    >
                      <Plus className="w-4 h-4" />
                      Add "{searchValue}"
                    </Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {GENRES.filter(genre => 
                      genre.toLowerCase().includes(searchValue.toLowerCase())
                    ).map((genre) => (
                      <CommandItem
                        key={genre}
                        value={genre}
                        onSelect={() => handleGenreSelect(genre)}
                        className={cn(
                          "cursor-pointer",
                          selectedGenres.includes(genre) && "bg-accent"
                        )}
                      >
                        {genre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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