'use client';

import { WebAuthnMode } from '@zerodev/passkey-validator';
import React, { useState } from 'react';
import { useZerodevContext } from '@/context/ZerodevContext';
import { Spinner } from '@/components/Spinner';
import { getPasskeyValidator } from '@/lib/zerodev';
import { useCardFlipContext } from '@/components/CardFlip';
import { InkLogo } from '@/components/InkLogo';

export const RegisterForm = () => {
  const { handleFlip } = useCardFlipContext();
  const { isConnecting, createAccountAndClient } = useZerodevContext();

  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    if (!username) return;

    const passkeyValidator = await getPasskeyValidator({
      username,
      mode: WebAuthnMode.Register,
    });

    await createAccountAndClient(passkeyValidator);
  };

  return (
    <div className="rounded-xl h-full w-full text-lg p-4 flex flex-col items-center justify-center gap-4">
      <InkLogo />

      <input
        type="text"
        placeholder="Passkey username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="py-2 px-4 border border-gray-300 rounded-full w-full"
      />

      <button
        className="w-full bg-inkPurple rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        onClick={handleRegister}
        disabled={isConnecting || !username}
      >
        {isConnecting ? <Spinner /> : 'Create Smart Wallet'}
      </button>

      <div className="flex flex-col gap-1 items-center text-center text-sm">
        <span>Already have a passkey smart wallet?</span>

        <span
          className="text-inkPurple underline"
          role="button"
          tabIndex={0}
          onClick={handleFlip}
        >
          Login
        </span>
      </div>
    </div>
  );
};
