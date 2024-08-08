import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React, {SetStateAction} from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import DateTimePicker from 'react-native-ui-datepicker';
import CustomModal from '../../components/common/customModal/CustomModal';
import NormalButton from '../../components/common/NormalButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {LinkPreview} from '@flyerhq/react-native-link-preview';
import { TemBooks } from '../../utils/GetRandomColor';
import { GridList } from 'react-native-ui-lib';


const CreateNewFaceDown = ({navigation}: NavigProps<null>) => {
  const {colors, font, window} = useStyles();
  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dateModal, setDateModal] = React.useState(false);
  const [selectSchedule, setSelectSchedule] = React.useState('Weekly');
  const [imageAssets, setImageAssets] = React.useState<boolean>(false);
  const [imageModal, setImageModal] = React.useState<string>('');
  const [linkUrl, setLinkUrl] = React.useState('');
  const [selectDate, setSelectDate] = React.useState<SetStateAction<Date>>(
    new Date(),
  );
  const [booksModal, setBooksModal] = React.useState(false);
  const [selectOptionItem, setSelectOptionItem] = React.useState<number>();
  const [selectBook, setSelectBook] = React.useState<number>();

  const handleImagePick = async (option: 'camera' | 'library') => {
    try {
      if (option === 'camera') {
        const result = await launchCamera({
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
          includeBase64: true,
        });

        if (!result.didCancel) {
          setImageAssets(result?.assets![0].uri);
          // console.log(result);
        }
      }
      if (option === 'library') {
        const result = await launchImageLibrary({
          mediaType: 'photo',
          maxWidth: 500,
          maxHeight: 500,
          quality: 0.5,
          includeBase64: true,
        });

        if (!result.didCancel) {
          setImageAssets(result?.assets![0].uri);
          // console.log(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectSchedule);
  console.log(selectDate);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="New Face Dwn"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.light,
          fontFamily: font.PoppinsSemiBold,
        }}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '8%',
        }}>
        <View
          style={{
            paddingLeft: '10%',
            marginVertical: '5%',

            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
            gap: 16,
          }}>
          <View
            style={{
              elevation: 10,
              backgroundColor: colors.normal,
              padding: 1,
              width: 106,
              borderRadius: 46,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 46,
                alignSelf: 'center',
              }}
              source={
                imageAssets
                  ? {uri: imageAssets}
                  : require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg')
              }
            />
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                // handleImagePick('camera');
                setImageModal(true)
              }}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
                backgroundColor: 'rgba(217, 217, 217, 1)',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 100,
                alignSelf: 'center',
              }}>
              <SvgXml
                xml={`<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.9974 7.66667C4.98406 7.66667 4.16406 6.84667 4.16406 5.83333C4.16406 4.82 4.98406 4 5.9974 4C7.01073 4 7.83073 4.82 7.83073 5.83333C7.83073 6.84667 7.01073 7.66667 5.9974 7.66667ZM5.9974 5C5.5374 5 5.16406 5.37333 5.16406 5.83333C5.16406 6.29333 5.5374 6.66667 5.9974 6.66667C6.4574 6.66667 6.83073 6.29333 6.83073 5.83333C6.83073 5.37333 6.4574 5 5.9974 5Z" fill="#767676"/>
<path d="M9.9987 15.6667H5.9987C2.3787 15.6667 0.832031 14.12 0.832031 10.5V6.49999C0.832031 2.87999 2.3787 1.33333 5.9987 1.33333H8.66536C8.9387 1.33333 9.16536 1.55999 9.16536 1.83333C9.16536 2.10666 8.9387 2.33333 8.66536 2.33333H5.9987C2.92536 2.33333 1.83203 3.42666 1.83203 6.49999V10.5C1.83203 13.5733 2.92536 14.6667 5.9987 14.6667H9.9987C13.072 14.6667 14.1654 13.5733 14.1654 10.5V7.16666C14.1654 6.89333 14.392 6.66666 14.6654 6.66666C14.9387 6.66666 15.1654 6.89333 15.1654 7.16666V10.5C15.1654 14.12 13.6187 15.6667 9.9987 15.6667Z" fill="#767676"/>
<path d="M12 6.33329C11.7267 6.33329 11.5 6.10662 11.5 5.83329V1.83329C11.5 1.63329 11.62 1.44662 11.8067 1.37329C11.9933 1.29995 12.2067 1.33995 12.3533 1.47995L13.6867 2.81329C13.88 3.00662 13.88 3.32662 13.6867 3.51995C13.4933 3.71329 13.1733 3.71329 12.98 3.51995L12.5 3.03995V5.83329C12.5 6.10662 12.2733 6.33329 12 6.33329Z" fill="#767676"/>
<path d="M10.6663 3.66663C10.5396 3.66663 10.413 3.61996 10.313 3.51996C10.1196 3.32663 10.1196 3.00663 10.313 2.81329L11.6463 1.47996C11.8396 1.28663 12.1596 1.28663 12.353 1.47996C12.5463 1.67329 12.5463 1.99329 12.353 2.18663L11.0196 3.51996C10.9196 3.61996 10.793 3.66663 10.6663 3.66663Z" fill="#767676"/>
<path d="M1.77954 13.6334C1.61954 13.6334 1.45954 13.5534 1.36621 13.4134C1.21288 13.1867 1.27288 12.8734 1.49954 12.7201L4.78621 10.5134C5.50621 10.0334 6.49954 10.0867 7.15288 10.6401L7.37288 10.8334C7.70621 11.1201 8.27288 11.1201 8.59954 10.8334L11.3729 8.4534C12.0795 7.84673 13.1929 7.84673 13.9062 8.4534L14.9929 9.38673C15.1995 9.56673 15.2262 9.88006 15.0462 10.0934C14.8662 10.3001 14.5462 10.3267 14.3395 10.1467L13.2529 9.2134C12.9195 8.92673 12.3595 8.92673 12.0262 9.2134L9.25288 11.5934C8.54621 12.2001 7.43288 12.2001 6.71954 11.5934L6.49954 11.4001C6.19288 11.1401 5.68622 11.1134 5.34622 11.3467L2.06621 13.5534C1.97288 13.6067 1.87288 13.6334 1.77954 13.6334Z" fill="#767676"/>
</svg>
`}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: 'rgba(118, 118, 118, 1)',
                  fontFamily: font.Poppins,
                }}>
                Choose photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            gap: 15,
            marginHorizontal: '4%',
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: '#A1A1A1',
              paddingLeft: 10,
            }}>
            Face Dwn name
          </Text>
          <TextInput
            style={{
              fontFamily: font.Poppins,
              backgroundColor: colors.secondaryColor,
              borderRadius: 100,
              fontSize: 14,
              paddingHorizontal: 20,
              height: 56,
              color: colors.textColor.neutralColor,
            }}
            defaultValue="Asadullah charity house "
          />
        </View>

        <View
          style={{
            gap: 15,
            marginHorizontal: '4%',
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: '#A1A1A1',
              paddingLeft: 10,
            }}>
            Face Dwn members
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 80,
            }}
            onPress={() => {
              navigation?.navigate('FaceDownAddMember');
            }}>
            <Image
              resizeMode="cover"
              style={{
                borderRadius: 24,

                height: 80,
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/icons/unknown/addMember.png')}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            gap: 15,
            marginHorizontal: '4%',
            marginVertical: 10,
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
          {linkUrl ? (
            <LinkPreview
              text={linkUrl}
              enableAnimation
              renderLinkPreview={({
                aspectRatio,
                containerWidth,
                previewData,
              }) => {
                // console.log(previewData);
                return (
                  <View
                    style={{
                      width: '90%',
                      height: height * 0.1,
                      backgroundColor: previewData?.title
                        ? colors.secondaryColor
                        : colors.white,
                      borderRadius: 15,

                      flexDirection: 'row',
                      // paddingHorizontal: '4%',
                      gap: 10,
                      alignSelf: 'center',
                    }}>
                    {previewData?.image && (
                      <Image
                        source={{uri: previewData?.image?.url}}
                        style={{
                          width: width * 0.27,
                          height: height * 0.1,
                          borderRadius: 15,
                        }}
                      />
                    )}
                    <View
                      style={{
                        width: width * 0.45,
                        height: '100%',
                        // alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: font.PoppinsSemiBold,
                          fontSize: 14,
                          color: colors.textColor.primaryColor,
                          marginTop: -15,
                        }}
                        numberOfLines={1}>
                        {previewData?.title}
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={{
                          marginTop: 10,
                          fontFamily: font.Poppins,
                          fontSize: 10,
                          color: colors.textColor.primaryColor,
                        }}>
                        {previewData?.link}
                      </Text>
                    </View>
                    {/* <Text>{previewData?.link}</Text> */}
                    {/* {!previewData?.link && <Text>None</Text>} */}
                  </View>
                );
              }}
            />
          ) : (
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
                source={
                  selectBook
                    ?  selectBook
                    : require('../../assets/tempAssets/book.jpg')
                }
              />
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <TextInput
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
              defaultValue="write image /book/url link"
            />
            <TouchableOpacity
              onPress={() => {
                setBooksModal(true);
              }}
              activeOpacity={0.8}
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
            {/* <TouchableOpacity
              activeOpacity={0.8}
              style={{
                height: 50,
                width: 50,
                backgroundColor: colors.secondaryColor,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SvgXml
                xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 9.75C6.48 9.75 5.25 8.52 5.25 7C5.25 5.48 6.48 4.25 8 4.25C9.52 4.25 10.75 5.48 10.75 7C10.75 8.52 9.52 9.75 8 9.75ZM8 5.75C7.31 5.75 6.75 6.31 6.75 7C6.75 7.69 7.31 8.25 8 8.25C8.69 8.25 9.25 7.69 9.25 7C9.25 6.31 8.69 5.75 8 5.75Z" fill="${colors.textColor.normal}"/>
<path d="M14 21.75H8C2.57 21.75 0.25 19.43 0.25 14V8C0.25 2.57 2.57 0.25 8 0.25H12C12.41 0.25 12.75 0.59 12.75 1C12.75 1.41 12.41 1.75 12 1.75H8C3.39 1.75 1.75 3.39 1.75 8V14C1.75 18.61 3.39 20.25 8 20.25H14C18.61 20.25 20.25 18.61 20.25 14V9C20.25 8.59 20.59 8.25 21 8.25C21.41 8.25 21.75 8.59 21.75 9V14C21.75 19.43 19.43 21.75 14 21.75Z" fill="${colors.textColor.normal}"/>
<path d="M17 7.74994C16.59 7.74994 16.25 7.40994 16.25 6.99994V0.999939C16.25 0.699939 16.43 0.419939 16.71 0.309939C16.99 0.199939 17.31 0.259939 17.53 0.469939L19.53 2.46994C19.82 2.75994 19.82 3.23994 19.53 3.52994C19.24 3.81994 18.76 3.81994 18.47 3.52994L17.75 2.80994V6.99994C17.75 7.40994 17.41 7.74994 17 7.74994Z" fill="${colors.textColor.normal}"/>
<path d="M15.0014 3.74994C14.8114 3.74994 14.6214 3.67994 14.4714 3.52994C14.1814 3.23994 14.1814 2.75994 14.4714 2.46994L16.4714 0.469941C16.7614 0.179941 17.2414 0.179941 17.5314 0.469941C17.8214 0.759941 17.8214 1.23994 17.5314 1.52994L15.5314 3.52994C15.3814 3.67994 15.1914 3.74994 15.0014 3.74994Z" fill="${colors.textColor.normal}"/>
<path d="M1.66932 18.7001C1.42932 18.7001 1.18932 18.5801 1.04932 18.3701C0.819316 18.0301 0.909317 17.5601 1.24932 17.3301L6.17932 14.0201C7.25932 13.3001 8.74932 13.3801 9.72932 14.2101L10.0593 14.5001C10.5593 14.9301 11.4093 14.9301 11.8993 14.5001L16.0593 10.9301C17.1193 10.0201 18.7893 10.0201 19.8593 10.9301L21.4893 12.3301C21.7993 12.6001 21.8393 13.0701 21.5693 13.3901C21.2993 13.7001 20.8193 13.7401 20.5093 13.4701L18.8793 12.0701C18.3793 11.6401 17.5393 11.6401 17.0393 12.0701L12.8793 15.6401C11.8193 16.5501 10.1493 16.5501 9.07932 15.6401L8.74932 15.3501C8.28932 14.9601 7.52933 14.9201 7.01933 15.2701L2.09932 18.5801C1.95932 18.6601 1.80932 18.7001 1.66932 18.7001Z" fill="${colors.textColor.normal}"/>
</svg>

`}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            gap: 15,
            marginHorizontal: '4%',
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: '#A1A1A1',
              paddingLeft: 10,
            }}>
            Add Face Dwn description
          </Text>
          <TextInput
            multiline
            textAlignVertical="top"
            style={{
              fontFamily: font.Poppins,
              backgroundColor: colors.secondaryColor,
              borderRadius: 20,
              fontSize: 14,
              paddingHorizontal: 20,
              height: window.height * 0.25,
              color: colors.textColor.neutralColor,
            }}
            defaultValue="elit. placerat ex non, elit. In ac nibh Ut non non urna porta dui sapien enim. elit placerat. sed Ut tincidunt amet, vitae sit enim. facilisis vel volutpat Ut 

sed Quisque ac lobortis, Quisque urna ipsum Nam id tempor placerat. Morbi ipsum sollicitudin. dui. urna nulla, Donec vitae vehicula, quis libero, commodo ex "
          />
        </View>
        <View
          style={{
            gap: 15,
            marginHorizontal: '4%',
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 14,
              color: '#A1A1A1',
              paddingLeft: 10,
            }}>
            Set Schedule
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            activeOpacity={0.8}
            style={{
              backgroundColor: colors.secondaryColor,
              borderRadius: 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              height: 56,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              {selectSchedule ? selectSchedule : selectDate.toString()}
            </Text>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1648_2291)">
<path d="M21.75 5.685C21.749 4.74645 21.3757 3.84664 20.712 3.18298C20.0484 2.51933 19.1486 2.14603 18.21 2.145H17.5714V1.5C17.5714 1.30109 17.4924 1.11032 17.3518 0.96967C17.2111 0.829018 17.0204 0.75 16.8214 0.75C16.6225 0.75 16.4318 0.829018 16.2911 0.96967C16.1505 1.11032 16.0715 1.30109 16.0715 1.5V2.145H6.42915V1.5C6.42915 1.30109 6.35013 1.11032 6.20948 0.96967C6.06883 0.829018 5.87806 0.75 5.67915 0.75C5.48024 0.75 5.28947 0.829018 5.14882 0.96967C5.00817 1.11032 4.92915 1.30109 4.92915 1.5V2.145H4.29C3.35145 2.14603 2.45164 2.51933 1.78798 3.18298C1.12433 3.84664 0.751032 4.74645 0.75 5.685V18.21C0.751032 19.1486 1.12433 20.0484 1.78798 20.712C2.45164 21.3757 3.35145 21.749 4.29 21.75H12.3097C13.4941 22.7141 14.9729 23.2435 16.5 23.25C18.2896 23.248 20.0053 22.5362 21.2708 21.2708C22.5362 20.0053 23.248 18.2896 23.25 16.5C23.2435 14.9729 22.7141 13.4941 21.75 12.3097V5.685ZM4.29 3.645H4.92855V4.28505C4.92855 4.48396 5.00757 4.67473 5.14822 4.81538C5.28887 4.95603 5.47964 5.03505 5.67855 5.03505C5.87746 5.03505 6.06823 4.95603 6.20888 4.81538C6.34953 4.67473 6.42855 4.48396 6.42855 4.28505V3.645H16.0702V4.28505C16.0702 4.48396 16.1493 4.67473 16.2899 4.81538C16.4306 4.95603 16.6213 5.03505 16.8202 5.03505C17.0192 5.03505 17.2099 4.95603 17.3506 4.81538C17.4912 4.67473 17.5702 4.48396 17.5702 4.28505V3.645H18.21C18.7508 3.64564 19.2694 3.86077 19.6518 4.2432C20.0342 4.62564 20.2494 5.14415 20.25 5.685V6.3216H2.25V5.685C2.25064 5.14415 2.46577 4.62564 2.8482 4.2432C3.23064 3.86077 3.74915 3.64564 4.29 3.645ZM2.25 18.21V7.8216H20.25V10.8927C18.9525 10.0226 17.3932 9.62995 15.8384 9.78177C14.2836 9.93359 12.8298 10.6205 11.7251 11.7251C10.6205 12.8298 9.93359 14.2836 9.78177 15.8384C9.62995 17.3932 10.0226 18.9525 10.8927 20.25H4.29C3.74917 20.2493 3.23068 20.0342 2.84825 19.6518C2.46582 19.2693 2.25067 18.7508 2.25 18.21ZM16.5 21.75C15.4616 21.75 14.4466 21.4421 13.5833 20.8652C12.7199 20.2883 12.047 19.4684 11.6496 18.5091C11.2523 17.5498 11.1483 16.4942 11.3509 15.4758C11.5534 14.4574 12.0535 13.5219 12.7877 12.7877C13.5219 12.0535 14.4574 11.5534 15.4758 11.3509C16.4942 11.1483 17.5498 11.2523 18.5091 11.6496C19.4684 12.047 20.2883 12.7199 20.8652 13.5833C21.4421 14.4466 21.75 15.4616 21.75 16.5C21.7483 17.8919 21.1947 19.2263 20.2105 20.2105C19.2263 21.1947 17.8919 21.7483 16.5 21.75Z" fill="${colors.textColor.normal}"/>
<path d="M17.25 16.1895V13.5C17.25 13.3011 17.171 13.1103 17.0303 12.9697C16.8897 12.829 16.6989 12.75 16.5 12.75C16.3011 12.75 16.1103 12.829 15.9697 12.9697C15.829 13.1103 15.75 13.3011 15.75 13.5V16.5C15.75 16.5985 15.7694 16.696 15.8071 16.787C15.8448 16.878 15.9001 16.9607 15.9697 17.0303L17.4697 18.5303C17.6112 18.6669 17.8007 18.7425 17.9973 18.7408C18.1939 18.739 18.3821 18.6602 18.5211 18.5211C18.6602 18.3821 18.739 18.1939 18.7408 17.9973C18.7425 17.8007 18.6669 17.6112 18.5303 17.4697L17.25 16.1895Z" fill="${colors.textColor.normal}"/>
</g>
<defs>
<clipPath id="clip0_1648_2291">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={{
          paddingHorizontal: '4%',
          paddingVertical: '3%',
        }}>
        <NormalButton
          title="Create Face Dwn"
          onPress={() => {
            navigation?.navigate('FaceDownConversation');
          }}
        />
      </View>

      <ModalOfBottom
        height={'32%'}
        onlyTopRadius={15}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}>
        <View style={{gap: 3}}>
          <TouchableOpacity
            onPress={() => {
              setSelectSchedule('Daily');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              //   navigation?.navigate('FriendsProfile');
              setSelectSchedule('2 Day');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              2 day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              //   navigation?.navigate('FriendsProfile');
              setSelectSchedule('Weekly');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              //   navigation?.navigate('FriendsProfile');
              setSelectSchedule('Monthly');
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectSchedule('');
              setModalVisible(false);
              setDateModal(!dateModal);
              //   navigation?.navigate('FriendsProfile');
              //   DateTimePickerAndroid?.open();
            }}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Select date
            </Text>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1649_2300)">
<path d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z" fill="#5C5C5C"/>
<path d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z" fill="#5C5C5C"/>
<path d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z" fill="#5C5C5C"/>
<path d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z" fill="#5C5C5C"/>
</g>
<defs>
<clipPath id="clip0_1649_2300">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>


`}
            />
          </TouchableOpacity>
        </View>
      </ModalOfBottom>

      <CustomModal
        height={'43%'}
        Radius={20}
        paddingHorizontal="4%"
        modalVisible={dateModal}
        backButton
        setModalVisible={setDateModal}>
        <DateTimePicker
          headerContainerStyle={{
            marginTop: '10%',
          }}
          headerButtonColor={colors.redis}
          headerTextStyle={{
            color: colors.redis,
            fontFamily: font.Poppins,
            fontSize: 14,
          }}
          headerButtonSize={14}
          headerButtonStyle={{
            backgroundColor: colors.bg,
            elevation: 1,
            borderRadius: 4,
          }}
          calendarTextStyle={{
            color: colors.textColor.light,
          }}
          selectedItemColor={colors.blue}
          weekDaysTextStyle={{
            color: colors.primaryColor,
            fontFamily: font.Poppins,
            fontSize: 12,
          }}
          headerTextContainerStyle={{
            backgroundColor: colors.bg,
            elevation: 1,
            marginHorizontal: 5,
            // paddingVertical: 2,
            paddingHorizontal: 10,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          mode="single"
          date={selectDate}
          onChange={(params: any) => {
            setSelectDate(params.date);
            setDateModal(false);
          }}
        />
      </CustomModal>
      <CustomModal
        modalVisible={booksModal}
        setModalVisible={setBooksModal}
        height={'85%'}
        containerColor={colors.bg}
        Radius={20}
        appearance
        backButton>
     <>
          <View
            style={{
              paddingHorizontal: '4%',
              marginTop: 25,
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
          {/* <View
            style={{
              borderBottomWidth: 1,
              borderBlockColor: 'rgba(217, 217, 217, 1)',
            }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              horizontal
              contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 20,
                paddingTop: 20,
                paddingBottom: 15,
              }}
              data={TemBooks}
              renderItem={item => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectOptionItem(item.index);
                    }}
                    style={{
                      backgroundColor:
                        selectOptionItem === item.index
                          ? colors.primaryColor
                          : colors.secondaryColor,
                      height: 35,
                      paddingHorizontal: 20,
                      // paddingVertical: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Text
                      style={{
                        color:
                          selectOptionItem === item.index
                            ? colors.textColor.white
                            : colors.textColor.light,
                        fontSize: 12,
                        fontFamily: font.PoppinsMedium,
                        textAlign: 'center',
                      }}>
                      {item.item.content}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            />
          </View> */}

          <GridList
            showsVerticalScrollIndicator={false}
            containerWidth={width * 0.82}
            numColumns={2}
            data={TemBooks}
            columnWrapperStyle={{
              gap: 20,
              alignSelf: 'center',
            }}
            contentContainerStyle={{
              gap: 20,
              paddingVertical: 20,
            }}
            renderItem={item => (
              <TouchableOpacity
              onPress={() => {
                setBooksModal(false)
                setSelectBook(item?.item.image)
                // navigation?.navigate('BookShare', {data: item.item});
              }}
              style={{
                // elevation: 2,
                // backgroundColor: colors.bg,
                // padding: 2,
                borderRadius: 24,
                // height: height * 0.243,
                // alignItems : "center",
                // justifyContent : "center",
              }}>
           <View style={{
            elevation : 1,
            padding : 3,
         
         
           }}>
           <Image
              resizeMode='stretch'
                style={{
                  height: height * 0.24,
                  width: width * 0.41,
                  borderRadius: 24,
                  borderWidth : 2,
                  borderColor : colors.bg
                }}
                source={item.item.image}
              />
           </View>
              <View style={{
                marginTop : 10,
                alignItems : "center",
                gap : 5,
                maxWidth : width * 0.41,
              }}>
              <Text style={{
                color: colors.textColor.light,
                fontSize: 14,
                fontFamily: font.PoppinsMedium,
                
              }}>{item.item.title}</Text>
              <Text style={{
                color: colors.textColor.neutralColor,
                fontSize: 12,
                fontFamily: font.Poppins,
                
              }}>{item.item.publisher}</Text>
              </View>
            </TouchableOpacity>
            )}
          />
        </>
      </CustomModal>


  {/* "image modal" */}
  <ModalOfBottom
        modalVisible={imageModal}
        setModalVisible={setImageModal}
        onlyTopRadius={20}
        panOf
        containerColor={colors.bg}>
        <View
          style={{
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              handleImagePick('camera');
              setImageModal(!imageModal);
            }}
            style={{
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleImagePick('library');
              setImageModal(!imageModal);
            }}
            style={{
              paddingVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsMedium,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              Image form gallery
            </Text>
          </TouchableOpacity>
        </View>
      </ModalOfBottom>


    </View>
  );
};

export default CreateNewFaceDown;
