import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {lStorage, removeStorageToken} from '../../utils/utils';
import {useContextApi, useStyles} from '../../context/ContextApi';

import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {clearToken} from '../../redux/apiSlices/tokenSlice';
import language from '../../assets/lang/language.json';
import {useDispatch} from 'react-redux';
import {useGetDonationQuery} from '../../redux/apiSlices/additionalSlices';

const settingsData = [
  {
    id: 1,
    name: 'Manage Account',
    option: 'manage_account',
  },
  {
    id: 2,
    name: 'FAQ',
    option: 'faq',
  },
  {
    id: 3,
    name: 'Terms & Conditions',
    option: 'terms_and_conditions',
  },
  {
    id: 4,
    name: 'Privacy Policy',
    option: 'privacy_policy',
  },
  {
    id: 5,
    name: 'Sic guidelines',
    option: 'sic_guidelines',
  },
  {
    id: 6,
    name: 'About Sic',
    option: 'about_sic',
  },
  {
    id: 7,
    name: 'Integrity Donation',
    option: 'integrity_donation',
  },
  {
    id: 8,
    name: 'Your feedback',
    option: 'your_feedback',
  },
  {
    id: 9,
    name: 'White/Dark mode',
    option: 'dark_mode',
  },
  {
    id: 10,
    name: 'Language',
    option: 'language',
  },
  {
    id: 11,
    name: 'Log Out',
    option: 'logout',
  },
];

const SettingScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const {data: donations} = useGetDonationQuery({});
  const {isDark, setDark} = useContextApi();
  const [languageModal, setLanguageModal] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>(
    lStorage.getString('language') || 'English',
  );
  // console.log(selectedLanguage);
  const dispatch = useDispatch();
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
                if (item?.item.option === 'manage_account') {
                  navigation?.navigate('ManageAccounts');
                }
                if (item.item.option === 'dark_mode') {
                  setDark(!isDark);
                }
                if (item.item.option === 'language') {
                  setLanguageModal(!languageModal);
                }
                if (item.item.option === 'faq') {
                  navigation?.navigate('FAQ');
                }
                if (item.item.option === 'terms_and_conditions') {
                  navigation?.navigate('TermsAndConditions');
                }
                if (item.item.option === 'privacy_policy') {
                  navigation?.navigate('PrivacyPolicy');
                }
                if (item.item.option === 'sic_guidelines') {
                  navigation?.navigate('SicGuidelines');
                }
                if (item.item.option === 'about_sic') {
                  navigation?.navigate('AboutSic');
                }
                if (item.item.option === 'integrity_donation') {
                  navigation?.navigate('donation', {data: donations?.data![0]});
                }
                if (item.item.option === 'your_feedback') {
                  navigation?.navigate('Feedback');
                }
                if (item.item.option === 'logout') {
                  dispatch(clearToken());
                  removeStorageToken();
                  navigation?.navigate('Loading');
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

      <ModalOfBottom
        setModalVisible={setLanguageModal}
        modalVisible={languageModal}
        backButton>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              // paddingTop: 10,
              paddingBottom: 10,
              // paddingHorizontal: 20,
              color: colors.textColor.light,
              fontFamily: font.Poppins,
            }}>
            Language
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={
              {
                // gap: 10,
              }
            }>
            {language.map(lang => (
              <TouchableOpacity
                key={lang.country_code}
                onPress={() => {
                  // change language
                  console.log(lang.language_code);
                  // navigation?.navigate('Home');
                  setLanguageModal(false);
                  lStorage.setString('language', lang.language_code);
                  setSelectedLanguage(lang.language_code);
                }}
                style={{
                  backgroundColor: colors.bg,
                  // paddingHorizontal: 20,
                  paddingVertical: 15,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                  // elevation: 1,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.textColor.light,
                    fontFamily: font.Poppins,
                  }}>
                  {lang.country}
                </Text>
                <View
                  style={{
                    borderRadius: 10,
                    borderColor: 'gray',
                    borderWidth: 1,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {selectedLanguage?.includes(lang.language_code) && (
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 100,
                        backgroundColor: '#000000',
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ModalOfBottom>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
