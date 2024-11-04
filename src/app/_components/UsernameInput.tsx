'use client';

import { useUsernameContext } from '@/context/UsernameContext';

export const UsernameInput = () => {
  const { username, handleChangeUsername } = useUsernameContext();

  return (
    <input
      type="text"
      placeholder="Passkey username"
      value={username}
      onChange={(e) => handleChangeUsername(e.target.value)}
      className="p-2 border border-gray-300 rounded-lg w-full"
    />
  );
};
