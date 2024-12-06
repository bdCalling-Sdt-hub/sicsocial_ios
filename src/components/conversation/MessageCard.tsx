import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {useStyles} from '../../context/ContextApi';
import {IParticipant} from '../../redux/interface/participants';
import {makeImage} from '../../utils/utils';

interface IMessageCardProps extends IParticipant {
  name: string;
  lastMessage: string;
  lastTime: string;
  active?: boolean;
  secondImage: any;
  onPress?: () => void;
  people?: 'one' | 'two';
}

const MessageCard = ({
  active,
  lastMessage,
  lastTime,
  name,
  onPress,
  people,
  _id,
  avatar,
  fullName,
  secondImage,
}: IMessageCardProps) => {
  // console.log(avatar);
  const {colors, font} = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.secondaryColor,
        // paddingVertical: 5,
        alignItems: 'center',

        elevation: 1,
        borderRadius: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingHorizontal: 15,
        gap: 12,
      }}>
      <View>
        {active && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 50,
              backgroundColor: colors.green['#00B047'],
              position: 'absolute',
              right: 2,
              zIndex: +1,
              bottom: 7,
            }}
          />
        )}
        <View
          style={{
            // elevation: 2,
            width: 70,
            height: 70,
          }}>
          {people === 'one' ? (
            <View
              style={{
                position: 'relative',

                transform: [
                  {
                    rotate: '-7deg',
                  },
                ],
              }}>
              <View
                style={{
                  // padding: 2,

                  // backgroundColor: colors.white,
                  elevation: 2,
                  width: 65,
                  height: 65,
                  borderRadius: 28,
                }}>
                {avatar ? (
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 28,
                      resizeMode: 'cover',
                      borderColor: 'rgba(255,255,255,1)',
                      borderWidth: 2,
                    }}
                    source={{
                      uri: makeImage(avatar || ''),
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 28,
                    }}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: 'rgba(255,255,255,1)',
                        width: 65,
                        height: 65,
                        borderRadius: 28,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primaryColor,
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontFamily: font.PoppinsBold,
                          color: colors.textColor.white,
                        }}>
                        {name?.slice(0, 1)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <>
              <View
                style={{
                  transform: [
                    {
                      rotate: '-7deg',
                    },
                    {
                      translateX: -6,
                    },
                    {
                      translateY: 3,
                    },
                  ],
                }}>
                <View
                  style={{
                    // padding: 2,

                    // backgroundColor: colors.white,
                    elevation: 2,
                    width: 65,
                    height: 65,
                    borderRadius: 28,
                  }}>
                  {secondImage ? (
                    <Image
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 28,
                        resizeMode: 'cover',
                        borderColor: 'rgba(255,255,255,1)',
                        borderWidth: 2,
                      }}
                      source={{
                        uri: makeImage(secondImage || ''),
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 65,
                        height: 65,
                        borderRadius: 28,
                      }}>
                      <View
                        style={{
                          borderWidth: 2,
                          borderColor: 'rgba(255,255,255,1)',
                          width: 65,
                          height: 65,
                          borderRadius: 28,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: colors.primaryColor,
                        }}>
                        <Text
                          style={{
                            fontSize: 25,
                            fontFamily: font.PoppinsBold,
                            color: colors.textColor.white,
                          }}>
                          {name?.slice(0, 1)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,

                  transform: [
                    {
                      translateX: 18,
                    },
                    {
                      translateY: 12,
                    },
                  ],
                }}>
                <View
                  style={{
                    elevation: 2,
                    maxWidth: 47,
                    width: 47,
                    borderRadius: 28,
                    backgroundColor: colors.white,
                  }}>
                  <Image
                    style={{
                      maxWidth: 47,
                      width: 47,
                      height: 49,
                      borderRadius: 28,
                      resizeMode: 'contain',
                      borderColor: 'rgba(255,255,255,1)',
                      borderWidth: 2,
                    }}
                    source={{
                      uri: makeImage(avatar || ''),
                    }}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: font.PoppinsSemiBold,
            color: colors.textColor.light,
            marginBottom: 3,
          }}>
          {name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 3,
          }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
            }}>
            {lastMessage}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: font.Poppins,
              color: colors.textColor.rare,
            }}>
            {lastTime}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MessageCard);

const styles = StyleSheet.create({});
