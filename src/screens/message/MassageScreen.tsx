import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {height, makeImage} from '../../utils/utils';
import {useContextApi, useStyles} from '../../context/ContextApi';

import MessageCard from '../../components/conversation/MessageCard';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {format} from 'date-fns';
import {getSocket} from '../../redux/services/socket';
import {useGetChatListQuery} from '../../redux/apiSlices/chatSlices';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';

const MassageScreen = ({navigation}: NavigProps<null>) => {
  const {
    data: chatList,
    refetch: refetchChat,
    isLoading: chatLoading,
  } = useGetChatListQuery({});
  const {data: userInfo} = useGetUserProfileQuery({});
  // console.log(userInfo);
  // console.log(cat);
  const {colors, font} = useStyles();
  const {isDark} = useContextApi();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [friends, setFriends] = React.useState([]);

  // console.log(friends);

  const socket = getSocket();

  const handleActiveUsers = (data: any) => {
    setFriends(data);
  };
  React.useEffect(() => {
    // console.log(userInfo?.data?._id);
    if (socket) {
      if (userInfo?.data?._id) {
        socket?.emit(
          'activeUsers',
          JSON.stringify({userId: userInfo?.data?._id}),
        );
      }
      socket?.on('activeFriends', handleActiveUsers);
    }
    return () => {
      // Remove the listener on cleanup to prevent memory leaks
      socket?.off('activeUsers', handleActiveUsers);
    };
  }, [socket, userInfo?.data?._id]);

  // console.log(friends);

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
          {/* <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Search');
            }}>
            <SvgXml
              xml={`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity> */}
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
          paddingVertical: 10,
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
            style={{flex: 1, color: colors.textColor.neutralColor}}
            placeholder="Search your books"
            placeholderTextColor={colors.textColor.neutralColor}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={chatLoading}
            colors={[colors.primaryColor, colors.primaryColor]}
            onRefresh={() => {
              refetchChat();
            }}
          />
        }
        keyboardShouldPersistTaps="always">
        <View
          style={{
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            borderTopColor: isDark
              ? 'rgba(217, 217, 217, 0.1)'
              : 'rgba(217, 217, 217, 1)',
            borderBlockColor: isDark
              ? 'rgba(217, 217, 217, 0.1)'
              : 'rgba(217, 217, 217, 1)',
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
                  activeOpacity={0.8}
                  onPress={() => {
                    // setModalVisible(!modalVisible);
                    navigation?.navigate('FriendsProfile', {
                      data: {id: item.item?._id},
                    });
                  }}
                  style={{
                    backgroundColor: colors.white,
                    // paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 2,
                    borderRadius: 50,
                    padding: 2,
                    position: 'relative',
                    width: 65,
                    height: 65,
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
                      elevation: 2,
                    }}
                  />
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 28,
                      resizeMode: 'contain',
                      borderColor: 'rgba(255,255,255,1)',
                      borderWidth: 2,
                    }}
                    source={{
                      uri: makeImage(item.item.avatar),
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
                  {item?.item?.fullName}
                </Text>
              </View>
            )}
          />
        </View>

        <View
          style={{
            gap: 10,
            paddingHorizontal: 8,
            paddingBottom: 25,
            paddingTop: 15,
          }}>
          {chatList?.data?.map((item, index) => {
            // console.log(item);
            return (
              <MessageCard
                key={index}
                active={
                  friends?.find(
                    friend =>
                      friend?._id === item?.participants[0]?._id ||
                      friend?._id === item?.participants[1]?._id,
                  )?._id
                    ? true
                    : false
                }
                onPress={() => {
                  if (item.group) {
                    navigation?.navigate('GroupConversation');
                  } else {
                    navigation?.navigate('NormalConversation', {
                      data: {id: item?._id},
                    });
                  }
                }}
                avatar={
                  item?.participants[0]?._id === userInfo?.data?._id
                    ? item?.participants![1]?.avatar
                    : item?.participants![0]?.avatar
                }
                lastMessage={
                  item.lastMessage.audio
                    ? 'send a audio message'
                    : item.lastMessage.image
                    ? 'send an image message'
                    : item.lastMessage.text
                    ? item.lastMessage.text
                    : item.lastMessage.path
                    ? 'send a book'
                    : 'Start a chat'
                }
                lastTime={format(new Date(item.updatedAt), 'hh :mm a')}
                name={
                  item?.participants[0]?._id === userInfo?.data?._id
                    ? item?.participants![1]?.fullName || 'No Name'
                    : item?.participants![0]?.fullName || 'No Name'
                }
                people={'one'}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* floating button  */}

      <TouchableOpacity
        onPress={() => {
          navigation?.navigate('MakeGroup', {
            data: {option: 'group', screenTitle: 'Make Group'},
          });
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          // elevation: 3,
          // backgroundColor: 'rgba(0,0,0,.04)',
          borderRadius: 100,
        }}>
        <Image
          style={{
            height: height * 0.07,
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
          source={require('../../assets/icons/message/makeGroup.png')}
        />
      </TouchableOpacity>
      <ModalOfBottom
        // height={'18%'}

        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <View style={{gap: 3}}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('FriendsProfile');
              setModalVisible(false);
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
