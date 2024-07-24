import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import MessageCard from '../../components/conversation/MessageCard';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';

const friends = [
  {
    id: 1,
    name: 'Amina',
    img: 'https://s3-alpha-sig.figma.com/img/d067/c913/ad868d019f92ce267e6de23af3413e5b?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pMfG6YS9I8ruMTaTRqegPV9zZCyzJf~VintWAZomMQnoTSOB9r4vUqRwLPv6QY8UI0ayslqETesPz1z608PL7Lar8-2OFbc56ajfs0Cd0~Oj2IqJmrBLGw6KNarGTI7iBGxg70mDxP5kJQQZGT0sYE0Sd02zOzMoEpcyAxxAQUKlAGkTJocs3DSzvA-3CCCfxvT2qe3qytPeU6v8du6tQgae7mnGcqPOah-VRkMnVjpZ5NXf0fHqtpgHVzEbCRbuQBObOqRLrc-89S7ihmEEysndEuAwU~U9bfmvholer8U4ygOM-VmKm4tcibG6THnu35W3dfic90~qZ6PgubDTeA__',
    lastMessage: 'Assalamuallikum, how are...',
  },
  {
    id: 2,
    name: 'Arif',
    img: 'https://s3-alpha-sig.figma.com/img/9716/358a/4005b22a3c1c23d7c04f6c9fdbd85468?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=R0fZk1NMkvTlpscVfHGRkuxmA0WPSUHxnjjahouowZtMyO2zTQLVQWtQgO5CV-jIHc4FxwKNAvxQ4kF9MNIVKv3rbY5gasYFGGkWV9iC1RhsHhQsl4cgx4inlsmKWKR8ASralsW4NFtkdgJmeQqj8pzr9lwos2Myau-V8E7Lu~4AdYTnB8tzwMHTXExT5Gq7gNyLO8phSWGKz8ypqApNmXW07JIEEQRgXzwi6LziAmz2K8gwo~tPigEHOV2SBEPmohzZfN7dQMZ14N8381ffBEjZDdnU91StpIrb7ujFkdTZ7D89zp5bLJe0OvJvyytdTMaCgu9jH5KkAkLu6O1VSA__',
    lastMessage: 'Sir you are great.',
  },
  {
    id: 3,
    name: 'Rahman',
    img: 'https://s3-alpha-sig.figma.com/img/9986/6959/bdf7eaf41f82746f243dbd6e48280274?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HX3IUfbKT1pMyV2gAuqyw6BHCsIgjv3oU5mGebbHO-NUN5aQ8xzjQg1ik64StQGU83KiAb5dNDn2H67ucbdJL5owREIPgnnB7SUcdmIhwqATJapicXc~9YwihUpyPqX0Dal8olXXiOOyoEuOgTvn2ESQ8Niczdk7HUyRHvg-YPNFB~IMokYDNNbL3Q0Gf7YW5qwz9kvXuHRLRxDOGhM7uluPikOFEc4dwCMXSpRw9gtDRysLCgpw-d8uaNrrycr6wHaj4xmXsMbQK4Ab1o574QhxVNOWI96uSnCeqz7eucLtT4ae48RM~zfw2Fm6KVCZZOzNuItANqsckVKErFFPFQ__',
    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 4,
    name: 'Mithila',
    img: 'https://s3-alpha-sig.figma.com/img/f6e4/02df/f94d91c8643f6698b126e7dec5854350?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k7v0uQVh16IKwhhv6osti-H5bNgrXgvhzRnK8t6MEh~6evr2xHt424jE0k-6pG07rFxn2nHbasep7JnO4hmcHTETHSxACMhS4NqSFzUStvGLXGJac1dlhOk~SzAfsxlQyg00CW04UfLwlAIvhkxWq9GqNKxD5SdWsQcb~3QuyDJkmDbL~2khOGXOmyyF0LXGN0IQKWnk-lZGAaUi6B3T0RAagiLtLfbfsz5hxKbOaAoORpMikvNh2KEgAzE-WKT-wd-s9ViRstMmwDiLBfutf6c~1DdFtvrbl08ubQQMjOedgB9kvfM4KUaThqYsiR055O~hdNUTmbpceCtn3p335A__',
    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 5,
    name: 'Samina',
    img: 'https://s3-alpha-sig.figma.com/img/5188/bcdf/33f7c5aeefcef842ee93a1ac6a6adbf2?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PUNxQ~JFdcS4isYPyniSMfTbHWf3xQWusm-s4BPolkLzwvduedhU0H5DpNNQy0Bv5dUrflpN057ed2t9d6k-kvAuHUM4iMWMVfSN2JhZIGiA7NT086HyhzR5TtsqfAPZyFmMR1x2YDUEraBXyx54SQQNij2gYYv9BOEM1loaqtCpCQK4BVSqNm7UTMalsPdMOfZqNfIuopEeUIvPxN6yWmo-3Ft~P9NCgssr-DbDa6rXVPdn-Xi6v-VKX-J6QX8XDU85fynMicraPvh8btHGoyFTelIs9OrOOhWU8xLXldr30N0bFZUGFcmtFwHhAprRY5dSBPxLTXwPzi7Yr6tLTA__',
    lastMessage: 'you: I’m feeling good',
  },
];

const MassageScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          height: 80,
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 20,
                color: colors.textColor.primaryColor,
              }}>
              Messages Box
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 19,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Search');
            }}>
            <SvgXml
              xml={`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Notifications');
              // setDark(!isDark);
            }}>
            <SvgXml
              xml={`<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17.5H1L1.39999 16.9667L1.5 16.8334V16.6667V8C1.5 3.85786 4.85786 0.5 9 0.5C13.1422 0.5 16.5 3.85786 16.5 8V16.6667V16.8334L16.6 16.9667L17 17.5ZM17 17.5L17 17.5L17 17.5L17 17.5L17 17.5L17 17.5ZM2.5 16V16.5H3H15H15.5V16V8C15.5 4.41015 12.5898 1.5 9 1.5C5.41015 1.5 2.5 4.41015 2.5 8V16ZM10.937 19.5C10.715 20.3626 9.93191 21 9 21C8.06809 21 7.28504 20.3626 7.06301 19.5H10.937Z" fill="${colors.textColor.secondaryColor}" stroke="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: '4%',
          marginTop: 10,
        }}>
        <View
          style={{
            backgroundColor: colors.search,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            height: 48,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}>
          <SvgXml
            xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6267 11.5129L16 14.8861L14.8861 16L11.5129 12.6267C10.3 13.5971 8.76177 14.1776 7.08881 14.1776C3.17579 14.1776 0 11.0018 0 7.08881C0 3.17579 3.17579 0 7.08881 0C11.0018 0 14.1776 3.17579 14.1776 7.08881C14.1776 8.76177 13.5971 10.3 12.6267 11.5129ZM11.0465 10.9284C12.0096 9.93584 12.6023 8.58187 12.6023 7.08881C12.6023 4.04259 10.135 1.57529 7.08881 1.57529C4.04259 1.57529 1.57529 4.04259 1.57529 7.08881C1.57529 10.135 4.04259 12.6023 7.08881 12.6023C8.58187 12.6023 9.93584 12.0096 10.9284 11.0465L11.0465 10.9284Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
          />
          <TextInput
            style={{flex: 1}}
            placeholder="Search your books"
            placeholderTextColor={colors.textColor.neutralColor}
          />
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderTopColor: 'rgba(217, 217, 217, 1)',
          borderBlockColor: 'rgba(217, 217, 217, 1)',
          paddingVertical: 10,
          marginTop: 10,
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          horizontal
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 20,
          }}
          data={friends}
          renderItem={item => (
            <View style={{gap: 6}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
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
                <View
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
                />
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
                Amina
              </Text>
            </View>
          )}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: 8,
          paddingBottom: 25,
          paddingTop: 15,
        }}
        data={friends}
        renderItem={item => (
          <>
            <MessageCard
              onPress={() => {
                navigation?.navigate('NormalConversation');
              }}
              img={item.item.img}
              lastMessage={item.item?.lastMessage}
              lastTime="9:51 am"
              name={item.item.name}
              people="one"
            />
          </>
        )}
      />

      {/* floating button  */}

      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('MakeGroup');
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          // elevation: 3,
          backgroundColor: 'rgba(0,0,0,.04)',
          borderRadius: 100,
        }}>
        <SvgXml
          xml={`<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_363_1360)">
<path d="M47.5925 12.6984C45.1533 10.0573 42.1506 7.99947 38.8072 6.67749C35.4639 5.35552 31.8657 4.80338 28.2798 5.06207C22.1664 5.57799 16.4737 8.38478 12.3422 12.9201C8.21079 17.4554 5.94578 23.3843 6.00099 29.5188V51.371C6.00091 51.6872 6.09459 51.9963 6.2702 52.2593C6.44581 52.5222 6.69545 52.7272 6.98757 52.8483C7.18158 52.9292 7.38979 52.9705 7.59998 52.9699C8.02403 52.9698 8.43067 52.8013 8.73047 52.5014L12.5105 48.7232C12.9716 48.2726 13.5787 48.0018 14.222 47.9596C14.8654 47.9174 15.5026 48.1065 16.0187 48.4929C20.8488 51.9636 26.7963 53.5159 32.7066 52.8485C38.6169 52.181 44.0683 49.3416 48.0028 44.8812C51.9372 40.4208 54.0739 34.6578 53.9981 28.7108C53.9222 22.7637 51.6393 17.057 47.5925 12.6984Z" fill="#D29E3B"/>
</g>
<g clip-path="url(#clip0_363_1360)">
<path d="M45.5833 27.3333H41.6667V23.4167C41.6667 23.2399 41.5964 23.0703 41.4714 22.9453C41.3464 22.8202 41.1768 22.75 41 22.75C40.8232 22.75 40.6536 22.8202 40.5286 22.9453C40.4036 23.0703 40.3333 23.2399 40.3333 23.4167V27.3333H36.4167C36.2399 27.3333 36.0703 27.4036 35.9453 27.5286C35.8202 27.6536 35.75 27.8232 35.75 28C35.75 28.1768 35.8202 28.3464 35.9453 28.4714C36.0703 28.5964 36.2399 28.6667 36.4167 28.6667H40.3333V32.5833C40.3333 32.7601 40.4036 32.9297 40.5286 33.0547C40.6536 33.1798 40.8232 33.25 41 33.25C41.1768 33.25 41.3464 33.1798 41.4714 33.0547C41.5964 32.9297 41.6667 32.7601 41.6667 32.5833V28.6667H45.5833C45.7601 28.6667 45.9297 28.5964 46.0547 28.4714C46.1798 28.3464 46.25 28.1768 46.25 28C46.25 27.8232 46.1798 27.6536 46.0547 27.5286C45.9297 27.4036 45.7601 27.3333 45.5833 27.3333Z" fill="#F1F1F1" stroke="#F1F1F1" stroke-width="0.5"/>
</g>
<path d="M29.273 30C26.2655 30 23.8184 27.553 23.8184 24.5455C23.8184 21.538 26.2655 19.0909 29.273 19.0909C32.2804 19.0909 34.7275 21.538 34.7275 24.5455C34.7275 27.5529 32.2804 30 29.273 30ZM29.273 21.2727C27.4683 21.2727 26.0003 22.7408 26.0003 24.5455C26.0003 26.3501 27.4683 27.8182 29.273 27.8182C31.0777 27.8182 32.5457 26.3501 32.5457 24.5455C32.5457 22.7408 31.0777 21.2727 29.273 21.2727Z" fill="#F1F1F1"/>
<path d="M34.7273 40.9091H23.8182C22.0135 40.9091 20.5455 39.4411 20.5455 37.6364C20.5455 34.6289 22.9925 32.1818 26 32.1818H32.5454C35.5529 32.1818 38 34.6289 38 37.6364C38 39.4411 36.532 40.9091 34.7273 40.9091ZM32.5454 34.3637H26C24.1953 34.3637 22.7273 35.8317 22.7273 37.6364C22.7273 38.2383 23.2163 38.7273 23.8182 38.7273H34.7273C35.3292 38.7273 35.8182 38.2383 35.8182 37.6364C35.8182 35.8317 34.3501 34.3637 32.5454 34.3637Z" fill="#F1F1F1"/>
<path d="M22.7274 21.2727C20.9228 21.2727 19.4547 22.7408 19.4547 24.5455C19.4547 26.3501 20.9228 27.8182 22.7274 27.8182C23.3299 27.8182 23.8184 28.3066 23.8184 28.9091C23.8184 29.5115 23.3299 30 22.7274 30C19.72 30 17.2729 27.553 17.2729 24.5455C17.2729 21.538 19.72 19.0909 22.7274 19.0909C23.3299 19.0909 23.8184 19.5794 23.8184 20.1819C23.8184 20.7843 23.3299 21.2727 22.7274 21.2727Z" fill="#F1F1F1"/>
<path d="M19.455 32.1818C20.0574 32.1818 20.5459 32.6703 20.5459 33.2727C20.5459 33.8752 20.0575 34.3637 19.455 34.3637C17.6503 34.3637 16.1823 35.8317 16.1823 37.6364C16.1823 38.2383 16.6713 38.7273 17.2732 38.7273H18.3641C18.9665 38.7273 19.455 39.2157 19.455 39.8182C19.455 40.4207 18.9666 40.9092 18.3641 40.9092H17.2732C15.4685 40.9092 14.0005 39.4411 14.0005 37.6364C14.0004 34.6289 16.4475 32.1818 19.455 32.1818Z" fill="#F1F1F1"/>
<defs>
<filter id="filter0_d_363_1360" x="0.8" y="0.8" width="58.4" height="58.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="2.6"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_363_1360"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_363_1360" result="shape"/>
</filter>
<clipPath id="clip0_363_1360">
<rect width="12" height="12" fill="white" transform="translate(35 22)"/>
</clipPath>
</defs>
</svg>
`}
        />
      </TouchableOpacity>
      <ModalOfBottom
        height={'18%'}
        onlyTopRadius={15}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <View style={{gap: 3}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Sent vm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation?.navigate('FriendsProfile');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              View profile
            </Text>
          </TouchableOpacity>
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

export default MassageScreen;

const styles = StyleSheet.create({});
