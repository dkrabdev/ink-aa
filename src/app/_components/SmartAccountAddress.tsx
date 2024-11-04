'use client';

import { useZerodevContext } from '@/context/ZerodevContext';

export const SmartAccountAddress = () => {
  const { accountAddress } = useZerodevContext();

  return (
    <div className="text-center mb-4">
      <b>Account address:</b>{' '}
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
