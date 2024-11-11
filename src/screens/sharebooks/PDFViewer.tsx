import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

import RNFetchBlob from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {makeImage} from '../../utils/utils';

const PDFViewer = ({route, navigation}: NavigProps<any>) => {
  const [pdfPath, setPdfPath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {colors, font} = useStyles();
  // console.log(route?.params?.data?.pdf);
  useEffect(() => {
    // PDF
    const downloadPdf = async () => {
      const pdfUrl = makeImage(route?.params?.data?.pdf);

      try {
        const res = await RNFetchBlob.config({
          fileCache: true,
        }).fetch('GET', pdfUrl);

        // ডাউনলোড হওয়া ফাইলের লোকাল পাথ
        setPdfPath(res.path());
        setIsLoading(false); // লোডিং সম্পূর্ণ হলে লোডার বন্ধ করুন
      } catch (error) {
        console.log('Error downloading PDF:', error);
        setIsLoading(false); // ত্রুটি হলেও লোডার বন্ধ করুন
      }
    };

    downloadPdf();
  }, [route?.params?.data?.pdf]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <BackButtonWithTitle
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
        source={{uri: pdfPath}}
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

export default PDFViewer;
