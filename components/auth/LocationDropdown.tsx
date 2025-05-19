"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TUNISIA_REGIONS } from "@/data/locations";
import type { FC } from "react";

interface LocationDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

const LocationDropdown: FC<LocationDropdownProps> = ({
  value,
  onValueChange,
  disabled,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your location" />
      </SelectTrigger>
      <SelectContent>
        {TUNISIA_REGIONS.map((region) => (
          <SelectItem key={region} value={region}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;
