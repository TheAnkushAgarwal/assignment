"use client";

import { Users, Baby } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TravelersStepProps {
  adults: number;
  childrens: number;
  onChange: (adults: number, childrens: number) => void;
}

export default function TravelersStep({
  adults,
  childrens,
  onChange,
}: TravelersStepProps) {
  const updateAdults = (value: number) => {
    onChange(Math.max(1, value), childrens);
  };

  const updateChildren = (value: number) => {
    onChange(adults, Math.max(0, value));
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Users className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="font-medium">Adults</h3>
              <p className="text-sm text-gray-500">Age 13+</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateAdults(adults - 1)}
              disabled={adults <= 1}
            >
              -
            </Button>
            <span className="w-8 text-center">{adults}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateAdults(adults + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Baby className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="font-medium">Children</h3>
              <p className="text-sm text-gray-500">Age 0-12</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateChildren(childrens - 1)}
              disabled={childrens <= 0}
            >
              -
            </Button>
            <span className="w-8 text-center">{childrens}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateChildren(childrens + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}