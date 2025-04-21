import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {Modal} from 'react-native-ui-lib';
import {FontSize} from '../../../utils/utils';

// Define the ref object type
export interface PopUpModalRef {
  open?: (data: PopUpModalProps) => any;
  close?: () => any;
}

// Define the component's props type
interface PopUpModalProps {
  title?: string;
  icon?: JSX.Element;
  lottify?: string;
  lottifyColor?: string;
  button?: boolean;
  onPress?: () => void;
  content?: string;
  buttonColor?: string;
  buttonText?: string;
  buttonTextColor?: string;
  buttonStyle?: any;
  fullWidth?: boolean;
  fullHeight?: boolean;
  disable?: boolean;
  direction?: 'down' | 'up' | 'left' | 'right';
}

const {width, height} = Dimensions.get('window');

const PopUpModal = forwardRef<PopUpModalRef, PopUpModalProps>(
  ({direction}, ref) => {
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState<PopUpModalProps>();

    useImperativeHandle(ref, () => ({
      open(data) {
        setModalContent(data);
        setVisible(true);
      },
      close() {
        setVisible(false);
      },
    }));

    return (
      <Modal
        transparent
        animationType="fade"
        overlayBackgroundColor="rgba(0, 0, 0, 0.2)" // Semi-transparent background
        visible={visible}
        onDismiss={() => !modalContent?.disable && setVisible(false)}
        onBackgroundPress={() => !modalContent?.disable && setVisible(false)} // Close modal on background press
      >
        <Pressable
          onPress={() => {
            !modalContent?.disable && setVisible(false);
          }}
          style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalContent?.icon && <View>{modalContent?.icon}</View>}
            {modalContent?.lottify && (
              <View>
                <LottieView
                  autoPlay
                  loop={true}
                  source={modalContent?.lottify}
                  style={{
                    height: height * 0.08,
                    aspectRatio: 1,
                  }}
                />
              </View>
            )}
            {modalContent?.title && (
              <Text style={styles.modalTitle}>{modalContent.title}</Text>
            )}
            {modalContent?.content && (
              <Text style={styles.modalText}>{modalContent.content}</Text>
            )}
            {modalContent?.button && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() =>
                    modalContent?.onPress && modalContent?.onPress()
                  }
                  style={[
                    styles.button,
                    {backgroundColor: modalContent?.buttonColor},
                  ]}>
                  <Text style={styles.buttonText}>
                    {modalContent?.buttonText || 'Okay'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Pressable>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
  },
  modalContent: {
    minHeight: height * 0.15,
    width: width * 0.8, // Width is 80% of the screen width
    padding: 20,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
  },
  modalTitle: {
    fontSize: FontSize(18),

    textAlign: 'center',
    color: 'gray',
    // marginTop: 10,
  },
  modalText: {
    fontSize: FontSize(16),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    // marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',

    textAlign: 'center',
    fontSize: FontSize(15),
    fontWeight: '400',
  },
});

export default PopUpModal;
