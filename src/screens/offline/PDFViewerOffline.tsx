import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import Pdf from 'react-native-pdf';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';

const PDFViewerOffline = ({route, navigation}: NavigProps<any>) => {
  const {colors, font} = useStyles();
  // console.log(route?.params?.data?.pdf);

  return (
    <View style={{flex: 1, backgroundColor: colors?.bg}}>
      <BackButtonWithTitle
        height={60}
        navigation={navigation}
        title="Back"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.light,
          fontFamily: font.PoppinsSemiBold,
        }}
      />
      <Pdf
        source={{uri: 'file://' + route?.params?.data?.pdf}}
        showsVerticalScrollIndicator={false}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PDFViewerOffline;
