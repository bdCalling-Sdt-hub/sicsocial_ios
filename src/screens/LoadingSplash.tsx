import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {NavigProps} from '../interfaces/NaviProps';

const LoadingSplash = ({navigation, route}: NavigProps<null>) => {
  const {token} = useSelector((state: any) => state?.token);

  setTimeout(() => {
    if (token) {
      (navigation as any)?.replace('HomeRoutes');
    } else {
      (navigation as any)?.replace('Login');
    }
  }, 500);

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
          onAnimationFinish={() => {}}
        />
      </ImageBackground>
      {/* <StatusBar hidden /> */}
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
