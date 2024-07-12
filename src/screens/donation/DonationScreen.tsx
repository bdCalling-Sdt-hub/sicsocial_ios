import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {GColors} from '../../styles/GColors';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {GFonts} from '../../styles/GFonts';
import {NavigProps} from '../../interfaces/NaviProps';
import {FlatList} from 'react-native-gesture-handler';
import NormalButton from '../../components/common/NormalButton';

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
  const [selectItem, setSelectItem] = React.useState<number>(0);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: GColors.white,
      }}>
      <BackButtonWithTitle
        title="Integrity Donation"
        navigation={navigation}
        titleStyle={{
          fontSize: 20,
          color: GColors.textColor.blackNormal,
          fontFamily: GFonts.PoppinsSemiBold,
        }}
        thirdColl
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
                  ? GColors.primaryColor
                  : GColors.secondaryColor,
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
                fontFamily: GFonts.Poppins,
              }}>
              {item.item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
      <ScrollView
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
              source={{
                uri: 'https://s3-alpha-sig.figma.com/img/03b7/67a2/9befaf871355af2c6770745fcc2d1d24?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YdFu37RuiBo-Jmekp~ay71cfO0BYj-df9o84OunX24zIf169oaVjjopJiSSK60BCYhn2QQ3GxBrK22su2aPOkNhhspBdidro0r7-aZpXvfWcNBFgGA0AUFuay8X~yB8G4znQg0UjodKY5GzXEeIgfXTuFidyBrx86gdgXPXlUD90sQFHKT8ctqrKl4XSJ-vjOEhMOaO-TeadgJCtJCfoYr0136GX7M~WTwCnrm3ZIrVOPf9PgET16XXG5xnJC7ESwnn1rnn12lBhV9lyImrWCX5--djxfFHLhLMn27A-N8xaQWdlxbpdfPYIxNYE4bkzJ2bx7z4WofMFsE3hZzHO8g__',
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: GFonts.PoppinsSemiBold,
                  color: GColors.textColor.blacklight,
                  marginBottom: 16,
                }}>
                Donation for childrens
              </Text>
              <Text
                style={{
                  textAlign: 'justify',
                  lineHeight: 20,
                  letterSpacing: 0.3,
                  fontFamily: GFonts.Poppins,
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
                fontFamily: GFonts.PoppinsSemiBold,
                color: GColors.textColor.blacklight,
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
                fontFamily: GFonts.Poppins,
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
                fontFamily: GFonts.PoppinsSemiBold,
                color: GColors.textColor.blacklight,
                marginBottom: 16,
              }}>
              Terms & conditions for donations
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                lineHeight: 20,
                letterSpacing: 0.3,
                fontFamily: GFonts.Poppins,
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
          backGroundColor={GColors.primaryColor}
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
