import {View, Text, Appearance} from 'react-native';
import React, {createContext, useContext, useState} from 'react';

interface ProviderProps {
  isDark?: boolean;
  setDark?: Function | any;
}

export const ContextProvider = createContext<ProviderProps>({
  isDark: false,
  setDark: () => {},
});

interface ContextApiProps {
  children: React.ReactNode;
  // isDark: boolean;
  // setDark: (dark: boolean) => void;
}

export const useContextApi = () => {
  const {isDark, setDark} = useContext(ContextProvider);
  return {isDark, setDark};
};

export const useStyles = () => {
  const {isDark} = useContext(ContextProvider);

  return {
    font: {
      SuezOne: 'SuezOne-Regular',
      RussoOne: 'RussoOne-Regular',
      SarinaRegular: 'Sarina-Regular',
      ProstoOneRegular: 'ProstoOne-Regular',
      Poppins: 'Poppins-Regular',
      PoppinsBold: 'Poppins-Bold',
      PoppinsSemiBold: 'Poppins-SemiBold',
      PoppinsMedium: 'Poppins-Medium',
      PoppinsLight: 'Poppins-Light',
      PoppinsExtraLight: 'Poppins-ExtraLight',
      BodoniModaSC_Italic_VariableFont: 'BodoniModaSC-Italic-VariableFont',
      BodoniModaSC_VariableFont: 'BodoniModaSC-VariableFont',
      Rowdies_Bold: 'Rowdies-Bold',
      Rowdies_Light: 'Rowdies-Light',
      Rowdies_Regular: 'Rowdies-Regular',
    },
    colors: {
      bg: isDark ? '#222222' : '#FFFFFF',
      gradient: {
        variantOne: isDark
          ? [
              'rgba(34,34,34,0.0)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
            ]
          : [
              'rgba(255,255,255,0.0)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
            ],

        variantTwo: isDark
          ? [
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,1)',
              'rgba(34,34,34,0.0)',
            ]
          : [
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,0.0)',
            ],
      },
      primaryColor: isDark ? '#D29E3B' : '#D29E3B',
      secondaryColor: isDark ? '#333333' : '#FBF5EB',
      neutralColor: isDark ? '#444444' : '#DBB162',
      btn: {
        variantOne: isDark ? '#5C5C5C' : '#FBF5EB',
        variantTwo: isDark ? '#333333' : 'rgba(240, 240, 240, 1)',
        normal: isDark ? '#333333' : 'white',
      },
      textColor: {
        primaryColor: isDark ? '#FFFFFF' : '#151515',
        secondaryColor: isDark ? '#E6E6E6' : '#333333',
        neutralColor: isDark ? '#A5A5A5' : '#767676',
        white: isDark ? 'white' : 'white',
        light: isDark ? '#767676' : '#5C5C5C',
        rare: isDark ? '#D29E3B' : '#720B24',
        gray: isDark ? '#E6E6E6' : 'rgba(161, 161, 161, 1)',
      },
      orange: '#F27405',
      green: {
        '#00B047': '#00B047',
        '#00C208': '#00C208',
      },
      blue: '#4289FF',
      white: '#FFFFFF',
      whiteDark: isDark ? '#333333' : '#FFFFFF',
      search: isDark ? '#5C5C5C' : '#F4F4F4',
      rareInput: isDark ? '#5C5C5C' : 'rgba(255, 253, 251, 1)',
      cardBg: isDark ? 'rgba(50, 50, 50, 1)' : 'rgba(247, 247, 247, 1)',
      cardBgTwo: isDark ? '#444444' : 'rgba(247, 247, 247, 1)',
      cardBgTree: isDark ? '#444444' : 'rgba(244, 244, 244, 1)',
      incompleteProfile: isDark ? '#333333' : '#f1e7e9',
      normal: isDark ? '#333333' : '#ffffff',
      redis: 'rgba(142, 60, 80, 1)',
      redisLight: 'rgba(241, 231, 233, 1)',
      gray: {
        variant: isDark ? 'rgba(144, 144, 144, 1)' : 'rgba(244, 244, 244, 1)',
      },
    },
  };
};

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
