import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetFriendProfileQuery,
  useRemoveFriendRequestMutation,
  useSendFriendRequestMutation,
} from '../../redux/apiSlices/friendsSlices';

import {format} from 'date-fns';
import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ConversationalCard from '../../components/common/ConversationalCard';
import CustomModal from '../../components/common/customModal/CustomModal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useAddMemberMutation} from '../../redux/apiSlices/chatSlices';
import {makeImage} from '../../utils/utils';

const FriendsProfile = ({navigation, route}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  const {
    data: userProfile,
    refetch: refetchUserProfile,
    isLoading: isLoadingUserProfile,
  } = useGetUserProfileQuery({});

  // console.log(route?.params);

  const [isFriend, setIsFriend] = React.useState(false);
  const [isFriendRequest, setIsFriendRequest] = React.useState(false);
  const [isFriendRequestSent, setIsFriendRequestSent] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);

  const {
    data: friendProfile,
    refetch: refetchFriendProfile,
    isLoading: isLoadingFriendProfile,
  } = useGetFriendProfileQuery({
    id: route?.params?.data?.id || route?.params?.id,
  });

  // console.log(friendProfile);

  React.useEffect(() => {
    if (friendProfile?.data?.isFriend) {
      const status = friendProfile.data.isFriend.status;
      if (status === 'accepted') {
        setIsFriend(true);
        setIsFriendRequest(false);
        setIsFriendRequestSent(false);
      } else if (
        friendProfile?.data?.isFriend?.senderId === userProfile?.data?._id
      ) {
        setIsFriend(false);
        setIsFriendRequest(false);
        setIsFriendRequestSent(true);
      } else if (status === 'pending') {
        setIsFriend(false);
        setIsFriendRequest(true);
        setIsFriendRequestSent(false);
      } else {
        setIsFriend(false);
        setIsFriendRequest(false);
        setIsFriendRequestSent(true);
      }
    } else {
      setIsFriend(false);
      setIsFriendRequest(false);
      setIsFriendRequestSent(false);
    }
  }, [friendProfile]);

  const [acceptRequest] = useAcceptFriendRequestMutation();
  const [cancelRequest] = useCancelFriendRequestMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [removeFriendRequest] = useRemoveFriendRequestMutation();

  const handleFriendButtonPress = () => {
    if (isFriendRequest) {
      setIsFriend(true);
      setIsFriendRequest(false);
      acceptRequest({
        senderId: friendProfile?.data?._id,
      }).then(res => {
        console.log(res);
      });
    } else if (isFriend) {
      setModalVisible(!modalVisible);
    } else {
      sendFriendRequest({
        recipientId: friendProfile?.data?._id,
      }).then(res => {
        console.log(res);
      });
      setIsFriendRequestSent(!isFriendRequestSent);
    }
  };
  const [createMember, memberResult] = useAddMemberMutation();

  // React.useEffect(() => {
  //   if (route?.params?.id === userProfile?.data?._id) {
  //     navigation?.navigate('UserProfile');
  //   }
  // }, []);

  return (
    <View style={{height: '100%', backgroundColor: colors.bg}}>
      <BackButtonWithTitle
        onOptions={isFriend}
        offTitle
        navigation={navigation}
        onOptionPress={() => setModalVisible(!modalVisible)}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoadingFriendProfile}
            onRefresh={refetchFriendProfile}
            colors={[colors.primaryColor]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
        {/* User Profile */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: '5%',
            alignItems: 'center',
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
              style={{width: 100, height: 100, borderRadius: 46}}
              source={{
                uri: makeImage(friendProfile?.data?.avatar),
              }}
            />
          </View>
          <View style={{gap: 4}}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 17,
                color: colors.textColor.primaryColor,
              }}>
              {friendProfile?.data?.fullName || 'Name'}
            </Text>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 13,
                color: colors.textColor.neutralColor,
              }}>
              {friendProfile?.data?.email || 'email@example.com'}
            </Text>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 13,
                color: colors.primaryColor,
              }}>
              {friendProfile?.data?.totalFriend || 0} friend
              {friendProfile?.data?.totalFriend === 1 ? '' : 's'}
            </Text>
          </View>
        </View>

        {/* Friend Button */}

        {route?.params?.id !== userProfile?.data?._id && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginHorizontal: '4%',
              gap: 24,
            }}>
            <TouchableOpacity
              onPress={handleFriendButtonPress}
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
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: isFriend
                    ? colors.textColor.light
                    : colors.textColor.white,
                }}>
                {isFriend
                  ? 'Friends'
                  : isFriendRequest
                  ? 'Accept Request'
                  : isFriendRequestSent
                  ? 'Cancel Request'
                  : 'Add Friend'}
              </Text>
            </TouchableOpacity>

            {isFriend && (
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
                <Text
                  style={{
                    fontFamily: font.Poppins,
                    fontSize: 14,
                    color: colors.textColor.white,
                  }}>
                  Message
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Bio and Social Link */}
        {friendProfile?.data?.instagramUrl && (
          <View style={{paddingHorizontal: '5%'}}>
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
                style={{width: 16, height: 16}}
                source={require('../../assets/icons/instagram/instagram.png')}
              />
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.rare,
                }}>
                {friendProfile?.data?.instagramUrl}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              {friendProfile?.data?.bio}
            </Text>
          </View>
        )}

        {/* Posts */}

        {friendProfile?.data?.chats?.map((item, index) => (
          <ConversationalCard
            key={item._id}
            conversationStyle="normal"
            onPress={() => {
              if (item?.facedown?._id) {
                if (item?.participants) {
                  const alreadyExits = item.participants.includes(
                    userProfile?.data?._id,
                  );
                  if (!alreadyExits) {
                    createMember({
                      id: item?._id,
                      participants: userProfile?.data?._id,
                    });
                  }
                }
                navigation?.navigate('FaceDownConversation', {
                  data: {id: item?._id, facedown: item?.facedown},
                });
              } else {
                navigation?.navigate('NormalConversation', {
                  data: {id: item._id},
                });
              }
            }}
            participants={item.participants?.filter(
              item => item?._id == route?.params?.data?.id,
            )}
            cardStyle={
              item?.lastMessage?.book
                ? 'shear_book'
                : item?.lastMessage?.image
                ? 'image'
                : 'normal'
            }
            manyPeople={item.participants.length > 4}
            conversationTitle={
              item?.lastMessage?.sender?._id === userProfile?.data?._id
                ? item?.facedown
                  ? item.facedown.name +
                    `${
                      item?.lastMessage?.sender?._id === userProfile?.data?._id
                        ? ' You'
                        : item?.lastMessage?.sender?.fullName
                    }`
                  : 'You'
                : item?.lastMessage?.sender?.fullName
            }
            conversationSubtitle={
              item?.lastMessage?.sender?._id === userProfile?.data?._id
                ? 'send a message'
                : ' replied in chat'
            }
            item={item}
            lastMessageTime={format(new Date(item.updatedAt), 'hh :mm a')}
            lastMessage={
              item.lastMessage.audio
                ? 'send an audio message'
                : item.lastMessage.image
                ? 'send an image message'
                : item.lastMessage.text
                ? item.lastMessage.text
                : item.lastMessage.book
                ? 'Shear a book'
                : 'Start a chat'
            }
          />
        ))}
      </ScrollView>

      {/* Friend Action Modal */}
      <ModalOfBottom
        onlyTopRadius={15}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <TouchableOpacity
          style={{
            gap: 5,
          }}
          onPress={() => {
            setModalVisible(false);
            setConfirmationModal(true);
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 15,
              color: colors.textColor.neutralColor,

              paddingVertical: 6,
            }}>
            Unfriend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 15,
              color: colors.textColor.neutralColor,
              paddingVertical: 6,
            }}>
            Report
          </Text>
        </TouchableOpacity>
      </ModalOfBottom>

      {/* Confirmation Modal */}
      <CustomModal
        modalVisible={confirmationModal}
        setModalVisible={setConfirmationModal}
        height={'14%'}
        containerColor={colors.bg}
        Radius={20}>
        <View
          style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
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
              onPress={() => setConfirmationModal(false)}
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
                removeFriendRequest({
                  senderId: friendProfile?.data?._id,
                }).then(res => {
                  console.log(res);
                });
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
