import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {useContextApi, useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-vector-icons/Icon';

const settingsData = [
  {
    id: 1,
    name: 'Manage Account',
    option: 'icon',
  },
  {
    id: 2,
    name: 'FAQ',
    option: 'icon',
  },
  {
    id: 3,
    name: 'Terms & Conditions',
    option: 'icon',
  },
  {
    id: 4,
    name: 'Privacy Policy',
    option: 'icon',
  },
  {
    id: 5,
    name: 'Sic guidelines',
    option: 'icon',
  },
  {
    id: 6,
    name: 'About Sic',
    option: 'icon',
  },
  {
    id: 7,
    name: 'Integrity Donation',
    option: 'icon',
  },
  {
    id: 8,
    name: 'Your feedback',
    option: 'icon',
  },
  {
    id: 9,
    name: 'White/Dark mode',
    option: 'dark_mode',
  },
  {
    id: 10,
    name: 'Language',
    option: 'icon',
  },
  {
    id: 11,
    name: 'Change Password',
    option: 'icon',
  },
  {
    id: 12,
    name: 'Delete Account',
    option: 'icon',
  },
];

const SettingScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const {isDark, setDark} = useContextApi();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Settings"
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={settingsData}
        contentContainerStyle={{
          paddingHorizontal: '4%',
          gap: 18,
          paddingBottom: 30,
          paddingTop: 10,
        }}
        renderItem={item => {
          return (
            <View
              style={{
                backgroundColor: colors.secondaryColor,
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                elevation: 1,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textColor.light,
                  fontFamily: font.Poppins,
                }}>
                {item.item.name}
              </Text>
              {item.item.option === 'dark_mode' ? (
                <TouchableOpacity
                  onPress={() => {
                    setDark(!isDark);
                  }}
                  style={{
                    backgroundColor: isDark
                      ? colors.textColor.light
                      : 'rgb(220,220,220)',
                    width: 50,
                    height: 25,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: isDark ? 'flex-end' : 'flex-start',
                    paddingHorizontal: 2,
                  }}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 50,
                      backgroundColor: isDark ? colors.bg : colors.primaryColor,
                    }}></View>
                </TouchableOpacity>
              ) : (
                <SvgXml
                  xml={`<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.41203 2.22158L0.788908 9.8447L1.73172 10.7875L9.35484 3.16439L9.35481 8.22156L10.6881 8.22156L10.6882 0.888246L3.35481 0.888236L3.35481 2.22156L8.41203 2.22158Z" fill="#8E3C50"/>
</svg>
`}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
