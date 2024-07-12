import {View, Modal, Pressable, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

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
  const containerOpacityValue = useSharedValue('#00000000');

  useEffect(() => {
    containerOpacityValue.value = withDelay(
      150,
      withTiming('rgba(0, 0, 0,0.4)'),
    );
    return () => {
      containerOpacityValue.value = containerOpacityValue.value = '#00000000';
    };
  }, [modalVisible]);

  return (
    <Modal
      animationType={'slide'}
      animated
      transparent={true}
      visible={modalVisible}>
      <Pressable
        disabled={normal || false}
        onPress={() => {
          containerOpacityValue.value = withDelay(0, withTiming('#00000000'));
          setTimeout(() => {
            setModalVisible(false);
          }, 100);
        }}>
        <Animated.View
          style={{
            justifyContent: containerAlign ? containerAlign : 'flex-end',
            alignItems: 'center',
            backgroundColor: containerOpacityValue,
            height: '100%',
            width: '100%',
          }}>
          <Pressable
            style={{
              borderRadius: Radius ? 9 : 0,
              borderTopRightRadius: onlyTopRadius ? onlyTopRadius : 0,
              borderTopLeftRadius: onlyTopRadius ? onlyTopRadius : 0,
              backgroundColor: containerColor ? containerColor : 'white',
              height: height ? height : '40%',
              width: width ? width : '100%',
              padding: 30,
              justifyContent: center && 'center',
              position: 'relative',
            }}>
            {backButton && (
              <TouchableOpacity
                onPress={() => {
                  containerOpacityValue.value = withDelay(
                    0,
                    withTiming('#00000000'),
                  );
                  setTimeout(() => {
                    setModalVisible(false);
                  }, 100);
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
                    color={backButtonColor ? backButtonColor : '#3D3D3D'}
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
