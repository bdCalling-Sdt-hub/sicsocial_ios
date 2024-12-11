import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useContextApi, useStyles} from '../../../context/ContextApi';

import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';

const settingsData = [
  {
    id: 11,
    name: 'Change Password',
    option: 'change_password',
  },
  // {
  //   id: 12,
  //   name: 'Delete Account',
  //   option: 'delete_account',
  // },
];

const ManageAccounts = ({navigation}: NavigProps<null>) => {
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
            <TouchableOpacity
              onPress={() => {
                if (item.item.option === 'change_password') {
                  navigation?.navigate('ChangePassword');
                }
                if (item.item.option === 'delete_account') {
                  navigation?.navigate('DeleteAccount');
                }
              }}
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
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ManageAccounts;

const styles = StyleSheet.create({});
