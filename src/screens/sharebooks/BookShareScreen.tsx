import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useContextApi, useStyles} from '../../context/ContextApi';

import React from 'react';
import RNFetchBlob from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import {SvgXml} from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import NormalButton from '../../components/common/NormalButton';
import {NavigProps} from '../../interfaces/NaviProps';
import {useCreateChatMutation} from '../../redux/apiSlices/chatSlices';
import {useCreateMessageMutation} from '../../redux/apiSlices/messageSlies';
import {makeImage} from '../../utils/utils';

const BookShareScreen = ({navigation, route}: NavigProps<{data: any}>) => {
  const [pdfPath, setPdfPath] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [createChat, createChartResults] = useCreateChatMutation({});
  const [createMessage, createMessageResult] = useCreateMessageMutation({});
  const {colors, font} = useStyles();

  const Book = route.params?.data;

  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState(false);
  const {isDark, isLive, setIsLive} = useContextApi();

  const [liveModal, setLiveModal] = React.useState(false);

  // console.log(createChartInfo);
  const handleCreateNewChat = React.useCallback(data => {
    const formData = new FormData();

    createChat({type: 'public'}).then(res => {
      // console.log(res);
      if (res?.data?.data?._id) {
        formData.append('chatId', res.data?.data?._id);
        if (data?.path) {
          formData.append('path', data?.path);
        }
        createMessage(formData).then(ms => {
          // console.log(res);
        });
      }
    });
  }, []);

  React.useEffect(() => {
    // PDF ফাইলটি লোকালি ডাউনলোড করুন
    const downloadPdf = async () => {
      const pdfUrl = makeImage(route?.params?.data?.pdf);

      try {
        const res = await RNFetchBlob.config({
          fileCache: true,
        }).fetch('GET', pdfUrl);

        // ডাউনলোড হওয়া ফাইলের লোকাল পাথ
        setPdfPath(res.path());
        setIsLoading(false); // লোডিং সম্পূর্ণ হলে লোডার বন্ধ করুন
      } catch (error) {
        console.log('Error downloading PDF:', error);
        setIsLoading(false); // ত্রুটি হলেও লোডার বন্ধ করুন
      }
    };

    downloadPdf();
  }, [route?.params?.data?.pdf]);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Share Books"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.light,
          fontFamily: font.PoppinsSemiBold,
        }}
        button
        buttonComponent={
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            activeOpacity={0.9}
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7091 5.69031C9.40521 5.86132 6.31623 7.23667 3.94627 9.60668C1.40904 12.1439 0.0117188 15.5055 0.0117188 19.0723V24L1.79676 19.8851C3.88171 15.7306 8.1098 12.9761 12.7091 12.7198V18.3986L23.9884 9.18537L12.7091 0V5.69031ZM14.1147 7.07774V2.95742L21.7644 9.18701L14.1147 15.4355V11.2946H13.4119C10.747 11.2946 8.12999 12.0439 5.84399 13.4615C4.11284 14.5351 2.63788 15.9505 1.50565 17.613C2.22758 11.6846 7.29178 7.07774 13.4119 7.07774H14.1147Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        }
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1]}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        renderItem={({item, index}) => {
          return (
            <>
              {isLoading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#000" />
                </View>
              ) : (
                <View
                  style={{
                    // paddingHorizontal: '4%',
                    // paddingVertical: 10,
                    gap: 10,
                    borderRadius: 20,

                    height: 500,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.textColor.light,
                      fontFamily: font.PoppinsSemiBold,
                    }}>
                    Demo :
                  </Text>
                  <Pdf source={{uri: pdfPath}} style={styles.pdf} />
                </View>
              )}
            </>
          );
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: '4%',
                  paddingTop: '5%',
                  gap: 10,
                }}>
                <Image
                  style={{
                    width: width * 0.5,
                    height: height * 0.31,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                  }}
                  source={{
                    uri: makeImage(Book?.bookImage),
                  }}
                />
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.textColor.secondaryColor,
                      fontFamily: font.Poppins,
                    }}>
                    {Book?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {Book?.publisher}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.blueColor,
                      fontFamily: font.Poppins,
                    }}>
                    {Book?.bookUrl}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('PdfViewer', {
                        data: route?.params?.data,
                      });
                    }}
                    style={{
                      paddingVertical: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.bg,
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: colors.primaryColor,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      <Text style={{color: colors.textColor.white}}>
                        Reading This Book
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(Book?.bookUrl);
                    }}
                    style={{
                      paddingVertical: '3%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.bg,
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: colors.blue,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      <Text style={{color: colors.textColor.white}}>
                        Listening This Book
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      />
      <ModalOfBottom
        onlyTopRadius={15}
        modalVisible={modalVisible}
        containerColor={colors.bg}
        setModalVisible={setModalVisible}>
        <View>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              // setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
              handleCreateNewChat({
                path: 'CreateNewChat',
              });
              setModalVisible(false);
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Share Book
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              // setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
              // setModalVisible(false);
              // navigation?.navigate('');
              // setIsLive();
              setLiveModal(!liveModal);
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Share room
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setIsFriend(false);
              // setConfirmationModal(!confirmationModal);
              // setIsFriendRequest(false);
              // setIsFriendRequestSent(false);
              setModalVisible(false);
              navigation?.navigate('CreateFaceDown');
            }}
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              New Face Dwn
            </Text>
          </TouchableOpacity>
        </View>
      </ModalOfBottom>

      <ModalOfBottom
        modalVisible={liveModal}
        setModalVisible={setLiveModal}
        // backButton

        height={height * 0.8}
        containerColor={colors.bg}>
        <View
          // showsVerticalScrollIndicator={false}
          // keyboardShouldPersistTaps="always"
          style={{
            gap: 25,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 20,
              color: colors.textColor.secondaryColor,
              // marginBottom: 10,
            }}>
            Live setup
          </Text>
          <View
            style={{
              backgroundColor: isDark
                ? colors.neutralColor
                : colors.gray.variant,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 50,
              flexDirection: 'row',
              gap: 15,
            }}>
            <Image
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
              }}
              source={
                isDark
                  ? require('../../assets/icons/modalIcons/earthBlack.png')
                  : require('../../assets/icons/modalIcons/earthyGray.png')
              }
            />
            <View>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 14,
                  color: colors.textColor.neutralColor,
                }}>
                Public
              </Text>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 12,
                  color: colors.textColor.neutralColor,
                }}>
                Everyone can join this room
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                gap: 15,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: '#A1A1A1',
                }}>
                Add title
              </Text>
              <TextInput
                value="Asadullah calling live"
                placeholderTextColor={colors.textColor.light}
                style={{
                  fontFamily: font.Poppins,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  color: colors.textColor.neutralColor,
                }}
                placeholder="type "
              />
            </View>
          </View>
          <View
            style={{
              gap: 15,
              // marginHorizontal: '4%',
              // marginVertical: 10,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: '#A1A1A1',
                paddingLeft: 10,
              }}>
              Share content
            </Text>

            <TouchableOpacity activeOpacity={0.8}>
              <Image
                resizeMode="stretch"
                style={{
                  borderRadius: 24,

                  height: 150,
                  width: 120,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                source={require('../../assets/tempAssets/book.jpg')}
              />
            </TouchableOpacity>

            {/* <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <TextInput
              placeholder="shear url/link"
              onChangeText={text => setLinkUrl(text)}
              style={{
                fontFamily: font.Poppins,
                backgroundColor: colors.secondaryColor,
                borderRadius: 100,
                fontSize: 14,
                paddingHorizontal: 20,
                height: 56,
                flex: 1,
                color: colors.textColor.neutralColor,
              }}
              // defaultValue="write image /book/url link"
            />
          </View> */}
          </View>
          <NormalButton
            onPress={() => {
              setModalVisible(false);
              setLiveModal(false);
              navigation?.navigate('LiveConversation');
            }}
            title="Start Live"
          />
        </View>
      </ModalOfBottom>
    </View>
  );
};

export default BookShareScreen;
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
