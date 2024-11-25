"use client";

import { Hotel, Home, Tent } from "lucide-react";
import { Card } from "@/components/ui/card";

const accommodationTypes = [
  {
    id: "hotel",
    icon: Hotel,
    name: "Hotel",
    description: "Traditional hotels with full service",
  },
  {
    id: "apartment",
    icon: Home,
    name: "Apartment",
    description: "Self-catering apartments and vacation rentals",
  },
  {
    id: "hostel",
    icon: Tent,
    name: "Hostel",
    description: "Budget-friendly shared or private rooms",
  },
];

interface AccommodationStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AccommodationStep({
  value,
  onChange,
}: AccommodationStepProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {accommodationTypes.map((type) => {
        const Icon = type.icon;
        return (
          <Card
            key={type.id}
            className={`p-6 cursor-pointer transition-all ${
              value === type.id
                ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            onClick={() => onChange(type.id)}
          >
            <div className="text-center space-y-4">
              <Icon className="h-8 w-8 mx-auto text-blue-500" />
              <div>
                <h3 className="font-medium">{type.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {type.description}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}