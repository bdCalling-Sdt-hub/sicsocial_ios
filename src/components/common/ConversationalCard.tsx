import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {AnimatedImage} from 'react-native-ui-lib';
import {INewFeed} from '../../redux/interface/new_feed';
import {IParticipants} from '../../redux/interface/participants';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {makeImage} from '../../utils/utils';
import {useStyles} from '../../context/ContextApi';

interface ConversationalCardProps extends NavigProps<null>, IParticipants {
  conversationTitle?: string;
  conversationSubtitle?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  lastMessageStatus?: string; // "sent", "received", "read"
  onDonationShearPress?: () => void;
  onDonationViewDetailsPress?: () => void;
  conversationStyle?: 'donation' | 'normal';
  cardStyle?: 'book_promotion' | 'shear_book' | 'image' | 'normal';
  item?: INewFeed;
  havNotUser?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  isReply?: boolean;
  paddingHorizontal?: string;
  manyPeople?: boolean;
}

const ConversationalCard = ({
  conversationStyle,
  conversationSubtitle,
  conversationTitle,
  lastMessage,
  lastMessageStatus,
  lastMessageTime,
  onDonationShearPress,
  onDonationViewDetailsPress,
  navigation,
  cardStyle,
  disabled,
  onPress,
  isReply,
  paddingHorizontal,
  havNotUser,
  manyPeople,
  participants,
  item,
}: ConversationalCardProps) => {
  const {colors, font} = useStyles();
  // console.log('item', item);

  return (
    <>
      {/*========================== conversation card start ======================= */}

      <TouchableOpacity
        activeOpacity={0.9}
        disabled={disabled}
        onPress={onPress}
        style={{
          paddingHorizontal: '4%',
          marginTop: 16,
        }}>
        <View
          style={{
            backgroundColor: colors.secondaryColor,
            paddingHorizontal: 16,
            paddingVertical: 15,
            borderRadius: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 0.8,
            // height: cardStyle == "four" ? 120 : undefined,
          }}>
          {/*================= donation card Start ============= */}
          {conversationStyle === 'donation' && (
            <>
              <View
                style={{
                  gap: 4,
                  marginRight: 1,
                }}>
                {conversationTitle && (
                  <Text
                    numberOfLines={1}
                    style={{
                      maxWidth: '90%',
                      fontFamily: font.PoppinsSemiBold,
                      fontSize: 17,
                      color: colors.textColor.neutralColor,
                    }}>
                    {conversationTitle}
                  </Text>
                )}
                {conversationSubtitle && (
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 12,
                      color: colors.textColor.secondaryColor,
                      opacity: 0.8,
                      maxWidth: '80%',
                    }}>
                    {conversationSubtitle}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 13,
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    onPress={onDonationShearPress}
                    style={{
                      height: 32,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.primaryColor,
                      flexDirection: 'row',
                      gap: 4,
                      paddingHorizontal: 8,
                      paddingVertical: 6,
                    }}>
                    {/* <Image
                    source={require('../../assets/icons/shear/shear.png')}
                  /> */}
                    <SvgXml
                      xml={`<svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.25368 8.07175C8.67873 8.07175 8.16072 8.32004 7.80119 8.71499L4.56747 6.71219C4.6538 6.49118 4.70168 6.25113 4.70168 6C4.70168 5.74878 4.6538 5.50873 4.56747 5.28782L7.80119 3.28492C8.16072 3.67988 8.67873 3.92826 9.25368 3.92826C10.3367 3.92826 11.2178 3.04716 11.2178 1.96409C11.2178 0.881025 10.3367 1.52588e-05 9.25368 1.52588e-05C8.17061 1.52588e-05 7.28951 0.881117 7.28951 1.96418C7.28951 2.21531 7.33748 2.45536 7.42372 2.67637L4.19009 4.67917C3.83056 4.28422 3.31256 4.03583 2.73761 4.03583C1.65454 4.03583 0.773438 4.91703 0.773438 6C0.773438 7.08307 1.65454 7.96417 2.73761 7.96417C3.31256 7.96417 3.83056 7.71588 4.19009 7.32083L7.42372 9.32364C7.33748 9.54464 7.28951 9.78469 7.28951 10.0359C7.28951 11.1189 8.17061 12 9.25368 12C10.3367 12 11.2178 11.1189 11.2178 10.0359C11.2178 8.95285 10.3367 8.07175 9.25368 8.07175ZM8.00572 1.96418C8.00572 1.27607 8.56557 0.716231 9.25368 0.716231C9.94178 0.716231 10.5016 1.27607 10.5016 1.96418C10.5016 2.65229 9.94178 3.21214 9.25368 3.21214C8.56557 3.21214 8.00572 2.65229 8.00572 1.96418ZM2.73761 7.24796C2.04941 7.24796 1.48956 6.68811 1.48956 6C1.48956 5.31189 2.04941 4.75205 2.73761 4.75205C3.42571 4.75205 3.98547 5.31189 3.98547 6C3.98547 6.68811 3.42571 7.24796 2.73761 7.24796ZM8.00572 10.0358C8.00572 9.34771 8.56557 8.78787 9.25368 8.78787C9.94178 8.78787 10.5016 9.34771 10.5016 10.0358C10.5016 10.7239 9.94178 11.2838 9.25368 11.2838C8.56557 11.2838 8.00572 10.7239 8.00572 10.0358Z"
                      fill="#F4F4F4"
                    />
                  </svg>`}
                    />

                    <Text
                      style={{
                        fontFamily: font.Poppins,
                        fontSize: 12,
                        color: colors.white,
                      }}>
                      Share
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onDonationViewDetailsPress}
                    style={{
                      height: 32,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.green['#00B047'],
                      flexDirection: 'row',
                      gap: 4,
                      paddingHorizontal: 8,
                      paddingVertical: 6,
                    }}>
                    <Image
                      resizeMode="center"
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      source={require('../../assets/icons/donation/donation.png')}
                    />
                    <Text
                      style={{
                        fontFamily: font.Poppins,
                        fontSize: 12,
                        color: colors.white,
                      }}>
                      View details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{elevation: 5}}>
                <ImageBackground
                  resizeMode="cover"
                  style={{
                    height: 100,
                    width: 88,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={require('../../assets/icons/donation/donationImage.png')}
                />
              </View>
            </>
          )}
          {/*================= donation card End ============= */}
          {conversationStyle === 'normal' && (
            <>
              <View
                style={{
                  gap: 4,
                  width: '60%',
                }}>
                <View
                  style={{
                    gap: 2,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                    }}>
                    {conversationTitle && (
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: font.PoppinsMedium,
                          fontSize: 12,
                          color: colors.textColor.secondaryColor,
                          maxWidth: '80%',
                        }}>
                        {conversationTitle}
                      </Text>
                    )}
                    {cardStyle === 'book_promotion' ? (
                      <>
                        {conversationSubtitle && (
                          <Text
                            numberOfLines={1}
                            style={{
                              fontFamily: font.PoppinsMedium,
                              fontSize: 13,
                              color: '#8C5719',
                            }}>
                            {conversationSubtitle.toLocaleUpperCase()}
                          </Text>
                        )}
                      </>
                    ) : (
                      <>
                        {conversationSubtitle && (
                          <Text
                            numberOfLines={1}
                            style={{
                              fontFamily: font.PoppinsMedium,
                              fontSize: 13,
                              color: colors.textColor.neutralColor,
                              maxWidth:
                                conversationTitle?.length > 20
                                  ? '30%'
                                  : participants?.length > 1
                                  ? '40%'
                                  : '80%',
                            }}>
                            {conversationSubtitle}
                          </Text>
                        )}
                      </>
                    )}
                  </View>
                  {lastMessageTime && (
                    <Text
                      numberOfLines={1}
                      style={{
                        fontFamily: font.PoppinsMedium,
                        fontSize: 13,
                        color: colors.textColor.yellowis,
                      }}>
                      {lastMessageTime}
                    </Text>
                  )}
                  {lastMessage && (
                    <Text
                      style={{
                        fontFamily: isReply
                          ? font.PoppinsSemiBold
                          : font.Poppins,
                        fontSize: 13,
                        color: isReply
                          ? colors.textColor.neutralColor
                          : colors.textColor.neutralColor,
                        maxWidth: '90%',
                      }}
                      numberOfLines={2}>
                      {lastMessage}
                    </Text>
                  )}
                </View>
              </View>
              {cardStyle === 'book_promotion' && (
                <>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 18,
                      elevation: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 1,
                    }}>
                    <AnimatedImage
                      resizeMode="cover"
                      style={{
                        height: 85,
                        width: 75,
                        borderRadius: 18,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/book.jpg')}
                    />
                  </View>
                </>
              )}
              {cardStyle === 'shear_book' && (
                <>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 18,
                      elevation: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 1,
                      transform: [
                        {
                          translateX: -25,
                        },
                      ],
                    }}>
                    <AnimatedImage
                      resizeMode="cover"
                      style={{
                        height: 85,
                        width: 75,
                        borderRadius: 18,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={{
                        uri: makeImage(item?.lastMessage?.book?.bookImage),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 28,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      right: 40,
                      zIndex: 2,
                      transform: [
                        {
                          rotate: '15deg',
                        },
                        {
                          translateX: 25,
                        },
                        {
                          translateY: 0,
                        },
                      ],
                    }}>
                    <AnimatedImage
                      resizeMode="cover"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 28,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={{
                        uri: makeImage(participants![0]?.avatar),
                      }}
                    />
                  </View>
                </>
              )}
              {cardStyle === 'image' && (
                <>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 18,
                      elevation: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 1,
                      transform: [
                        {
                          translateX: -25,
                        },
                      ],
                    }}>
                    <AnimatedImage
                      resizeMode="cover"
                      style={{
                        height: 85,
                        width: 75,
                        borderRadius: 18,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={{
                        uri: makeImage(item?.lastMessage?.image),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 28,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'absolute',
                      right: 40,
                      zIndex: 2,
                      transform: [
                        {
                          rotate: '15deg',
                        },
                        {
                          translateX: 25,
                        },
                        {
                          translateY: 0,
                        },
                      ],
                    }}>
                    <AnimatedImage
                      resizeMode="cover"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 28,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={{
                        uri: makeImage(participants![0]?.avatar),
                      }}
                    />
                  </View>
                </>
              )}
              {cardStyle === 'normal' && (
                <>
                  {participants?.length === 1 && (
                    <View
                      style={{
                        // height: 76,

                        borderRadius: 35,
                        elevation: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 1,
                      }}>
                      {participants && (
                        <AnimatedImage
                          resizeMode="cover"
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 28,
                            borderColor: 'white',
                            borderWidth: 3,
                          }}
                          source={{
                            uri: makeImage(
                              item.avatar || participants[0].avatar,
                            ),
                          }}
                        />
                      )}
                    </View>
                  )}
                  {participants?.length === 2 && (
                    <>
                      <View
                        style={{
                          // height: 76,

                          borderRadius: 28,
                          elevation: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          right: 40,
                          zIndex: 2,
                          transform: [
                            {
                              rotate: '15deg',
                            },
                            {
                              translateX: 25,
                            },
                            {
                              translateY: -6,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 35,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![0]?.avatar),
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          borderRadius: 28,
                          elevation: havNotUser ? 0 : 2,
                          // bottom: havNotUser ? 10 : 25,
                          position: 'absolute',
                          right: havNotUser ? 40 : 40,
                          // zIndex: 2,
                          transform: [
                            {
                              rotate: havNotUser ? '10deg' : '-15deg',
                            },
                            {
                              translateX: havNotUser ? -25 : -25,
                            },
                            {
                              translateY: -6,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 35,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{uri: makeImage(participants![1]?.avatar)}}
                          />
                        )}
                      </View>
                    </>
                  )}
                  {participants?.length === 3 && (
                    <View>
                      <View
                        style={{
                          borderRadius: 24,
                          elevation: 2,
                          bottom: -25,
                          position: 'absolute',
                          right: 40,
                          zIndex: 3,
                          transform: [
                            {
                              rotate: '15deg',
                            },
                            {
                              translateX: 40,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 65,
                              width: 65,
                              borderRadius: 28,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![0]?.avatar),
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          borderRadius: 24,
                          elevation: 2,
                          bottom: -25,
                          position: 'absolute',
                          right: 35,
                          zIndex: 2,
                          transform: [
                            {
                              rotate: '-8deg',
                            },
                            {
                              translateX: -5,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 65,
                              width: 65,
                              borderRadius: 28,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![1]?.avatar),
                            }}
                          />
                        )}
                      </View>

                      <View
                        style={{
                          borderRadius: 24,
                          bottom: havNotUser || manyPeople ? -30 : -20,
                          position: 'absolute',
                          right: havNotUser || manyPeople ? 40 : 50,

                          transform: [
                            {
                              rotate:
                                havNotUser || manyPeople ? '-15deg' : '-28deg',
                            },
                            {
                              translateX: havNotUser || manyPeople ? -32 : -32,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 65,
                              width: 65,
                              borderRadius: 28,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![2]?.avatar),
                            }}
                          />
                        )}
                      </View>
                    </View>
                  )}
                  {participants?.length >= 4 && (
                    <View
                      style={{
                        // paddingVertical: 20,
                        minHeight: 80,
                        transform: [
                          {
                            scale: 0.76,
                          },
                          {
                            translateY: -25,
                          },
                        ],
                      }}>
                      <View
                        style={{
                          borderRadius: 24,
                          elevation: 2,
                          bottom: 6,
                          position: 'absolute',
                          right: 40,
                          zIndex: 3,
                          transform: [
                            {
                              rotate: '20deg',
                            },
                            {
                              translateX: 40,
                            },
                            {
                              translateY: -4,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 28,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![0]?.avatar),
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          // height: 76,

                          borderRadius: 24,
                          elevation: 2,
                          bottom: 0,
                          position: 'absolute',
                          right: 40,
                          zIndex: 2,
                          transform: [
                            {
                              rotate: '-20deg',
                            },
                            {
                              translateX: -11,
                            },
                            {
                              translateY: 0,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 28,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![1]?.avatar),
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          borderRadius: 24,
                          elevation: 2,
                          bottom: 6,
                          position: 'absolute',
                          right: 40,
                          zIndex: 3,
                          transform: [
                            {
                              rotate: '20deg',
                            },
                            {
                              translateX: 50,
                            },
                            {
                              translateY: 37,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 28,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![2]?.avatar),
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          // height: 76,

                          borderRadius: 24,
                          elevation: 2,
                          bottom: 0,
                          position: 'absolute',
                          right: 40,
                          zIndex: 2,
                          transform: [
                            {
                              rotate: '-20deg',
                            },
                            {
                              translateX: -20,
                            },
                            {
                              translateY: 40,
                            },
                          ],
                        }}>
                        {participants && (
                          <AnimatedImage
                            resizeMode="cover"
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 28,
                              borderColor: 'white',
                              borderWidth: 3,
                            }}
                            source={{
                              uri: makeImage(participants![3]?.avatar),
                            }}
                          />
                        )}
                      </View>
                    </View>
                  )}
                </>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>

      {/*========================== conversation card end ======================= */}
    </>
  );
};

export default ConversationalCard;

const styles = StyleSheet.create({});
