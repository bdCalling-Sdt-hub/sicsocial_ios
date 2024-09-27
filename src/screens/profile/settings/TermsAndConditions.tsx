import { ScrollView, Text, View } from 'react-native';

import React from 'react';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import { useStyles } from '../../../context/ContextApi';
import { NavigProps } from '../../../interfaces/NaviProps';
import { useGetTermsAndConditionsQuery } from '../../../redux/apiSlices/additionalSlices';

const TermsAndConditions = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
   const {data : termsAndConditions} = useGetTermsAndConditionsQuery({})
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Terms & Conditions"
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
            termsAndConditions?.data?.map((item)=>{
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
          1.1 Welcome to Sic. Sic provides access to the mobile application/app
          to you subject to the terms and conditions (“Terms”) set out on this
          page. By using the Website, you, a registered or guest user in terms
          of the eligibility criteria set out herein (“User”) agree to be bound
          by the Terms. Please read them carefully as your continued usage of
          the Website, you signify your agreement to be bound by these Terms. If
          you do not want to be bound by the Terms, you must not subscribe to or
          use the Website or our services. 1.2 By impliedly or expressly
          accepting these Terms, you also accept and agree to be bound by Razco
          Policies (including but not limited to Privacy Policy available at
          https://chaldal.com/t/PrivacyInfo) as amended from time to time. 1.3
          In these Terms references to "you", and "User" shall mean the
          end-user/customer accessing the Website, its contents, and using the
          Services offered through the Website. References to the “Website”,
          "Razco", “Chaldal.com”, "we", "us", and "our" shall mean the Website
          and/or Razco Limited. 1.4 The contents set out herein form an
          electronic record in terms of Information & Communication and rules
          there under as applicable and as amended from time to time. As such,
          this document does not require any physical or digital signatures and
          forms a valid and binding agreement between the Website and the User.
          1.5 The Website is operated by Razco Limited., a company
          incorporated under the laws of Bangladesh having its registered
          Bangladesh. All references to the Website in these Terms shall deem to
          refer to the aforesaid entity in inclusion of the online portal. 1.6
          This Website may also contain links to other websites, which are not
          operated by Razco, and Razco has no control over the linked sites and
          accepts no responsibility for them or for any loss or damage that may
          arise from your use of them. Your use of the linked sites will be
          subject to the terms of use and service contained within each such
          site. 1.7 We reserve the right to change these Terms at any time.
          Such changes will be effective when posted on the Website. By
          continuing to use the Website after we post any such changes, you
          accept the Terms as modified. 1.8 These Terms will continue to apply
          until terminated by either You or Razco in accordance with the terms
          set out below: 1.9 The agreement with Razco can be terminated by (i)
          not accessing the Website; or (ii) closing Your Account, if such an
          option has been made available to You. 1.10 Notwithstanding the
          foregoing, these provisions set out in these Terms which by their very
          nature survive are meant to survive termination, shall survive the
          termination/expiry of this agreement.
        </Text> */}
      </ScrollView>
    </View>
  );
};

export default TermsAndConditions;


