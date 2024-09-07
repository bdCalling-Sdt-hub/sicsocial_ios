import React, { SetStateAction } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';

import LottieView from 'lottie-react-native';
import { useStyles } from '../context/ContextApi';
import { NavigProps } from '../interfaces/NaviProps';

interface SplashProps extends NavigProps<null> {
  setIsSplash: React.Dispatch<SetStateAction<boolean>>;
  isSplash?: boolean;
}

const SplashScreen = ({navigation, setIsSplash}: SplashProps) => {
  const {colors} = useStyles();

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
            // navigation?.navigate('Login');
            setIsSplash(false);
          }}
        />
      </ImageBackground>
      <StatusBar hidden />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
