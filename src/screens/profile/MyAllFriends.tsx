import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {Image} from 'react-native';
import {getRandomColor} from '../../utils/GetRandomColor';

const friends = [
  {
    id: 1,
    name: 'Amina',
    img: 'https://s3-alpha-sig.figma.com/img/d067/c913/ad868d019f92ce267e6de23af3413e5b?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pMfG6YS9I8ruMTaTRqegPV9zZCyzJf~VintWAZomMQnoTSOB9r4vUqRwLPv6QY8UI0ayslqETesPz1z608PL7Lar8-2OFbc56ajfs0Cd0~Oj2IqJmrBLGw6KNarGTI7iBGxg70mDxP5kJQQZGT0sYE0Sd02zOzMoEpcyAxxAQUKlAGkTJocs3DSzvA-3CCCfxvT2qe3qytPeU6v8du6tQgae7mnGcqPOah-VRkMnVjpZ5NXf0fHqtpgHVzEbCRbuQBObOqRLrc-89S7ihmEEysndEuAwU~U9bfmvholer8U4ygOM-VmKm4tcibG6THnu35W3dfic90~qZ6PgubDTeA__',
  },
  {
    id: 2,
    name: 'Arif',
    img: 'https://s3-alpha-sig.figma.com/img/9716/358a/4005b22a3c1c23d7c04f6c9fdbd85468?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R0fZk1NMkvTlpscVfHGRkuxmA0WPSUHxnjjahouowZtMyO2zTQLVQWtQgO5CV-jIHc4FxwKNAvxQ4kF9MNIVKv3rbY5gasYFGGkWV9iC1RhsHhQsl4cgx4inlsmKWKR8ASralsW4NFtkdgJmeQqj8pzr9lwos2Myau-V8E7Lu~4AdYTnB8tzwMHTXExT5Gq7gNyLO8phSWGKz8ypqApNmXW07JIEEQRgXzwi6LziAmz2K8gwo~tPigEHOV2SBEPmohzZfN7dQMZ14N8381ffBEjZDdnU91StpIrb7ujFkdTZ7D89zp5bLJe0OvJvyytdTMaCgu9jH5KkAkLu6O1VSA__',
  },
  {
    id: 3,
    name: 'Rahman',
    img: 'https://s3-alpha-sig.figma.com/img/9986/6959/bdf7eaf41f82746f243dbd6e48280274?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HX3IUfbKT1pMyV2gAuqyw6BHCsIgjv3oU5mGebbHO-NUN5aQ8xzjQg1ik64StQGU83KiAb5dNDn2H67ucbdJL5owREIPgnnB7SUcdmIhwqATJapicXc~9YwihUpyPqX0Dal8olXXiOOyoEuOgTvn2ESQ8Niczdk7HUyRHvg-YPNFB~IMokYDNNbL3Q0Gf7YW5qwz9kvXuHRLRxDOGhM7uluPikOFEc4dwCMXSpRw9gtDRysLCgpw-d8uaNrrycr6wHaj4xmXsMbQK4Ab1o574QhxVNOWI96uSnCeqz7eucLtT4ae48RM~zfw2Fm6KVCZZOzNuItANqsckVKErFFPFQ__',
  },
  {
    id: 4,
    name: 'Mithila',
    img: 'https://s3-alpha-sig.figma.com/img/f6e4/02df/f94d91c8643f6698b126e7dec5854350?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k7v0uQVh16IKwhhv6osti-H5bNgrXgvhzRnK8t6MEh~6evr2xHt424jE0k-6pG07rFxn2nHbasep7JnO4hmcHTETHSxACMhS4NqSFzUStvGLXGJac1dlhOk~SzAfsxlQyg00CW04UfLwlAIvhkxWq9GqNKxD5SdWsQcb~3QuyDJkmDbL~2khOGXOmyyF0LXGN0IQKWnk-lZGAaUi6B3T0RAagiLtLfbfsz5hxKbOaAoORpMikvNh2KEgAzE-WKT-wd-s9ViRstMmwDiLBfutf6c~1DdFtvrbl08ubQQMjOedgB9kvfM4KUaThqYsiR055O~hdNUTmbpceCtn3p335A__',
  },
  {
    id: 5,
    name: 'Samina',
  },
  {
    id: 6,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
  {
    id: 7,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
  {
    id: 8,
    name: 'Samina',
  },
  {
    id: 9,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
  {
    id: 10,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
  {
    id: 11,
    name: 'Samina',
  },
  {
    id: 12,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
  {
    id: 13,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
  {
    id: 14,
    name: 'Samina',
  },
  {
    id: 15,
    name: 'Samina',
  },
  {
    id: 16,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
];

const MyAllFriends = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="My friends"
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
      <Text
        style={{
          textAlign: 'right',
          paddingHorizontal: '5%',
        }}>
        14 friends
      </Text>
      <View
        style={{
          paddingVertical: 20,
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={4}
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
          contentContainerStyle={{
            gap: 16,
            paddingRight: 20,
            paddingHorizontal: '5%',
          }}
          data={friends}
          renderItem={item => (
            <View style={{gap: 6}}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: colors.secondaryColor,
                  // paddingVertical: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                  borderRadius: 50,
                  padding: 3,
                  position: 'relative',
                }}>
                {/* <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 50,
                      backgroundColor: colors.green['#00B047'],
                      position: 'absolute',
                      right: 0,
                      zIndex: +1,
                      bottom: 5,
                    }}
                  /> */}
                {item.item.img ? (
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 30,
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: item.item.img,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 30,
                      backgroundColor: getRandomColor(),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 35,
                        fontFamily: font.PoppinsBold,
                        color: getRandomColor(),
                        textAlign: 'center',
                      }}>
                      {item.item.name?.slice(0, 1)}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: font.Poppins,
                  color: colors.textColor.neutralColor,
                  textAlign: 'center',
                }}>
                {item.item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MyAllFriends;

const styles = StyleSheet.create({});
