"use client";

import { useState } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const popularDestinations = [
  { 
    id: 1, 
    name: "Costa Rica", 
    image: "https://images.unsplash.com/photo-1643400812282-4ef456a7b352?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eco: "Known for eco-tourism"
  },
  { 
    id: 2, 
    name: "Iceland", 
    image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=400&q=80",
    eco: "Renewable energy leader"
  },
  { 
    id: 3, 
    name: "New Zealand", 
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&q=80",
    eco: "Sustainable tourism"
  },
];

interface DestinationStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DestinationStep({ value, onChange }: DestinationStepProps) {
  const [showInspiration, setShowInspiration] = useState(false);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Where would you like to go?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="text-center">
        <span className="text-sm text-muted-foreground">or</span>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowInspiration(!showInspiration)}
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Get Eco-Friendly Inspiration
      </Button>

      {showInspiration && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {popularDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="group cursor-pointer overflow-hidden"
              onClick={() => onChange(destination.name)}
            >
              <div className="relative aspect-video">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="font-medium">{destination.name}</span>
                    </div>
                    <span className="text-sm opacity-90">{destination.eco}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}