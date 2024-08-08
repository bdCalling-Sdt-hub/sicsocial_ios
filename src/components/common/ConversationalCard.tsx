import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigProps} from '../../interfaces/NaviProps';

import {SvgXml} from 'react-native-svg';
import {useStyles} from '../../context/ContextApi';

interface ConversationalCardProps extends NavigProps<null> {
  conversationTitle?: string;
  conversationSubtitle?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  lastMessageStatus?: string; // "sent", "received", "read"
  onDonationShearPress?: () => void;
  onDonationViewDetailsPress?: () => void;
  conversationStyle?: 'donation' | 'normal';
  cardStyle?:
    | 'book_promotion'
    | 'shear_book'
    | 'image'
    | 'two'
    | 'single'
    | 'three'
    | 'four';
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
}: ConversationalCardProps) => {
  const {colors, font} = useStyles();
  return (
    <>
      {/*========================== conversation card start ======================= */}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={onPress}
        style={{
          paddingHorizontal: paddingHorizontal ? paddingHorizontal : '0%',
        }}>
        <View
          style={{
            backgroundColor: colors.secondaryColor,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 0.8,
            height: 120,
          }}>
          {/*================= donation card Start ============= */}
          {conversationStyle === 'donation' && (
            <>
              <View
                style={{
                  gap: 4,
                  marginRight: 1,
                }}>
                <Text
                  style={{
                    fontFamily: font.PoppinsSemiBold,
                    fontSize: 17,
                    color: colors.textColor.secondaryColor,
                  }}>
                  {conversationTitle ? conversationTitle : 'empty'}
                </Text>
                <Text
                  style={{
                    fontFamily: font.Poppins,
                    fontSize: 12,
                    color: colors.textColor.secondaryColor,
                  }}>
                  {lastMessage ? lastMessage : 'empty'}
                </Text>
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
                    <Text
                      style={{
                        fontFamily: font.PoppinsMedium,
                        fontSize: 12,
                        color: colors.textColor.secondaryColor,
                      }}>
                      {conversationTitle ? conversationTitle : 'empty'}
                    </Text>
                    {cardStyle === 'book_promotion' ? (
                      <Text
                        style={{
                          fontFamily: font.PoppinsMedium,
                          fontSize: 13,
                          color: '#8C5719',
                        }}>
                        {conversationSubtitle
                          ? conversationSubtitle.toLocaleUpperCase()
                          : 'empty '}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: font.PoppinsMedium,
                          fontSize: 13,
                          color: colors.textColor.neutralColor,
                        }}>
                        {conversationSubtitle ? conversationSubtitle : 'empty '}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontFamily: font.PoppinsMedium,
                      fontSize: 13,
                      color:  colors.textColor.yellowis,
                    }}>
                    {lastMessageTime ? lastMessageTime : 'empty'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: isReply ? font.PoppinsSemiBold : font.Poppins,
                      fontSize: 13,
                      color: isReply
                        ? colors.textColor.neutralColor
                        : colors.textColor.neutralColor,
                    }}
                    numberOfLines={2}>
                    {lastMessage ? lastMessage : 'empty'}
                  </Text>
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
                    <Image
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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 85,
                        width: 75,
                        borderRadius: 18,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/book2.jpg')}
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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 28,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg')}
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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 85,
                        width: 75,
                        borderRadius: 18,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/charity.jpg')}
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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 28,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg')}
                    />
                  </View>
                </>
              )}

              {cardStyle === 'single' && (
                <>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 35,
                      elevation: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 1,
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 35,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg')}
                    />
                  </View>
                </>
              )}
              {cardStyle === 'two' && (
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
                          translateY: 0,
                        },
                      ],
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 70,
                        width: 70,
                        borderRadius: 28,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg')}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 28,
                      elevation: havNotUser ? 0 : 2,
                      bottom: havNotUser ? 10 : 25,
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
                          translateY: 0,
                        },
                      ],
                    }}>
                    {havNotUser ? (
                      <ImageBackground
                        resizeMode="cover"
                        style={{
                          borderRadius: 24,

                          height: 80,
                          width: 80,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        source={require('../../assets/icons/unknown/rectangle.png')}>
                        {/* <Text
                          style={{
                            fontFamily: font.Poppins,
                            fontSize: 14,
                            color: colors.textColor.light,
                            textAlign: 'center',
                          }}>
                          8+
                        </Text> */}
                        <SvgXml
                          xml={`<svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.9955 11.3524L13.9713 13.2345L15.9 20.4326L12.214 21.4202L10.2853 14.2221L3.26108 16.1043L2.3666 12.766L9.39081 10.8839L7.46209 3.68582L11.1481 2.69816L13.0768 9.89624L20.101 8.01411L20.9955 11.3524Z" fill="#767676"/>
  </svg>
  `}
                        />
                      </ImageBackground>
                    ) : (
                      <Image
                        resizeMode="cover"
                        style={{
                          height: 70,
                          width: 70,
                          borderRadius: 28,
                          borderColor: 'white',
                          borderWidth: 2,
                        }}
                        source={require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg')}
                      />
                    )}
                  </View>
                </>
              )}

              {cardStyle === 'three' && (
                <View>
                  <View
                    style={{
                      // height: 76,

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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 24,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg')}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 24,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg')}
                    />
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
                    {manyPeople ? (
                      <ImageBackground
                        resizeMode="cover"
                        style={{
                          borderRadius: 24,

                          height: 70,
                          width: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        source={require('../../assets/icons/unknown/rectangle.png')}>
                        <Text
                          style={{
                            fontFamily: font.Poppins,
                            fontSize: 14,
                            color: colors.textColor.light,
                            textAlign: 'center',
                          }}>
                          8+
                        </Text>
                      </ImageBackground>
                    ) : havNotUser ? (
                      <ImageBackground
                        resizeMode="cover"
                        style={{
                          borderRadius: 24,

                          height: 70,
                          width: 70,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        source={require('../../assets/icons/unknown/rectangle.png')}>
                        <SvgXml
                          xml={`<svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.9955 11.3524L13.9713 13.2345L15.9 20.4326L12.214 21.4202L10.2853 14.2221L3.26108 16.1043L2.3666 12.766L9.39081 10.8839L7.46209 3.68582L11.1481 2.69816L13.0768 9.89624L20.101 8.01411L20.9955 11.3524Z" fill="#767676"/>
  </svg>
  `}
                        />
                      </ImageBackground>
                    ) : (
                      <Image
                        resizeMode="cover"
                        style={{
                          height: 59,
                          width: 59,
                          borderRadius: 24,
                          borderColor: 'white',
                          borderWidth: 2,
                        }}
                        source={require('../../assets/tempAssets/ad868d019f92ce267e6de23af3413e5b.jpg')}
                      />
                    )}
                  </View>
                </View>
              )}
              {cardStyle === 'four' && (
                <View>
                  <View
                    style={{
                      // height: 76,

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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 24,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/ae1e058c2ed75ab981a9f8bb62e96a13.jpg')}
                    />
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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 24,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/bdf7eaf41f82746f243dbd6e48280274.jpg')}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 24,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/f94d91c8643f6698b126e7dec5854350.jpg')}
                    />
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
                    <Image
                      resizeMode="cover"
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 24,
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      source={require('../../assets/tempAssets/ad868d019f92ce267e6de23af3413e5b.jpg')}
                    />
                  </View>
                </View>
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
