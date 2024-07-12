import {View, Text, Appearance} from 'react-native';
import React, {createContext, useState} from 'react';

const ContextProvider = createContext<any>(null);

interface ContextApiProps {
  children: React.ReactNode;
  // isDark: boolean;
  // setDark: (dark: boolean) => void;
}

const ContextApi = ({children}: ContextApiProps) => {
  const darkMode = Appearance.getColorScheme();
  const [isDark, setDark] = useState(darkMode === 'dark' ? true : false);
  const shearValue = {isDark, setDark};
  return (
    <ContextProvider.Provider value={shearValue}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextApi;
