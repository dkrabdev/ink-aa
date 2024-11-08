'use client';

import { WebAuthnMode } from '@zerodev/passkey-validator';
import React, { useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { useZerodevContext } from '@/context/ZerodevContext';
import { getPasskeyValidator } from '@/lib/zerodev';
import { InkLogo } from '@/components/InkLogo';
import { useCardFlipContext } from '@/components/CardFlip';

export const LoginForm = () => {
  const { handleFlip } = useCardFlipContext();

  const { isConnecting, createAccountAndClient } = useZerodevContext();

  const handleLogin = async () => {
    // username is not necessary for login
    const passkeyValidator = await getPasskeyValidator({
      mode: WebAuthnMode.Login,
    });

    await createAccountAndClient(passkeyValidator);
  };

  return (
    <div className="rounded-xl h-full w-full text-lg p-4 flex flex-col items-center justify-center gap-4">
      <InkLogo />

      <button
        className="w-full bg-inkPurple rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        onClick={handleLogin}
        disabled={isConnecting}
      >
        {isConnecting ? <Spinner /> : 'Login'}
      </button>

      <div className="flex flex-col gap-1 items-center text-center text-sm">
        <span>Don't have a smart wallet yet?</span>

        <span
          className="text-inkPurple underline"
          role="button"
          tabIndex={0}
          onClick={handleFlip}
        >
          Register Smart Wallet
        </span>
      </div>
    </div>
  );
};
