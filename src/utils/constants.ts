import { ENTRYPOINT_ADDRESS_V07 } from 'permissionless';
import { inkSepolia } from 'viem/chains';

export const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
export const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_URL as string;
export const PASSKEY_SERVER_URL = process.env
  .NEXT_PUBLIC_PASSKEY_SERVER_URL as string;
export const entryPoint = ENTRYPOINT_ADDRESS_V07;
export const CHAIN = inkSepolia;
