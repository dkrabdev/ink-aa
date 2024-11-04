import {
  toPasskeyValidator,
  toWebAuthnKey,
  WebAuthnMode,
  PasskeyValidatorContractVersion,
} from '@zerodev/passkey-validator';
import { KERNEL_V3_1 } from '@zerodev/sdk/constants';
import { entryPoint, PASSKEY_SERVER_URL } from '@/utils/constants';
import { publicClient } from '@/lib/viem';

interface Options {
  username?: string;
  mode: WebAuthnMode;
}

export async function getPasskeyValidator({ username, mode }: Options) {
  const webAuthnKey = await toWebAuthnKey({
    passkeyName: username || '',
    passkeyServerUrl: PASSKEY_SERVER_URL,
    mode,
    passkeyServerHeaders: {},
  });

  const passkeyValidator = await toPasskeyValidator(publicClient, {
    webAuthnKey,
    entryPoint,
    kernelVersion: KERNEL_V3_1,
    validatorContractVersion: PasskeyValidatorContractVersion.V0_0_2,
  });

  return passkeyValidator;
}
