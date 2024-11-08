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
  PAYMASTER_URL,
  entryPoint,
} from '@/utils/constants';
import { publicClient } from '@/lib/viem';

interface ZerodevValue {
  accountAddress: string | undefined;
  createAccountAndClient: (passkeyValidator: any) => void;
  isConnecting: boolean;
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
  const [isConnecting, setIsConnecting] = useState(false);

  const createAccountAndClient = async (passkeyValidator: any) => {
    setIsConnecting(true);

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
        // paymaster: createZeroDevPaymasterClient({
        //   chain: CHAIN,
        //   transport: http(PAYMASTER_URL),
        // }),
        paymaster: {
          getPaymasterData: async (userOperation: any) => {
            const zerodevPaymaster = createZeroDevPaymasterClient({
              chain: CHAIN,
              transport: http(PAYMASTER_URL),
              entryPoint,
            });
            return zerodevPaymaster.getPaymasterData(userOperation);
          },
        },
      });

      console.log(kernelClient);
      console.log(kernelAccount);
      setKernelClient(kernelClient);
      setAccountAddress(kernelAccount.address);
    } catch (error) {
      console.error('Account creation failed:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <ZerodevContext.Provider
      value={{
        accountAddress,
        createAccountAndClient,
        isConnecting,
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
