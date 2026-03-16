'use client';

import { LottieAnimation } from './LottieAnimation';
import splashAnimation from '@/app/assets/lottie/splash.json';

interface SplashScreenProps {
  onComplete?: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-gray">
      <div className="w-full max-w-md">
        <LottieAnimation
          animationData={splashAnimation}
          className="h-full w-full"
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}
