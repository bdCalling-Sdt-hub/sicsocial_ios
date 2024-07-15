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
  cardStyle?: 'book' | 'two' | 'single' | 'three' | 'many';
  onPress?: () => void;
  disabled?: boolean;
  isReply?: boolean;
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
}: ConversationalCardProps) => {
  const {colors, font} = useStyles();
  return (
    <>
      {/*========================== conversation card start ======================= */}

      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          paddingHorizontal: '4%',
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
            elevation: 2,
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
                    {cardStyle === 'book' ? (
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
                      color: '#6B4213',
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
              {cardStyle === 'book' && (
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/ac94/a291/488b4f850f0251fe5ba556fe9da20e2e?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jvqyY37wXUBOJcEy7EXQ8zdp9yDNmY7DqXGHguzffSo8IrFa-TkhBmNgIKzce4E1yoObV~sZOid2Ut2swzyc8uTQeDbcn-~A7PcykFSOiY4J58I9kZnN4dDP6GyWBU9CxHRi0~8Kg-iPyOI5mYvCIeRetxaOprZVfGr3Q-Fy0F2ClSyHwgpGovuVoTJES3vJA~nZLXz5Z-hmUnXqTKquljM6erQRmzx~MfPOtmJJRPW3yvKvqg~vqsmaTuyRuUloUtT5Vv74l4dh2oOdpxIrg0NAu5Wca5Kxm8ND92cjFPi2MUZQr6OXrD90dEU0965XT-qFU3Vvv5-iCXEj5TcvUA__',
                      }}
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
                      }}
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 28,
                      elevation: 2,

                      position: 'absolute',
                      right: 40,
                      // zIndex: 2,
                      transform: [
                        {
                          rotate: '-15deg',
                        },
                        {
                          translateX: -25,
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/bdc6/db2a/3a906b3de8eaa53e14582edf5c918b5d?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7P8CfaZR8VN~AB1t4yamhll4GWaFTFOGHWe5KuCLxDNe4~p9UhUbNtg9VA8aaFLDKPmwuByzP7CpTyF1KFHwPwChykfMqAhFl6iJGCErm9vbcCeYixeYDT1QE1JWrVlT5y4YfuzY2H1hH9V0dHwAzKAc8hMALmYPIoMNsqxZICi6T0PjW0ATcq~eeOYXaxtY9S30thVMs3WHidear3kaHFhkU-MO7VCCQVDbjVzVvy~PWSw-QZcZiqNvkC-lm0DLJlzBtuVkjIlOgoW2JTZqVMcaNUau2ybiuv2uIAR~tRoO18JRvqWgC55EfDQZ1lvwk1mAkeoSHqBPHP954d7kQ__',
                      }}
                    />
                  </View>
                </>
              )}
              {cardStyle === 'many' && (
                <>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 24,
                      elevation: 2,
                      top: 8,
                      position: 'absolute',
                      right: 50,
                      zIndex: 3,
                      transform: [
                        {
                          rotate: '15deg',
                        },
                        {
                          translateX: 40,
                        },
                        {
                          translateY: 0,
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 24,
                      elevation: 2,
                      top: 8,
                      position: 'absolute',
                      right: 50,
                      zIndex: 2,
                      transform: [
                        {
                          rotate: '-8deg',
                        },
                        {
                          translateX: -5,
                        },
                        {
                          translateY: 0,
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/bdc6/db2a/3a906b3de8eaa53e14582edf5c918b5d?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7P8CfaZR8VN~AB1t4yamhll4GWaFTFOGHWe5KuCLxDNe4~p9UhUbNtg9VA8aaFLDKPmwuByzP7CpTyF1KFHwPwChykfMqAhFl6iJGCErm9vbcCeYixeYDT1QE1JWrVlT5y4YfuzY2H1hH9V0dHwAzKAc8hMALmYPIoMNsqxZICi6T0PjW0ATcq~eeOYXaxtY9S30thVMs3WHidear3kaHFhkU-MO7VCCQVDbjVzVvy~PWSw-QZcZiqNvkC-lm0DLJlzBtuVkjIlOgoW2JTZqVMcaNUau2ybiuv2uIAR~tRoO18JRvqWgC55EfDQZ1lvwk1mAkeoSHqBPHP954d7kQ__',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      borderRadius: 24,
                      top: 8,
                      position: 'absolute',
                      right: 50,

                      transform: [
                        {
                          rotate: '-15deg',
                        },
                        {
                          translateX: -35,
                        },
                        {
                          translateY: 0,
                        },
                      ],
                    }}>
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
                  </View>
                </>
              )}
              {cardStyle === 'three' && (
                <>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 24,
                      elevation: 2,
                      top: 8,
                      position: 'absolute',
                      right: 50,
                      zIndex: 3,
                      transform: [
                        {
                          rotate: '15deg',
                        },
                        {
                          translateX: 40,
                        },
                        {
                          translateY: 0,
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      // height: 76,

                      borderRadius: 24,
                      elevation: 2,
                      top: 8,
                      position: 'absolute',
                      right: 50,
                      zIndex: 2,
                      transform: [
                        {
                          rotate: '-8deg',
                        },
                        {
                          translateX: -5,
                        },
                        {
                          translateY: 0,
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/3d5c/b72f/ae1e058c2ed75ab981a9f8bb62e96a13?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLVk4o9pF4TeqOoV6dal-2dmplZtYv2Bpb-hXF4aMiRb~HXQjEkUC0VCXl88DEjxnYOB1illOoGLzsFKq6DDz9G2W5NJrdRRnVGg18HjwOfA30g9F2Q9XIr7qhWuuN6h7u7kJKoyfRgN7xn8VssMnZg1G8n3ezbyrnvyAqD62W-CQlvlFjUXyQjVkMQevpvRNbr81nXUMRf5uk75P~agZaNEoy8cmdLKigAxlkG~mTodT4jPGFEB3Y1JjCEVXCq-W-7gnICrmvmL9e2OZ-DHmquJCvsosY8uVYCwflJN7~5hJygfZ9pMJXBxnqgv9bCJ-DQwMaZHekWOdpMErwyw7Q__',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      borderRadius: 24,
                      top: 0,
                      position: 'absolute',
                      right: 50,

                      transform: [
                        {
                          rotate: '-25deg',
                        },
                        {
                          translateX: -45,
                        },
                        {
                          translateY: -3,
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
                      source={{
                        uri: 'https://s3-alpha-sig.figma.com/img/bdc6/db2a/3a906b3de8eaa53e14582edf5c918b5d?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7P8CfaZR8VN~AB1t4yamhll4GWaFTFOGHWe5KuCLxDNe4~p9UhUbNtg9VA8aaFLDKPmwuByzP7CpTyF1KFHwPwChykfMqAhFl6iJGCErm9vbcCeYixeYDT1QE1JWrVlT5y4YfuzY2H1hH9V0dHwAzKAc8hMALmYPIoMNsqxZICi6T0PjW0ATcq~eeOYXaxtY9S30thVMs3WHidear3kaHFhkU-MO7VCCQVDbjVzVvy~PWSw-QZcZiqNvkC-lm0DLJlzBtuVkjIlOgoW2JTZqVMcaNUau2ybiuv2uIAR~tRoO18JRvqWgC55EfDQZ1lvwk1mAkeoSHqBPHP954d7kQ__',
                      }}
                    />
                  </View>
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
