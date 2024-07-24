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
import GroupUserCard from '../../components/conversation/GroupUserCard';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';

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

const MakeGroupScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedUser, setSelectUser] = React.useState<
    Array<{name: string; img: string; lastMessage: string; id: number}>
  >([]);

  console.log(selectedUser);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Make Group"
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
      {/* <View
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
      </View> */}
      <View
        style={{
          paddingHorizontal: '4%',
          marginTop: 10,
          borderBottomWidth: 1,
          paddingBottom: 15,
          borderBottomColor: 'rgba(217, 217, 217, 1)',
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
            placeholder="Search your friends"
            placeholderTextColor={colors.textColor.neutralColor}
          />
        </View>
      </View>
      {selectedUser?.length !== 0 && (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(217, 217, 217, 1)',

            paddingVertical: 10,
          }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            horizontal
            contentContainerStyle={{
              gap: 16,
              paddingHorizontal: 20,
            }}
            data={selectedUser}
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
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 100,
        }}
        data={friends}
        renderItem={item => (
          <>
            <GroupUserCard
              isSelect={selectedUser?.find(
                friend => friend.id === item.item.id,
              )}
              selectOnPress={() => {
                if (selectedUser.find(friend => friend.id === item.item.id)) {
                  setSelectUser(
                    selectedUser.filter(friend => friend.id !== item.item.id),
                  );
                } else {
                  setSelectUser([...selectedUser, item.item]);
                }
              }}
              img={item.item.img}
              lastMessage={item.item?.lastMessage}
              lastTime="9:51 am"
              name={item.item.name}
            />
          </>
        )}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation?.navigate('MakeGroup');
        }}
        style={{
          position: 'absolute',
          bottom: '12%',
          right: '5%',
          // elevation: 3,
          backgroundColor: 'rgba(0,0,0,.04)',
          borderRadius: 100,
        }}>
        <SvgXml
          xml={`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="47.5563" rx="23.7782" transform="matrix(-1 0 0 1 48 0)" fill="#D29E3B"/>
<path d="M28.1716 22.7782H16V24.7782H28.1716L22.8076 30.1421L24.2218 31.5563L32 23.7782L24.2218 16L22.8076 17.4142L28.1716 22.7782Z" fill="#F4F4F4"/>
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

export default MakeGroupScreen;

const styles = StyleSheet.create({});
