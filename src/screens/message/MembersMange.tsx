import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import GroupUserCard from '../../components/conversation/GroupUserCard';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useRemoveMemberMutation} from '../../redux/apiSlices/chatSlices';
import {useGetFriendQuery} from '../../redux/apiSlices/friendsSlices';
import {useGetParticipantsQuery} from '../../redux/apiSlices/messageSlies';
import {IParticipant} from '../../redux/interface/participants';
import {makeImage} from '../../utils/utils';

const MembersManage = ({navigation, route}: NavigProps<any>) => {
  const {colors, font} = useStyles();
  const {data: friends} = useGetFriendQuery({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedUser, setSelectUser] = React.useState<Array<IParticipant>>(
    route?.params || [],
  );
  // console.log(selectedUser);

  // console.log(route?.params?.data);

  const {
    data: participants,
    refetch: reFetchParticipant,
    isLoading: isParticipantLoading,
  } = useGetParticipantsQuery(route?.params?.data?.id);

  const [removeMembers] = useRemoveMemberMutation({});

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Manage members"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        button
        buttonComponent={
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation?.navigate('AddParticipants', {
                  data: route?.params?.data,
                })
              }
              style={{
                alignItems: 'flex-end',
                backgroundColor: colors.neutralColor,
                // width: 55,
                paddingHorizontal: 10,
                padding: 1,
                borderRadius: 100,
              }}
              activeOpacity={0.9}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  paddingVertical: 5,
                  color: colors.textColor.white,
                }}>
                Add Members
              </Text>
            </TouchableOpacity>
          </View>
        }
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
            placeholder="Search your friends"
            placeholderTextColor={colors.textColor.palaceHolderColor}
          />
        </View>
      </View>
      {/* want to join the group */}

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isParticipantLoading}
            onRefresh={() => {
              reFetchParticipant();
            }}
            colors={[colors.primaryColor]}
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingTop: 10,
        }}
        data={participants?.data}
        renderItem={item => (
          <>
            <GroupUserCard
              img={makeImage(item.item.avatar)}
              // lastMessage={item.item?.lastMessage}
              // lastTime="9:51 am"
              name={item.item.fullName}
              component={
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      removeMembers({
                        id: route?.params?.data?.id,
                        participantId: item.item._id,
                      }).then(res => {
                        reFetchParticipant();
                      });
                    }}
                    style={{
                      backgroundColor: colors?.redis,
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        color: colors?.white,
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </>
        )}
      />

      <ModalOfBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <View style={{gap: 3}}>
          <TouchableOpacity
            onPress={() => {
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
              In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              //   navigation?.navigate('FriendsProfile');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: 'red',
              }}>
              Out
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

export default MembersManage;

const styles = StyleSheet.create({});
