'use client';

import React, { useContext, useState, type PropsWithChildren } from 'react';
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  KernelSmartAccountImplementation,
} from '@zerodev/sdk';
import { KERNEL_V3_1 } from '@zerodev/sdk/constants';
import { http } from 'viem';
import {
  BUNDLER_URL,
  CHAIN,
  PAYMASTER_URL,
  entryPoint,
} from '@/utils/constants';
import { publicClient } from '@/lib/viem';
import { SmartAccount } from 'viem/account-abstraction';

interface SendEthParams {
  receiverAddress: `0x${string}`;
  amount: string;
}

interface ZerodevValue {
  accountAddress: string | undefined;
  createAccountAndClient: (passkeyValidator: any) => void;
  isConnecting: boolean;
  pendingUserOp: boolean;
  handleSendEth: (params: SendEthParams) => Promise<void>;
}

export const ZerodevContext = React.createContext<ZerodevValue | undefined>(
  undefined
);

let kernelAccount: SmartAccount<KernelSmartAccountImplementation>;
let kernelClient: any;

export const ZerodevContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [accountAddress, setAccountAddress] = useState<string | undefined>(
    undefined
  );

  const [isConnecting, setIsConnecting] = useState(false);

  const [pendingUserOp, setPendinguserOp] = useState(false);
  const [userOpHash, setUserOpHash] = useState<string | null>(null);
  const [userOpStatus, setUserOpStatus] = useState<string | null>(null);

  const createAccountAndClient = async (passkeyValidator: any) => {
    setIsConnecting(true);

    try {
      kernelAccount = (await createKernelAccount(publicClient, {
        plugins: {
          sudo: passkeyValidator,
        },
        entryPoint,
        kernelVersion: KERNEL_V3_1,
      })) as any;

      const zeroDevPaymaster = await createZeroDevPaymasterClient({
        chain: CHAIN,
        transport: http(PAYMASTER_URL),
        entryPoint,
      });

      kernelClient = createKernelAccountClient({
        account: kernelAccount,
        bundlerTransport: http(BUNDLER_URL),
        chain: CHAIN,
        paymaster: zeroDevPaymaster,
      });

      setAccountAddress(kernelAccount.address);
    } catch (error) {
      console.error('Account creation failed:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSendEth = async ({ receiverAddress, amount }: SendEthParams) => {
    if (!receiverAddress) return;

    const x = setPendinguserOp(true);
    setUserOpStatus('Sending UserOp...');

    // const userOpHash = await kernelClient.sendUserOperation({
    //   target: receiverAddress,
    //   data: '0x',
    //   value: amount,
    // });

    const userOpHash = await kernelClient.sendUserOperation({
      callData: await kernelAccount.encodeCalls([
        {
          to: receiverAddress,
          value: BigInt(0),
          data: '0x',
        },
      ]),
      // userOperation: {
      //   callData: kernelClient.account.encodeCallData({
      //     to: receiverAddress,
      //     value: amount,
      //     data: '0x',
      //   }),
      // },
    });

    setUserOpHash(userOpHash);

    await kernelClient.waitForUserOperationReceipt({
      hash: userOpHash,
    });

    // Update the message based on the count of UserOps
    const userOpMessage = `UserOp completed. <a href="https://jiffyscan.xyz/userOpHash/${userOpHash}?network=mumbai" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">Click here to view.</a>`;

    setUserOpStatus(userOpMessage);
    setPendinguserOp(false);
  };

  return (
    <ZerodevContext.Provider
      value={{
        accountAddress,
        createAccountAndClient,
        isConnecting,
        pendingUserOp,
        handleSendEth,
      }}
    >
      {children}
    </ZerodevContext.Provider>
  );
};

export const useZerodevContext = (): ZerodevValue => {
  const context = useContext(ZerodevContext);

  if (!context) {
    throw new Error('ZerodevContext not initialized');
  }

  return context;
};
