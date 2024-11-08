'use client';

import React, { useContext, type PropsWithChildren } from 'react';

interface CardFlipContextProviderProps {
  handleFlip: () => void;
}

interface CardFlipValue extends CardFlipContextProviderProps {}

export const CardFlipContext = React.createContext<CardFlipValue | undefined>(
  undefined
);

export const CardFlipContextProvider: React.FC<
  PropsWithChildren<CardFlipContextProviderProps>
> = ({ handleFlip, children }) => {
  return (
    <CardFlipContext.Provider
      value={{
        handleFlip,
      }}
    >
      {children}
    </CardFlipContext.Provider>
  );
};

export const useCardFlipContext = (): CardFlipValue => {
  const context = useContext(CardFlipContext);

  if (!context) {
    throw new Error('CardFlipContext not initialized');
  }

  return context;
};
