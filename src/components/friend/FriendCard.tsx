import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useRemoveFriendRequestMutation,
  useSendFriendRequestMutation,
} from '../../redux/apiSlices/friendsSlices';
import {height, isSmall, isTablet, makeImage} from '../../utils/utils';

import React from 'react';
import {useStyles} from '../../context/ContextApi';

interface FriendCardProps {
  item?: any;
  onPress?: () => void;
  onLongPress?: () => void;
  isFriendRequest?: boolean;
  isFriend?: boolean;
  isFriendRequestSent?: boolean;

  onAcceptFriendRequestPress?: () => void;

  onDeclineFriendRequestPress?: () => void;
  onFriendRequestCancelPress?: () => void;
}

const FriendCard = ({
  item,
  onLongPress,
  onPress,

  isFriendRequest,
}: FriendCardProps) => {
  const {colors, font} = useStyles();
  const {width} = useWindowDimensions();

  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [cancelRequest] = useCancelFriendRequestMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [removeFriendRequest] = useRemoveFriendRequestMutation();

  const [acceptBtnPress, setAcceptBtnPress] = React.useState(false);

  const [rejectBtnPress, setRejectBtnPress] = React.useState(false);
  // console.log(item);

  return (
    <>
      {/*============== card start ============ */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // marginHorizontal: '5%',
          width: width,
        }}>
        <View
          style={{
            gap: 20,
            height: isTablet()
              ? height * 0.5
              : isSmall()
              ? height * 0.52
              : height * 0.43,
            width: isTablet()
              ? width * 0.5
              : isSmall()
              ? width * 0.7
              : width * 0.73,
            backgroundColor: colors.cardBg,
            borderRadius: 42,
            paddingHorizontal: isTablet() ? '3%' : '6%',
            paddingVertical: isTablet() ? '3%' : '8%',
            elevation: 2,
          }}>
          <View
            style={
              {
                // justifyContent: 'center',
                // alignItems: 'center',
              }
            }>
            <View
              style={{
                // paddingHorizontal: '5%',
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'center',
                gap: 16,
              }}>
              <View
                style={{
                  elevation: 5,
                  backgroundColor: colors.normal,
                  padding: 1,
                  // width: 106,
                  borderRadius: 46,
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 46,
                    alignSelf: 'center',
                  }}
                  source={{
                    uri: makeImage(item?.avatar),
                  }}
                />
              </View>
              <View
                style={{
                  gap: 4,
                  flex: 1,
                }}>
                <View
                  style={{
                    gap: -2,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: font.PoppinsSemiBold,
                      fontSize: 17,
                      color: colors.textColor.primaryColor,
                    }}>
                    {item?.fullName}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 13,
                      color: colors.textColor.neutralColor,
                    }}>
                    {item?.email}
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
                    {item?.totalFriends}
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
          </View>
          <View
            style={{
              gap: 10,
            }}>
            {/* <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                gap: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    borderRadius: 100,
                    borderColor: colors.blue,
                    borderWidth: 1,
                    // padding: 1,
                    // width: 27,
                    position: 'relative',
                    left: 10,
                  }}>
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 100,
                    }}
                    source={require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg')}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 100,
                    borderColor: colors.blue,
                    borderWidth: 1,
                    // padding: 1,
                    // width: 27,
                  }}>
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 100,
                    }}
                    source={require('../../assets/tempAssets/ae1e058c2ed75ab981a9f8bb62e96a13.jpg')}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.light,
                }}>
                {item.totalFriends} mutual friend
              </Text>
            </View> */}
            <Text
              numberOfLines={isSmall() ? 2 : 4}
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: colors.textColor.neutralColor,
                letterSpacing: 0.4,
                textAlign: 'justify',
              }}>
              {item?.bio}
            </Text>
          </View>

          {isFriendRequest ? (
            <View
              style={{
                elevation: 2,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                marginTop: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  cancelRequest({
                    recipientId: item._id,
                  }).then(res => {
                    // console.log(res);
                  });
                }}
                onPressIn={() => setRejectBtnPress(true)}
                onPressOut={() => setRejectBtnPress(false)}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.btn.normal,
                  borderRadius: 100,
                  padding: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5,
                  shadowColor: colors.redis,
                }}>
                <Image
                  style={{
                    height: 24,
                    aspectRatio: 1,
                    transform: [{scale: rejectBtnPress ? 1.3 : 1}],
                  }}
                  source={
                    rejectBtnPress
                      ? require('../../assets/icons/friends/rejectFriendsBold.png')
                      : require('../../assets/icons/friends/rejectFriendsLight.png')
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  acceptRequest({
                    senderId: item._id,
                  }).then(res => {
                    // console.log(res);
                  });
                }}
                onPressIn={() => setAcceptBtnPress(true)}
                onPressOut={() => setAcceptBtnPress(false)}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.btn.normal,
                  borderRadius: 100,
                  padding: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 3,
                  shadowColor: colors.primaryColor,
                }}>
                <Image
                  style={{
                    height: 24,
                    aspectRatio: 1,
                    transform: [{scale: acceptBtnPress ? 1.3 : 1}],
                  }}
                  source={
                    acceptBtnPress
                      ? require('../../assets/icons/friends/firendsAcceptBold.png')
                      : require('../../assets/icons/friends/friendsAcceptLight.png')
                  }
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                elevation: 2,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                marginTop: 20,
              }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  removeFriendRequest({
                    senderId: item._id,
                  }).then(res => {
                    // console.log(res);
                  });
                }}
                onPressIn={() => setRejectBtnPress(true)}
                onPressOut={() => setRejectBtnPress(false)}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.btn.normal,
                  borderRadius: 100,
                  padding: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 3,
                  shadowColor: colors.redis,
                }}>
                <Image
                  style={{
                    height: 24,
                    aspectRatio: 1,
                    transform: [{scale: rejectBtnPress ? 1.3 : 1}],
                  }}
                  source={
                    rejectBtnPress
                      ? require('../../assets/icons/friends/eyesBold.png')
                      : require('../../assets/icons/friends/eyesLigt.png')
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  // console.log(item);
                  sendFriendRequest({
                    recipientId: item?._id,
                  }).then(res => {
                    // console.log(res);
                    if (res.error?.data) {
                      alert(res.error?.data?.message);
                    }
                  });
                }}
                onPressIn={() => setAcceptBtnPress(true)}
                onPressOut={() => setAcceptBtnPress(false)}
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.btn.normal,
                  borderRadius: 100,
                  padding: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 3,
                  shadowColor: colors.primaryColor,
                }}>
                <Image
                  style={{
                    height: 24,
                    aspectRatio: 1,
                    transform: [{scale: acceptBtnPress ? 1.4 : 1}],
                  }}
                  source={
                    acceptBtnPress
                      ? require('../../assets/icons/friends/lightsOn.png')
                      : require('../../assets/icons/friends/lightsOff.png')
                  }
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {/*============== card end ============ */}
    </>
  );
};

export default React.memo(FriendCard);

const styles = StyleSheet.create({});
