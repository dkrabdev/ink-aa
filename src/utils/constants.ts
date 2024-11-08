import {
  entryPoint07Address,
  EntryPointVersion,
} from 'viem/account-abstraction';
import { sepolia } from 'viem/chains';
// import { inkSepolia } from 'viem/chains';

// export const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
// export const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_URL as string;
// export const PASSKEY_SERVER_URL = process.env
//   .NEXT_PUBLIC_PASSKEY_SERVER_URL as string;
// export const CHAIN = inkSepolia;

export const BUNDLER_URL =
  'https://rpc.zerodev.app/api/v2/bundler/efbc1add-1c14-476e-b3f1-206db80e673c?provider=PIMLICO';
export const PAYMASTER_URL =
  'https://rpc.zerodev.app/api/v2/paymaster/efbc1add-1c14-476e-b3f1-206db80e673c?provider=PIMLICO';
export const PASSKEY_SERVER_URL =
  'https://passkeys.zerodev.app/api/v3/efbc1add-1c14-476e-b3f1-206db80e673c';
export const CHAIN = sepolia;

export const entryPoint = {
  address: entryPoint07Address as `0x${string}`,
  version: '0.7' as EntryPointVersion,
};
