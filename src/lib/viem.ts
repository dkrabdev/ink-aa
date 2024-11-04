import { BUNDLER_URL } from '@/utils/constants';
import { createPublicClient, http } from 'viem';

export const publicClient = createPublicClient({
  transport: http(BUNDLER_URL),
});
