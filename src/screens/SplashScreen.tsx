import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { NavigProps } from '../interfaces/NaviProps';

const SplashScreen = ({navigation} : NavigProps<null>) => {
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
          loop={false}
       
          speed={0.7}
          onAnimationFinish={() => {
            console.log('animation finished');
            navigation?.navigate("Login")
          }}
        />
      </ImageBackground>
  
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
