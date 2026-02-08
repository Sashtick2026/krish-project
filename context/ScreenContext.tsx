
import React, { createContext, useContext, ReactNode } from 'react';
import { useScreenDimensions } from '../hooks/useScreenDimensions';

interface ScreenContextType {
  width: number;
  height: number;
  aspectRatio: number;
}

const ScreenContext = createContext<ScreenContextType>({
  width: window.innerWidth,
  height: window.innerHeight,
  aspectRatio: window.innerWidth / window.innerHeight,
});

/**
 * Custom hook to easily consume the screen dimensions from the context.
 */
export const useScreen = () => useContext(ScreenContext);

interface ScreenProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps the application to supply screen dimension data.
 */
export const ScreenProvider: React.FC<ScreenProviderProps> = ({ children }) => {
  const dimensions = useScreenDimensions();
  return (
    <ScreenContext.Provider value={dimensions}>
      {children}
    </ScreenContext.Provider>
  );
};
