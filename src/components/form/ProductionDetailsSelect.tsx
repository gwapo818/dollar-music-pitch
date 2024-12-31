import React from "react";
import { Radio } from "lucide-react";
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
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRODUCTION_ELEMENTS = [
  "Guitar",
  "Piano",
  "Drums",
  "Bass",
  "Violin",
  "Saxophone",
  "Synthesizer",
  "Trumpet",
  "Flute",
  "Cello",
  "Harmonica",
  "Percussion",
  "Vocals",
  "Electronic elements",
];

export const ProductionDetailsSelect = ({ form }: { form: any }) => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const selectedElements = React.useMemo(() => {
    const value = form.watch("production") || "";
    return value.split(",").filter(Boolean);
  }, [form.watch("production")]);

  const handleElementSelect = (element: string) => {
    if (!element) return;
    
    const currentElements = [...selectedElements];
    let newElements: string[];

    if (currentElements.includes(element)) {
      newElements = currentElements.filter((e) => e !== element);
    } else {
      newElements = [...currentElements, element];
    }

    form.setValue("production", newElements.join(","));
    setSearchValue("");
  };

  const filteredElements = React.useMemo(() => {
    if (!searchValue) return PRODUCTION_ELEMENTS;
    return PRODUCTION_ELEMENTS.filter(element => 
      element.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  return (
    <FormField
      control={form.control}
      name="production"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <Radio className="w-4 h-4" />
            Production Details
          </FormLabel>
          <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    Select production elements...
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command shouldFilter={false}>
                  <CommandInput 
                    placeholder="Search elements..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandGroup>
                      {filteredElements.map((element) => (
                        <CommandItem
                          key={element}
                          value={element}
                          onSelect={() => handleElementSelect(element)}
                          className={cn(
                            "cursor-pointer",
                            selectedElements.includes(element) && "bg-accent"
                          )}
                        >
                          {element}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2">
              {selectedElements.map((element: string) => (
                <Badge
                  key={element}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleElementSelect(element)}
                >
                  {element}
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