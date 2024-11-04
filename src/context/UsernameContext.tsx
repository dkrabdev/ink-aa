'use client';

import React, { useContext, useState, type PropsWithChildren } from 'react';

interface UsernameValue {
  username: string | undefined;
  handleChangeUsername: (passkeyValidator: any) => void;
}

export const UsernameContext = React.createContext<UsernameValue | undefined>(
  undefined
);

export const UsernameContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [username, setUsername] = useState('');

  const handleChangeUsername = (value: string) => setUsername(value);

  return (
    <UsernameContext.Provider
      value={{
        username,
        handleChangeUsername,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsernameContext = (): UsernameValue => {
  const context = useContext(UsernameContext);

  if (!context) {
    throw new Error('UsernameContext not initialized');
  }

  return context;
};
