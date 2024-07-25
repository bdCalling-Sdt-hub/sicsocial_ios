import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useStyles} from '../../../context/ContextApi';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';

const SicGuidelinesScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="SIC guidelines"
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: '5%',
          marginTop: 10,
          paddingBottom: 20,
        }}>
        <View
          style={{
            marginVertical: 20,
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.neutralColor,
              letterSpacing: 0.3,
            }}>
            SIC House :
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              letterSpacing: 0.3,

              textAlign: 'justify',
            }}>
            Sic provides access to the mobile application/app to you subject to
            the terms and conditions (“Terms”) set out on this page. By using
            the Website, you, a registered or guest user in terms of the
            eligibility criteria set out herein (“User”) agree to be bound by
            the Terms. Please read them carefully as your continued usage of the
            Website, you signify your agreement to be bound by these Terms. If
            you do not want to be bound by the Terms, you must not subscribe to
            or use the Website or our services.
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.blue,
              letterSpacing: 0.3,
            }}>
            follow this link : https://www.youtube.com/
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.neutralColor,
              letterSpacing: 0.3,
            }}>
            SIC Room :
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              letterSpacing: 0.3,

              textAlign: 'justify',
            }}>
            Sic provides access to the mobile application/app to you subject to
            the terms and conditions (“Terms”) set out on this page. By using
            the Website, you, a registered or guest user in terms of the
            eligibility criteria set out herein (“User”) agree to be bound by
            the Terms. Please read them carefully as your continued usage of the
            Website, you signify your agreement to be bound by these Terms. If
            you do not want to be bound by the Terms, you must not subscribe to
            or use the Website or our services.
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.blue,
              letterSpacing: 0.3,
            }}>
            follow this link : https://www.youtube.com/
          </Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            gap: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.neutralColor,
              letterSpacing: 0.3,
            }}>
            SIC Group-chat :
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              letterSpacing: 0.3,

              textAlign: 'justify',
            }}>
            Sic provides access to the mobile application/app to you subject to
            the terms and conditions (“Terms”) set out on this page. By using
            the Website, you, a registered or guest user in terms of the
            eligibility criteria set out herein (“User”) agree to be bound by
            the Terms. Please read them carefully as your continued usage of the
            Website, you signify your agreement to be bound by these Terms. If
            you do not want to be bound by the Terms, you must not subscribe to
            or use the Website or our services.
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.blue,
              letterSpacing: 0.3,
            }}>
            follow this link : https://www.youtube.com/
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SicGuidelinesScreen;

const styles = StyleSheet.create({});
