'use client';

import { WebAuthnMode } from '@zerodev/passkey-validator';
import React, { useState } from 'react';
import { useZerodevContext } from '@/context/ZerodevContext';
import { Spinner } from '@/components/Spinner';
import { useUsernameContext } from '@/context/UsernameContext';
import { getPasskeyValidator } from '@/lib/zerodev';

export const RegisterButton = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { username } = useUsernameContext();

  const { createAccountAndClient } = useZerodevContext();

  const handleRegister = async () => {
    if (!username) return;

    setIsRegistering(true);

    const passkeyValidator = await getPasskeyValidator({
      username,
      mode: WebAuthnMode.Register,
    });
    await createAccountAndClient(passkeyValidator);

    setIsRegistering(false);
    window.alert('Register done. Try sending UserOps.');
  };

  return (
    <button
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      onClick={handleRegister}
      disabled={isRegistering || !username}
    >
      {isRegistering ? <Spinner /> : 'Create Smart Wallet'}
    </button>
  );
};
