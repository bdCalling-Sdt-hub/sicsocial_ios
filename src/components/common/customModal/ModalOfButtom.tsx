import {View, Modal, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  withDelay,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useStyles} from '../../../context/ContextApi';

type CustomModalProps = {
  modalVisible: boolean;
  setModalVisible?: Function | any;
  children: JSX.Element;
  height?: string | number;
  paddingHorizontal?: string;
  slide?: 'slide' | 'fade';
  onlyTopRadius?: number;
  Radius?: number;
  width?: string | number;
  center?: string;
  appearance?: boolean;
  backButton?: boolean;
  containerAlign?: 'center' | 'flex-start' | 'flex-end';
  backGroundColor?: string;
  transparent?: boolean;
  containerColor?: string;
  backButtonColor?: string;
};

const ModalOfBottom = ({
  children,
  modalVisible,
  setModalVisible,
  height,

  Radius,
  width,
  center,
  appearance: normal,
  backButton,
  containerAlign,
  onlyTopRadius,
  backButtonColor,
  containerColor,
}: CustomModalProps) => {
  const containerColorValue = useSharedValue('transparent');
  const containerOpacity = useSharedValue(0);
  const {colors} = useStyles();

  useEffect(() => {
    if (modalVisible) {
      containerColorValue.value = withTiming('rgba(0,0,0,0.2)', {
        duration: 700,
      });
      containerOpacity.value = 1;
    }
    if (!modalVisible) {
      containerColorValue.value = 'transparent';
      containerOpacity.value = 0;
    }

    return () => {
      containerColorValue.value = 'transparent';
      containerOpacity.value = 1;
    };
  }, [modalVisible]);

  const modalAnimationStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: containerColorValue.value,
      opacity: containerOpacity.value,
    };
  });

  return (
    <Modal
      // presentationStyle="pageSheet"
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}>
      <Pressable
        disabled={normal || false}
        onPressIn={() => {
          containerColorValue.value = 'transparent';
          containerOpacity.value = withTiming(0, {duration: 250});
        }}
        onPress={() => {
          setModalVisible(false);
        }}
        // onPressOut={() => {
        //   containerOpacity.value = withTiming(0, {duration: 10});
        //   setModalVisible(false);
        //   // setTimeout(() => {
        //   // }, 50);
        // }}
      >
        <Animated.View
          style={[
            {
              justifyContent: containerAlign ? containerAlign : 'flex-end',
              alignItems: 'center',

              height: '100%',
              width: '100%',
            },
            modalAnimationStyle,
          ]}>
          <Pressable
            style={{
              borderRadius: Radius ? 9 : 0,
              borderTopRightRadius: onlyTopRadius ? onlyTopRadius : 0,
              borderTopLeftRadius: onlyTopRadius ? onlyTopRadius : 0,
              backgroundColor: colors.bg,
              height: height ? height : '40%',
              width: width ? width : '100%',
              padding: 30,
              justifyContent: center && 'center',
              position: 'relative',
            }}>
            {backButton && (
              <TouchableOpacity
                onPressIn={() => {
                  containerColorValue.value = withTiming('transparent');
                }}
                onPressOut={() => {
                  setTimeout(() => {
                    setModalVisible(false);
                  }, 50);
                }}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  zIndex: 999,
                }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    // backgroundColor: globalStyle.primary,
                    //   backgroundColor: 'gray',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}>
                  <AntDesign
                    name="close"
                    size={24}
                    color={
                      backButtonColor
                        ? backButtonColor
                        : colors.textColor.normal
                    }
                  />
                </View>
              </TouchableOpacity>
            )}
            {children}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default ModalOfBottom;
