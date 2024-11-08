'use client';

import { useZerodevContext } from '@/context/ZerodevContext';

export const SmartAccountAddress = () => {
  const { accountAddress } = useZerodevContext();

  return (
    <div className="flex flex-col text-center mb-4">
      <span className="font-bold">Account Address</span>
      {accountAddress ? (
        <a
          href={`https://jiffyscan.xyz/account/${accountAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          {accountAddress}
        </a>
      ) : (
        'No address, try registering or signing in through a passkey'
      )}
    </div>
  );
};
