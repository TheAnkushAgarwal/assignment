import TripPlanner from '@/components/TripPlanner';
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen eco-gradient">
      <div className="container mx-auto px-4 py-6 md:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Eco-Friendly Travel Planning
              </h1>
            </div>
            <p className="text-base md:text-lg text-muted-foreground">
              Plan your sustainable journey with mindful choices
            </p>
          </div>
          <TripPlanner />
        </div>
      </div>
    </main>
  );
}