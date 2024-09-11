import { ImageBackground, StyleSheet, View } from 'react-native';

import LottieView from 'lottie-react-native';
import React from 'react';
import { NavigProps } from '../interfaces/NaviProps';
import { lStorage } from '../utils/utils';

const LoadingSplash = ({navigation}: NavigProps<null>) => {
  
  const token = lStorage.getString('token');

 
  setTimeout(() => {
    if(token){
        navigation?.replace('HomeRoutes');
    }
    else{
        navigation?.replace('Login');
    }
  },500)

  return (
    <View
      style={{
        height: '100%',
      }}>
      <ImageBackground
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        resizeMode="stretch"
        source={require('../assets/splash_assets/slapsh_image.jpg')}>
        <LottieView
          style={{
            height: 200,
            width: 200,
            position: 'absolute',
            bottom: 0,
          }}
          source={require('../assets/lotties/splash_loading.json')}
          autoPlay
          loop
        //   duration={1000}
          speed={0.7}
          onAnimationFinish={() => {
           
          }}
        />
      </ImageBackground>
      {/* <StatusBar hidden /> */}
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
