// devices screen size

import { MMKVLoader } from 'react-native-mmkv-storage';

import { Dimensions } from 'react-native';

export const {width, height} = Dimensions.get('screen')
const storage = new MMKVLoader().initialize();

//  three size like sm md or tablet 

export const isSmall = () => {
    return width < 375
}
export const isTablet = () => {
    return width >= 768
}

export const isMobile = () => {
    return width < 768
}




export const setStorageToken = (token: string) => {
  storage.set('token', token);
};

export const getStorageToken = () => {
  return storage.getString('token');
};

export const removeStorageToken = () => {
  storage.delete('token');
};

export const setStorageRole = (role: string) => {
  storage.set('role', role);
};

export const getStorageRole = () => {
  return storage.getString('role');
};

export const removeStorageRole = () => {
  storage.delete('role');
};


