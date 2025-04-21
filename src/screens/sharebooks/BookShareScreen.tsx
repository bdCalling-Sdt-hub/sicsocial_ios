import {
  ActivityIndicator,
  Alert,
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
import PopUpModal, {
  PopUpModalRef,
} from '../../components/common/modals/PopUpModal';
import {useContextApi, useStyles} from '../../context/ContextApi';
import {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
} from '../../redux/apiSlices/bookSlices';
import {lStorage, makeImage} from '../../utils/utils';

import React from 'react';
import RNFetchBlob from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import {SvgXml} from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import NormalButton from '../../components/common/NormalButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useCreateChatMutation} from '../../redux/apiSlices/chatSlices';
import {useCreateLiveMutation} from '../../redux/apiSlices/liveSlice';
import {useCreateMessageMutation} from '../../redux/apiSlices/messageSlies';

const BookShareScreen = ({navigation, route}: NavigProps<{data: any}>) => {
  const {data: BooksData} = useGetAllBooksQuery({});
  const [favoriteData, setFavoriteData] = React.useState([]);
  const [offlineBookData, setOfflineBookData] = React.useState([]);
  const modalRef = React.useRef<PopUpModalRef>();
  const [pdfPath, setPdfPath] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingBookDownload, setIsLoadingBookDownload] =
    React.useState(false);
  const [createChat, createChartResults] = useCreateChatMutation({});
  const [createMessage, createMessageResult] = useCreateMessageMutation({});
  const {colors, font} = useStyles();

  const [liveInfo, setLiveInfo] = React.useState<any>();
  const {
    data: BookData,
    isLoading: isBookLoading,
    refetch: refetchBook,
  } = useGetBookByIdQuery({id: route?.params?.data?._id});

  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState(false);
  const {isDark, isLive, setIsLive} = useContextApi();

  const [selectBook, setSelectBook] = React.useState<number>();

  const [liveModal, setLiveModal] = React.useState(false);

  const handleFavorite = React.useCallback((item: any) => {
    const favoriteItem = lStorage.getArray('favoriteBooks');
    if (favoriteItem) {
      const isExist = favoriteItem.find((i: any) => i._id === item._id);
      if (!isExist) {
        favoriteItem.push(item);
        setFavoriteData(favoriteItem);
        lStorage.setArray('favoriteBooks', favoriteItem);
      } else {
        // remove if exit
        const filtered = favoriteItem.filter((i: any) => i._id !== item._id);
        setFavoriteData(filtered);
        lStorage.setArray('favoriteBooks', filtered);
      }
    } else {
      lStorage.setArray('favoriteBooks', [item]);
    }
  }, []);

  const handleDownloadOffline = React.useCallback(async (item: any) => {
    try {
      setIsLoadingBookDownload(true);
      const offlineBooks = lStorage.getArray('offlineBooks') || [];
      const isExist = offlineBooks.find((i: any) => i._id === item._id);

      if (!isExist) {
        // Create a copy of the item to avoid direct mutation
        const itemCopy = {...item};

        // Define the media keys to download
        const mediaKeys = ['pdf', 'bookImage'];

        // Process media keys for downloading files
        await Promise.all(
          mediaKeys.map(async key => {
            if (itemCopy[key]) {
              try {
                // Extract file name from URL
                const fileName = itemCopy[key].split('/').pop();
                const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;

                // Check if file already exists and delete if necessary
                const fileExists = await RNFetchBlob.fs.exists(localPath);
                if (fileExists) {
                  await RNFetchBlob.fs.unlink(localPath);
                }

                // Download and move the file to the local path
                const res = await RNFetchBlob.config({
                  fileCache: true,
                }).fetch('GET', makeImage(itemCopy[key]));

                await RNFetchBlob.fs.mv(res.path(), localPath);

                // Update the copied item with the local path
                itemCopy[key] = localPath;
              } catch (error) {
                setIsLoadingBookDownload(false);
                console.log(`Failed to download ${key}:`, error);
              }
            }
          }),
        );

        // Save the updated copy to local storage
        setOfflineBookData(offlineBooks);
        offlineBooks.push(itemCopy);
        lStorage.setArray('offlineBooks', offlineBooks);
        setIsLoadingBookDownload(false);
        modalRef.current?.open({
          title: 'Success',
          content: 'Book downloaded successfully ,\n Now you can read offline',
        });
      } else {
        // remove if exit
        const filtered = offlineBooks.filter((i: any) => i._id !== item._id);
        setOfflineBookData(filtered);
        lStorage.setArray('offlineBooks', filtered);
        setIsLoadingBookDownload(false);
      }
    } catch (error) {
      setIsLoadingBookDownload(false);
      console.log('Error handling offline download:', error);
    }
  }, []);

  // console.log(createChartInfo);
  const handleCreateNewChat = React.useCallback(() => {
    const formData = new FormData();

    createChat({type: 'public'}).then(res => {
      // console.log(res);
      // console.log(BookData?.data?._id);
      if (res?.data?.data?._id) {
        formData.append('chatId', res.data?.data?._id);

        BookData?.data?._id && formData.append('book', BookData?.data?._id);

        createMessage(formData).then(ms => {
          // console.log(ms);
        });
      }
    });
  }, [BookData?.data?._id]);

  React.useEffect(() => {
    // PDF ফাইলটি লোকালি ডাউনলোড করুন
    const downloadPdf = async () => {
      const pdfUrl = makeImage(BookData?.data?.pdf);

      try {
        const res = await RNFetchBlob.config({
          fileCache: true,
        }).fetch('GET', pdfUrl);

        // ডাউনলোড হওয়া ফাইলের লোকাল পাথ
        setPdfPath(res.path());
        setIsLoading(false); // লোডিং সম্পূর্ণ হলে লোডার বন্ধ করুন
      } catch (error) {
        // console.log('Error downloading PDF:', error);
        setIsLoading(false); // ত্রুটি হলেও লোডার বন্ধ করুন
      }
    };

    downloadPdf();
  }, [BookData?.data?._id]);

  const [createLive] = useCreateLiveMutation();

  const handleCreateLive = React.useCallback(async () => {
    // console.log(liveInfo?.name);

    if (!liveInfo?.name) return Alert.alert('Please give a live name');
    const chatRes = await createChat({type: 'public'});
    // console.log(selectBook);

    if (chatRes?.data?.data?._id) {
      const createdLive = await createLive({
        chatId: chatRes?.data?.data?._id,
        role: 'host',
        name: liveInfo?.name,
        book: BookData?.data?._id,
      });
      if (createdLive?.data) {
        setLiveInfo(null);
        setSelectBook(null);
        setLiveModal(false);
        setModalVisible(false);

        (navigation as any)?.replace('LiveConversation', {
          live: createdLive?.data?.data?._id,
        });
      }
      if (createdLive?.error) {
        Alert.alert(
          'Warring',
          'You have already live please end th previous session',
        );

        // console.log('Warring', createdLive?.error?.data?.message);
      }
    } else {
      // console.log(chatRes?.error?.data?.message);
    }
  }, [selectBook, liveInfo]);

  React.useEffect(() => {
    lStorage.getArrayAsync('favoriteBooks').then(res => {
      if (res) {
        // console.log(res);
        setFavoriteData(res);
      }
      // console.log(res);
    });
    lStorage.getArrayAsync('offlineBooks').then(res => {
      if (res) {
        // console.log(res);
        setOfflineBookData(res);
      }
      // console.log(res);
    });
  }, []);

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
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              flex: 1,
              gap: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={tw`px-2 py-1 border border-gray-200 rounded-full`}>
              <SvgXml
                xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7091 5.69031C9.40521 5.86132 6.31623 7.23667 3.94627 9.60668C1.40904 12.1439 0.0117188 15.5055 0.0117188 19.0723V24L1.79676 19.8851C3.88171 15.7306 8.1098 12.9761 12.7091 12.7198V18.3986L23.9884 9.18537L12.7091 0V5.69031ZM14.1147 7.07774V2.95742L21.7644 9.18701L14.1147 15.4355V11.2946H13.4119C10.747 11.2946 8.12999 12.0439 5.84399 13.4615C4.11284 14.5351 2.63788 15.9505 1.50565 17.613C2.22758 11.6846 7.29178 7.07774 13.4119 7.07774H14.1147Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
              />
            </TouchableOpacity>
            <View style={tw`px-2 py-1 border border-gray-200 rounded-full`}>
              {isLoadingBookDownload ? (
                <ActivityIndicator color={colors.primaryColor} size={'small'} />
              ) : offlineBookData?.find(
                  item => item?._id === BookData?.data?._id,
                )?._id ? (
                <TouchableOpacity
                  onPress={() => {
                    handleDownloadOffline(BookData?.data);
                  }}>
                  <SvgXml
                    xml={`<svg width="26" height="26" fill="${colors?.primaryColor}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>
`}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleDownloadOffline(BookData?.data);
                  }}>
                  <SvgXml
                    xml={`<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                handleFavorite(BookData?.data);
              }}
              style={tw`px-2 py-1 border border-gray-200 rounded-full`}>
              <SvgXml
                xml={`<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z" fill="${
                  favoriteData?.find(item => item?._id === BookData?.data?._id)
                    ?._id
                    ? '#FF0000'
                    : colors.textColor.white
                }" stroke="${
                  favoriteData?.find(item => item?._id === BookData?.data?._id)
                    ?._id
                    ? '#FF0000'
                    : colors.textColor.neutralColor
                }" stroke-width="2"></path> </g></svg>`}
              />
            </TouchableOpacity>
          </View>
        }
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1]}
        contentContainerStyle={{
          paddingVertical: 10,
          gap: 10,
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
                    borderRadius: 5,
                    paddingVertical: 10,
                    borderColor: colors.textColor.neutralColor,
                    // backgroundColor: colors.secondaryColor,
                    borderWidth: 0.1,
                    marginHorizontal: '5%',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: colors.textColor.light,
                      fontFamily: font.PoppinsSemiBold,
                      marginHorizontal: '5%',
                    }}>
                    Preview :
                  </Text>
                  <Pdf singlePage source={{uri: pdfPath}} style={styles.pdf} />
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
                  borderColor: colors.textColor.neutralColor,
                  // backgroundColor: colors.secondaryColor,
                  borderWidth: 0.1,
                  // elevation: 0.1,
                  marginHorizontal: '5%',
                  paddingBottom: 10,
                  borderRadius: 5,
                }}>
                <Image
                  style={{
                    width: width * 0.5,

                    height: height * 0.31,
                    resizeMode: 'stretch',
                    borderRadius: 20,
                  }}
                  source={{
                    uri: makeImage(BookData?.data?.bookImage),
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
                    {BookData?.data?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textColor.neutralColor,
                      fontFamily: font.Poppins,
                    }}>
                    {BookData?.data?.publisher}
                  </Text>
                  {/* <Text
                    onPress={() => {
                      Linking.openURL(BookData?.data?.bookUrl);
                    }}
                    style={{
                      fontSize: 12,
                      color: colors.blue,
                      fontFamily: font.Poppins,
                    }}>
                    {BookData?.data?.bookUrl}
                  </Text> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('PdfViewer', {
                        data: BookData?.data,
                      });
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.bg,
                    }}>
                    <View
                      style={{
                        borderRadius: 5,
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
                      Linking.openURL(BookData?.data?.bookUrl);
                    }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.bg,
                    }}>
                    <View
                      style={{
                        borderRadius: 5,
                        // backgroundColor: colors.blue,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderColor: colors.primaryColor,
                        borderWidth: 1,
                      }}>
                      <Text style={{color: colors.primaryColor}}>
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
              handleCreateNewChat();
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
              navigation?.navigate('CreateFaceDown', {
                data: BookData?.data,
              });
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

      {/*======================== live setup modal =================== */}
      <ModalOfBottom
        modalVisible={liveModal}
        setModalVisible={setLiveModal}
        // backButton
        containerColor={colors.bg}>
        <View
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
            Room setup
          </Text>

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
                value={liveInfo?.name}
                placeholderTextColor={colors.textColor.palaceHolderColor}
                style={{
                  color: colors.textColor.normal,
                  fontFamily: font.Poppins,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                }}
                placeholder="title"
                onChangeText={(text: any) =>
                  setLiveInfo({...liveInfo, name: text})
                }
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
              {BookData?.data?.bookImage && (
                <Image
                  resizeMode="stretch"
                  style={{
                    borderRadius: 24,

                    height: 150,
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={{uri: makeImage(BookData?.data?.bookImage)}}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              {/* <TextInput
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
              /> */}
            </View>
          </View>
          <NormalButton
            onPress={() => {
              handleCreateLive();
            }}
            title="Start Room"
          />
        </View>
      </ModalOfBottom>
      <PopUpModal ref={modalRef} />
    </View>
  );
};

export default BookShareScreen;
const styles = StyleSheet.create({
  pdf: {
    aspectRatio: 1,
    height: Dimensions.get('window').height * 0.3,
    alignSelf: 'center',
    borderRadius: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
