import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useGetUserProfileQuery, useUserUpdateMutation } from '../../redux/apiSlices/authSlice';

import { SvgXml } from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';
import { makeImage } from '../../utils/utils';

const ProfileEditScreen = ({navigation}: NavigProps<null>) => {
  const {data : userProfile} = useGetUserProfileQuery({});
  const [userUpdate] = useUserUpdateMutation();
  const {colors, font} = useStyles();
  const [imageModal, setImageModal] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState(userProfile?.data);

  const [imageAssets, setImageAssets] = React.useState<any>({});

  const [privateProfile, setPrivateProfile] = useState(false);
  const [edit, setEdit] = useState({
    bio: false,
    details: false,
    link: false,
    interests: false,
    private_profile: false,
  });

  const handleImagePick = async (option: 'camera' | 'library') => {
    try {
      if (option === 'camera') {
        const result = await launchCamera({
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
          includeBase64: true,
        });

        if (!result.didCancel) {
          setImageAssets(
            result?.assets![0],
          );
          setImageModal(false);
          // console.log(result);
          handleUserUpdated();
        }
      }
      if (option === 'library') {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
          includeBase64: true,
        });

        if (!result.didCancel) {
          setImageAssets(
            result?.assets![0],
          );
          setImageModal(false);
          // console.log(result);
          handleUserUpdated();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserUpdated = React.useCallback(async()=>{
    const formData = new FormData();

    if (imageAssets?.uri) {
      formData.append('avatar', {
        name: imageAssets.fileName,
        type: imageAssets.type,
        uri: imageAssets.uri,
      });
    }
    formData.append('data', JSON.stringify(userInfo));

    const result = await userUpdate(formData);
    console.log(result);
    if (result) {
      // navigation?.goBack();
    }
  },[userInfo, imageAssets]);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Edit Profile"
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
       
    <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingHorizontal: '4%',
          paddingBottom: 30,
        }}>
        <View
          style={{
            paddingTop: '5%',
            backgroundColor: colors.cardBgTwo,
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 16,
            elevation: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.textColor.light,
                fontFamily: font.PoppinsMedium,
              }}>
              Take Photo
            </Text>
            <TouchableOpacity
              onPress={() => {
                setImageModal(!imageModal);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                gap: 8,
              }}>
              <SvgXml
                xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2656 14H2.73438C1.22661 14 0 12.7734 0 11.2656V2.73438C0 1.22664 1.22661 0 2.73438 0H8.03991C8.34195 0 8.58679 0.244836 8.58679 0.546875C8.58679 0.848914 8.34195 1.09375 8.03991 1.09375H2.73438C1.82973 1.09375 1.09375 1.82973 1.09375 2.73438V11.2656C1.09375 12.1703 1.82973 12.9062 2.73438 12.9062H11.2656C12.1703 12.9062 12.9062 12.1703 12.9062 11.2656V5.96009C12.9062 5.65805 13.1511 5.41321 13.4531 5.41321C13.7552 5.41321 14 5.65805 14 5.96009V11.2656C14 12.7734 12.7734 14 11.2656 14Z" fill="${colors.textColor.rare}"/>
<path d="M13.1341 0.867234C12.2812 0.0143278 10.8934 0.0143278 10.0405 0.867234L4.08749 6.82024C3.08485 7.82285 2.65227 9.25154 2.93035 10.6419C2.97364 10.8584 3.14284 11.0277 3.35932 11.0709C4.74305 11.3477 6.17365 10.9212 7.18108 9.9138L13.1341 3.9608C13.987 3.10792 13.987 1.72014 13.1341 0.867234ZM12.3607 3.18743L6.40766 9.14044C5.75469 9.79344 4.8582 10.1202 3.95079 10.0505C3.88093 9.14334 4.20783 8.24666 4.86088 7.59363L9.49362 2.96089L9.88034 3.34761C10.0939 3.56117 10.4402 3.56122 10.6537 3.34761C10.8673 3.13406 10.8673 2.78778 10.6538 2.57422L10.267 2.1875L10.8139 1.64062C11.2404 1.21417 11.9343 1.21417 12.3607 1.64062C12.7871 2.06708 12.7871 2.76098 12.3607 3.18743Z" fill="${colors.textColor.rare}"/>
</svg>
`}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.Poppins,
                  color: colors.textColor.rare,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                elevation: 2,
                padding: 1,
                backgroundColor: colors.bg,
                borderRadius: 45,
              }}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 45,
                  borderWidth: 1,
                  borderColor: colors.white,
                }}
                source={
                
                     {
                        uri:   imageAssets?.uri || makeImage(userInfo?.avatar)
                      }
              
                }
              />
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: colors.cardBgTree,
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 16,
            elevation: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.textColor.light,
                fontFamily: font.PoppinsMedium,
              }}>
              Bio
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEdit({...edit, bio: true});
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 30,
                gap: 8,
              }}>
              {edit.bio ? (
                <TouchableOpacity
                  onPress={() => {
                    setEdit({...edit, bio: false});
                    handleUserUpdated();
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.redis,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: font.Poppins,
                      color: colors.textColor.rare,
                    }}>
                    Updated
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <SvgXml
                    xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2656 14H2.73438C1.22661 14 0 12.7734 0 11.2656V2.73438C0 1.22664 1.22661 0 2.73438 0H8.03991C8.34195 0 8.58679 0.244836 8.58679 0.546875C8.58679 0.848914 8.34195 1.09375 8.03991 1.09375H2.73438C1.82973 1.09375 1.09375 1.82973 1.09375 2.73438V11.2656C1.09375 12.1703 1.82973 12.9062 2.73438 12.9062H11.2656C12.1703 12.9062 12.9062 12.1703 12.9062 11.2656V5.96009C12.9062 5.65805 13.1511 5.41321 13.4531 5.41321C13.7552 5.41321 14 5.65805 14 5.96009V11.2656C14 12.7734 12.7734 14 11.2656 14Z" fill="${colors.textColor.rare}"/>
<path d="M13.1341 0.867234C12.2812 0.0143278 10.8934 0.0143278 10.0405 0.867234L4.08749 6.82024C3.08485 7.82285 2.65227 9.25154 2.93035 10.6419C2.97364 10.8584 3.14284 11.0277 3.35932 11.0709C4.74305 11.3477 6.17365 10.9212 7.18108 9.9138L13.1341 3.9608C13.987 3.10792 13.987 1.72014 13.1341 0.867234ZM12.3607 3.18743L6.40766 9.14044C5.75469 9.79344 4.8582 10.1202 3.95079 10.0505C3.88093 9.14334 4.20783 8.24666 4.86088 7.59363L9.49362 2.96089L9.88034 3.34761C10.0939 3.56117 10.4402 3.56122 10.6537 3.34761C10.8673 3.13406 10.8673 2.78778 10.6538 2.57422L10.267 2.1875L10.8139 1.64062C11.2404 1.21417 11.9343 1.21417 12.3607 1.64062C12.7871 2.06708 12.7871 2.76098 12.3607 3.18743Z" fill="${colors.textColor.rare}"/>
</svg>
`}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: font.Poppins,
                      color: colors.textColor.rare,
                    }}>
                    Edit
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              width: '100%',
              fontSize: 12,
              color: colors.textColor.light,
              fontFamily: font.Poppins,
              marginTop: 10,
            }}>
            Update your short bio to tell people more about your self.
          </Text>
          <View
            style={{
              paddingTop: 16,
            }}>
            <TextInput
              editable={edit.bio}
              onChangeText={text => setUserInfo({...userInfo, bio: text})}
              multiline={true}
              verticalAlign="top"
              textAlignVertical="top"
              numberOfLines={4}
              value={userInfo?.bio}
              style={{
                height: 80,
                padding: 12,
                backgroundColor: colors.rareInput,
                borderRadius: 16,
                color: colors.textColor.neutralColor,
              }}
              placeholderTextColor={colors.textColor.neutralColor}
              placeholder={edit.bio ? 'Describe yourself...' : userInfo?.bio}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '5%',
            backgroundColor: colors.cardBgTwo,
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 16,
            elevation: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.textColor.light,
                fontFamily: font.PoppinsMedium,
              }}>
              Details
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEdit({...edit, details: true});
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 30,
                gap: 8,
              }}>
              {edit.details ? (
                <TouchableOpacity
                  onPress={() => {
                    setEdit({...edit, details: false});
                    handleUserUpdated();
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.redis,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: font.Poppins,
                      color: colors.textColor.rare,
                    }}>
                    Updated
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <SvgXml
                    xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2656 14H2.73438C1.22661 14 0 12.7734 0 11.2656V2.73438C0 1.22664 1.22661 0 2.73438 0H8.03991C8.34195 0 8.58679 0.244836 8.58679 0.546875C8.58679 0.848914 8.34195 1.09375 8.03991 1.09375H2.73438C1.82973 1.09375 1.09375 1.82973 1.09375 2.73438V11.2656C1.09375 12.1703 1.82973 12.9062 2.73438 12.9062H11.2656C12.1703 12.9062 12.9062 12.1703 12.9062 11.2656V5.96009C12.9062 5.65805 13.1511 5.41321 13.4531 5.41321C13.7552 5.41321 14 5.65805 14 5.96009V11.2656C14 12.7734 12.7734 14 11.2656 14Z" fill="${colors.textColor.rare}"/>
<path d="M13.1341 0.867234C12.2812 0.0143278 10.8934 0.0143278 10.0405 0.867234L4.08749 6.82024C3.08485 7.82285 2.65227 9.25154 2.93035 10.6419C2.97364 10.8584 3.14284 11.0277 3.35932 11.0709C4.74305 11.3477 6.17365 10.9212 7.18108 9.9138L13.1341 3.9608C13.987 3.10792 13.987 1.72014 13.1341 0.867234ZM12.3607 3.18743L6.40766 9.14044C5.75469 9.79344 4.8582 10.1202 3.95079 10.0505C3.88093 9.14334 4.20783 8.24666 4.86088 7.59363L9.49362 2.96089L9.88034 3.34761C10.0939 3.56117 10.4402 3.56122 10.6537 3.34761C10.8673 3.13406 10.8673 2.78778 10.6538 2.57422L10.267 2.1875L10.8139 1.64062C11.2404 1.21417 11.9343 1.21417 12.3607 1.64062C12.7871 2.06708 12.7871 2.76098 12.3607 3.18743Z" fill="${colors.textColor.rare}"/>
</svg>
`}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: font.Poppins,
                      color: colors.textColor.rare,
                    }}>
                    Edit
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              gap: 16,
              marginTop: 15,
            }}>
            {edit.details ? (
              <View
                style={{
                  gap: 10,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgba(161, 161, 161, 1)',
                      fontFamily: font.PoppinsMedium,
                      // marginHorizontal: 5,
                    }}>
                    Name
                  </Text>
                  <TextInput
                    placeholder="name"
                    placeholderTextColor={'rgba(200, 200, 200, 1)'}
                    style={{
                      // borderWidth: 1,
                      backgroundColor: colors.secondaryColor,
                      paddingHorizontal: 20,

                      marginVertical: 8,
                      borderRadius: 100,
                      fontFamily: font.Poppins,
                      height: 45,
                      color: colors.textColor.neutralColor,
                      fontSize: 14,
                    }}
                    value={userInfo?.fullName}
                    onChangeText={text =>
                      setUserInfo({
                        ...userInfo,
                        fullName : text,
                      })
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgba(161, 161, 161, 1)',
                      fontFamily: font.PoppinsMedium,
                      // marginHorizontal: 5,
                    }}>
                    Contact no
                  </Text>
                  <TextInput
                    placeholder="contact no"
                    placeholderTextColor={'rgba(200, 200, 200, 1)'}
                    style={{
                      // borderWidth: 1,
                      backgroundColor: colors.secondaryColor,
                      paddingHorizontal: 20,

                      marginVertical: 8,
                      borderRadius: 100,
                      fontFamily: font.Poppins,
                      height: 45,
                      color: colors.textColor.neutralColor,
                      fontSize: 14,
                    }}
                    value={userInfo?.phoneNumber}
                    onChangeText={text =>
                      setUserInfo({
                        ...userInfo,
                      
                          phoneNumber: text,
                        
                      })
                    }
                  />
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgba(161, 161, 161, 1)',
                      fontFamily: font.PoppinsMedium,
                      // marginHorizontal: 5,
                    }}>
                    Lives in
                  </Text>
                  <TextInput
                    placeholder="lives"
                    placeholderTextColor={'rgba(200, 200, 200, 1)'}
                    style={{
                      // borderWidth: 1,
                      backgroundColor: colors.secondaryColor,
                      paddingHorizontal: 20,

                      marginVertical: 8,
                      borderRadius: 100,
                      fontFamily: font.Poppins,
                      height: 45,
                      color: colors.textColor.neutralColor,
                      fontSize: 14,
                    }}
                    value={userInfo?.address}
                    onChangeText={text =>
                      setUserInfo({
                        ...userInfo,
                        address: text,
                      })
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgba(161, 161, 161, 1)',
                      fontFamily: font.PoppinsMedium,
                      // marginHorizontal: 5,
                    }}>
                    Occupations
                  </Text>
                  <TextInput
                    placeholder="occupations "
                    placeholderTextColor={'rgba(200, 200, 200, 1)'}
                    style={{
                      // borderWidth: 1,
                      backgroundColor: colors.secondaryColor,
                      paddingHorizontal: 20,

                      marginVertical: 8,
                      borderRadius: 100,
                      fontFamily: font.Poppins,
                      height: 45,
                      color: colors.textColor.neutralColor,
                      fontSize: 14,
                    }}
                    value={userInfo?.occupations}
                    onChangeText={text =>
                      setUserInfo({
                        ...userInfo,
                        occupations: text
                      })
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgba(161, 161, 161, 1)',
                      fontFamily: font.PoppinsMedium,
                      // marginHorizontal: 5,
                    }}>
                    Organization/Company
                  </Text>
                  <TextInput
                    placeholder="organization/company "
                    placeholderTextColor={'rgba(200, 200, 200, 1)'}
                    style={{
                      // borderWidth: 1,
                      backgroundColor: colors.secondaryColor,
                      paddingHorizontal: 20,

                      marginVertical: 8,
                      borderRadius: 100,
                      fontFamily: font.Poppins,
                      height: 45,
                      color: colors.textColor.neutralColor,
                      fontSize: 14,
                    }}
                    value={userInfo?.worksAt}
                    onChangeText={text =>
                      setUserInfo({
                        ...userInfo,
                        worksAt: text,
                      })
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgba(161, 161, 161, 1)',
                      fontFamily: font.PoppinsMedium,
                      // marginHorizontal: 5,
                    }}>
                    Studied at
                  </Text>
                  <TextInput
                    placeholder="studied at"
                    placeholderTextColor={'rgba(200, 200, 200, 1)'}
                    style={{
                      // borderWidth: 1,
                      backgroundColor: colors.secondaryColor,
                      paddingHorizontal: 20,

                      marginVertical: 8,
                      borderRadius: 100,
                      fontFamily: font.Poppins,
                      height: 45,
                      color: colors.textColor.neutralColor,
                      fontSize: 14,
                    }}
                    value={userInfo?.studiedAt}
                    onChangeText={text =>
                      setUserInfo({
                        ...userInfo,
                        studiedAt: text
                      })
                    }
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgba(161, 161, 161, 1)',
                      fontFamily: font.PoppinsMedium,
                      // marginHorizontal: 5,
                    }}>
                    Relationship status
                  </Text>
                  <TextInput
                    placeholder="relationship status"
                    placeholderTextColor={'rgba(200, 200, 200, 1)'}
                    style={{
                      // borderWidth: 1,
                      backgroundColor: colors.secondaryColor,
                      paddingHorizontal: 20,

                      marginVertical: 8,
                      borderRadius: 100,
                      fontFamily: font.Poppins,
                      height: 45,
                      color: colors.textColor.neutralColor,
                      fontSize: 14,
                    }}
                    value={userInfo?.relationshipStatus}
                    onChangeText={text =>
                      setUserInfo({
                        ...userInfo,
                        relationshipStatus: text
                      })
                    }
                  />
                </View>
              </View>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    Name
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.fullName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    E-mail
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    Contact no
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.phoneNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    Lives in
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    Occupations
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.occupations}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    Organization/Company
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.worksAt}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    Studied at
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.studiedAt}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    Relationship status
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {userInfo?.relationshipStatus}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.textColor.light,
                      fontFamily: font.PoppinsMedium,
                    }}>
                    Private profile
                  </Text>
                  <Pressable
                    onPress={() =>
                  {
                    console.log(userInfo?.isPrivateProfile)
                    setUserInfo({
                      ...userInfo,
                      isPrivateProfile: userInfo?.isPrivateProfile ? false : true
                    })
                  }
                    }
                    style={{
                      width: 50,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: userInfo?.isPrivateProfile
                        ? colors.secondaryColor
                        : 'rgba(217, 217, 217, 1)',
                      justifyContent: 'center',
                      alignItems: userInfo?.isPrivateProfile
                        ? 'flex-end'
                        : 'flex-start',
                    }}>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 100,
                        backgroundColor: userInfo?.isPrivateProfile
                          ? colors.redis
                          : 'rgba(238, 238, 238, 1)',
                      }}></View>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: '5%',
            backgroundColor: colors.cardBgTwo,
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 16,
            elevation: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.textColor.light,
                fontFamily: font.PoppinsMedium,
              }}>
              Link
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEdit({...edit, link: true});
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 30,
                gap: 8,
              }}>
              {edit.link ? (
                <TouchableOpacity
                  onPress={() => {
                    setEdit({...edit, link: false});
                    handleUserUpdated();
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.redis,
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: font.Poppins,
                      color: colors.textColor.rare,
                    }}>
                    Updated
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  <SvgXml
                    xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2656 14H2.73438C1.22661 14 0 12.7734 0 11.2656V2.73438C0 1.22664 1.22661 0 2.73438 0H8.03991C8.34195 0 8.58679 0.244836 8.58679 0.546875C8.58679 0.848914 8.34195 1.09375 8.03991 1.09375H2.73438C1.82973 1.09375 1.09375 1.82973 1.09375 2.73438V11.2656C1.09375 12.1703 1.82973 12.9062 2.73438 12.9062H11.2656C12.1703 12.9062 12.9062 12.1703 12.9062 11.2656V5.96009C12.9062 5.65805 13.1511 5.41321 13.4531 5.41321C13.7552 5.41321 14 5.65805 14 5.96009V11.2656C14 12.7734 12.7734 14 11.2656 14Z" fill="${colors.textColor.rare}"/>
<path d="M13.1341 0.867234C12.2812 0.0143278 10.8934 0.0143278 10.0405 0.867234L4.08749 6.82024C3.08485 7.82285 2.65227 9.25154 2.93035 10.6419C2.97364 10.8584 3.14284 11.0277 3.35932 11.0709C4.74305 11.3477 6.17365 10.9212 7.18108 9.9138L13.1341 3.9608C13.987 3.10792 13.987 1.72014 13.1341 0.867234ZM12.3607 3.18743L6.40766 9.14044C5.75469 9.79344 4.8582 10.1202 3.95079 10.0505C3.88093 9.14334 4.20783 8.24666 4.86088 7.59363L9.49362 2.96089L9.88034 3.34761C10.0939 3.56117 10.4402 3.56122 10.6537 3.34761C10.8673 3.13406 10.8673 2.78778 10.6538 2.57422L10.267 2.1875L10.8139 1.64062C11.2404 1.21417 11.9343 1.21417 12.3607 1.64062C12.7871 2.06708 12.7871 2.76098 12.3607 3.18743Z" fill="${colors.textColor.rare}"/>
</svg>
`}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: font.Poppins,
                      color: colors.textColor.rare,
                    }}>
                    Edit
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              backgroundColor: colors.whiteDark,
              paddingHorizontal: 12,
              height: 50,
              borderRadius: 16,
              gap: 12,
            }}>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9997 5.83759C8.59687 5.83759 5.83781 8.59717 5.83781 11.9999C5.83781 15.4034 8.59687 18.1618 11.9997 18.1618C15.4031 18.1618 18.1627 15.4034 18.1627 11.9999C18.1627 8.59717 15.4031 5.83759 11.9997 5.83759ZM11.9997 16C9.79092 16 7.99955 14.2092 7.99955 11.9999C7.99955 9.79065 9.79087 7.99984 11.9997 7.99984C14.2089 7.99984 16.0003 9.79065 16.0003 11.9999C16.0003 14.2092 14.2089 16 11.9997 16ZM19.8457 5.59445C19.8457 6.38907 19.2008 7.03393 18.4057 7.03393C17.6106 7.03393 16.9657 6.38907 16.9657 5.59445C16.9657 4.79949 17.6105 4.15445 18.4057 4.15445C19.2008 4.15445 19.8457 4.79949 19.8457 5.59445ZM23.37 4.13968C23.0632 3.35021 22.653 2.68131 21.9862 2.01409C20.6412 0.668072 18.801 0.156385 16.9479 0.0724785C15.6678 0.0133223 15.2591 0.000244141 11.9997 0.000244141C8.74134 0.000244141 8.33269 0.0133223 7.05253 0.0724785C5.19502 0.156572 3.35691 0.671447 2.01436 2.01404C0.666562 3.36184 0.157266 5.19638 0.0720469 7.05278C0.0137344 8.33293 0 8.74112 0 11.9999C0 15.2588 0.0137344 15.6676 0.0720469 16.9482C0.157641 18.8111 0.666047 20.6387 2.01427 21.9859C3.3623 23.3329 5.19628 23.843 7.05253 23.928C8.33269 23.9865 8.74134 23.9997 11.9997 23.9997C15.2592 23.9997 15.6678 23.9865 16.948 23.928C18.8085 23.8428 20.6408 23.3323 21.9862 21.9859C23.3306 20.6405 23.8436 18.8005 23.9278 16.9482C23.9863 15.6676 24 15.2587 24 11.9999C24 8.74102 23.9863 8.33288 23.9278 7.05273C23.8698 5.77515 23.6669 4.90318 23.37 4.13968ZM21.7677 16.849C21.7085 18.1524 21.4057 19.5081 20.4573 20.4576C19.4965 21.4196 18.1609 21.7083 16.8494 21.7681C15.5837 21.8254 15.2047 21.838 11.9997 21.838C8.79586 21.838 8.41683 21.8254 7.15102 21.7681C5.83617 21.7081 4.50272 21.4147 3.54267 20.4577C2.58539 19.5035 2.29078 18.1515 2.23214 16.8489C2.17481 15.5839 2.16225 15.2044 2.16225 11.9999C2.16225 8.79606 2.17486 8.41656 2.23214 7.15074C2.29059 5.85338 2.59927 4.48773 3.54248 3.54292C4.49883 2.58498 5.84616 2.29187 7.15111 2.23234C8.41683 2.17454 8.79586 2.16245 11.9997 2.16245C15.2042 2.16245 15.5837 2.17454 16.8495 2.23234C18.1635 2.29229 19.4992 2.58442 20.4572 3.54273C21.4156 4.50151 21.7083 5.84377 21.7677 7.15084C21.8257 8.41656 21.8383 8.79606 21.8383 11.9999C21.8383 15.2044 21.8257 15.5839 21.7677 16.849Z" fill="url(#paint0_linear_458_1361)"/>
<defs>
<linearGradient id="paint0_linear_458_1361" x1="2.01431" y1="21.986" x2="21.9862" y2="2.01409" gradientUnits="userSpaceOnUse">
<stop stop-color="#FDD91D"/>
<stop offset="0.05" stop-color="#FDD91D"/>
<stop offset="0.4972" stop-color="#EC1C24"/>
<stop offset="0.95" stop-color="#A43A94"/>
<stop offset="1" stop-color="#A43A94"/>
</linearGradient>
</defs>
</svg>
`}
            />

            <TextInput
              editable={edit.link}
              placeholder="https://www.instagram.com/example"
              value={userInfo?.instagramUrl}
              style={{
                color: colors.textColor.light,
              }}
              placeholderTextColor={colors.neutralColor}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '5%',
            backgroundColor: colors.cardBgTwo,
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 16,
            elevation: 2,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.textColor.light,
                fontFamily: font.PoppinsMedium,
              }}>
              Interest
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('Interest');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                gap: 8,
              }}>
              <SvgXml
                xml={`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.2656 14H2.73438C1.22661 14 0 12.7734 0 11.2656V2.73438C0 1.22664 1.22661 0 2.73438 0H8.03991C8.34195 0 8.58679 0.244836 8.58679 0.546875C8.58679 0.848914 8.34195 1.09375 8.03991 1.09375H2.73438C1.82973 1.09375 1.09375 1.82973 1.09375 2.73438V11.2656C1.09375 12.1703 1.82973 12.9062 2.73438 12.9062H11.2656C12.1703 12.9062 12.9062 12.1703 12.9062 11.2656V5.96009C12.9062 5.65805 13.1511 5.41321 13.4531 5.41321C13.7552 5.41321 14 5.65805 14 5.96009V11.2656C14 12.7734 12.7734 14 11.2656 14Z" fill="${colors.textColor.rare}"/>
<path d="M13.1341 0.867234C12.2812 0.0143278 10.8934 0.0143278 10.0405 0.867234L4.08749 6.82024C3.08485 7.82285 2.65227 9.25154 2.93035 10.6419C2.97364 10.8584 3.14284 11.0277 3.35932 11.0709C4.74305 11.3477 6.17365 10.9212 7.18108 9.9138L13.1341 3.9608C13.987 3.10792 13.987 1.72014 13.1341 0.867234ZM12.3607 3.18743L6.40766 9.14044C5.75469 9.79344 4.8582 10.1202 3.95079 10.0505C3.88093 9.14334 4.20783 8.24666 4.86088 7.59363L9.49362 2.96089L9.88034 3.34761C10.0939 3.56117 10.4402 3.56122 10.6537 3.34761C10.8673 3.13406 10.8673 2.78778 10.6538 2.57422L10.267 2.1875L10.8139 1.64062C11.2404 1.21417 11.9343 1.21417 12.3607 1.64062C12.7871 2.06708 12.7871 2.76098 12.3607 3.18743Z" fill="${colors.textColor.rare}"/>
</svg>
`}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: font.Poppins,
                  color: colors.textColor.rare,
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 20,
              // paddingHorizontal: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 12,
              minHeight: 100,
            }}>
          {
            userProfile?.data?.interests?.map((ins,index)=>
              <Text
              key={index}
              style={{
                fontSize: 12,
                color: colors.textColor.neutralColor,
                fontFamily: font.PoppinsMedium,
                backgroundColor: colors.secondaryColor,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 100,
                elevation: 1,
              }}>
             {ins}
            </Text>
          
            )
          }
          </View>
        </View>
      </ScrollView>

     <ModalOfBottom
        modalVisible={imageModal}
        setModalVisible={setImageModal}
        onlyTopRadius={20}
 
        containerColor={colors.bg}>
        <View
          style={{
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleImagePick('camera');
            }}
            style={{
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleImagePick('library');
            }}
            style={{
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Image form gallery
            </Text>
          </TouchableOpacity>
        </View>
      </ModalOfBottom>
    </View>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({});
