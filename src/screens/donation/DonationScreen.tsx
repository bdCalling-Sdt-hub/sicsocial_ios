import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {AnimatedImage} from 'react-native-ui-lib';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetDonationQuery} from '../../redux/apiSlices/additionalSlices';
import {IDonation} from '../../redux/interface/donation';
import {makeImageUrl} from '../../utils/utils';

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

const DonationScreen = ({navigation, route}: NavigProps<IDonation>) => {
  const {colors, font} = useStyles();
  const [selectItem, setSelectItem] = React.useState<number>(0);
  const {data: donations} = useGetDonationQuery({});

  const Item = donations?.data![0];

  // console.log(route?.params);

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

      <View>
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
                  color:
                    item.index === selectItem
                      ? 'white'
                      : colors.textColor.neutralColor,
                  fontFamily: font.Poppins,
                }}>
                {item.item.text}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

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
            {Item?.details?.image && (
              <AnimatedImage
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 16,
                  marginBottom: 20,
                }}
                source={{
                  uri: makeImageUrl(Item?.details?.image),
                }}
              />
            )}

            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: font.PoppinsSemiBold,
                  color: colors.textColor.light,
                  marginBottom: 16,
                }}>
                {Item?.details?.title}
              </Text>
              <Text
                style={{
                  textAlign: 'justify',
                  lineHeight: 20,
                  letterSpacing: 0.3,
                  fontFamily: font.Poppins,
                  color: colors.textColor.light,
                }}>
                {Item?.details?.content}
                lorem200
              </Text>
            </View>
          </View>
        )}
        {selectItem === 1 && (
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            {/* <Text
              style={{
                fontSize: 16,
                fontFamily: font.PoppinsSemiBold,
                color: colors.textColor.light,
                marginBottom: 16,
                textAlign: 'justify',
              }}>
             {Item?.rulesAndRegulations.content}
            </Text> */}
            <Text
              style={{
                textAlign: 'justify',
                lineHeight: 20,
                letterSpacing: 0.3,
                fontFamily: font.Poppins,
                color: colors.textColor.light,
              }}>
              {Item?.rulesAndRegulations.content}
            </Text>
          </View>
        )}
        {selectItem === 2 && (
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            {/* <Text
              style={{
                fontSize: 16,
                fontFamily: font.PoppinsSemiBold,
                color: colors.textColor.light,
                marginBottom: 16,
              }}>
              Terms & conditions for donations
            </Text> */}
            <Text
              style={{
                textAlign: 'justify',
                lineHeight: 20,
                letterSpacing: 0.3,
                fontFamily: font.Poppins,
                color: colors.textColor.light,
              }}>
              {Item?.termsAndConditions.content}
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
