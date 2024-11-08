'use client';

import { Spinner } from '@/components/Spinner';
import { useZerodevContext } from '@/context/ZerodevContext';
import Link from 'next/link';
import { useState } from 'react';

export const SendTransaction = () => {
  const { pendingUserOp, handleSendEth, accountAddress } = useZerodevContext();

  const [amount, setAmount] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');

  const handleSubmit = () => {
    handleSendEth({
      amount,
      receiverAddress: receiverAddress as `0x${string}`,
    });
  };

  if (!accountAddress) {
    return (
      <div className="text-center">
        <span>
          You don{"'"}t have an account yet, make sure to create on first.
          <br />
          <Link href="/" className="text-inkPurple">
            Create Smart Wallet
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className="w-[400px] h-[400px] rounded-xl border-2 border-inkPurple text-lg p-8 flex flex-col items-center justify-center gap-4">
      <h2 className="text-inkPurple text-2xl font-bold">Send Txn</h2>

      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="py-2 px-4 border border-gray-300 rounded-full w-full"
      />

      <input
        type="text"
        placeholder="Send To:"
        value={receiverAddress}
        onChange={(e) => setReceiverAddress(e.target.value)}
        className="py-2 px-4 border border-gray-300 rounded-full w-full"
      />

      <button
        className="w-full bg-inkPurple rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background text-base h-10 sm:h-12 px-4 sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        onClick={handleSubmit}
        disabled={pendingUserOp}
      >
        {pendingUserOp ? <Spinner /> : 'Send Transaction'}
      </button>
    </div>
  );
};
