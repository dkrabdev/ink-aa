'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CardFlipContextProvider } from './CardFlipContext';

interface CardFlipProps {
  front: React.ReactElement<{ onFlip: any }>;
  back: React.ReactNode;
}

export const CardFlip: React.FC<CardFlipProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (isAnimating) return;

    setIsFlipped(!isFlipped);
    setIsAnimating(true);
  };

  return (
    <CardFlipContextProvider handleFlip={handleFlip}>
      <div className="h-[400px]">
        <div className="flip-card w-[400px] h-[400px]">
          <motion.div
            className="flip-card-inner w-full h-full rounded-xl"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 360 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <div className="flip-card-front w-full h-full rounded-xl border-2 border-inkPurple shadow-lg shadow-inkPurple">
              {front}
            </div>
            <div className="flip-card-back w-full h-full rounded-xl border-2 border-inkPurple shadow-lg shadow-inkPurple">
              {back}
            </div>
          </motion.div>
        </div>
      </div>
    </CardFlipContextProvider>
  );
};
