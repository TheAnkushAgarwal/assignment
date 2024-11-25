"use client";

import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface DateStepProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
}

export default function DateStep({ startDate, endDate, onChange }: DateStepProps) {
  const today = new Date();
  const maxDate = addDays(today, 3*365);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <div className="flex items-center mb-4">
            <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
            <h3 className="font-medium">Start Date</h3>
          </div>
          <Calendar
            mode="single"
            selected={startDate || undefined}
            onSelect={(date) => onChange(date ?? null, endDate)}
            disabled={(date) =>
              date < today || (endDate && date > endDate) || date > maxDate
            }
            className="rounded-md border"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center mb-4">
            <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
            <h3 className="font-medium">End Date</h3>
          </div>
          <Calendar
            mode="single"
            selected={endDate || undefined}
            onSelect={(date) => onChange(startDate, date ?? null)}
            disabled={(date) =>
              date < today || (startDate && date < startDate) || date > maxDate
            }
            className="rounded-md border"
          />
        </Card>
      </div>
    </div>
  );
}