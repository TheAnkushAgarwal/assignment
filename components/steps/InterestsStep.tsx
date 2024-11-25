"use client";

import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const interests = [
  {
    id: "culture",
    icon: "🏛️",
    name: "Culture & History",
    description: "Museums, historical sites, and local traditions",
  },
  {
    id: "nature",
    icon: "🏞️",
    name: "Nature & Adventure",
    description: "Hiking, national parks, and outdoor activities",
  },
  {
    id: "food",
    icon: "🍜",
    name: "Food & Cuisine",
    description: "Local dishes, cooking classes, and food tours",
  },
  {
    id: "relaxation",
    icon: "🏖️",
    name: "Relaxation",
    description: "Beaches, spas, and peaceful retreats",
  },
  {
    id: "nightlife",
    icon: "🌃",
    name: "Nightlife",
    description: "Bars, clubs, and entertainment",
  },
  {
    id: "shopping",
    icon: "🛍️",
    name: "Shopping",
    description: "Markets, malls, and local crafts",
  },
];

interface InterestsStepProps {
  selected: string[];
  onChange: (interests: string[]) => void;
}

export default function InterestsStep({ selected, onChange }: InterestsStepProps) {
  const toggleInterest = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((i) => i !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {interests.map((interest) => (
        <Card
          key={interest.id}
          className={`p-4 cursor-pointer transition-all ${
            selected.includes(interest.id)
              ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
          onClick={() => toggleInterest(interest.id)}
        >
          <div className="flex items-start space-x-4">
            <div className="text-2xl">{interest.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium">{interest.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {interest.description}
              </p>
            </div>
            {selected.includes(interest.id) && (
              <Check className="h-5 w-5 text-blue-500" />
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}