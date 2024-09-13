import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { Dialog } from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useStyles } from '../../../context/ContextApi';

type CustomModalProps = {
  modalVisible: boolean;
  setModalVisible?: Function | any;
  children: JSX.Element;
  height?: number;
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
   panOf ?: boolean;
};

const ModalOfBottom = ({
  children,
  modalVisible,
  setModalVisible,
  // height,

  Radius,
  // width,
  center,
  appearance: normal,
  backButton,
  containerAlign,
  onlyTopRadius,
  backButtonColor,
  containerColor,
  panOf,
}: CustomModalProps) => {
  const containerColorValue = useSharedValue('transparent');
  const containerOpacity = useSharedValue(0);
  const {colors, window, font} = useStyles();
  const [layout, setLayout] = useState<number>();

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

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // console.log(isKeyboardVisible);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Cleanup event listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
 
    <>
      <KeyboardAvoidingView
        onLayout={e => {
          // e.nativeEvent.layout.y && setLayout(e.nativeEvent.layout.y);
        }}>
        <Dialog
          visible={modalVisible}
          bottom={true}
          width={window.width}
          containerStyle={{
            //   paddingBottom: 10,
            // borderRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          onDismiss={() => setModalVisible(false)}
          // panDirection={Dialog.directions.DOWN}
        >
          <View
            style={{
              backgroundColor: containerColor ? containerColor : colors.bg,
              // borderRadius: 10,
              padding: 20,
              // justifyContent: 'flex-start',
              // alignItems: 'center',
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
             
     <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
             >
              {children}
            </ScrollView>
          </View>
        </Dialog>
      </KeyboardAvoidingView>
    </>
  );
};

export default React.memo(ModalOfBottom);
