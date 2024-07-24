import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
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
import CustomModal from '../../components/common/customModal/CustomModal';

const FriendsProfile = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  const [isFriend, setIsFriend] = React.useState(true);
  const [isFriendRequest, setIsFriendRequest] = React.useState(false);
  const [isFriendRequestSent, setIsFriendRequestSent] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        onOptions={isFriend}
        offTitle
        navigation={navigation}
        onOptionPress={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}>
        <View
          style={{
            paddingHorizontal: '5%',
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
                Mithila
              </Text>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 13,
                  color: colors.textColor.neutralColor,
                }}>
                amina111@gmail.com
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
                420
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
            onPress={() => {
              if (isFriendRequest) {
                setIsFriend(true);
                setIsFriendRequest(false);
              }
              if (isFriend) {
                setModalVisible(!modalVisible);
              } else {
                setIsFriendRequestSent(!isFriendRequestSent);
              }
            }}
            style={{
              backgroundColor: isFriend ? colors.redisLight : colors.redis,
              height: 35,
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 50,
              elevation: 2,
            }}>
            {isFriend && (
              <SvgXml
                xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75978 6.97436C8.4921 6.97436 9.20797 6.76984 9.81687 6.38666C10.4258 6.00349 10.9004 5.45887 11.1806 4.82167C11.4608 4.18447 11.5342 3.48331 11.3913 2.80687C11.2484 2.13042 10.8958 1.50906 10.378 1.02137C9.86014 0.533682 9.20038 0.20156 8.48213 0.0670067C7.76389 -0.0675468 7.0194 0.00151094 6.34282 0.265447C5.66625 0.529384 5.08797 0.976344 4.68112 1.54981C4.27426 2.12327 4.0571 2.79748 4.0571 3.48718C4.05826 4.41171 4.44873 5.29805 5.14286 5.95179C5.837 6.60553 6.77812 6.97327 7.75978 6.97436ZM7.75978 1.23077C8.23363 1.23077 8.69685 1.36311 9.09084 1.61104C9.48484 1.85898 9.79192 2.21139 9.97325 2.62369C10.1546 3.036 10.202 3.48968 10.1096 3.92738C10.0171 4.36509 9.78896 4.76714 9.4539 5.0827C9.11883 5.39827 8.69193 5.61317 8.22718 5.70023C7.76244 5.7873 7.28071 5.74261 6.84293 5.57183C6.40514 5.40105 6.03096 5.11184 5.7677 4.74078C5.50444 4.36971 5.36393 3.93346 5.36393 3.48718C5.36462 2.88894 5.61726 2.3154 6.06642 1.89238C6.51558 1.46936 7.12457 1.23142 7.75978 1.23077ZM2.30683 12.9395C2.30683 14.222 2.89316 14.7692 4.26707 14.7692H10.3656C10.5389 14.7692 10.7051 14.8341 10.8276 14.9495C10.9502 15.0649 11.019 15.2214 11.019 15.3846C11.019 15.5478 10.9502 15.7044 10.8276 15.8198C10.7051 15.9352 10.5389 16 10.3656 16H4.26707C2.16046 16 1 14.9128 1 12.9395C1 10.7553 2.31205 8.20513 6.0095 8.20513H9.49437C10.662 8.16083 11.8099 8.49859 12.7431 9.16103C12.8124 9.21082 12.8703 9.27314 12.9136 9.34433C12.9569 9.41552 12.9846 9.49415 12.9952 9.57558C13.0057 9.65701 12.9989 9.73961 12.9751 9.81852C12.9512 9.89742 12.9109 9.97104 12.8564 10.035C12.8019 10.0991 12.7344 10.1522 12.6578 10.1912C12.5812 10.2303 12.4971 10.2546 12.4104 10.2626C12.3237 10.2706 12.2362 10.2622 12.153 10.2379C12.0698 10.2136 11.9926 10.1738 11.9259 10.121C11.2228 9.63678 10.3643 9.39489 9.49437 9.4359H6.0095C5.51198 9.39979 5.01206 9.46578 4.54425 9.62932C4.07644 9.79286 3.65188 10.05 3.29986 10.3831C2.94785 10.7162 2.67676 11.1173 2.50532 11.5586C2.33388 12 2.26615 12.4711 2.30683 12.9395Z" fill="#767676"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5345 10.1258C15.712 10.2923 15.7105 10.5609 15.5313 10.7257L11.3806 14.5439C11.2941 14.6235 11.177 14.6676 11.0553 14.6667C10.9336 14.6656 10.8174 14.6195 10.7324 14.5386L9.12968 13.0113C8.95363 12.8436 8.95729 12.5749 9.13785 12.4114C9.31842 12.2478 9.60751 12.2512 9.78356 12.419L11.0651 13.6402L14.8888 10.1228C15.068 9.95792 15.3571 9.95926 15.5345 10.1258Z" fill="#767676"/>
</svg>
`}
              />
            )}

            {!isFriendRequestSent && !isFriend && (
              <Image
                resizeMode="contain"
                style={{
                  width: 16,
                  height: 16,
                }}
                source={require('../../assets/icons/user/add_user.png')}
              />
            )}
            {isFriendRequestSent && !isFriend && (
              <SvgXml
                xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75978 6.97436C8.4921 6.97436 9.20797 6.76984 9.81687 6.38666C10.4258 6.00349 10.9004 5.45887 11.1806 4.82167C11.4608 4.18447 11.5342 3.48331 11.3913 2.80687C11.2484 2.13042 10.8958 1.50906 10.378 1.02137C9.86014 0.533682 9.20038 0.20156 8.48213 0.0670067C7.76388 -0.0675468 7.0194 0.00151095 6.34282 0.265447C5.66625 0.529384 5.08797 0.976344 4.68112 1.54981C4.27426 2.12327 4.0571 2.79748 4.0571 3.48718C4.05826 4.41171 4.44873 5.29805 5.14286 5.95179C5.837 6.60553 6.77812 6.97327 7.75978 6.97436ZM7.75978 1.23077C8.23363 1.23077 8.69685 1.36311 9.09084 1.61104C9.48484 1.85898 9.79192 2.21139 9.97325 2.62369C10.1546 3.036 10.202 3.48968 10.1096 3.92738C10.0171 4.36509 9.78897 4.76714 9.4539 5.0827C9.11883 5.39827 8.69193 5.61317 8.22718 5.70023C7.76244 5.7873 7.28071 5.74261 6.84293 5.57183C6.40514 5.40105 6.03096 5.11184 5.7677 4.74078C5.50444 4.36971 5.36393 3.93346 5.36393 3.48718C5.36462 2.88894 5.61726 2.3154 6.06642 1.89238C6.51558 1.46936 7.12457 1.23142 7.75978 1.23077ZM2.30683 12.9395C2.30683 14.222 2.89316 14.7692 4.26707 14.7692H10.3656C10.5389 14.7692 10.7051 14.8341 10.8276 14.9495C10.9502 15.0649 11.019 15.2214 11.019 15.3846C11.019 15.5478 10.9502 15.7044 10.8276 15.8198C10.7051 15.9352 10.5389 16 10.3656 16H4.26707C2.16046 16 1 14.9128 1 12.9395C1 10.7553 2.31205 8.20513 6.0095 8.20513H9.49437C10.662 8.16083 11.8099 8.49859 12.7431 9.16103C12.8124 9.21082 12.8703 9.27314 12.9136 9.34433C12.9569 9.41552 12.9846 9.49415 12.9952 9.57558C13.0057 9.65701 12.9989 9.73961 12.9751 9.81852C12.9512 9.89742 12.9109 9.97104 12.8564 10.035C12.8019 10.0991 12.7344 10.1522 12.6578 10.1912C12.5812 10.2303 12.4971 10.2546 12.4104 10.2626C12.3237 10.2706 12.2362 10.2622 12.153 10.2379C12.0698 10.2136 11.9926 10.1738 11.9259 10.121C11.2228 9.63678 10.3643 9.39489 9.49437 9.4359H6.0095C5.51198 9.39979 5.01206 9.46578 4.54425 9.62932C4.07644 9.79286 3.65188 10.05 3.29986 10.3831C2.94785 10.7162 2.67676 11.1173 2.50532 11.5586C2.33388 12 2.26615 12.4711 2.30683 12.9395Z" fill="#FFFDFB"/>
<g clip-path="url(#clip0_517_4657)">
<path d="M11.6 13.7999C11.5477 13.7976 11.4979 13.7545 11.4613 13.6798C11.4248 13.605 11.4043 13.5046 11.4043 13.4C11.4043 13.2954 11.4248 13.195 11.4613 13.1202C11.4979 13.0455 11.5477 13.0023 11.6 13H15.1992C15.2515 13.0023 15.3012 13.0455 15.3378 13.1202C15.3744 13.195 15.3949 13.2954 15.3949 13.4C15.3949 13.5046 15.3744 13.605 15.3378 13.6798C15.3012 13.7545 15.2515 13.7976 15.1992 13.7999H11.6Z" fill="#FFFDFB"/>
</g>
<defs>
<clipPath id="clip0_517_4657">
<rect width="4.8" height="4.8" fill="white" transform="translate(11 11)"/>
</clipPath>
</defs>
</svg>

`}
              />
            )}
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: isFriend
                  ? colors.textColor.light
                  : colors.textColor.white,
              }}>
              {isFriend
                ? 'friends'
                : isFriendRequest
                ? 'accept request'
                : isFriendRequestSent
                ? 'Cancel Request'
                : 'Add friends'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primaryColor,
              height: 35,
              flexDirection: 'row',
              gap: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 50,
              elevation: 2,
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: 16,
                height: 16,
              }}
              source={require('../../assets/icons/message/message.png')}
            />
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.white,
              }}>
              message
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: '5%',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsMedium,
              fontSize: 17,
              color: colors.textColor.primaryColor,
            }}>
            Chat
          </Text>
          <View
            style={{
              gap: 15,
              marginTop: 10,
            }}>
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
              // havNotUser
              conversationTitle="Khushi Aktar"
              isReply
              conversationSubtitle="replied in chat"
              lastMessageTime="9:30 am"
              lastMessage="Hello asad vai, i`m 
coming from Banasri"
            />
            <ConversationalCard
              conversationStyle="normal"
              cardStyle="two"
              havNotUser
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
              cardStyle="four"
              conversationTitle="COFFE HOUSE"
              conversationSubtitle="join room"
              lastMessageTime="8:10 am"
              lastMessage="Hello Asadullah some books
is recognize for SIC "
            />
            <ConversationalCard
              conversationStyle="normal"
              cardStyle="three"
              manyPeople
              havNotUser
              conversationTitle="COFFE HOUSE"
              conversationSubtitle="join room"
              lastMessageTime="8:10 am"
              lastMessage="nadin invite you in room"
            />
            <ConversationalCard
              conversationStyle="normal"
              cardStyle="three"
              havNotUser
              conversationTitle="COFFE HOUSE"
              conversationSubtitle="join room"
              lastMessageTime="8:10 am"
              lastMessage="nadin invite you in room"
            />
          </View>
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
        </View>
      </ScrollView>
      <ModalOfBottom
        height={'18%'}
        onlyTopRadius={15}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <View>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              setConfirmationModal(!confirmationModal);
              setIsFriendRequest(false);
              setIsFriendRequestSent(false);
              setModalVisible(false);
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Unfriend
            </Text>
          </TouchableOpacity>
          {isFriend && (
            <TouchableOpacity
              style={{
                padding: 10,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.neutralColor,
                }}>
                Report
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ModalOfBottom>
      <CustomModal
        modalVisible={confirmationModal}
        setModalVisible={setConfirmationModal}
        height={'14%'}
        containerColor={colors.bg}
        Radius={20}>
        <View
          style={{
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 12,
              color: colors.textColor.neutralColor,
            }}>
            Are you sure you want to remove your friend!
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setConfirmationModal(false);
              }}
              style={{
                borderRadius: 100,
                borderColor: colors.green['#00B047'],
                borderWidth: 1,
                paddingHorizontal: 10,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  color: colors.green['#00B047'],
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsFriend(false);
                setModalVisible(false);
                setConfirmationModal(false);
              }}
              style={{
                borderRadius: 100,
                backgroundColor: 'rgba(241, 99, 101, 1)',

                paddingHorizontal: 10,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  color: colors.white,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default FriendsProfile;

const styles = StyleSheet.create({});
