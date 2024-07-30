import {View, Text, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, PanningProvider} from 'react-native-ui-lib';
import {DiagonalDirections} from 'react-native-gesture-handler/lib/typescript/Directions';

const TextScreen = () => {
  const [show, setshow] = useState(false);
  const {height, width} = useWindowDimensions();

  //   const position = true;
  return (
    <View>
      <Button
        onPress={() => {
          setshow(!show);
        }}
      />
      <Dialog
        visible={show}
        bottom={true}
        width={width}
        renderPannableHeader={() => (
          <View
            style={{
              height: 30,
              //   backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '9%',
                height: 3,
                backgroundColor: 'black',
                borderRadius: 100,
              }}
            />
          </View>
        )}
        containerStyle={{
          //   paddingBottom: 10,
          borderRadius: 10,
        }}
        onDismiss={() => setshow(false)}
        panDirection={Dialog.directions.DOWN}>
        <View
          style={{
            height: 500,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Text>Content</Text>
        </View>
      </Dialog>
    </View>
  );
};

export default TextScreen;
