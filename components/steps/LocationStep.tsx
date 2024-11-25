"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LocationStepProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LocationStep({ value, onChange }: LocationStepProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // To track geolocation errors

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null); // Reset previous error if any

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; // Access API key from environment variables
            if (!apiKey) {
              setError("API key is missing.");
              return;
            }

            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
            );
            const data = await response.json();
            if (data.results?.[0]?.formatted) {
              onChange(data.results[0].formatted);
            }
          } catch (error) {
            setError("Error fetching location details.");
            console.error("Error fetching location:", error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Unable to retrieve your location.");
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Enter your starting location"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-500">or</span>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={getCurrentLocation}
        disabled={loading}
      >
        <Navigation className="mr-2 h-4 w-4" />
        {loading ? "Getting location..." : "Use current location"}
      </Button>

      {error && (
        <div className="mt-4 text-sm text-red-500 text-center">
          {error}
        </div>
      )}

      {value && (
        <Card className="p-4 mt-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="font-medium">Selected Location</h3>
              <p className="text-sm text-gray-500">{value}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
