import React, {createContext, useContext, useState} from 'react';
import {Appearance, Dimensions} from 'react-native';

import {useDispatch} from 'react-redux';
import {setToken} from '../redux/apiSlices/tokenSlice';
import {getStorageToken} from '../utils/utils';

interface ProviderProps {
  isDark?: boolean;
  setDark?: Function | any;
  isLive?: boolean;
  setIsLive?: Function | any;
  IsNet?: boolean;
  setIsNet?: Function | any;
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
  const context = useContext(ContextProvider);
  return context;
};

const {height, width} = Dimensions.get('window');

// console.log(height, width);

export const useStyles = () => {
  const {isDark} = useContext(ContextProvider);

  return {
    window: {
      height,
      width,
    },
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
      // bg: isDark ? '#222222' : 'rgb(255, 255, 255)',
      bg: isDark ? '#222222' : '#fdfdfd',
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
      secondaryDeeper1: isDark ? '#333333' : '#F6EDE3',
      neutralColor: isDark ? '#444444' : '#DBB162',
      btn: {
        variantOne: isDark ? '#5C5C5C' : '#FBF5EB',
        variantTwo: isDark ? '#333333' : 'rgba(240, 240, 240, 1)',
        normal: isDark ? '#333333' : 'white',
      },
      textColor: {
        primaryColor: isDark ? 'rgb(255, 255, 255)' : '#151515',
        secondaryColor: isDark ? 'rgb(255, 255, 255)' : '#333333',
        neutralColor: isDark ? 'rgb(255, 255, 255)' : '#767676',
        palaceHolderColor: isDark ? 'rgb(255, 255, 255)' : '#a1a1a1',
        white: isDark ? 'white' : 'white',
        light: isDark ? 'rgb(255, 255, 255)' : '#5C5C5C',
        rare: isDark ? '#D29E3B' : 'rgba(114, 11, 36,1)',
        redis: isDark ? 'rgb(255, 0, 64)' : 'rgba(142, 60, 80, 1)',
        yellowis: isDark ? '#DBB162' : '#6B4213',
        normal: isDark ? '#E6E6E6' : '#333333',
        gray: isDark ? '#E6E6E6' : 'rgba(161, 161, 161, 1)',
      },
      orange: '#F27405',
      green: {
        '#00B047': '#00B047',
        '#00C208': '#00C208',
      },
      blue: '#4289FF',
      white: 'rgb(255, 255, 255)',
      whiteDark: isDark ? '#333333' : 'rgb(255, 255, 255)',
      search: isDark ? '#5C5C5C' : '#F4F4F4',
      rareInput: isDark ? '#5C5C5C' : 'rgb(255, 255, 255)',
      cardBg: isDark ? 'rgba(50, 50, 50, 1)' : 'rgba(247, 247, 247, 1)',
      cardBgTwo: isDark ? '#444444' : 'rgba(247, 247, 247, 1)',
      cardBgTree: isDark ? '#444444' : 'rgba(244, 244, 244, 1)',
      incompleteProfile: isDark ? '#333333' : '#f1e7e9',
      normal: isDark ? '#333333' : 'rgb(255, 255, 255)',
      redis: 'rgba(142, 60, 80, 1)',
      redisLight: 'rgba(241, 231, 233, 1)',
      redisExtraLight: isDark ? '#333333' : '#FFF5F7',
      gray: {
        variant: isDark ? 'rgba(144, 144, 144, 1)' : 'rgba(244, 244, 244, 1)',
        variantTwo: isDark ? '#909090' : '#D9D9D9',
      },
    },
  };
};
const ContextApi = ({children}: ContextApiProps) => {
  const darkMode = Appearance.getColorScheme();
  const [isDark, setDark] = useState(darkMode === 'dark' ? true : false);
  const [isLive, setIsLive] = useState(false);
  const [IsNet, setIsNet] = useState(false);

  const shearValue = {isDark, setDark, isLive, setIsLive, IsNet, setIsNet};

  const storageToken = getStorageToken();
  const dispatch = useDispatch();
  if (storageToken) {
    dispatch(setToken(storageToken));
  }

  return (
    <ContextProvider.Provider value={shearValue}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextApi;
