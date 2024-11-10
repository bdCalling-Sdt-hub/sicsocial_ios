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
import {SvgXml} from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import GroupUserCard from '../../components/conversation/GroupUserCard';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetFriendQuery} from '../../redux/apiSlices/friendsSlices';
import {IParticipant} from '../../redux/interface/participants';
import {makeImage} from '../../utils/utils';

const FaceDownAddMember = ({navigation, route}: NavigProps<any>) => {
  const {colors, font} = useStyles();
  const {data: friends} = useGetFriendQuery({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedUser, setSelectUser] = React.useState<Array<IParticipant>>(
    route?.params || [],
  );
  // console.log(selectedUser);
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
                navigation?.navigate('CreateFaceDown', selectedUser)
              }
              style={{
                alignItems: 'flex-end',
                backgroundColor: colors.green['#00B047'],
                // width: 55,
                paddingHorizontal: 10,
                padding: 1,
                borderRadius: 100,
              }}
              activeOpacity={0.9}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 14,
                  color: colors.textColor.white,
                }}>
                Confirm
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
      {/* want to join the group */}
      {/* {selectedUser?.length !== 0 && (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(217, 217, 217, 1)',

            paddingVertical: 10,
          }}>
          <Text
            style={{
              paddingHorizontal: '4%',
              fontFamily: font.Poppins,
              fontSize: 14,
              marginBottom: 5,
              color: colors.textColor.neutralColor,
            }}>
            Who want to join
          </Text>
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
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 28,
                      resizeMode: 'contain',
                    }}
                    source={item.item.img}
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
      )} */}
      {selectedUser?.length !== 0 && (
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(217, 217, 217, 1)',

            paddingVertical: 10,
          }}>
          <Text
            style={{
              paddingHorizontal: '4%',
              fontFamily: font.Poppins,
              fontSize: 14,
              color: colors.textColor.neutralColor,
              marginBottom: 5,
            }}>
            Face Dwn members
          </Text>
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
                    if (
                      selectedUser.find(friend => friend.id === item.item.id)
                    ) {
                      setSelectUser(
                        selectedUser.filter(
                          friend => friend.id !== item.item.id,
                        ),
                      );
                    }
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
                    width: 65,
                    height: 65,
                  }}>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 50,
                      backgroundColor: colors.green['#00B047'],
                      position: 'absolute',
                      right: 0,
                      zIndex: +1,
                      bottom: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        width: 8,
                        height: 2,
                      }}
                    />
                  </View>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 28,
                      resizeMode: 'contain',
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
                  {item.item?.fullName}
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
        data={friends?.data}
        renderItem={item => (
          <>
            <GroupUserCard
              option={'group'}
              isSelect={selectedUser?.find(
                friend => friend._id === item.item._id,
              )}
              onPress={() => {
                if (selectedUser.find(friend => friend._id === item.item._id)) {
                  setSelectUser(
                    selectedUser.filter(friend => friend._id !== item.item._id),
                  );
                } else {
                  setSelectUser([...selectedUser, item.item]);
                }
              }}
              img={makeImage(item.item.avatar)}
              // lastMessage={item.item?.lastMessage}
              // lastTime="9:51 am"
              name={item.item.fullName}
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

export default FaceDownAddMember;

const styles = StyleSheet.create({});
