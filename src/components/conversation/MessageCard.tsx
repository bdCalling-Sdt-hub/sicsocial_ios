import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';

interface IMessageCardProps {
  name: string;
  img: string;
  lastMessage: string;
  lastTime: string;
  active?: boolean;
  onPress?: () => void;
  people?: 'one' | 'two';
}

const MessageCard = ({
  active,
  img,
  lastMessage,
  lastTime,
  name,
  onPress,
  people,
}: IMessageCardProps) => {
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
          }}
        />
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
                padding: 2,
                backgroundColor: 'white',
                // elevation: 1,
                // borderWidth: 0.5,
                width: 65,
                height: 65,
                // borderColor: 'rgba(0,0,0,.2)',
                borderRadius: 30,
                transform: [
                  {
                    rotate: '-7deg',
                  },
                ],
              }}>
              <Image
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 30,
                  resizeMode: 'contain',
                }}
                source={img}
              />
            </View>
          ) : people === 'two' ? (
            <>
              <View
                style={{
                  position: 'relative',
                  padding: 2,
                  //   backgroundColor: 'white',
                  // elevation: 1,
                  // borderWidth: 0.5,
                  // borderColor: 'rgba(0,0,0,.2)',
                  borderRadius: 30,
                  transform: [
                    {
                      rotate: '-7deg',
                    },
                    {
                      translateX: -5,
                    },
                    {
                      translateY: -3,
                    },
                  ],
                }}>
                <Image
                  style={{
                    width: 47,
                    height: 49,
                    borderRadius: 30,
                    resizeMode: 'cover',
                  }}
                  source={img}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  padding: 2,
                  backgroundColor: 'white',
                  // elevation: 1,
                  // borderWidth: 0.5,
                  // borderColor: 'rgba(0,0,0,.2)',
                  borderRadius: 30,
                  transform: [
                    {
                      translateX: 15,
                    },
                    {
                      translateY: 15,
                    },
                  ],
                }}>
                <Image
                  style={{
                    width: 47,
                    height: 49,
                    borderRadius: 30,
                    resizeMode: 'cover',
                  }}
                  source={img}
                />
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  position: 'relative',
                  padding: 2,
                  //   backgroundColor: 'white',
                  // elevation: 1,
                  // borderWidth: 0.5,
                  // borderColor: 'rgba(0,0,0,.2)',
                  borderRadius: 30,
                  transform: [
                    {
                      rotate: '-7deg',
                    },
                    {
                      translateX: -5,
                    },
                    {
                      translateY: -3,
                    },
                  ],
                }}>
                <Image
                  style={{
                    width: 46,
                    height: 48,
                    borderRadius: 30,
                    resizeMode: 'cover',
                  }}
                  source={img}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  padding: 2,
                  //   backgroundColor: 'white',
                  // elevation: 1,
                  // borderWidth: 0.5,
                  // borderColor: 'rgba(0,0,0,.2)',
                  borderRadius: 30,
                  transform: [
                    {
                      rotate: '-20deg',
                    },
                    {
                      translateX: 2,
                    },
                    {
                      translateY: -35,
                    },
                  ],
                }}>
                <Image
                  style={{
                    width: 46,
                    height: 48,
                    borderRadius: 30,
                    resizeMode: 'cover',
                  }}
                  source={img}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  padding: 2,
                  backgroundColor: 'white',
                  // elevation: 1,
                  // borderWidth: 0.5,
                  // borderColor: 'rgba(0,0,0,.2)',
                  borderRadius: 30,
                  transform: [
                    {
                      translateX: 15,
                    },
                    {
                      translateY: 15,
                    },
                  ],
                }}>
                <Image
                  style={{
                    width: 46,
                    height: 48,
                    borderRadius: 30,
                    resizeMode: 'cover',
                  }}
                  source={img}
                />
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

export default MessageCard;

const styles = StyleSheet.create({});
