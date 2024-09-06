import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useContextApi, useStyles } from '../../context/ContextApi';

import React from 'react';
import { SvgXml } from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import { NavigProps } from '../../interfaces/NaviProps';

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

const Languages = [
  //  list 20 country codes and langues
  {
    id: 1,
    code: 'en',
    name: 'English',
  },
  {
    id: 2,
    name: 'Spanish',
    code: 'sp',
  },
  {
    id: 3,
    name: 'Chinese',
    code: 'ch',
  },
  {
    id: 4,
    name: 'Korean',
    code: 'ko',
  },
  {
    id: 5,
    name: 'Vietnamese',
    code: 'vi',
  },
  {
    id: 6,
    name: 'Arabic',
    code: 'ar',
  },
  {
    id: 7,
    name: 'French',
    code: 'fr',
  },
  {
    id: 8,
    name: 'Russian',
    code: 'ru',
  },
];

const SettingScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const {isDark, setDark} = useContextApi();
  const [languageModal, setLanguageModal] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<any[]>();
  console.log(selectedLanguage);
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
                  navigation?.navigate('donation');
                }
                if (item.item.option === 'your_feedback') {
                  navigation?.navigate('Feedback');
                }
                if (item.item.option === 'logout') {
                  navigation?.navigate('Login');
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
        onlyTopRadius={10}
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
            {Languages.map(lang => (
              <TouchableOpacity
                key={lang.id}
                onPress={() => {
                  // change language
                  // navigation?.navigate('Home');
                  // setLanguageModal(false);
                  if (selectedLanguage?.includes(lang.name)) {
                    setSelectedLanguage(
                      selectedLanguage?.filter(item => item !== lang.name),
                    );
                  } else {
                    setSelectedLanguage(
                      selectedLanguage
                        ? [...selectedLanguage, lang?.name as string]
                        : [lang.name],
                    );
                  }
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
                  {lang.name}
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
                  {selectedLanguage?.includes(lang.name) && (
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
