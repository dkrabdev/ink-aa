import {
  entryPoint07Address,
  EntryPointVersion,
} from 'viem/account-abstraction';
import { inkSepolia } from 'viem/chains';

export const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
export const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_URL as string;
export const PASSKEY_SERVER_URL = process.env
  .NEXT_PUBLIC_PASSKEY_SERVER_URL as string;

export const entryPoint = {
  address: entryPoint07Address as `0x${string}`,
  version: '0.7' as EntryPointVersion,
};

export const CHAIN = inkSepolia;
