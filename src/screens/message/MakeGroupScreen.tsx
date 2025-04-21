import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAddMemberMutation,
  useCreateChatMutation,
} from '../../redux/apiSlices/chatSlices';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import GroupUserCard from '../../components/conversation/GroupUserCard';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetFriendQuery} from '../../redux/apiSlices/friendsSlices';
import {IFriend} from '../../redux/interface/friends';
import {makeImage} from '../../utils/utils';

const MakeGroupScreen = ({navigation, route}: NavigProps<any>) => {
  const [createChat, createChartResults] = useCreateChatMutation({});
  const {
    data: friends,
    refetch: refetchFriend,
    isLoading,
  } = useGetFriendQuery({});
  const [addMember, results] = useAddMemberMutation();
  // console.log(friends);
  const {colors, font} = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedUser, setSelectUser] = React.useState<Array<IFriend>>([]);

  // console.log(route?.params?.data);

  const handleAddSingleParticipant = id => {
    // console.log({id : route?.params?.data?.id, participants : id});
    addMember({id: route?.params?.data?.id, participants: id}).then(res => {
      // console.log(res);
      navigation?.goBack();
    });
  };

  const handleAddMultipleParticipant = async selectUser => {
    // console.log({id : route?.params?.data?.id, participants : id});
    let all = selectUser.map(item => item?._id);

    if (!route?.params?.data?.id) {
      createChat('private').then(chatRes => {
        addMember({id: chatRes?.data?.data?._id, participants: all}).then(
          res => {
            // console.log(chatRes);
            navigation?.navigate('NormalConversation', {
              data: {id: chatRes?.data?.data?._id},
            });
          },
        );
      });
    }
    if (route?.params?.data?.id) {
      addMember({id: route?.params?.data?.id, participants: all}).then(res => {
        // console.log(res);
        navigation?.goBack();
      });
    }
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title={route?.params?.data?.screenTitle}
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

      <View
        style={{
          paddingHorizontal: '4%',
          marginTop: 10,
          // borderBottomWidth: 1,
          paddingBottom: 15,
          // borderBottomColor: 'rgba(217, 217, 217, 1)',
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
            placeholderTextColor={colors.textColor.palaceHolderColor}
          />
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor={colors.primaryColor}
            colors={[colors.primaryColor]}
            onRefresh={() => {
              refetchFriend();
            }}
          />
        }
        data={friends?.data}
        renderItem={item => (
          <>
            <GroupUserCard
              option={route?.params?.data?.option}
              isSelect={selectedUser?.find(
                friend => friend._id === item.item._id,
              )}
              onPress={() => {
                if (route?.params?.data?.option === 'group') {
                  if (
                    selectedUser.find(friend => friend._id === item.item._id)
                  ) {
                    setSelectUser(
                      selectedUser.filter(
                        friend => friend._id !== item.item._id,
                      ),
                    );
                  } else {
                    setSelectUser([...selectedUser, item.item]);
                  }
                }
                if (route?.params?.data?.option === 'friend') {
                  handleAddSingleParticipant(item.item._id);
                  // navigation?.replace("HomeRoutes")
                }
              }}
              img={makeImage(item.item.avatar)}
              // lastMessage={item.item?.lastMessage}
              // lastTime="9:51 am"
              name={item.item.fullName}
              component={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <>
                    {!!selectedUser?.find(i => i._id === item.item?._id) && (
                      <SvgXml
                        xml={`<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.4464 17.1472C8.10313 17.1472 7.75998 17.0163 7.49803 16.7544L0.992449 10.2488C0.468663 9.725 0.468663 8.87585 0.992449 8.35206C1.51613 7.82839 2.36549 7.82839 2.88917 8.35206L8.4464 13.9093L21.11 1.24575C21.6338 0.721959 22.483 0.721959 23.0068 1.24575C23.5306 1.76953 23.5306 2.61868 23.0068 3.14247L9.39476 16.7544C9.13292 17.0162 8.78955 17.1472 8.4464 17.1472Z" fill="#00B047"/>
</svg>

                      `}
                      />
                    )}
                  </>
                </View>
              }
            />
          </>
        )}
      />
      {selectedUser?.length !== 0 && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            handleAddMultipleParticipant(selectedUser);
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
      )}

      <ModalOfBottom
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
