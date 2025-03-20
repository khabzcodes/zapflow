import { AppNodeMissingInputs } from '@/types/app-node';
import React from 'react';
import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';

type FlowValidationContextType = {
  invalidInputs: AppNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

export const FlowValidationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [invalidInputs, setInvalidInputs] = React.useState<
    AppNodeMissingInputs[]
  >([]);

  const clearErrors = () => {
    setInvalidInputs([]);
  };

  return (
    <FlowValidationContext.Provider
      value={{
        invalidInputs,
        setInvalidInputs,
        clearErrors,
      }}>
      {children}
    </FlowValidationContext.Provider>
  );
};
