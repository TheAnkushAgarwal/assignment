"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import DestinationStep from "@/components/steps/DestinationStep";
import DateStep from "@/components/steps/DateStep";
import TravelersStep from "@/components/steps/TravelersStep";
import InterestsStep from "@/components/steps/InterestsStep";
import LocationStep from "@/components/steps/LocationStep";
import AccommodationStep from "@/components/steps/AccommodationStep";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  "Destination",
  "Dates",
  "Travelers",
  "Interests",
  "Starting Location",
  "Accommodation",
];

export default function TripPlanner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: null,
    endDate: null,
    adults: 1,
    childrens: 0,
    interests: [],
    startingLocation: "",
    accommodation: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <DestinationStep
            value={formData.destination}
            onChange={(value) => updateFormData("destination", value)}
          />
        );
      case 1:
        return (
          <DateStep
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChange={(start, end) => {
              updateFormData("startDate", start);
              updateFormData("endDate", end);
            }}
          />
        );
      case 2:
        return (
          <TravelersStep
            adults={formData.adults}
            childrens={formData.childrens}
            onChange={(adults, childrens) => {
              updateFormData("adults", adults);
              updateFormData("childrens", childrens);
            }}
          />
        );
      case 3:
        return (
          <InterestsStep
            selected={formData.interests}
            onChange={(value) => updateFormData("interests", value)}
          />
        );
      case 4:
        return (
          <LocationStep
            value={formData.startingLocation}
            onChange={(value) => updateFormData("startingLocation", value)}
          />
        );
      case 5:
        return (
          <AccommodationStep
            value={formData.accommodation}
            onChange={(value) => updateFormData("accommodation", value)}
          />
        );
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-4 md:space-y-6">
      <Progress value={progress} className="h-2" />
      
      <Card className="p-4 md:p-6 shadow-lg">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {steps[currentStep]}
          </h2>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-[300px]"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6 md:mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-[100px]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="w-[100px]"
          >
            {currentStep === steps.length - 1 ? "Plan a trip" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}