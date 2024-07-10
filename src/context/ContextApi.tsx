import {View, Text, Appearance} from 'react-native';
import React, {createContext, useState} from 'react';

const ContextProvider = createContext<any>(null);

const ContextApi = () => {
  const darkMode = Appearance.getColorScheme();
  const [isDark, setDark] = useState(darkMode === 'dark' ? true : false);
  const shearValue = {isDark, setDark};
  return (
    <ContextProvider.Provider value={shearValue}>
      <Text>ContextApi</Text>
    </ContextProvider.Provider>
  );
};

export default ContextApi;
