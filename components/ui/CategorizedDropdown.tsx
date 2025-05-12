"use client";

import * as React from "react";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

interface Category {
  name: string;
  items: {
    value: string;
    label: string;
  }[];
}

interface CategorizedDropdownProps {
  categories: Category[];
  placeholder?: string;
  emptyText?: string;
  searchText?: string;
  onSelect?: (value: string) => void;
}

export function CategorizedDropdown({
  categories,
  placeholder = "Select address...",
  emptyText = "No results found.",
  searchText = "Search...",
  onSelect,
}: CategorizedDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? categories
                .flatMap((category) => category.items)
                .find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={searchText} />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandList>
            {categories.map((category) => (
              <CommandGroup key={category.name} heading={category.name}>
                {category.items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onSelect?.(currentValue);
                    }}
                  >
                    <Check
                      className={
                        "mr-2 h-4 w-4 " +
                        (value === item.value ? "opacity-100" : "opacity-0")
                      }
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
