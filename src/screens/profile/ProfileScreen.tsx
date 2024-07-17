import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import ConversationalCard from '../../components/common/ConversationalCard';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
  },
];

const FaceDown = [
  {
    id: 1,
    name: 'Asad Face',
    img: 'https://s3-alpha-sig.figma.com/img/a963/5111/9298a7b25821b6b5a2ef8104464db1a4?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lNBH6-vX8Uo3rPHZWapkYFBzIL0qKJ9cBRxc~W9GSjQyKr2xeY9ifz9oYdWdT0FobcK-Tx9BRQotPDOwS3Of0lm4ewfAGW4Qc05mwqygaK6q1j9kZKGjHgPOArJ5We~Oza55jWQ4cPS8NFBvj6FNOMFyyb9ASAxPHHxKX99or6Po2zoHQm-L4KS3JJ84YuINCBQi8pJLDvCiOHPGOIZRnjC8zlibDpD6J69aDBs7sOOpjT~1yLY4xfST7lXkYD-6HJLm50vRvFhzuhMstffm0TOKBcPyiUrujsvXo~L4RvXtBO5Uf6EqIB1O-n5bU43UgqaYC73yz0bpEIXn98QT5Q__',
  },
  {
    id: 2,
    name: 'Cricket club',
    img: 'https://s3-alpha-sig.figma.com/img/f1c1/7d5e/4d68c81ba9bf66877ac4f8230081fe0c?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oGcr0K97wQ3MhTQX4oLbQ4P5cnISeUeLYLQ5rlQXWv-cK~B1~ZKb1qbZARsDypCYlGuiVHyOn1jmWSD142DEYANqeCD4Ud-KH858xCvBRwnymOeE3CrT7wAXjyoFn~NqGQqEe0F1Q0J1ZpP~DEAyvU3mibobfE--klTq1fzIQW~4-kJwmQ5KmY913uOSKyuF8VkcQK5eraMrYzFBe4j1KGfRnbaxr~S5h~5~cUSx7mFl1E~dgStVcSbth~RAa0Vqw~14-Z9uCBZw1ReodXrQ0RgC37wnAi6NE8bfMML265U7uuH2ckcAexJHQ3BoVE34bxbZwBpJ78g6Ns4W4I26oQ__',
  },
  {
    id: 3,
    name: 'T20 2024',
    img: 'https://s3-alpha-sig.figma.com/img/4f46/2122/9d05939f0d46d30b533001f66200dd39?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AchyR3o5rmcHB1xpVUqJlnBpoyDjrOe6H4LoLAB94QW7zbRdPuXI-7gry4M~5a7JI0bzpdfw2ZVYR2FkHLSxLwk3QHlpfsWwZQQUee4QKJtw5Qmnh-riKwUTz2XbUMGCxbrIgvicz79uWS18CaTkkzNksq1FK9pu11Mdt11k9j5ryXqf8ME9UGiapujlz4OdIoursN~8yhs0VC4RQVHmzm0ZBs44YNND75o2EYBOdVtVc1zuqRiYTeVUthfmZsn3gqKb304XTlNwPCDTqmRORXXb6c07O3u0upCI-vDYQwtukrdUq3aNVE00qTcXtDJ2pER-bdiiIV1g41TJczqDmw__',
  },
];

const ProfileScreen = ({navigation}: NavigProps<null>) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const {colors, font} = useStyles();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 25,
        }}>
        <View
          style={{
            paddingHorizontal: '6%',
            marginTop: '10%',
            marginBottom: '5%',
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
            gap: 16,
          }}>
          <View
            style={{
              elevation: 10,
              backgroundColor: colors.normal,
              padding: 1,
              width: 106,
              borderRadius: 46,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 46,
                alignSelf: 'center',
              }}
              source={{
                uri: 'https://s3-alpha-sig.figma.com/img/f6e4/02df/f94d91c8643f6698b126e7dec5854350?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cz4Qczd8u0VDld~tiTdDzpKyOyxcx0QKLi091Vwp7yLsWKwyX0kwvBwFi3CE~mjA1B7~52uARqrujtEPoas1jL07XHeld9MAk-bvMtOR199vh~BxYYw9hY0-XMtCz8NOw-gemuWJpZqKNq2B71gEBIZh5TR4A1VFtOFZwwVP5KaJVlrWAyXCv384mXBcpTrsSICu768Vjcu65nYevf9JiULhGtrft9MZdYjncJo5QIc1Dq~dnjWcEKfIUFTt8YItfJfxDEWxrPmLzv2uG3UjAP16rEmEsmOdNgJlbmHEqu0jB2fxIpTX2woIB75iUqgnTLjpjgxtwp-5PgStdX7P3Q__',
              }}
            />
          </View>
          <View
            style={{
              gap: 4,
            }}>
            <View
              style={{
                gap: -4,
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 17,
                  color: colors.textColor.primaryColor,
                }}>
                Asadullah
              </Text>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 13,
                  color: colors.textColor.neutralColor,
                }}>
                asadullah@gmail.com
              </Text>
            </View>
            <View
              style={{
                gap: -4,
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 17,
                  color: colors.primaryColor,
                }}>
                7
              </Text>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 13,
                  color: colors.primaryColor,
                }}>
                friend
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: '5%',
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://asadullah@insta.com');
            }}
            style={{
              marginTop: 16,
              flexDirection: 'row',

              alignItems: 'center',
              gap: 8,
            }}>
            <Image
              style={{
                width: 16,
                height: 16,
              }}
              source={require('../../assets/icons/instagram/instagram.png')}
            />
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.rare,
              }}>
              asadullah@insta.com
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontFamily: font.Poppins,
              fontSize: 14,
              color: colors.textColor.neutralColor,
            }}>
            scelerisque Praesent Donec amet, eget lorem. consectetur id varius
            at, nec nec dolor quam amet, tincidunt quis vitae In Ut laoreet
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginHorizontal: '4%',
            gap: 24,
          }}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              backgroundColor: colors.secondaryColor,
              height: 35,
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 50,
              elevation: 2,
            }}>
            {/* <Image
            resizeMode="contain"
            style={{
              width: 16,
              height: 16,
            }}
            source={require('../../assets/icons/shear/shear.png')}
          /> */}
            <SvgXml
              xml={`<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3382 10.7623C10.5716 10.7623 9.88096 11.0934 9.40159 11.62L5.08995 8.94957C5.20507 8.65489 5.26891 8.33482 5.26891 7.99998C5.26891 7.66502 5.20507 7.34496 5.08995 7.0504L9.40159 4.37987C9.88096 4.90648 10.5716 5.23766 11.3382 5.23766C12.7823 5.23766 13.9571 4.06286 13.9571 2.61877C13.9571 1.17468 12.7823 0 11.3382 0C9.89414 0 8.71934 1.1748 8.71934 2.61889C8.71934 2.95373 8.78331 3.2738 8.8983 3.56847L4.58678 6.23888C4.10741 5.71227 3.41674 5.38109 2.65014 5.38109C1.20605 5.38109 0.03125 6.55602 0.03125 7.99998C0.03125 9.44407 1.20605 10.6189 2.65014 10.6189C3.41674 10.6189 4.10741 10.2878 4.58678 9.76109L8.8983 12.4315C8.78331 12.7262 8.71934 13.0462 8.71934 13.3812C8.71934 14.8252 9.89414 16 11.3382 16C12.7823 16 13.9571 14.8252 13.9571 13.3812C13.9571 11.9371 12.7823 10.7623 11.3382 10.7623ZM9.6743 2.61889C9.6743 1.70141 10.4208 0.954954 11.3382 0.954954C12.2557 0.954954 13.0022 1.70141 13.0022 2.61889C13.0022 3.53637 12.2557 4.28283 11.3382 4.28283C10.4208 4.28283 9.6743 3.53637 9.6743 2.61889ZM2.65014 9.66392C1.73254 9.66392 0.986082 8.91746 0.986082 7.99998C0.986082 7.0825 1.73254 6.33605 2.65014 6.33605C3.56762 6.33605 4.31396 7.0825 4.31396 7.99998C4.31396 8.91746 3.56762 9.66392 2.65014 9.66392ZM9.6743 13.3811C9.6743 12.4636 10.4208 11.7171 11.3382 11.7171C12.2557 11.7171 13.0022 12.4636 13.0022 13.3811C13.0022 14.2986 12.2557 15.045 11.3382 15.045C10.4208 15.045 9.6743 14.2986 9.6743 13.3811Z" fill="#767676"/>
</svg>
`}
            />
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('ProfileEdit');
            }}
            style={{
              backgroundColor: colors.secondaryColor,
              height: 35,
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 50,
              elevation: 2,
            }}>
            {/* <Image
            resizeMode="contain"
            style={{
              width: 16,
              height: 16,
            }}
            source={require('../../assets/icons/shear/shear.png')}
          /> */}
            <SvgXml
              xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_407_935)">
<path d="M12.875 16H3.125C1.40184 16 0 14.5981 0 12.875V3.125C0 1.40188 1.40184 0 3.125 0H9.18847C9.53366 0 9.81347 0.279813 9.81347 0.625C9.81347 0.970187 9.53366 1.25 9.18847 1.25H3.125C2.09113 1.25 1.25 2.09113 1.25 3.125V12.875C1.25 13.9089 2.09113 14.75 3.125 14.75H12.875C13.9089 14.75 14.75 13.9089 14.75 12.875V6.81153C14.75 6.46634 15.0298 6.18653 15.375 6.18653C15.7202 6.18653 16 6.46634 16 6.81153V12.875C16 14.5981 14.5982 16 12.875 16Z" fill="#767676"/>
<path d="M15.0099 0.991133C14.0351 0.0163833 12.4491 0.0163833 11.4743 0.991133L4.67085 7.79457C3.52498 8.94041 3.0306 10.5732 3.34842 12.1622C3.39789 12.4096 3.59126 12.603 3.83867 12.6525C5.42007 12.9688 7.05504 12.4814 8.20639 11.3301L15.0099 4.52663C15.9846 3.55191 15.9846 1.96588 15.0099 0.991133ZM14.1259 3.64279L7.32248 10.4462C6.57623 11.1925 5.55167 11.566 4.51464 11.4863C4.43479 10.4495 4.80839 9.42476 5.55473 8.67845L10.8493 3.38388L11.2913 3.82585C11.5353 4.06991 11.9311 4.06998 12.1751 3.82585C12.4192 3.58179 12.4193 3.18604 12.1752 2.94198L11.7332 2.50001L12.3582 1.87501C12.8456 1.38763 13.6386 1.38763 14.1259 1.87501C14.6133 2.36238 14.6133 3.15541 14.1259 3.64279Z" fill="#767676"/>
</g>
<defs>
<clipPath id="clip0_407_935">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

`}
            />
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Settings');
            }}
            style={{
              backgroundColor: colors.secondaryColor,
              height: 35,
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 50,
              elevation: 2,
            }}>
            {/* <Image
            resizeMode="contain"
            style={{
              width: 16,
              height: 16,
            }}
            source={require('../../assets/icons/shear/shear.png')}
          /> */}
            <SvgXml
              xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_354_550)">
<path d="M14.034 6H13.97C13.8762 5.99917 13.7848 5.97011 13.7078 5.9166C13.6307 5.86309 13.5715 5.78761 13.538 5.7C13.5027 5.6154 13.4933 5.52221 13.5111 5.43228C13.529 5.34235 13.5731 5.25976 13.638 5.195L13.6835 5.1495C13.9578 4.87417 14.1118 4.50138 14.1118 4.11275C14.1118 3.72412 13.9578 3.35133 13.6835 3.076L12.928 2.321C12.6529 2.04651 12.2801 1.89236 11.8915 1.89236C11.5029 1.89236 11.1301 2.04651 10.855 2.321L10.8095 2.3665C10.7425 2.43106 10.658 2.47464 10.5666 2.4919C10.4751 2.50917 10.3806 2.49936 10.2947 2.46368C10.2087 2.428 10.1351 2.36801 10.0827 2.29106C10.0304 2.21411 10.0016 2.12355 10 2.0305V1.966C9.9996 1.57731 9.84502 1.20466 9.57018 0.92982C9.29534 0.654978 8.92269 0.500397 8.534 0.5H7.466C7.07731 0.500397 6.70466 0.654978 6.42982 0.92982C6.15498 1.20466 6.0004 1.57731 6 1.966V2.0305C5.99756 2.12288 5.9684 2.21258 5.91603 2.28873C5.86367 2.36488 5.79035 2.42422 5.70496 2.45956C5.61957 2.49491 5.52576 2.50474 5.4349 2.48786C5.34404 2.47099 5.26001 2.42814 5.193 2.3645L5.15 2.319C4.87489 2.04451 4.50213 1.89036 4.1135 1.89036C3.72487 1.89036 3.35211 2.04451 3.077 2.319L2.319 3.074C2.04472 3.34933 1.89073 3.72212 1.89073 4.11075C1.89073 4.49938 2.04472 4.87217 2.319 5.1475L2.3645 5.193C2.43003 5.26004 2.47389 5.34523 2.49038 5.43752C2.50688 5.5298 2.49525 5.62491 2.457 5.7105C2.42269 5.79575 2.36373 5.86883 2.28767 5.9204C2.21161 5.97197 2.1219 5.99968 2.03 6H1.966C1.57731 6.0004 1.20466 6.15498 0.92982 6.42982C0.654978 6.70466 0.500397 7.07731 0.5 7.466V8.534C0.500397 8.92269 0.654978 9.29534 0.92982 9.57018C1.20466 9.84502 1.57731 9.9996 1.966 10H2.03C2.12381 10.0008 2.21519 10.0299 2.29225 10.0834C2.3693 10.1369 2.42846 10.2124 2.462 10.3C2.49732 10.3846 2.50666 10.4778 2.48886 10.5677C2.47105 10.6576 2.42689 10.7402 2.362 10.805L2.3165 10.8505C2.04222 11.1258 1.88823 11.4986 1.88823 11.8872C1.88823 12.2759 2.04222 12.6487 2.3165 12.924L3.0715 13.6785C3.34657 13.9533 3.71946 14.1076 4.10825 14.1076C4.49704 14.1076 4.86993 13.9533 5.145 13.6785L5.1905 13.633C5.25758 13.5675 5.34277 13.5237 5.43503 13.5072C5.5273 13.4907 5.6224 13.5023 5.708 13.5405C5.79325 13.5747 5.86635 13.6335 5.91793 13.7095C5.96951 13.7855 5.99722 13.8752 5.9975 13.967V14.0315C5.99737 14.2244 6.03526 14.4154 6.10901 14.5936C6.18277 14.7719 6.29093 14.9338 6.42732 15.0702C6.56371 15.2066 6.72565 15.3147 6.90387 15.3885C7.0821 15.4622 7.27312 15.5001 7.466 15.5H8.534C8.92269 15.4996 9.29534 15.345 9.57018 15.0702C9.84502 14.7953 9.9996 14.4227 10 14.034V13.9695C10.0024 13.8771 10.0316 13.7874 10.084 13.7113C10.1363 13.6351 10.2096 13.5758 10.295 13.5404C10.3804 13.5051 10.4742 13.4953 10.5651 13.5121C10.656 13.529 10.74 13.5719 10.807 13.6355L10.8525 13.681C11.1276 13.9555 11.5004 14.1096 11.889 14.1096C12.2776 14.1096 12.6504 13.9555 12.9255 13.681L13.681 12.9265C13.9553 12.6512 14.1093 12.2784 14.1093 11.8897C14.1093 11.5011 13.9553 11.1283 13.681 10.853L13.6355 10.8075C13.57 10.7405 13.5261 10.6553 13.5096 10.563C13.4931 10.4707 13.5048 10.3756 13.543 10.29C13.5772 10.2047 13.6362 10.1315 13.7122 10.0798C13.7883 10.0281 13.878 10.0004 13.97 10H14.034C14.4227 9.9996 14.7953 9.84502 15.0702 9.57018C15.345 9.29534 15.4996 8.92269 15.5 8.534V7.466C15.4996 7.07731 15.345 6.70466 15.0702 6.42982C14.7953 6.15498 14.4227 6.0004 14.034 6ZM14.5 8.534C14.4999 8.65755 14.4507 8.776 14.3634 8.86337C14.276 8.95073 14.1576 8.99987 14.034 9H13.97C13.6798 9.00247 13.3968 9.09029 13.1563 9.25252C12.9157 9.41474 12.7282 9.64419 12.6171 9.91226C12.5061 10.1803 12.4764 10.4752 12.5317 10.76C12.5871 11.0448 12.7251 11.3071 12.9285 11.514L12.9735 11.5595C13.0608 11.647 13.1098 11.7656 13.1098 11.8892C13.1098 12.0129 13.0608 12.1315 12.9735 12.219L12.218 12.9735C12.1306 13.0609 12.0121 13.11 11.8885 13.11C11.7649 13.11 11.6464 13.0609 11.559 12.9735L11.514 12.928C11.307 12.7248 11.0448 12.5871 10.76 12.5318C10.4752 12.4766 10.1805 12.5063 9.91256 12.6173C9.64458 12.7284 9.41518 12.9157 9.25292 13.1562C9.09066 13.3966 9.0027 13.6795 9 13.9695V14.034C8.99987 14.1576 8.95073 14.276 8.86337 14.3634C8.776 14.4507 8.65755 14.4999 8.534 14.5H7.466C7.34245 14.4999 7.224 14.4507 7.13663 14.3634C7.04927 14.276 7.00013 14.1576 7 14.034V13.9695C6.9986 13.6789 6.91139 13.3951 6.74932 13.1539C6.58725 12.9126 6.35754 12.7246 6.08901 12.6134C5.82048 12.5022 5.5251 12.4728 5.23991 12.5288C4.95473 12.5849 4.69246 12.7239 4.486 12.9285L4.4405 12.974C4.35298 13.0611 4.2345 13.1101 4.111 13.1101C3.9875 13.1101 3.86902 13.0611 3.7815 12.974L3.0265 12.2195C2.93921 12.132 2.89019 12.0134 2.89019 11.8897C2.89019 11.7661 2.93921 11.6475 3.0265 11.56L3.072 11.5145C3.2756 11.3076 3.41374 11.0452 3.46919 10.7603C3.52465 10.4753 3.49495 10.1803 3.38381 9.91214C3.27268 9.64394 3.08502 9.41442 2.84426 9.25221C2.6035 9.09 2.3203 9.00228 2.03 9H1.966C1.84245 8.99987 1.724 8.95073 1.63663 8.86337C1.54927 8.776 1.50013 8.65755 1.5 8.534V7.466C1.50013 7.34245 1.54927 7.224 1.63663 7.13663C1.724 7.04927 1.84245 7.00013 1.966 7H2.03C2.32015 6.99753 2.60316 6.90971 2.84374 6.74748C3.08432 6.58526 3.27183 6.35581 3.38289 6.08774C3.49394 5.81967 3.52363 5.52484 3.46826 5.24C3.41289 4.95517 3.2749 4.69294 3.0715 4.486L3.0265 4.4405C2.93924 4.35304 2.89023 4.23454 2.89023 4.111C2.89023 3.98746 2.93924 3.86896 3.0265 3.7815L3.7815 3.026C3.86889 2.93862 3.98741 2.88952 4.111 2.88952C4.23459 2.88952 4.35311 2.93862 4.4405 3.026L4.4855 3.0715C4.69247 3.2748 4.95469 3.41272 5.23948 3.46807C5.52427 3.52343 5.81905 3.49377 6.08711 3.38279C6.35517 3.27182 6.58465 3.08443 6.74698 2.84397C6.9093 2.60351 6.9973 2.32061 7 2.0305V1.966C7.00013 1.84245 7.04927 1.724 7.13663 1.63663C7.224 1.54927 7.34245 1.50013 7.466 1.5H8.534C8.65755 1.50013 8.776 1.54927 8.86337 1.63663C8.95073 1.724 8.99987 1.84245 9 1.966V2.0305C9.00257 2.32061 9.09046 2.60355 9.25272 2.84406C9.41498 3.08456 9.64444 3.27199 9.91249 3.38299C10.1805 3.49398 10.4753 3.52363 10.7601 3.46824C11.0449 3.41285 11.3071 3.27487 11.514 3.0715L11.5595 3.026C11.6469 2.93862 11.7654 2.88952 11.889 2.88952C12.0126 2.88952 12.1311 2.93862 12.2185 3.026L12.9735 3.7815C13.0608 3.86896 13.1098 3.98746 13.1098 4.111C13.1098 4.23454 13.0608 4.35304 12.9735 4.4405L12.928 4.486C12.7246 4.69297 12.5866 4.95525 12.5312 5.24013C12.4759 5.525 12.5056 5.81987 12.6167 6.08796C12.7278 6.35606 12.9154 6.5855 13.1561 6.74769C13.3967 6.90988 13.6798 6.99763 13.97 7H14.034C14.1576 7.00013 14.276 7.04927 14.3634 7.13663C14.4507 7.224 14.4999 7.34245 14.5 7.466V8.534Z" fill="#767676"/>
<path d="M8 4.5C7.30777 4.5 6.63108 4.70527 6.05551 5.08986C5.47993 5.47444 5.03133 6.02107 4.76642 6.66061C4.50152 7.30015 4.4322 8.00388 4.56725 8.68282C4.7023 9.36175 5.03564 9.98539 5.52513 10.4749C6.01461 10.9644 6.63825 11.2977 7.31719 11.4327C7.99612 11.5678 8.69985 11.4985 9.33939 11.2336C9.97893 10.9687 10.5256 10.5201 10.9101 9.9445C11.2947 9.36892 11.5 8.69223 11.5 8C11.4989 7.07207 11.1299 6.18244 10.4737 5.5263C9.81756 4.87015 8.92793 4.50106 8 4.5ZM8 10.5C7.50555 10.5 7.0222 10.3534 6.61108 10.0787C6.19995 9.80397 5.87952 9.41352 5.6903 8.95671C5.50108 8.49989 5.45157 7.99723 5.54804 7.51227C5.6445 7.02732 5.8826 6.58186 6.23223 6.23223C6.58187 5.8826 7.02732 5.6445 7.51228 5.54804C7.99723 5.45157 8.4999 5.50108 8.95671 5.6903C9.41353 5.87952 9.80397 6.19995 10.0787 6.61107C10.3534 7.0222 10.5 7.50555 10.5 8C10.4992 8.6628 10.2356 9.29822 9.76689 9.76689C9.29822 10.2356 8.6628 10.4992 8 10.5Z" fill="#767676"/>
</g>
<defs>
<clipPath id="clip0_354_550">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

`}
            />
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Setting
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: '5%',
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 16,
                color: colors.textColor.primaryColor,
              }}>
              Friends
            </Text>
            <TouchableOpacity
              onPress={() => navigation?.navigate('MyAllFriends')}
              style={{
                // borderBottomColor: colors.textColor.rare,
                // borderBottomWidth: 1,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.rare,
                  textDecorationLine: 'underline',
                }}>
                All friends
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginBottom: 10,
              fontFamily: font.Poppins,
              fontSize: 12,
              color: colors.textColor.neutralColor,
              paddingHorizontal: '5%',
            }}>
            14 friends
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 16,
              paddingRight: 20,
              paddingHorizontal: '5%',
            }}
            data={friends}
            renderItem={item => (
              <View style={{gap: 6}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('FriendsProfile');
                  }}
                  style={{
                    backgroundColor: colors.secondaryColor,
                    // paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 2,
                    borderRadius: 50,
                    padding: 2,
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
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: font.Poppins,
                    color: colors.textColor.neutralColor,
                    textAlign: 'center',
                  }}>
                  {item.item.name}{' '}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              paddingHorizontal: '5%',
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 16,
                color: colors.textColor.primaryColor,
              }}>
              Face Down
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('ViewAllFaceDown');
              }}
              style={{
                // borderBottomColor: colors.textColor.rare,
                // borderBottomWidth: 1,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.rare,
                  textDecorationLine: 'underline',
                }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
              paddingRight: 20,
              paddingHorizontal: '5%',
            }}
            data={FaceDown}
            ListFooterComponent={() => {
              return (
                <View style={{gap: 6}}>
                  <TouchableOpacity
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 20,
                      backgroundColor: colors.secondaryColor,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <SvgXml
                      xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.1667 9.91667H12.0833V1.83333C12.0833 1.54602 11.9692 1.27047 11.766 1.0673C11.5629 0.864137 11.2873 0.75 11 0.75C10.7127 0.75 10.4371 0.864136 10.234 1.0673C10.0308 1.27046 9.91667 1.54601 9.91667 1.83333V9.91667H1.83333C1.54601 9.91667 1.27046 10.0308 1.0673 10.234C0.864136 10.4371 0.75 10.7127 0.75 11C0.75 11.2873 0.864137 11.5629 1.0673 11.766C1.27047 11.9692 1.54602 12.0833 1.83333 12.0833H9.91667V20.1667C9.91667 20.454 10.0308 20.7295 10.234 20.9327C10.4371 21.1359 10.7127 21.25 11 21.25C11.2873 21.25 11.5629 21.1359 11.766 20.9327C11.9692 20.7295 12.0833 20.454 12.0833 20.1667V12.0833H20.1667C20.454 12.0833 20.7295 11.9692 20.9327 11.766C21.1359 11.5629 21.25 11.2873 21.25 11C21.25 10.7127 21.1359 10.4371 20.9327 10.234C20.7295 10.0308 20.454 9.91667 20.1667 9.91667Z" fill="#767676" stroke="#767676" stroke-width="0.5"/>
</svg>
`}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: font.Poppins,
                      color: colors.textColor.neutralColor,
                      textAlign: 'center',
                    }}>
                    New Face
                  </Text>
                </View>
              );
            }}
            renderItem={item => (
              <View style={{gap: 6}}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{
                    backgroundColor: colors.secondaryColor,
                    // paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 2,
                    borderRadius: 20,
                    padding: 2,
                    position: 'relative',
                  }}>
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 20,
                      resizeMode: 'stretch',
                    }}
                    source={{
                      uri: item.item.img,
                    }}
                  />
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
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: 20,
            gap: 20,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsMedium,
              fontSize: 17,
              color: colors.textColor.primaryColor,
            }}>
            Chat
          </Text>
          {/* <TouchableOpacity
          style={{
            marginTop: 40,
            padding: 16,
            backgroundColor: colors.normal,
            borderRadius: 50,
            borderWidth: 0.3,
            borderColor: colors.textColor.neutralColor,
            alignSelf: 'center',
            width: '85%',
            elevation: 1,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: font.PoppinsSemiBold,
              fontSize: 14,
              color: colors.textColor.neutralColor,
            }}>
            No chat record here
          </Text>
        </TouchableOpacity> */}

          <ConversationalCard
            conversationStyle="normal"
            cardStyle="single"
            conversationTitle="You"
            conversationSubtitle="Start a chat"
            lastMessageTime="9:30 am"
            lastMessage="All of my friends pleas 
            Share your story my friends"
          />
          <ConversationalCard
            conversationStyle="normal"
            cardStyle="two"
            conversationTitle="Khushi Aktar"
            isReply
            conversationSubtitle="replied in chat"
            lastMessageTime="9:30 am"
            lastMessage="Hello asad vai, i`m 
coming from Banasri"
          />
          <ConversationalCard
            conversationStyle="normal"
            cardStyle="book"
            conversationTitle="SIC Discussion"
            conversationSubtitle="recommendations"
            lastMessageTime="9:30 am"
            lastMessage="Hello Asadullah some books
is recognize for SIC "
          />
          <ConversationalCard
            conversationStyle="normal"
            cardStyle="three"
            conversationTitle="COFFE HOUSE"
            conversationSubtitle="join room"
            lastMessageTime="8:10 am"
            lastMessage="nadin invite you in room"
          />
          <ConversationalCard
            conversationStyle="normal"
            cardStyle="three"
            conversationTitle="COFFE HOUSE"
            conversationSubtitle="join room"
            lastMessageTime="8:10 am"
            lastMessage="nadin invite you in room"
          />
          <ConversationalCard
            conversationStyle="normal"
            cardStyle="three"
            conversationTitle="COFFE HOUSE"
            conversationSubtitle="join room"
            lastMessageTime="8:10 am"
            lastMessage="nadin invite you in room"
          />
          <ConversationalCard
            conversationStyle="normal"
            cardStyle="three"
            conversationTitle="COFFE HOUSE"
            conversationSubtitle="join room"
            lastMessageTime="8:10 am"
            lastMessage="nadin invite you in room"
          />
        </View>
      </ScrollView>

      <ModalOfBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onlyTopRadius={20}
        backButton
        containerColor={colors.bg}
        height={'30%'}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.neutralColor,
            }}>
            Share
          </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              Linking.openURL(`https://www.sic.com/@Asadullah
              utm_medium=ch_profile&utm_campaign=DCDJyA3rtp`);
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: colors.blue,
                marginTop: '10%',
              }}>
              https://www.sic.com/@Asadullah
              utm_medium=ch_profile&utm_campaign=DCDJyA3rtp
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  `https://www.sic.com/@Asadullahutm_medium=ch_profile&utm_campaign=DCDJyA3rtp`,
                );
                ToastAndroid.showWithGravity(
                  `link copy to https://www.sic.com/@Asadullahutm_medium=ch_profile&utm_campaign=DCDJyA3rtp`,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }}
              style={{
                flexDirection: 'row',
                gap: 8,
                width: 84,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
                elevation: 2,
                backgroundColor: colors.white,
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons name="content-copy" size={15} />
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalOfBottom>

      <View
        style={{
          height: '7.2%',
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
