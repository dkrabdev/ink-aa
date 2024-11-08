'use client';

import { CardFlip } from '@/components/CardFlip';
import { useZerodevContext } from '@/context/ZerodevContext';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import Link from 'next/link';

export const WalletCreation = () => {
  const { accountAddress } = useZerodevContext();

  if (accountAddress) {
    return (
      <div className="flex flex-col gap-2">
        <p>
          Your smart wallet address is{' '}
          <span className="text-darkPurple">{accountAddress}</span>.
        </p>
        <p>
          You can use this address to receive funds and interact with smart
          contracts. Start by{' '}
          <Link href="/send-transaction" className="text-inkPurple">
            sending a transaction
          </Link>
        </p>
      </div>
    );
  }

  return <CardFlip front={<LoginForm />} back={<RegisterForm />} />;
};
