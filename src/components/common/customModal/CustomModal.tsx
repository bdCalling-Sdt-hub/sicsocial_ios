import {Pressable, SafeAreaView, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {Modal} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
  containerColor?: string;
};

const CustomModal = ({
  children,
  modalVisible,
  setModalVisible,
  height,
  paddingHorizontal,
  slide,
  onlyTopRadius,
  Radius,
  width,
  center,
  appearance: normal,
  backButton,
  containerColor,
}: CustomModalProps) => {
  const {colors} = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (modalVisible) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modalVisible]);

  // console.log('Cound');

  return (
    <>
      <Modal
        visible={open}
        transparent
        overlayBackgroundColor={'rgba(0, 0, 0, 0.3)'}
        onBackgroundPress={() => setModalVisible(false)}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
          <Pressable
            disabled={normal || false}
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              paddingHorizontal: paddingHorizontal ? paddingHorizontal : '0%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000AAA',
              height: '100%',
              width: '100%',
            }}>
            <View
              style={{
                borderRadius: Radius ? 9 : 0,
                borderTopRightRadius: onlyTopRadius && 9,
                borderTopLeftRadius: onlyTopRadius && 9,
                backgroundColor: containerColor ? containerColor : colors.bg,
                height: height && height,
                width: width ? width : '90%',
                padding: 10,
                justifyContent: center && 'center',
                position: 'relative',
              }}>
              {backButton && (
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
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
                    <AntDesign name="close" size={24} color={'#3D3D3D'} />
                  </View>
                </TouchableOpacity>
              )}
              {children}
            </View>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default CustomModal;
