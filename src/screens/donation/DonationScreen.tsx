import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';

const data = [
  {
    id: 1,
    text: 'Details',
  },
  {
    id: 2,
    text: 'rules & regulations',
  },
  {
    id: 3,
    text: 'Terms & conditions.',
  },
];

const DonationScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [selectItem, setSelectItem] = React.useState<number>(0);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        title="Integrity Donation"
        navigation={navigation}
        thirdRoll
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
          justifyContent: 'space-between',
        }}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 15,
        }}
        data={data}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => setSelectItem(item.index)}
            style={{
              backgroundColor:
                item.index === selectItem
                  ? colors.primaryColor
                  : colors.secondaryColor,
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              height: 40,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: item.index === selectItem ? 'white' : '#767676',
                fontFamily: font.Poppins,
              }}>
              {item.item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
       
     <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
        }}>
        {selectItem === 0 && (
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Image
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                borderRadius: 16,
                marginBottom: 20,
                alignSelf: 'center',
              }}
              source={require('../../assets/tempAssets/charity.jpg')}
            />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: font.PoppinsSemiBold,
                  color: colors.textColor.light,
                  marginBottom: 16,
                }}>
                Donation for childrens
              </Text>
              <Text
                style={{
                  textAlign: 'justify',
                  lineHeight: 20,
                  letterSpacing: 0.3,
                  fontFamily: font.Poppins,
                  color: colors.textColor.light,
                }}>
                {`Integrity Donation is a concept or practice where individuals or organizations contribute resources, usually financial, in a manner that is ethical, transparent, and aligned with the principles of integrity. Here are some details that typically characterize Integrity Donations:

Transparency: The donation process and the use of funds are clear and open to scrutiny. Donors and recipients provide full disclosure about the amount donated, the source of funds, and how the funds will be used.
Ethical Sources: Donations come from ethical sources. Funds should not come from illegal or unethical activities, and donors should have a good reputation.
Purpose Alignment: The donation should align with the donor's values and the recipient's mission. Both parties should have a clear understanding of the intended use of the funds and how it supports the recipient's goals.
Accountability: There are mechanisms in place to ensure that the funds are used as intended. This includes regular reporting, audits, and feedback from beneficiaries.
Impact Focus: The donation is intended to create a positive impact. Donors often seek to support projects or initiatives that have a measurable and sustainable impact on the community or cause they care about.
Non-conditional: Integrity Donations are often made without strings attached, meaning that they are not tied to specific expectations or demands that could compromise the recipient’s integrity or independence.
Recognition and Privacy: Donors can choose to be recognized for their contributions or remain anonymous, based on their preference and the norms of the recipient organization.
Legal Compliance: All donations comply with the relevant laws and regulations in both the donor's and recipient's jurisdictions.
                        
                        `}
              </Text>
            </View>
          </View>
        )}
        {selectItem === 1 && (
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: font.PoppinsSemiBold,
                color: colors.textColor.light,
                marginBottom: 16,
                textAlign: 'justify',
              }}>
              Rules and regulations
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                lineHeight: 20,
                letterSpacing: 0.3,
                fontFamily: font.Poppins,
                color: colors.textColor.light,
              }}>
              {`Integrity Donation is a concept or practice where individuals or organizations contribute resources, usually financial, in a manner that is ethical, transparent, and aligned with the principles of integrity. Here are some details that typically characterize Integrity Donations:

Transparency: The donation process and the use of funds are clear and open to scrutiny. Donors and recipients provide full disclosure about the amount donated, the source of funds, and how the funds will be used.
Ethical Sources: Donations come from ethical sources. Funds should not come from illegal or unethical activities, and donors should have a good reputation.
Purpose Alignment: The donation should align with the donor's values and the recipient's mission. Both parties should have a clear understanding of the intended use of the funds and how it supports the recipient's goals.
Accountability: There are mechanisms in place to ensure that the funds are used as intended. This includes regular reporting, audits, and feedback from beneficiaries.
Impact Focus: The donation is intended to create a positive impact. Donors often seek to support projects or initiatives that have a measurable and sustainable impact on the community or cause they care about.
Non-conditional: Integrity Donations are often made without strings attached, meaning that they are not tied to specific expectations or demands that could compromise the recipient’s integrity or independence.
Recognition and Privacy: Donors can choose to be recognized for their contributions or remain anonymous, based on their preference and the norms of the recipient organization.
Legal Compliance: All donations comply with the relevant laws and regulations in both the donor's and recipient's jurisdictions.`}
            </Text>
          </View>
        )}
        {selectItem === 2 && (
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: font.PoppinsSemiBold,
                color: colors.textColor.light,
                marginBottom: 16,
              }}>
              Terms & conditions for donations
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                lineHeight: 20,
                letterSpacing: 0.3,
                fontFamily: font.Poppins,
                color: colors.textColor.light,
              }}>
              {`Integrity Donation is a concept or practice where individuals or organizations contribute resources, usually financial, in a manner that is ethical, transparent, and aligned with the principles of integrity. Here are some details that typically characterize Integrity Donations:

Transparency: The donation process and the use of funds are clear and open to scrutiny. Donors and recipients provide full disclosure about the amount donated, the source of funds, and how the funds will be used.
Ethical Sources: Donations come from ethical sources. Funds should not come from illegal or unethical activities, and donors should have a good reputation.
Purpose Alignment: The donation should align with the donor's values and the recipient's mission. Both parties should have a clear understanding of the intended use of the funds and how it supports the recipient's goals.
Accountability: There are mechanisms in place to ensure that the funds are used as intended. This includes regular reporting, audits, and feedback from beneficiaries.
Impact Focus: The donation is intended to create a positive impact. Donors often seek to support projects or initiatives that have a measurable and sustainable impact on the community or cause they care about.
Non-conditional: Integrity Donations are often made without strings attached, meaning that they are not tied to specific expectations or demands that could compromise the recipient’s integrity or independence.
Recognition and Privacy: Donors can choose to be recognized for their contributions or remain anonymous, based on their preference and the norms of the recipient organization.
Impact Focus: The donation is intended to create a positive impact. Donors often seek to support projects or initiatives that have a measurable and sustainable impact on the community or cause they care about.
Non-conditional: Integrity Donations are often made without strings attached, meaning that they are not tied to specific expectations or demands that could compromise the recipient’s integrity or independence.
Recognition and Privacy: Donors can choose to be recognized for their contributions or remain anonymous, based on their preference and the norms of the recipient organization.
Impact Focus: The donation is intended to create a positive impact. Donors often seek to support projects or initiatives that have a measurable and sustainable impact on the community or cause they care about.
Non-conditional: Integrity Donations are often made without strings attached, meaning that they are not tied to specific expectations or demands that could compromise the recipient’s integrity or independence.
Recognition and Privacy: Donors can choose to be recognized for their contributions or remain anonymous, based on their preference and the norms of the recipient organization.
Legal Compliance: All donations comply with the relevant laws and regulations in both the donor's and recipient's jurisdictions.`}
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: '4%',
          paddingVertical: 20,
          // position: 'absolute',
          // width: '100%',
          // bottom: 0,
          // backgroundColor: 'white',
        }}>
        <NormalButton
          title="Donate here"
          textColor="white"
          backGroundColor={colors.primaryColor}
          onPress={() => {
            navigation?.navigate('Payments');
          }}
        />
      </View>
    </View>
  );
};

export default DonationScreen;

const styles = StyleSheet.create({});
