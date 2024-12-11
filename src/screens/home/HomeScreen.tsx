import React, {useEffect} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useContextApi, useStyles} from '../../context/ContextApi';
import {height, isTablet} from '../../utils/utils';

import {FlashList} from '@shopify/flash-list';
import {format} from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import ConversationalCard from '../../components/common/ConversationalCard';
import ConversationalModal from '../../components/common/ConversationalModal/ConversationalModal';
import {IConversationProps} from '../../interfaces/Interface';
import {NavigProps} from '../../interfaces/NaviProps';
import {imageUrl} from '../../redux/api/baseApi';
import {useGetDonationQuery} from '../../redux/apiSlices/additionalSlices';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useAddMemberMutation} from '../../redux/apiSlices/chatSlices';
import {useGetNewsFeetQuery} from '../../redux/apiSlices/homeSlices';
import {useJoinLiveMutation} from '../../redux/apiSlices/liveSlice';
import {getSocket} from '../../redux/services/socket';
import {setUser} from '../../redux/services/userSlice';
import {useShearLink} from '../../utils/conentShare';

const HomeScreen = ({navigation}: NavigProps<null>) => {
  const {isLive, setIsLive, isDark} = useContextApi();

  const {
    data: newsFeet,
    isLoading: newFeetLoading,
    refetch: newFeetReFetching,
  } = useGetNewsFeetQuery({});
  const {data: userProfile} = useGetUserProfileQuery({});
  const {data: donations, refetch: donationRefetch} = useGetDonationQuery({});
  const dispatch = useDispatch();
  // console.log(userProfile);
  const {colors, font} = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);

  const [addNewVoiceCard, setAddNewVoiceCard] = React.useState<
    Array<IConversationProps>
  >([]);
  // lines of modal animation

  const scrollViewGapHight = useSharedValue('0%');

  const bottomPaddingAStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: scrollViewGapHight.value,
    };
  });

  const socket = getSocket();

  useEffect(() => {
    if (userProfile?.data?._id) {
      dispatch(setUser(userProfile.data));
      socket?.emit('active', JSON.stringify({userId: userProfile.data._id}));

      socket?.emit(
        'activeUsers',
        JSON.stringify({userId: userProfile.data._id}),
      );
    }

    // Optional: Add a cleanup to handle when the component unmounts, if needed
    return () => {
      // For example, you could emit a "inactive" event here if needed
      // socket?.emit('inactive', JSON.stringify({ userId: userProfile.data._id }));
    };
  }, [socket, userProfile?.data?._id]);

  useEffect(() => {
    if (isLive) {
      scrollViewGapHight.value = withTiming(isTablet() ? '10%' : '25%', {
        duration: 1000,
      });
    }
    if (!isLive) {
      scrollViewGapHight.value = withTiming('0%', {
        duration: 1000,
      });
    }
    return () => {};
  }, [isLive]);

  const renderDonations = () => {
    if (!donations?.data) return null;
    return donations.data.map((item, index) => (
      <ConversationalCard
        disabled
        key={index}
        participants={[]}
        conversationStyle="donation"
        conversationTitle={item?.details?.title}
        conversationSubtitle={item?.details?.content}
        onDonationShearPress={() =>
          useShearLink({
            title: 'Share Donation Link',
            message: 'Share Donation Link',
            url: `https://sic.org/donation/`,
          })
        }
        onDonationViewDetailsPress={() =>
          navigation?.navigate('donation', {data: item})
        }
      />
    ));
  };

  const [createMember, memberResult] = useAddMemberMutation();
  const [joinLive] = useJoinLiveMutation();

  // is live  card have checker and create animation asaa
  const profileImage = userProfile?.data?.avatar.startsWith('https')
    ? userProfile?.data?.avatar
    : `${imageUrl}/${userProfile?.data?.avatar}`;
  return (
    <SafeAreaView
      style={{
        height: '100%',
        // backgroundColor: 'gray',
        backgroundColor: colors.bg,
      }}>
      {/*=============== border cover ================== */}
      <View
        style={{
          height: '7.2%',
        }}
      />
      {/*==================== profile card start ===================  */}

      <LinearGradient
        colors={colors.gradient.variantTwo}
        style={{
          height: 80,
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 99999,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation?.navigate('UserProfile')}
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 48,
              width: 48,
              borderRadius: 100,
              // backgroundColor: 'lightgray',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={{
              uri: profileImage,
            }}
          />
          <View
            style={{
              gap: -2,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: '#720B24',
              }}>
              Welcome to SIC
            </Text>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 16,
                color: colors.textColor.primaryColor,
              }}>
              {userProfile?.data?.fullName}
            </Text>
          </View>
        </TouchableOpacity>
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
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.neutralColor}"/>
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
<path d="M17 17.5H1L1.39999 16.9667L1.5 16.8334V16.6667V8C1.5 3.85786 4.85786 0.5 9 0.5C13.1422 0.5 16.5 3.85786 16.5 8V16.6667V16.8334L16.6 16.9667L17 17.5ZM17 17.5L17 17.5L17 17.5L17 17.5L17 17.5L17 17.5ZM2.5 16V16.5H3H15H15.5V16V8C15.5 4.41015 12.5898 1.5 9 1.5C5.41015 1.5 2.5 4.41015 2.5 8V16ZM10.937 19.5C10.715 20.3626 9.93191 21 9 21C8.06809 21 7.28504 20.3626 7.06301 19.5H10.937Z" fill="${colors.textColor.neutralColor}" stroke="${colors.textColor.neutralColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/*==================== profile card end ===================  */}

      {/*========================== conversation card start ======================= */}

      {/*====================== donations cards ========================= */}

      {/*===================== normal cards ======================= */}
      <FlashList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={height * 0.3}
        refreshControl={
          <RefreshControl
            refreshing={newFeetLoading}
            onRefresh={() => {
              donationRefetch();
              newFeetReFetching();
            }}
            colors={[colors.primaryColor]}
          />
        }
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        data={
          newsFeet?.data
            ? [...newsFeet?.data]?.sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
            : []
        }
        ListHeaderComponent={renderDonations}
        renderItem={({item}) => {
          // console.log(item);
          return (
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
                } else if (item?.live) {
                  joinLive({
                    chatId: item?._id,
                  }).then(res => {
                    // console.log(res);
                    navigation?.navigate('LiveConversation', {
                      data: {live: item.live?._id},
                    });
                  });
                } else {
                  navigation?.navigate('NormalConversation', {
                    data: {id: item?._id},
                  });
                }
              }}
              participants={item.participants}
              cardStyle={
                item?.lastMessage?.book
                  ? 'shear_book'
                  : item?.lastMessage?.image
                  ? 'image'
                  : 'normal'
              }
              manyPeople={item.participants.length > 4}
              conversationTitle={
                item.live
                  ? 'Room Chat' + item.live.name
                  : item?.lastMessage?.sender?._id === userProfile?.data?._id
                  ? item?.facedown
                    ? item?.facedown?.name +
                      `${
                        item.lastMessage?.sender?._id === userProfile?.data?._id
                          ? ' You'
                          : item.lastMessage?.sender?.fullName
                      }`
                    : 'You'
                  : item?.lastMessage?.sender?.fullName
              }
              conversationSubtitle={
                !item?.live
                  ? item?.lastMessage?.sender?._id === userProfile?.data?._id
                    ? 'send a message'
                    : ' replied in chat'
                  : ''
              }
              item={item}
              lastMessageTime={format(new Date(item.updatedAt), 'hh :mm a')}
              lastMessage={
                item?.lastMessage?.audio
                  ? 'send an audio message'
                  : item?.lastMessage?.image
                  ? 'send an image message'
                  : item?.lastMessage?.text
                  ? item?.lastMessage?.text
                  : item?.lastMessage?.book
                  ? 'Shear a book'
                  : 'Start a chat'
              }
            />
          );
        }}
        // estimatedItemSize={600}
      />

      <Animated.View style={bottomPaddingAStyle} />

      {/*==================== Body part Start ===================  */}

      <ConversationalModal navigation={navigation} />

      <View
        style={{
          height: '7.2%',
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
