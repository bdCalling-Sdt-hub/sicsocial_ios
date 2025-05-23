import { ScrollView, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import { useStyles } from '../../../context/ContextApi';
import { NavigProps } from '../../../interfaces/NaviProps';
import { useGetPrivacyPolicyQuery } from '../../../redux/apiSlices/additionalSlices';

const PrivacyPolicyScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const {data : privacyPolicy} = useGetPrivacyPolicyQuery({})
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Privacy Policy"
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
       showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: '5%',
          marginTop: 10,
          paddingBottom: 20,
        }}>
          {
            privacyPolicy?.data?.map((item)=>{
              return <Text
              key={item?._id}
              style={{
                fontSize: 14,
                fontFamily: font.Poppins,
                color: colors.textColor.neutralColor,
                letterSpacing: 0.3,
                lineHeight: 24,
                textAlign: 'justify',
              }}>
                {item?.content}
              </Text>
            })
          }
        {/* <Text
          style={{
            fontSize: 14,
            fontFamily: font.Poppins,
            color: colors.textColor.neutralColor,
            letterSpacing: 0.3,
            lineHeight: 24,
            textAlign: 'justify',
          }}>
          {`
         When you use our App, we collect and store your personal information which is provided by you from time to time. Our primary goal in doing so is to provide you a safe, efficient, smooth and customized experience. This allows us to provide services and features that most likely meet your needs, and to customize our website to make your experience safer and easier. More importantly, while doing so, we collect personal information from you that we consider necessary for achieving this purpose. Below are some of the ways in which we collect and store your information: We receive and store any information you enter on our website or give us in any other way. We use the information that you provide for such purposes as responding to your requests, customizing future shopping for you, improving our stores, and communicating with you.We also store certain types of information whenever you interact with us. For example, like many websites, we use "cookies," and we obtain certain types of information when your web browser accesses Chaldal.com or advertisements and other content served by or on behalf of Chaldal.com on other websites.When signing up via Facebook, we collect your Name and Email (provided by Facebook) as part of your Chaldal account Information.To help us make e-mails more useful and interesting, we often receive a confirmation when you open e-mail from Chaldal if your computer supports such capabilities.Changes To Your Information:The information you provide us isn’t set in stone. You may review, update, correct or delete the personal information in your profile at any time. If you would like us to remove your information from our records, please create a request at the Contact Us page. To Delete your Facebook login, visit the Contact Us page while logged in via Facebook. You should see a "Delete Facebook Login" option to create a request to remove Facebook login from your account.Information about our customers is an important part of our business, and we are not in the business of selling it to others. We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Terms of Use and other agreements; or protect the rights, property, or safety of Chaldal.com, our users, or others. This includes exchanging information with other companies and organizations for fraud protection.
         `}
        </Text> */}
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({});
