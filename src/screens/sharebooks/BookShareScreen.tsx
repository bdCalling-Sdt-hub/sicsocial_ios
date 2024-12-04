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
import {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
} from '../../redux/apiSlices/bookSlices';

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
  const {data: BooksData} = useGetAllBooksQuery({});
  const [booksModal, setBooksModal] = React.useState(false);

  const [pdfPath, setPdfPath] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [createChat, createChartResults] = useCreateChatMutation({});
  const [createMessage, createMessageResult] = useCreateMessageMutation({});
  const {colors, font} = useStyles();

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

  // console.log(createChartInfo);
  const handleCreateNewChat = React.useCallback(() => {
    const formData = new FormData();

    createChat({type: 'public'}).then(res => {
      console.log(res);
      console.log(BookData?.data?._id);
      if (res?.data?.data?._id) {
        formData.append('chatId', res.data?.data?._id);

        BookData?.data?._id && formData.append('book', BookData?.data?._id);

        createMessage(formData).then(ms => {
          console.log(ms);
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
        console.log('Error downloading PDF:', error);
        setIsLoading(false); // ত্রুটি হলেও লোডার বন্ধ করুন
      }
    };

    downloadPdf();
  }, [BookData?.data?._id]);

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
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.blueColor,
                      fontFamily: font.Poppins,
                    }}>
                    {BookData?.data?.bookUrl}
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
            Live setup
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
              {selectBook && (
                <Image
                  resizeMode="stretch"
                  style={{
                    borderRadius: 24,

                    height: 150,
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={selectBook}
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
              <TouchableOpacity
                onPress={() => {
                  setLiveModal(true);
                }}
                activeOpacity={0.9}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: colors.secondaryColor,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SvgXml
                  xml={`<svg width="32" height="28" viewBox="0 0 32 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_771_5364)">
<path d="M19.7831 9H16.4974H13.0289C12.1944 9.00141 11.5172 9.61924 11.5117 10.3842V18.6158C11.5172 19.3807 12.1944 19.9985 13.0289 19.9999H19.7874C19.973 20.0025 20.1519 19.9369 20.2845 19.8179C20.4111 19.6987 20.4818 19.539 20.4817 19.3727V9.64035C20.4809 9.28698 20.1686 9.00072 19.7831 9ZM16.786 9.52381H18.4645V11.9805L17.8688 11.1096C17.8447 11.0728 17.811 11.0419 17.7708 11.0198C17.6355 10.9454 17.46 10.9856 17.3788 11.1096L16.786 11.9765V9.52381ZM12.0903 10.3842C12.0926 9.90988 12.5115 9.52597 13.0289 9.52381H16.2145V12.1952C16.2038 12.4079 16.3494 12.6008 16.5703 12.6666C16.8217 12.736 17.0474 12.5868 17.1817 12.3903L17.626 11.7356L18.0703 12.3903C18.2031 12.5841 18.4288 12.7334 18.6874 12.6666C18.9072 12.6011 19.0525 12.4095 19.0431 12.1978V9.53035H19.7874C19.8533 9.53107 19.9066 9.57989 19.9074 9.64035V17.2354C19.8677 17.2292 19.8276 17.2262 19.7874 17.2264H13.0289C12.688 17.2263 12.3572 17.332 12.0903 17.5263V10.3842ZM19.9074 18.3565L13.3203 18.363C13.1625 18.363 13.0346 18.4803 13.0346 18.6249C13.0346 18.7696 13.1625 18.8868 13.3203 18.8868L19.9074 18.8803V19.3674C19.9077 19.3967 19.8954 19.425 19.8731 19.446C19.8502 19.4664 19.8193 19.4777 19.7874 19.4774H13.0289C12.5101 19.4774 12.0896 19.0919 12.0896 18.6164C12.0896 18.1409 12.5101 17.7554 13.0289 17.7554H19.7874C19.8533 17.7561 19.9066 17.805 19.9074 17.8654V18.3565Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip1_771_5364)">
<path d="M30.1545 18H27.4165H24.526C23.8306 18.0013 23.2663 18.5629 23.2617 19.2583V26.7416C23.2663 27.437 23.8306 27.9987 24.526 27.9999H30.1581C30.3127 28.0022 30.4619 27.9427 30.5724 27.8345C30.6778 27.7261 30.7368 27.5809 30.7367 27.4297V18.5821C30.736 18.2609 30.4758 18.0007 30.1545 18ZM27.6569 18.4762H29.0557V20.7095L28.5593 19.9178C28.5392 19.8843 28.5112 19.8563 28.4776 19.8362C28.3649 19.7685 28.2186 19.8051 28.151 19.9178L27.6569 20.7059V18.4762ZM23.7439 19.2583C23.7458 18.8272 24.0948 18.4782 24.526 18.4762H27.1807V20.9047C27.1718 21.098 27.2932 21.2735 27.4772 21.3333C27.6867 21.3964 27.8748 21.2607 27.9867 21.0821L28.3569 20.4869L28.7272 21.0821C28.8379 21.2583 29.026 21.394 29.2414 21.3333C29.4246 21.2737 29.5457 21.0996 29.5379 20.9071V18.4821H30.1581C30.2131 18.4828 30.2575 18.5272 30.2581 18.5821V25.4867C30.2251 25.4811 30.1916 25.4783 30.1581 25.4785H24.526C24.242 25.4784 23.9663 25.5745 23.7439 25.7511V19.2583ZM30.2581 26.5059L24.7689 26.5119C24.6374 26.5119 24.5308 26.6185 24.5308 26.7499C24.5308 26.8814 24.6374 26.988 24.7689 26.988L30.2581 26.9821V27.4249C30.2583 27.4516 30.2481 27.4773 30.2295 27.4964C30.2104 27.5149 30.1847 27.5252 30.1581 27.5249H24.526C24.0937 27.5249 23.7433 27.1745 23.7433 26.7422C23.7433 26.3099 24.0937 25.9595 24.526 25.9595H30.1581C30.2131 25.9601 30.2575 26.0045 30.2581 26.0595V26.5059Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip2_771_5364)">
<path d="M8.15453 18H5.41646H2.526C1.83061 18.0013 1.2663 18.5629 1.26172 19.2583V26.7416C1.2663 27.437 1.83061 27.9987 2.526 27.9999H8.15811C8.31275 28.0022 8.46188 27.9427 8.57239 27.8345C8.67783 27.7261 8.73679 27.5809 8.73667 27.4297V18.5821C8.73602 18.2609 8.47578 18.0007 8.15453 18ZM5.65693 18.4762H7.05573V20.7095L6.55931 19.9178C6.53919 19.8843 6.51115 19.8563 6.47764 19.8362C6.36487 19.7685 6.21862 19.8051 6.15098 19.9178L5.65693 20.7059V18.4762ZM1.74386 19.2583C1.74582 18.8272 2.09484 18.4782 2.526 18.4762H5.18074V20.9047C5.17178 21.098 5.29315 21.2735 5.47717 21.3333C5.68669 21.3964 5.87479 21.2607 5.98669 21.0821L6.35693 20.4869L6.72716 21.0821C6.83788 21.2583 7.02597 21.394 7.24145 21.3333C7.4246 21.2737 7.54573 21.0996 7.53787 20.9071V18.4821H8.15811C8.21308 18.4828 8.25745 18.5272 8.25811 18.5821V25.4867C8.22507 25.4811 8.19162 25.4783 8.15811 25.4785H2.526C2.24198 25.4784 1.9663 25.5745 1.74386 25.7511V19.2583ZM8.25811 26.5059L2.76885 26.5119C2.63737 26.5119 2.53076 26.6185 2.53076 26.7499C2.53076 26.8814 2.63737 26.988 2.76885 26.988L8.25811 26.9821V27.4249C8.25834 27.4516 8.24811 27.4773 8.22953 27.4964C8.21043 27.5149 8.18474 27.5252 8.15811 27.5249H2.526C2.09371 27.5249 1.74326 27.1745 1.74326 26.7422C1.74326 26.3099 2.09371 25.9595 2.526 25.9595H8.15811C8.21308 25.9601 8.25745 26.0045 8.25811 26.0595V26.5059Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip3_771_5364)">
<path d="M30.1545 0H27.4165H24.526C23.8306 0.00127975 23.2663 0.562943 23.2617 1.25833V8.74161C23.2663 9.437 23.8306 9.99866 24.526 9.99994H30.1581C30.3127 10.0022 30.4619 9.94268 30.5724 9.83447C30.6778 9.72613 30.7368 9.5809 30.7367 9.42971V0.582139C30.736 0.260891 30.4758 0.000654758 30.1545 0ZM27.6569 0.476188H29.0557V2.70951L28.5593 1.91785C28.5392 1.88433 28.5112 1.85627 28.4776 1.83618C28.3649 1.76853 28.2186 1.80508 28.151 1.91785L27.6569 2.70594V0.476188ZM23.7439 1.25833C23.7458 0.827168 24.0948 0.478152 24.526 0.476188H27.1807V2.90474C27.1718 3.09805 27.2932 3.27349 27.4772 3.33331C27.6867 3.39641 27.8748 3.26069 27.9867 3.08212L28.3569 2.48689L28.7272 3.08212C28.8379 3.25831 29.026 3.39403 29.2414 3.33331C29.4246 3.27373 29.5457 3.09956 29.5379 2.90713V0.48214H30.1581C30.2131 0.482795 30.2575 0.527169 30.2581 0.582139V7.48671C30.2251 7.48112 30.1916 7.47835 30.1581 7.47853H24.526C24.242 7.47844 23.9663 7.57454 23.7439 7.75114V1.25833ZM30.2581 8.5059L24.7689 8.51185C24.6374 8.51185 24.5308 8.61846 24.5308 8.74995C24.5308 8.88144 24.6374 8.98804 24.7689 8.98804L30.2581 8.98209V9.42494C30.2583 9.45158 30.2481 9.47726 30.2295 9.49637C30.2104 9.51491 30.1847 9.52518 30.1581 9.52494H24.526C24.0937 9.52494 23.7433 9.1745 23.7433 8.74221C23.7433 8.30992 24.0937 7.95948 24.526 7.95948H30.1581C30.2131 7.96013 30.2575 8.00451 30.2581 8.05948V8.5059Z" fill="${colors.textColor.normal}"/>
</g>
<g clip-path="url(#clip4_771_5364)">
<path d="M8.15453 0H5.41646H2.526C1.83061 0.00127975 1.2663 0.562943 1.26172 1.25833V8.74161C1.2663 9.437 1.83061 9.99866 2.526 9.99994H8.15811C8.31275 10.0022 8.46188 9.94268 8.57239 9.83447C8.67783 9.72613 8.73679 9.5809 8.73667 9.42971V0.582139C8.73602 0.260891 8.47578 0.000654758 8.15453 0ZM5.65693 0.476188H7.05573V2.70951L6.55931 1.91785C6.53919 1.88433 6.51115 1.85627 6.47764 1.83618C6.36487 1.76853 6.21862 1.80508 6.15098 1.91785L5.65693 2.70594V0.476188ZM1.74386 1.25833C1.74582 0.827168 2.09484 0.478152 2.526 0.476188H5.18074V2.90474C5.17178 3.09805 5.29315 3.27349 5.47717 3.33331C5.68669 3.39641 5.87479 3.26069 5.98669 3.08212L6.35693 2.48689L6.72716 3.08212C6.83788 3.25831 7.02597 3.39403 7.24145 3.33331C7.4246 3.27373 7.54573 3.09956 7.53787 2.90713V0.48214H8.15811C8.21308 0.482795 8.25745 0.527169 8.25811 0.582139V7.48671C8.22507 7.48112 8.19162 7.47835 8.15811 7.47853H2.526C2.24198 7.47844 1.9663 7.57454 1.74386 7.75114V1.25833ZM8.25811 8.5059L2.76885 8.51185C2.63737 8.51185 2.53076 8.61846 2.53076 8.74995C2.53076 8.88144 2.63737 8.98804 2.76885 8.98804L8.25811 8.98209V9.42494C8.25834 9.45158 8.24811 9.47726 8.22953 9.49637C8.21043 9.51491 8.18474 9.52518 8.15811 9.52494H2.526C2.09371 9.52494 1.74326 9.1745 1.74326 8.74221C1.74326 8.30992 2.09371 7.95948 2.526 7.95948H8.15811C8.21308 7.96013 8.25745 8.00451 8.25811 8.05948V8.5059Z" fill="${colors.textColor.normal}"/>
</g>
<defs>
<clipPath id="clip0_771_5364">
<rect width="12" height="11" fill="white" transform="translate(10 9)"/>
</clipPath>
<clipPath id="clip1_771_5364">
<rect width="10" height="10" fill="white" transform="translate(22 18)"/>
</clipPath>
<clipPath id="clip2_771_5364">
<rect width="10" height="10" fill="white" transform="translate(0 18)"/>
</clipPath>
<clipPath id="clip3_771_5364">
<rect width="10" height="10" fill="white" transform="translate(22)"/>
</clipPath>
<clipPath id="clip4_771_5364">
<rect width="10" height="10" fill="white"/>
</clipPath>
</defs>
</svg>
`}
                />
              </TouchableOpacity>
            </View>
          </View>
          <NormalButton
            onPress={() => {
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
