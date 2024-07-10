import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {GFonts} from '../../styles/GFonts';
import {GColors} from '../../styles/GColors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {SvgUri, SvgXml} from 'react-native-svg';

const HomeScreen = () => {
  return (
    <View
      style={{
        height: '100%',
        // backgroundColor: 'gray',
        backgroundColor: GColors.white,
      }}>
      {/*==================== profile card start ===================  */}
      <LinearGradient
        colors={[
          'rgba(255,255,255,1)',
          'rgba(255,255,255,1)',
          'rgba(255,255,255,1)',
          'rgba(255,255,255,1)',
          'rgba(255,255,255,1)',
          'rgba(255,255,255,0.0)',
        ]}
        style={{
          height: 80,
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
          <Image
            style={{
              height: 48,
              width: 48,
              borderRadius: 100,
              // backgroundColor: 'lightgray',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/7568/3fd5/7261c2ae940abab762a6e0130b36b3a9?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AykSrcYr~WEBIHMW4WezFwp74XIKqwz1DXFJPi-jBgpPa0w-AKmFioPrvXMG08QXjqfFJ7xtZ25idfjkopahkcvMKxIXm4TY4TBZFWD~2ZCGL4jbefjiM0ufmw09012~6B89nl~j6xWjd9ggQilJal8vQ8KUcmdm-KyxNUlAA0yT-JwjW~4Hx9gzTiaI8mXu9SmdrwivuQtAmxDNBHcx0hvDb7l8zrX95Hww4mVqCT-z3AbxnyyzEvIgAivaXFHPvNFXDdOp23QKhDg~zKX5ZObnIYL7uNdvhuAZWiwbKxUOSag8laDRybIo8hjF63zSi6rL9nm7x5pUOleZgtmDfQ__',
            }}
          />
          <View
            style={{
              gap: -2,
            }}>
            <Text
              style={{
                fontFamily: GFonts.Poppins,
                fontSize: 12,
                color: '#720B24',
              }}>
              Welcome to SIC
            </Text>
            <Text
              style={{
                fontFamily: GFonts.PoppinsSemiBold,
                fontSize: 16,
                color: GColors.textColor.blackSemiBold,
              }}>
              Asadullah
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 19,
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/search/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/icons/bell/bell.png')} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/*==================== profile card end ===================  */}
      {/*==================== Body part Start ===================  */}

      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingTop: 16,
          paddingBottom: 16,
        }}>
        {/*========================== conversation card start ======================= */}

        {/*================= donation card ============= */}
        <View
          style={{
            paddingHorizontal: '4%',
          }}>
          <View
            style={{
              backgroundColor: GColors.secondaryColor,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              elevation: 3,
            }}>
            <View
              style={{
                gap: 4,
                marginRight: 1,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsSemiBold,
                  fontSize: 17,
                  color: GColors.textColor.blackSemiBold,
                }}>
                Hello Asadullah
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.Poppins,
                  fontSize: 12,
                  color: GColors.textColor.blackSemiBold,
                }}>
                Contribute and share with others.
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 13,
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  style={{
                    height: 32,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: GColors.primaryColor,
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
                      fontFamily: GFonts.Poppins,
                      fontSize: 12,
                      color: GColors.white,
                    }}>
                    Share
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 32,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: GColors.green['#00B047'],
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
                      fontFamily: GFonts.Poppins,
                      fontSize: 12,
                      color: GColors.white,
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
          </View>
        </View>

        {/*==================== normal card===================  */}
        <View
          style={{
            paddingHorizontal: '4%',
          }}>
          <View
            style={{
              backgroundColor: GColors.secondaryColor,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              elevation: 3,
            }}>
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
                      fontFamily: GFonts.PoppinsMedium,
                      fontSize: 12,
                      color: GColors.textColor.blackSemiBold,
                    }}>
                    You
                  </Text>
                  <Text
                    style={{
                      fontFamily: GFonts.PoppinsMedium,
                      fontSize: 13,
                      color: GColors.textColor.blackMediumLight,
                    }}>
                    Start a chat
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: GFonts.PoppinsMedium,
                    fontSize: 13,
                    color: GColors.textColor.redLight,
                  }}>
                  9:30 am
                </Text>
                <Text
                  style={{
                    fontFamily: GFonts.Poppins,
                    fontSize: 13,
                    color: GColors.textColor.blackMediumLight,
                  }}
                  numberOfLines={2}>
                  All of my friends pleas Share your story my friends
                </Text>
              </View>
            </View>
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
          </View>
        </View>

        {/*========================== conversation card end ======================= */}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 65,
          zIndex: +100,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: '4%',
            paddingVertical: 16,
            backgroundColor: GColors.primaryColor,
            // borderBottomWidth: 1,
            width: 100,
            height: 100,
            // borderColor: '#E2E2E2',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/microphone/microphone.png')}
          />
        </TouchableOpacity>
      </View>
      {/*==================== Body part end ===================  */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
