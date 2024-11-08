'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import React, { useEffect } from 'react';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';

const COLORS_TOP = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #160F1F 50%, ${color})`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen overflow-hidden bg-inkPurple px-16 py-24"
    >
      <div className="relative z-10 flex flex-col">
        <span className="mb-1.5 inline-block rounded-full bg-white text-inkPurple px-3 py-1.5 text-sm w-48 text-center">
          Now Available on Ink!
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-eventPurple to-inkPurple bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
          Unlock the Future of Wallets with Account Abstraction
        </h1>
        <p className="bg-eventPurple/80 text-darkPurple p-6 rounded-xl my-6 max-w-2xl text-base leading-relaxed md:text-lg md:leading-relaxed">
          Experience a new level of freedom and flexibility with Account
          Abstraction, now natively supported by EIP-7702. Say goodbye to
          traditional limitations as EIP-7702 enables smart contract wallets to
          act just like external accounts, bringing seamless functionality and
          enhanced security to users and developers alike. Whether you’re
          building the next big DApp or looking to streamline user experience,
          Account Abstraction simplifies everything, from gas management to
          access control.
        </p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={5} count={2500} factor={4} fade />
        </Canvas>
      </div>
    </motion.section>
  );
};
