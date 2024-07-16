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
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';

const MassageScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          height: 80,
          width: '100%',
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
          <View style={{}}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 20,
                color: colors.textColor.primaryColor,
              }}>
              Messages Box
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 19,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Search');
            }}>
            <SvgXml
              xml={`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Notifications');
              // setDark(!isDark);
            }}>
            <SvgXml
              xml={`<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17.5H1L1.39999 16.9667L1.5 16.8334V16.6667V8C1.5 3.85786 4.85786 0.5 9 0.5C13.1422 0.5 16.5 3.85786 16.5 8V16.6667V16.8334L16.6 16.9667L17 17.5ZM17 17.5L17 17.5L17 17.5L17 17.5L17 17.5L17 17.5ZM2.5 16V16.5H3H15H15.5V16V8C15.5 4.41015 12.5898 1.5 9 1.5C5.41015 1.5 2.5 4.41015 2.5 8V16ZM10.937 19.5C10.715 20.3626 9.93191 21 9 21C8.06809 21 7.28504 20.3626 7.06301 19.5H10.937Z" fill="${colors.textColor.secondaryColor}" stroke="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </View>
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
            style={{flex: 1}}
            placeholder="Search your books"
            placeholderTextColor={colors.textColor.neutralColor}
          />
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          borderTopColor: 'rgba(217, 217, 217, 1)',
          borderBlockColor: 'rgba(217, 217, 217, 1)',
          paddingVertical: 10,
          marginTop: 10,
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          horizontal
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 20,
          }}
          data={[...Array(10)]}
          renderItem={item => (
            <View style={{gap: 6}}>
              <TouchableOpacity
                onPress={() => {}}
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
                <Image
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 30,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: 'https://s3-alpha-sig.figma.com/img/d067/c913/ad868d019f92ce267e6de23af3413e5b?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pMfG6YS9I8ruMTaTRqegPV9zZCyzJf~VintWAZomMQnoTSOB9r4vUqRwLPv6QY8UI0ayslqETesPz1z608PL7Lar8-2OFbc56ajfs0Cd0~Oj2IqJmrBLGw6KNarGTI7iBGxg70mDxP5kJQQZGT0sYE0Sd02zOzMoEpcyAxxAQUKlAGkTJocs3DSzvA-3CCCfxvT2qe3qytPeU6v8du6tQgae7mnGcqPOah-VRkMnVjpZ5NXf0fHqtpgHVzEbCRbuQBObOqRLrc-89S7ihmEEysndEuAwU~U9bfmvholer8U4ygOM-VmKm4tcibG6THnu35W3dfic90~qZ6PgubDTeA__',
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
                Amina
              </Text>
            </View>
          )}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          gap: 10,
          // paddingHorizontal: 20,
          paddingBottom: 25,
          paddingTop: 15,
        }}
        data={[...Array(10)]}
        renderItem={item => (
          <>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: colors.secondaryColor,
                // paddingVertical: 5,
                alignItems: 'center',

                elevation: 1,
                borderRadius: 24,

                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 15,
                paddingHorizontal: 19,
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
                    padding: 2,
                    backgroundColor: 'white',
                    // elevation: 1,
                    borderWidth: 0.5,
                    borderColor: 'rgba(0,0,0,.2)',
                    borderRadius: 30,
                    transform: [
                      {
                        rotate: '-7deg',
                      },
                    ],
                  }}>
                  <Image
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 30,
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/d067/c913/ad868d019f92ce267e6de23af3413e5b?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pMfG6YS9I8ruMTaTRqegPV9zZCyzJf~VintWAZomMQnoTSOB9r4vUqRwLPv6QY8UI0ayslqETesPz1z608PL7Lar8-2OFbc56ajfs0Cd0~Oj2IqJmrBLGw6KNarGTI7iBGxg70mDxP5kJQQZGT0sYE0Sd02zOzMoEpcyAxxAQUKlAGkTJocs3DSzvA-3CCCfxvT2qe3qytPeU6v8du6tQgae7mnGcqPOah-VRkMnVjpZ5NXf0fHqtpgHVzEbCRbuQBObOqRLrc-89S7ihmEEysndEuAwU~U9bfmvholer8U4ygOM-VmKm4tcibG6THnu35W3dfic90~qZ6PgubDTeA__',
                    }}
                  />
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
                  Khushi Aktar
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
                    Assalamuallikum, how are you , can you read this book...
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: font.Poppins,
                      color: colors.textColor.rare,
                    }}>
                    9:30 am
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
      <View
        style={{
          height: '7.2%',
        }}
      />
    </View>
  );
};

export default MassageScreen;

const styles = StyleSheet.create({});
