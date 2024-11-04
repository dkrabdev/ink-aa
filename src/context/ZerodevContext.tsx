'use client';

import React, { useContext, useState, type PropsWithChildren } from 'react';
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from '@zerodev/sdk';
import { KERNEL_V3_1 } from '@zerodev/sdk/constants';
import { http } from 'viem';
import {
  BUNDLER_URL,
  CHAIN,
  entryPoint,
  PAYMASTER_URL,
} from '@/utils/constants';
import { publicClient } from '@/lib/viem';

interface ZerodevValue {
  accountAddress: string | undefined;
  createAccountAndClient: (passkeyValidator: any) => void;
}

export const ZerodevContext = React.createContext<ZerodevValue | undefined>(
  undefined
);

export const ZerodevContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [accountAddress, setAccountAddress] = useState<string | undefined>(
    undefined
  );
  const [kernelClient, setKernelClient] = useState<any>();

  const createAccountAndClient = async (passkeyValidator: any) => {
    try {
      const kernelAccount: any = await createKernelAccount(publicClient, {
        plugins: {
          sudo: passkeyValidator,
        },
        entryPoint,
        kernelVersion: KERNEL_V3_1,
      });

      const kernelClient = createKernelAccountClient({
        account: kernelAccount,
        chain: CHAIN,
        bundlerTransport: http(BUNDLER_URL),
        entryPoint,
        middleware: {
          sponsorUserOperation: async ({ userOperation }) => {
            const zerodevPaymaster = createZeroDevPaymasterClient({
              chain: CHAIN,
              transport: http(PAYMASTER_URL),
              entryPoint,
            });

            return zerodevPaymaster.sponsorUserOperation({
              userOperation,
              entryPoint,
            });
          },
        },
      });

      console.log(kernelClient);
      console.log(kernelAccount);
      setKernelClient(kernelClient);
      setAccountAddress(kernelAccount.address);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <ZerodevContext.Provider
      value={{
        accountAddress,
        createAccountAndClient,
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
