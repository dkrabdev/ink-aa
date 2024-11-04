'use client';

import { WebAuthnMode } from '@zerodev/passkey-validator';
import React, { useState } from 'react';
import { Spinner } from '@/components/Spinner';
import { useZerodevContext } from '@/context/ZerodevContext';
import { useUsernameContext } from '@/context/UsernameContext';
import { getPasskeyValidator } from '@/lib/zerodev';

export const LoginButton = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { username } = useUsernameContext();

  const { createAccountAndClient } = useZerodevContext();

  const handleLogin = async () => {
    if (!username) return;

    setIsLoggingIn(true);

    // username is not necessary for login
    const passkeyValidator = await getPasskeyValidator({
      mode: WebAuthnMode.Login,
    });

    await createAccountAndClient(passkeyValidator);

    setIsLoggingIn(false);
    window.alert('Login done.  Try sending UserOps.');
  };

  return (
    <button
      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      onClick={handleLogin}
      disabled={isLoggingIn}
    >
      {isLoggingIn ? <Spinner /> : 'Login'}
    </button>
  );
};
