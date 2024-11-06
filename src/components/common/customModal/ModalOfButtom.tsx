import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {Dialog} from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useStyles} from '../../../context/ContextApi';

type CustomModalProps = {
  modalVisible: boolean;
  setModalVisible?: Function | any;
  children: JSX.Element;
  backButton?: boolean;
  containerColor?: string;
  backButtonColor?: string;
};

const ModalOfBottom = ({
  children = <></>,
  modalVisible = false,
  setModalVisible = () => {},
  backButton = false,
  backButtonColor = '',
  containerColor = '',
}: CustomModalProps) => {
  const {colors, window, font} = useStyles();

  return (
    <>
      <KeyboardAvoidingView>
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
              contentContainerStyle={{
                paddingVertical: Platform.OS === 'ios' ? 10 : 0,
              }}>
              {children}
            </ScrollView>
          </View>
        </Dialog>
      </KeyboardAvoidingView>
    </>
  );
};

export default React.memo(ModalOfBottom);
