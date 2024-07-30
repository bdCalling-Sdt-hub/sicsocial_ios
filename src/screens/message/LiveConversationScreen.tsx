import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import ConversationHeader from '../../components/conversation/ConversationHeader';
import {useContextApi, useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';
import {LinkPreview} from '@flyerhq/react-native-link-preview';
import {GridList, Toast} from 'react-native-ui-lib';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Divider from '../../components/common/Divider';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import CustomModal from '../../components/common/customModal/CustomModal';
import Clipboard from '@react-native-clipboard/clipboard';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NotifyTopComponent from '../../components/common/notify/NotifyTopComponent';
import NormalButton from '../../components/common/NormalButton';
import {TextInput} from 'react-native';

const Friends = [
  {
    id: 1,
    name: 'Amina',
    img: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    lastMessage: 'Assalamuallikum, how are...',
  },
  {
    id: 2,
    name: 'Arif',
    img: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    lastMessage: 'Sir you are great.',
    host: true,
  },
  {
    id: 3,
    name: 'Rahman',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 4,
    name: 'Mithila',
    img: require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg'),
    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 5,
    name: 'Samina',
    img: require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 6,
    name: 'Samina',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 7,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 8,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 9,
    name: 'Amina',
    img: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    lastMessage: 'Assalamuallikum, how are...',
  },
  {
    id: 10,
    name: 'Arif',
    img: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    lastMessage: 'Sir you are great.',
  },
  {
    id: 11,
    name: 'Rahman',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 12,
    name: 'Mithila',
    img: require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg'),
    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 13,
    name: 'Samina',
    img: require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 14,
    name: 'Samina',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 15,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
    sound: true,
  },
  {
    id: 16,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 17,
    name: 'Amina',
    img: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    lastMessage: 'Assalamuallikum, how are...',
  },
  {
    id: 18,
    name: 'Arif',
    img: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    lastMessage: 'Sir you are great.',
    // host: true,
  },
  {
    id: 19,
    name: 'Rahman',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 20,
    name: 'Mithila',
    img: require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg'),
    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 21,
    name: 'Samina',
    img: require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 22,
    name: 'Samina',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 23,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 24,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 25,
    name: 'Amina',
    img: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    lastMessage: 'Assalamuallikum, how are...',
  },
  {
    id: 26,
    name: 'Arif',
    img: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    lastMessage: 'Sir you are great.',
  },
  {
    id: 27,
    name: 'Rahman',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 28,
    name: 'Mithila',
    img: require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg'),
    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 29,
    name: 'Samina',
    img: require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 30,
    name: 'Samina',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
  {
    id: 31,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
    sound: true,
  },
  {
    id: 32,
    name: 'Samina',
    img: require('../../assets/tempAssets/86efa3df337e8c215dd8095476bb6513.jpg'),
    lastMessage: 'you: I’m feeling good',
    group: false,
  },
];
const Books = [
  {
    id: 1,
    content: 'All',
    image:
      'https://s3-alpha-sig.figma.com/img/b585/a027/7f388786571d771f17b0126f4f4b800e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OC~YaczzAJGqizqlco5iCX~PGxyzUApVZAXbAVgFyiyI~8CT~WCcRn-9uBCMYkGYfbxfNB~3IJZ-TR7UZXX-eFstZmoOkurN4MPc5zQkcaBeYbACaOlbU-ht7rC3nvPJLR1fdDGViukbtJFIcqJsbFEAVBI4fjbrMA~ZB6HkVQEYxWZk5fPyIhUiqdR5tzOzeK8GYVYWtAsJ9Mn1oDpquODytUnzuIn8iLPf~lPyp44TAcERVyIwFG8U~a8h3bkUFzuejdt~LW7~9ESbOwwS0koDiTvrT5eotZI5vzriZZJ2n-4zF1nI39CHpG3pvqL9VfVDSNgctcQMnzANzH2xqg__',
  },
  {
    id: 2,
    content: 'Way of Life',
    image:
      'https://s3-alpha-sig.figma.com/img/b485/2fe5/af0552a10655c69b712579ca828ea910?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UFuFuMAqtH233TU3imgCV05rZeo~aNm15BTdHNp6FVrQ4brkHBB9gVIr5K58pimYDt54lSZKdiCmA-vwuC3vwI8abuJ8jfXrnYnwA4Sodia3aVJ2zFcQEIPoE2A48~Vx96K40jMsZicVbWcSmhMN3uyrvfKwOc7hnH22PZLcze0WoS7H7josWXf0AMYfHy11ryvlcyVQ0IM5WXn2o-S~M8JfP84vhqyO3-O2xI4ry2XUQZtvYc3KToGENW1NgR2DeyyViajAQKzXetyMbwiFYXBxxT9LqQpkh~YMAH0~9LxEPApmTiSyj7aQsn6LU2U~MOnWb9sgi8MmgYMfwO7J3A__',
  },
  {
    id: 3,
    content: 'Business',
    image:
      'https://s3-alpha-sig.figma.com/img/ac94/a291/488b4f850f0251fe5ba556fe9da20e2e?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lU30ivlnQY21xTbRlkrFvj6pGnG1JjeU~NrbRVoCvwEr4LLzjpFVmDt2GSZbNa0cXEH0GLV1ClbXE9MSrE-GFcwmBRSt6XM8DasUDCdRX3Xls0Y6J39oZRkmrsDpXL-odwKSEv8zzE2qBESxljPDZmBWYUSMWNueiliCXoDLPaSl3tNU18ZHs0ajIO-gp62LT0LQ6ytNlJgl9Ki8NIZ8HS6Em1brLMC7V9eF1LyZ9HFkhiKV5Z1IXZAzO~3aVsiULYyGHSPcAothJ1T~7SALoNqbwE3ScAPFwYBX50n-v88mXDDo5YgF7uhP6~dfEk9m39hMqvmTzN9erqtSAczWPg__',
  },
  {
    id: 4,
    content: 'Human Family',
    image:
      'https://s3-alpha-sig.figma.com/img/668f/869c/1019d2e044ead62f3eb08738a899354c?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C7NCI29l1S-7lBg-fBKMTxYfFI7Wz5tnea1OTf3k2chLtJW22V27J~328Ok-DI~IpJiQuHx~RQ-H87Ncz8N~aj92mLRJdIvZoflHwaaCI9DYkBd7I~hT03tJN6IDvh2eErhOPYhyfE3bH56-o3Eck3~Q5Ku3jPiIhP~Z4BuCuvsqZTrcA4Vd9Bqb6Ej-XzPjEtpVY14ISlWxhymCkMgdLnScOaIX6ue~UKaD5lxWUd03C71wDbwZi3Lao-7Xop599-bNfVSG525Xq7c2e63lxxLSYhDFRv7ietjecAiNiEIsXMRhnmP-cgnxMYDT2QK~CTZLV~R6KEowdLSt0aXwjA__',
  },
  {
    id: 5,
    content: 'Worldview',
    image:
      'https://s3-alpha-sig.figma.com/img/e98c/1a54/ee547a642f63a9a135f7b2b7d4b37956?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mGk4oV79QgAFlUfUGDlGutahqQXvpOYOIHhcR2LBxVpJIARIaReonfDBmXYqtA1d4oO2vC3lVp8UmptZ7~yCh~Xkn~z5DKXMkzpvT2oKsWEx~fcshksYJH24oWEinepfhnRh6rry8ZCSJK1qHMxwqDll-9ujtqr-EmdEkSlpOeKD9RtviWCgxtk-UhDFAVabFHsEORW4Ju4qkjBxjWenW8UqFxKUQgfbwBy-gTrF5x0vrMwAxhLm5S4lWppWjONOLNX6t98jQFrwo1oxiG-jzeHRmN4rlDnzN6ip6uFhM4sgCfcqsVW3M5N1iAz96ed50aoo2qRPSCamSF6ZFroRXw__',
  },
  {
    id: 6,
    content: 'Worldview',
    image:
      'https://s3-alpha-sig.figma.com/img/d180/9195/da84fbcfb6556b63dea67af8844a57d8?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XU8OsCuvhuriTh0fx0mDKR5Vz8K81jB6N5Yc~CS44rIvRCRRp4t~rZdYZ6mKP14C4Q8wt3a5WB8B0V1SZQv4gzft-iRV0ZzIFX1yDmy~6IIZmAIeywM2HxOfhutarGZtMxdOguZGlPF4OH4ScrSjjV5RQu5Zy9OHNUw-tPCdwT2oYgNEwtNYcJqAYBfw1IQWsB9l5VpGMsEjprp8QpZADhfvrL5w6Gq2BW1-B6~1cBQhfKV3Y0JefajMOIuI8YH~crtfuXWRP7Rfz7STD3q~iKtsT6fV8HG5e22X9c1RnLyAXIJj43Dd2jRC5kA4QAFkk-hzhihBAS3T5~2Q3rp7Jg__',
  },
];
const LiveConversationScreen = ({navigation}: NavigProps<null>) => {
  const {height, width} = useWindowDimensions();
  const {colors, font} = useStyles();
  const {isLive, setIsLive, isDark} = useContextApi();
  const [runOnVoice, setRunOnVoice] = React.useState<boolean>(false);
  const [isFriend, setIsFriend] = React.useState(false);
  const [isFriendRequest, setIsFriendRequest] = React.useState(false);
  const [isFriendRequestSent, setIsFriendRequestSent] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [open, setNotify] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [toggleNotify, setToggleNotify] = React.useState(0);
  const [showShortProfile, setShowShortProfile] =
    React.useState<boolean>(false);
  const [booksModal, setBooksModal] = React.useState(false);
  const [selectBook, setSelectBook] = React.useState<number>();
  const [liveModal, setLiveModal] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState('');
  const animatedVoice = useSharedValue(1);
  const [selectOptionItem, setSelectOptionItem] = React.useState<number>();

  const rVoiceStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: animatedVoice.value,
        },
      ],
    };
  });

  React.useEffect(() => {
    animatedVoice.value = withRepeat(
      withTiming(1.4, {duration: 1000}),
      -1,
      true,
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: colors.bg,
        width: width,
      }}>
      {/* all notification of lives start  */}
      <NotifyTopComponent
        context=""
        variant="normal"
        open={open}
        onDismiss={setNotify}
      />
      {/* all notification of lives end  */}
      <View
        style={{
          height: '7.5%',
        }}
      />

      <ConversationHeader
        title="Room"
        icon={`<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.28534 11.0001C6.15903 10.9997 6.03756 10.9514 5.94534 10.8651C5.48875 10.4316 5.12515 9.90972 4.87668 9.33122C4.62822 8.75272 4.50009 8.1297 4.50009 7.5001C4.50009 6.8705 4.62822 6.24748 4.87668 5.66898C5.12515 5.09048 5.48875 4.5686 5.94534 4.1351C6.04374 4.05532 6.16874 4.01585 6.29511 4.02468C6.42148 4.03351 6.53978 4.08997 6.62612 4.18266C6.71246 4.27535 6.76041 4.39736 6.76026 4.52404C6.76012 4.65071 6.7119 4.77261 6.62534 4.8651C6.26992 5.20579 5.98709 5.61485 5.79388 6.06769C5.60067 6.52052 5.50107 7.00777 5.50107 7.5001C5.50107 7.99243 5.60067 8.47968 5.79388 8.93251C5.98709 9.38535 6.26992 9.79442 6.62534 10.1351C6.69845 10.2035 6.74932 10.2924 6.77136 10.3901C6.7934 10.4877 6.7856 10.5898 6.74897 10.683C6.71233 10.7762 6.64855 10.8563 6.56589 10.9128C6.48323 10.9693 6.38549 10.9998 6.28534 11.0001ZM4.28534 12.3401C4.37847 12.2464 4.43074 12.1197 4.43074 11.9876C4.43074 11.8555 4.37847 11.7288 4.28534 11.6351C3.72596 11.1014 3.28068 10.4598 2.97644 9.74905C2.67221 9.03831 2.51534 8.27322 2.51534 7.5001C2.51534 6.72698 2.67221 5.96189 2.97644 5.25115C3.28068 4.5404 3.72596 3.89878 4.28534 3.3651C4.38215 3.27161 4.43785 3.1435 4.44019 3.00894C4.44254 2.87438 4.39133 2.74441 4.29784 2.6476C4.20436 2.5508 4.07624 2.4951 3.94168 2.49275C3.80713 2.49041 3.67715 2.54161 3.58034 2.6351C2.92171 3.2627 2.39736 4.01751 2.03909 4.85377C1.68083 5.69003 1.49609 6.59033 1.49609 7.5001C1.49609 8.40987 1.68083 9.31017 2.03909 10.1464C2.39736 10.9827 2.92171 11.7375 3.58034 12.3651C3.62846 12.4104 3.68506 12.4456 3.74689 12.4689C3.80871 12.4922 3.87454 12.503 3.94056 12.5006C4.00657 12.4983 4.07148 12.4829 4.13151 12.4554C4.19155 12.4278 4.24554 12.3886 4.29034 12.3401H4.28534ZM11.0503 10.8651C11.5069 10.4316 11.8705 9.90972 12.119 9.33122C12.3675 8.75272 12.4956 8.1297 12.4956 7.5001C12.4956 6.8705 12.3675 6.24748 12.119 5.66898C11.8705 5.09048 11.5069 4.5686 11.0503 4.1351C11.0024 4.09012 10.9461 4.05503 10.8846 4.03182C10.8231 4.00861 10.7576 3.99773 10.6919 3.99982C10.6262 4.00191 10.5616 4.01692 10.5017 4.04399C10.4418 4.07107 10.3878 4.10967 10.3428 4.1576C10.2979 4.20553 10.2628 4.26186 10.2396 4.32335C10.2163 4.38485 10.2055 4.45031 10.2076 4.51601C10.2097 4.58171 10.2247 4.64635 10.2517 4.70625C10.2788 4.76615 10.3174 4.82012 10.3653 4.8651C10.7227 5.20467 11.0072 5.61338 11.2017 6.06637C11.3961 6.51935 11.4963 7.00715 11.4963 7.5001C11.4963 7.99305 11.3961 8.48085 11.2017 8.93384C11.0072 9.38682 10.7227 9.79553 10.3653 10.1351C10.2688 10.2254 10.212 10.3503 10.2073 10.4824C10.2026 10.6146 10.2505 10.7432 10.3403 10.8401C10.3875 10.891 10.4448 10.9315 10.5085 10.959C10.5722 10.9866 10.6409 11.0006 10.7103 11.0001C10.8367 10.9997 10.9581 10.9514 11.0503 10.8651ZM13.4103 12.3651C14.0709 11.7386 14.597 10.9842 14.9565 10.1478C15.316 9.31136 15.5014 8.4105 15.5014 7.5001C15.5014 6.5897 15.316 5.68884 14.9565 4.85243C14.597 4.01602 14.0709 3.26158 13.4103 2.6351C13.312 2.55532 13.1869 2.51585 13.0606 2.52468C12.9342 2.53351 12.8159 2.58997 12.7296 2.68266C12.6432 2.77535 12.5953 2.89736 12.5954 3.02404C12.5956 3.15071 12.6438 3.27261 12.7303 3.3651C13.2897 3.89878 13.735 4.5404 14.0392 5.25115C14.3435 5.96189 14.5003 6.72698 14.5003 7.5001C14.5003 8.27322 14.3435 9.03831 14.0392 9.74905C13.735 10.4598 13.2897 11.1014 12.7303 11.6351C12.6338 11.7254 12.577 11.8503 12.5723 11.9824C12.5676 12.1146 12.6155 12.2432 12.7053 12.3401C12.752 12.3904 12.8084 12.4305 12.8712 12.458C12.934 12.4856 13.0018 12.4999 13.0703 12.5001C13.1967 12.4997 13.3181 12.4514 13.4103 12.3651ZM9.50034 7.5001C9.50034 7.30232 9.4417 7.10898 9.33181 6.94453C9.22193 6.78008 9.06575 6.65191 8.88303 6.57622C8.7003 6.50053 8.49924 6.48073 8.30525 6.51932C8.11127 6.5579 7.93309 6.65314 7.79324 6.79299C7.65339 6.93285 7.55814 7.11103 7.51956 7.30501C7.48097 7.49899 7.50078 7.70006 7.57646 7.88279C7.65215 8.06551 7.78032 8.22169 7.94477 8.33157C8.10922 8.44145 8.30256 8.5001 8.50034 8.5001C8.76556 8.5001 9.01991 8.39474 9.20745 8.20721C9.39499 8.01967 9.50034 7.76532 9.50034 7.5001Z" fill="#DBB162"/>
</svg>

`}
        button
        buttonComponent={
          <TouchableOpacity
            onPress={() => {
              setIsLive(false);
              navigation?.goBack();
            }}
            activeOpacity={0.8}
            style={{
              backgroundColor: 'rgba(241, 99, 101, 1)',
              width: '23%',
              height: 28,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <SvgXml
              xml={`<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_5429)">
<path d="M5.59375 1.80081V6.35366C5.59375 7.07206 6.17616 7.65447 6.89456 7.65447H10.6019C10.7815 7.65447 10.9271 7.80006 10.9271 7.97969V9.08769C10.9271 9.36653 11.255 9.51606 11.4655 9.33322L13.2152 7.81378C13.3335 7.71103 13.4849 7.65447 13.6416 7.65447H14.6994C15.4178 7.65447 16.0002 7.07206 16.0002 6.35366V1.80081C16.0002 1.08241 15.4178 0.5 14.6994 0.5H6.89456C6.17612 0.5 5.59375 1.08241 5.59375 1.80081Z" fill="#FD8087"/>
<path d="M14.7008 0.5H13.6602C14.3786 0.5 14.961 1.08241 14.961 1.80081V6.35366C14.961 7.07206 14.3786 7.65447 13.6602 7.65447H14.7008C15.4192 7.65447 16.0016 7.07206 16.0016 6.35366V1.80081C16.0016 1.08241 15.4192 0.5 14.7008 0.5Z" fill="#FE646F"/>
<path d="M9.76859 6.42007C9.44116 6.10485 9.01044 5.93125 8.55575 5.93125C8.46422 5.93125 8.37378 5.93825 8.28503 5.95194C8.23966 5.8905 8.18997 5.83163 8.13616 5.77575C7.80725 5.43413 7.36191 5.24597 6.88219 5.24597C6.41375 5.24597 5.95584 5.43522 5.62587 5.76519L5.59375 5.79732V6.35366C5.59375 7.07207 6.17616 7.65447 6.89456 7.65447H10.2982C10.293 7.18232 10.105 6.744 9.76859 6.42007Z" fill="#FE646F"/>
<path d="M10.0261 10.9296C9.69785 10.6136 9.17554 10.6174 8.85194 10.941L9.57966 10.2132C9.91203 9.88087 9.92007 9.32884 9.58144 9.0028C9.25319 8.68677 8.73088 8.69055 8.40728 9.01415L9.135 8.28643C9.46738 7.95405 9.47541 7.40202 9.13679 7.07599C8.80854 6.75996 8.28622 6.76374 7.96263 7.08734L7.46857 7.5814C7.79216 7.2578 7.79594 6.73549 7.47991 6.40724C7.15388 6.06862 6.60185 6.07665 6.26947 6.40902L2.86441 9.81412L3.29963 9.0603C3.53466 8.65321 3.39953 8.11793 2.98807 7.89065C2.58919 7.67034 2.08569 7.80918 1.85685 8.20552L0.536691 10.4921C-0.369715 12.062 -0.108622 14.045 1.17322 15.3269C2.73738 16.891 5.27338 16.891 6.83753 15.3269L10.0243 12.1401C10.3567 11.8077 10.3647 11.2556 10.0261 10.9296Z" fill="#FED2A4"/>
<path d="M10.0247 10.9297C10.0117 10.9171 9.99825 10.9053 9.98466 10.8938L6.19381 14.6847C4.73894 16.1395 2.44344 16.2409 0.871094 14.9893C0.964281 15.1062 1.06413 15.2193 1.17178 15.3269C2.73594 16.8911 5.27194 16.8911 6.83609 15.3269L10.0229 12.1401C10.3553 11.8077 10.3633 11.2557 10.0247 10.9297Z" fill="#FFBD86"/>
<path d="M13.7759 5.14362H12.9141V4.31155H13.6951C13.8245 4.31155 13.9295 4.20662 13.9295 4.07718C13.9295 3.94774 13.8245 3.8428 13.6951 3.8428H12.9141V3.01074H13.7759C13.9053 3.01074 14.0103 2.9058 14.0103 2.77637C14.0103 2.6469 13.9053 2.54199 13.7759 2.54199H12.6797C12.5502 2.54199 12.4453 2.6469 12.4453 2.77637V5.37799C12.4453 5.50743 12.5502 5.61237 12.6797 5.61237H13.7759C13.9053 5.61237 14.0103 5.50743 14.0103 5.37799C14.0103 5.24855 13.9053 5.14362 13.7759 5.14362Z" fill="#DFF6FD"/>
<path d="M9.22106 3.89643C9.33606 3.75359 9.40513 3.57224 9.40513 3.37499C9.40513 2.91568 9.03144 2.54199 8.57212 2.54199H7.81641C7.68697 2.54199 7.58203 2.6469 7.58203 2.77637V5.37799C7.58203 5.44034 7.60687 5.50012 7.65103 5.54409C7.69497 5.5878 7.75444 5.61237 7.81641 5.61237H7.81744C7.8175 5.61237 8.5125 5.60927 8.70409 5.60927C9.21947 5.60927 9.63875 5.18999 9.63875 4.67462C9.63875 4.35027 9.47262 4.06412 9.22106 3.89643ZM8.57212 3.01074C8.77297 3.01074 8.93638 3.17415 8.93638 3.37499C8.93638 3.57584 8.77297 3.73924 8.57212 3.73924C8.51637 3.73924 8.41119 3.73955 8.29662 3.73993H8.05078V3.01074H8.57212ZM8.70409 5.14052C8.58497 5.14052 8.27153 5.14171 8.05078 5.14262V4.20968C8.12784 4.20937 8.21481 4.20902 8.29703 4.20874H8.70409C8.961 4.20874 9.17 4.41774 9.17 4.67465C9.17 4.93155 8.961 5.14052 8.70409 5.14052Z" fill="#DFF6FD"/>
<path d="M11.8378 2.58658C11.7293 2.51598 11.5841 2.54664 11.5135 2.65514L10.8854 3.61995L10.2509 2.64827C10.1802 2.53986 10.0349 2.50939 9.92657 2.58014C9.8182 2.65092 9.7877 2.79614 9.85848 2.90452L10.6512 4.11855L10.6481 5.37742C10.6478 5.50689 10.7524 5.61205 10.8819 5.61239H10.8825C11.0116 5.61239 11.1165 5.50783 11.1169 5.37861L11.1199 4.11892L11.9064 2.91086C11.9769 2.80239 11.9462 2.6572 11.8378 2.58658Z" fill="#DFF6FD"/>
<path d="M9.78752 9.33896L6.89193 12.2346L6.03765 11.3803L9.13284 8.28509C9.36612 8.05078 9.43859 7.70812 9.34287 7.41215L5.70621 11.0488L4.85193 10.1945L7.46659 7.57987C7.69902 7.34631 7.76543 7.01 7.6659 6.71765L4.52046 9.86309L4.43915 9.78178C4.34762 9.69025 4.19921 9.69025 4.10771 9.78178C4.01618 9.87331 4.01618 10.0217 4.10771 10.1132L6.97321 12.9787C7.01896 13.0245 7.07896 13.0474 7.13893 13.0474C7.1989 13.0474 7.2589 13.0245 7.30465 12.9787C7.39618 12.8872 7.39618 12.7388 7.30465 12.6473L7.22334 12.566L9.57762 10.2117C9.8108 9.97743 9.88321 9.63484 9.78752 9.33896Z" fill="#FFBD86"/>
<path d="M2.86329 9.81357L2.86276 9.8141L3.29798 9.06026C3.44692 8.80232 3.44704 8.49295 3.32257 8.24304L2.49479 9.5192L2.34467 9.75704C2.19526 9.99376 2.18214 10.2954 2.31045 10.5442L2.74914 11.3947C3.03798 11.9547 2.93267 12.6304 2.48707 13.0759L2.38432 13.1787C2.29279 13.2702 2.29282 13.4186 2.38435 13.5101C2.4301 13.5559 2.49007 13.5788 2.55007 13.5788C2.61007 13.5788 2.67004 13.5559 2.71582 13.5101L2.81857 13.4074C3.40895 12.817 3.54845 11.9218 3.16576 11.1798L2.72707 10.3293C2.67457 10.2275 2.67995 10.1041 2.74107 10.0072L2.86329 9.81357Z" fill="#FFBD86"/>
</g>
<defs>
<clipPath id="clip0_691_5429">
<rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
</clipPath>
</defs>
</svg>
`}
            />
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 13,
                color: colors.textColor.white,
              }}>
              Leave
            </Text>
          </TouchableOpacity>
        }
        navigation={navigation}
      />

      <View
        style={{
          borderBottomColor: colors.gray.variantTwo,
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',

            paddingHorizontal: '4%',
            paddingVertical: '3%',

            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: colors.textColor.neutralColor,
              }}>
              Asadullah created a group
            </Text>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 14,
                color: colors.textColor.secondaryColor,
              }}>
              Asadullah calling live{' '}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <Image
                style={{
                  width: 12,
                  height: 12,
                }}
                source={require('../../assets/icons/modalIcons/earthyGray.png')}
              />
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  color: colors.textColor.neutralColor,
                }}>
                Public
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setLiveModal(!liveModal);
              }}>
              <SvgXml
                xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_854_4542)">
        <path d="M9.75 12C9.75 13.2405 10.7595 14.25 12 14.25C13.2405 14.25 14.25 13.2405 14.25 12C14.25 10.7595 13.2405 9.75 12 9.75C10.7595 9.75 9.75 10.7595 9.75 12Z" fill="${colors.textColor.neutralColor}"/>
        <path d="M9.75 19.5C9.75 20.7405 10.7595 21.75 12 21.75C13.2405 21.75 14.25 20.7405 14.25 19.5C14.25 18.2595 13.2405 17.25 12 17.25C10.7595 17.25 9.75 18.2595 9.75 19.5Z" fill="${colors.textColor.neutralColor}"/>
        <path d="M9.75 4.5C9.75 5.7405 10.7595 6.75 12 6.75C13.2405 6.75 14.25 5.7405 14.25 4.5C14.25 3.2595 13.2405 2.25 12 2.25C10.7595 2.25 9.75 3.2595 9.75 4.5Z" fill="${colors.textColor.neutralColor}"/>
        </g>
        <defs>
        <clipPath id="clip0_854_4542">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        `}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <LinkPreview
            text="https://www.youtube.com/watch?v=TEVXJ5tdzI4"
            enableAnimation
            renderLinkPreview={({aspectRatio, containerWidth, previewData}) => {
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
                      width: width * 0.589,
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
        </View>
      </View>

      <GridList
        showsVerticalScrollIndicator={false}
        containerWidth={width * 0.9}
        numColumns={4}
        contentContainerStyle={{
          // alignItems: 'center',
          alignSelf: 'center',
          paddingVertical: 10,
        }}
        data={Friends.slice(0, 6)}
        renderItem={item => {
          return (
            <TouchableOpacity
              onLongPress={() => {
                navigation?.navigate('NormalConversation');
              }}
              activeOpacity={0.8}
              onPress={() => {
                // setModalVisible(!modalVisible);
                setShowShortProfile(!showShortProfile);
              }}
              style={{
                // paddingVertical: 5,
                width: 65,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2,
                borderRadius: 50,
                padding: 2,
                position: 'relative',
              }}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 50,
                  backgroundColor: colors.primaryColor,
                  position: 'absolute',
                  right: 0,
                  zIndex: +1,
                  bottom: 0,
                  elevation: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {item?.item.sound ? (
                  <SvgXml
                    xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9" cy="9" r="9" fill="#F4F4F4"/>
<g clip-path="url(#clip0_691_4678)">
<path d="M8.9997 12.2308C8.14314 12.2298 7.32194 11.8891 6.71626 11.2835C6.11058 10.6778 5.76989 9.85658 5.76893 9.00002V7.38464C5.76893 6.52779 6.10931 5.70603 6.7152 5.10014C7.32109 4.49425 8.14285 4.15387 8.9997 4.15387C9.85655 4.15387 10.6783 4.49425 11.2842 5.10014C11.8901 5.70603 12.2305 6.52779 12.2305 7.38464V9.00002C12.2295 9.85658 11.8888 10.6778 11.2831 11.2835C10.6775 11.8891 9.85626 12.2298 8.9997 12.2308ZM8.9997 4.96156C8.42763 4.96262 7.87435 5.16585 7.43761 5.53535C7.00087 5.90484 6.70879 6.4168 6.61297 6.98079H7.78816C7.89527 6.98079 7.99799 7.02334 8.07372 7.09908C8.14946 7.17481 8.19201 7.27753 8.19201 7.38464C8.19201 7.49175 8.14946 7.59447 8.07372 7.6702C7.99799 7.74594 7.89527 7.78848 7.78816 7.78848H6.57662V8.59618H7.78816C7.89527 8.59618 7.99799 8.63872 8.07372 8.71446C8.14946 8.7902 8.19201 8.89292 8.19201 9.00002C8.19201 9.10713 8.14946 9.20985 8.07372 9.28559C7.99799 9.36132 7.89527 9.40387 7.78816 9.40387H6.61297C6.70789 9.96824 6.99972 10.4807 7.43667 10.8503C7.87362 11.2199 8.4274 11.4227 8.9997 11.4227C9.572 11.4227 10.1258 11.2199 10.5627 10.8503C10.9997 10.4807 11.2915 9.96824 11.3864 9.40387H10.2112C10.1041 9.40387 10.0014 9.36132 9.92568 9.28559C9.84994 9.20985 9.80739 9.10713 9.80739 9.00002C9.80739 8.89292 9.84994 8.7902 9.92568 8.71446C10.0014 8.63872 10.1041 8.59618 10.2112 8.59618H11.4228V7.78848H10.2112C10.1041 7.78848 10.0014 7.74594 9.92568 7.6702C9.84994 7.59447 9.80739 7.49175 9.80739 7.38464C9.80739 7.27753 9.84994 7.17481 9.92568 7.09908C10.0014 7.02334 10.1041 6.98079 10.2112 6.98079H11.3864C11.2906 6.4168 10.9985 5.90484 10.5618 5.53535C10.1251 5.16585 9.57177 4.96262 8.9997 4.96156Z" fill="#A9A9A9"/>
<path d="M4.55919 9C4.6663 9 4.76902 9.04255 4.84476 9.11828C4.92049 9.19402 4.96304 9.29674 4.96304 9.40385C4.96411 10.3675 5.34738 11.2913 6.02878 11.9727C6.71017 12.6541 7.63402 13.0374 8.59766 13.0385H9.40535C10.3689 13.0373 11.2927 12.654 11.9741 11.9726C12.6555 11.2912 13.0388 10.3674 13.04 9.40385C13.04 9.29674 13.0825 9.19402 13.1582 9.11828C13.234 9.04255 13.3367 9 13.4438 9C13.5509 9 13.6536 9.04255 13.7294 9.11828C13.8051 9.19402 13.8477 9.29674 13.8477 9.40385C13.8463 10.5816 13.3778 11.7107 12.545 12.5435C11.7122 13.3763 10.5831 13.8448 9.40535 13.8462H8.59766C7.41991 13.8448 6.2908 13.3763 5.458 12.5435C4.62521 11.7107 4.15674 10.5816 4.15535 9.40385C4.15535 9.29674 4.1979 9.19402 4.27363 9.11828C4.34937 9.04255 4.45209 9 4.55919 9Z" fill="#A9A9A9"/>
</g>
<line x1="3.29986" y1="4.15387" x2="13.8465" y2="14.7005" stroke="#A9A9A9" stroke-width="0.75" stroke-linecap="round"/>
<defs>
<clipPath id="clip0_691_4678">
<rect width="9.69231" height="9.69231" fill="white" transform="matrix(-1 0 0 1 13.8477 4.15387)"/>
</clipPath>
</defs>
</svg>

`}
                  />
                ) : (
                  <Animated.Image
                    style={[
                      {
                        width: 10,
                        height: 10,
                        borderRadius: 50,

                        // transform: [{scale: 1}],
                      },
                      rVoiceStyle,
                    ]}
                    source={require('../../assets/icons/microphone/microphone.png')}
                  />
                )}
              </View>
              {item?.item.host && (
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 50,
                    backgroundColor: colors.green['#00B047'],
                    position: 'absolute',
                    left: 0,
                    zIndex: +1,
                    bottom: 0,
                    elevation: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontFamily: font.Poppins,
                      color: colors.textColor.white,
                    }}>
                    H
                  </Text>
                </View>
              )}
              <Image
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 28,
                  resizeMode: 'contain',
                  borderColor: item?.item.host
                    ? colors.green['#00B047']
                    : colors.secondaryColor,
                  borderWidth: 2,
                }}
                source={item.item.img}
              />
            </TouchableOpacity>
          );
        }}
      />

      <View
        style={{
          paddingVertical: 9,
          height: '26%',
          borderTopColor: colors.gray.variantTwo,
          borderTopWidth: 1,
        }}>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
              paddingHorizontal: '4%',
              marginVertical: 5,
            }}>
            Others in room
          </Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          horizontal
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: '4%',
          }}
          data={Friends.slice(0, 6)}
          renderItem={item => (
            <View style={{gap: 6}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  // setModalVisible(!modalVisible);
                  setShowShortProfile(!showShortProfile);
                }}
                onLongPress={() => {
                  navigation?.navigate('NormalConversation');
                }}
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
                <Image
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 28,
                    resizeMode: 'contain',
                    borderColor: 'rgba(255,255,255,1)',
                    borderWidth: 2,
                  }}
                  source={item.item.img}
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
        <View
          style={{
            marginBottom: 10,
            marginTop: 20,
            marginHorizontal: '4%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 40,
          }}>
          <View
            style={{
              width: '60%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* ==================live group message start ===================*/}

            <TouchableOpacity
              activeOpacity={0.8}
              style={{}}
              onPress={() => {
                navigation?.navigate('LiveMessage');
              }}>
              <View
                style={{
                  backgroundColor: colors.secondaryColor,
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  gap: 8,
                }}>
                <SvgXml
                  xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_4737)">
<path d="M20.2587 4.35977C19.1146 3.12092 17.7062 2.15563 16.138 1.53552C14.5699 0.91542 12.8822 0.656429 11.2002 0.77777C8.33274 1.01978 5.66261 2.33637 3.72478 4.46376C1.78696 6.59115 0.724568 9.37222 0.750462 12.2498V22.5C0.750425 22.6483 0.794369 22.7934 0.876736 22.9167C0.959104 23.0401 1.0762 23.1362 1.21321 23.193C1.30421 23.231 1.40187 23.2503 1.50046 23.25C1.69936 23.25 1.89009 23.1709 2.03071 23.0303L3.80371 21.258C4.02001 21.0467 4.30474 20.9196 4.6065 20.8998C4.90825 20.88 5.20715 20.9688 5.44921 21.15C7.71476 22.778 10.5044 23.5061 13.2766 23.1931C16.0488 22.88 18.6057 21.5481 20.4512 19.4558C22.2966 17.3636 23.2988 14.6603 23.2632 11.8707C23.2276 9.08115 22.1569 6.40429 20.2587 4.35977ZM21.6402 13.4895C21.3862 15.1363 20.7144 16.6906 19.6888 18.0039C18.6633 19.3172 17.3183 20.3458 15.7822 20.9915C14.2461 21.6371 12.5702 21.8784 10.9143 21.6921C9.25847 21.5058 7.67799 20.8983 6.32371 19.9275C5.84556 19.5822 5.27105 19.3956 4.68121 19.3943C4.32116 19.3937 3.96456 19.4644 3.63195 19.6023C3.29934 19.7401 2.99729 19.9424 2.74321 20.1975L2.25046 20.6895V12.2498C2.22364 9.75179 3.14168 7.33592 4.82066 5.48614C6.49964 3.63637 8.81556 2.48931 11.3045 2.27477C12.7658 2.17081 14.2319 2.3973 15.5937 2.93743C16.9556 3.47755 18.1784 4.31744 19.1713 5.39476C20.1641 6.47208 20.9017 7.75918 21.3291 9.16051C21.7565 10.5619 21.8628 12.0415 21.6402 13.4895Z" fill="${colors.textColor.normal}"/>
<rect x="7" y="9" width="2" height="5" rx="1" fill="${colors.textColor.normal}"/>
<rect x="11" y="6" width="2" height="11" rx="1" fill="${colors.textColor.normal}"/>
<rect x="15" y="8" width="2" height="7" rx="1" fill="${colors.textColor.normal}"/>
</g>
<defs>
<clipPath id="clip0_691_4737">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: font.Poppins,
                    color: colors.textColor.secondaryColor,
                  }}>
                  10
                </Text>
              </View>
            </TouchableOpacity>
            {/*==================== live group message end =======================*/}
            {/*===================== live link shear start ======================*/}
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              activeOpacity={0.8}
              style={{}}>
              <View
                style={{
                  backgroundColor: colors.secondaryColor,
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  gap: 8,
                }}>
                <SvgXml
                  xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5074 16.1435C17.3575 16.1435 16.3214 16.64 15.6024 17.43L9.13493 13.4243C9.3076 12.9823 9.40337 12.5022 9.40337 12C9.40337 11.4975 9.3076 11.0174 9.13493 10.5756L15.6024 6.56981C16.3214 7.35973 17.3575 7.85649 18.5074 7.85649C20.6735 7.85649 22.4357 6.09429 22.4357 3.92815C22.4357 1.76202 20.6735 0 18.5074 0C16.3412 0 14.579 1.7622 14.579 3.92834C14.579 4.43059 14.675 4.9107 14.8474 5.35271L8.38017 9.35832C7.66112 8.5684 6.62511 8.07164 5.47521 8.07164C3.30908 8.07164 1.54688 9.83403 1.54688 12C1.54688 14.1661 3.30908 15.9283 5.47521 15.9283C6.62511 15.9283 7.66112 15.4317 8.38017 14.6416L14.8474 18.6472C14.675 19.0893 14.579 19.5694 14.579 20.0718C14.579 22.2377 16.3412 24 18.5074 24C20.6735 24 22.4357 22.2377 22.4357 20.0718C22.4357 17.9057 20.6735 16.1435 18.5074 16.1435ZM16.0114 3.92834C16.0114 2.55212 17.1311 1.43243 18.5074 1.43243C19.8836 1.43243 21.0033 2.55212 21.0033 3.92834C21.0033 5.30455 19.8836 6.42424 18.5074 6.42424C17.1311 6.42424 16.0114 5.30455 16.0114 3.92834ZM5.47521 14.4959C4.09881 14.4959 2.97912 13.3762 2.97912 12C2.97912 10.6238 4.09881 9.50407 5.47521 9.50407C6.85143 9.50407 7.97093 10.6238 7.97093 12C7.97093 13.3762 6.85143 14.4959 5.47521 14.4959ZM16.0114 20.0716C16.0114 18.6954 17.1311 17.5757 18.5074 17.5757C19.8836 17.5757 21.0033 18.6954 21.0033 20.0716C21.0033 21.4478 19.8836 22.5675 18.5074 22.5675C17.1311 22.5675 16.0114 21.4478 16.0114 20.0716Z" fill="${colors.textColor.normal}"/>
</svg>

`}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: font.Poppins,
                    color: colors.textColor.secondaryColor,
                  }}>
                  12
                </Text>
              </View>
            </TouchableOpacity>
            {/* =================live link shear end ======================*/}
            {/*====================== live add more member start==================== */}
            <TouchableOpacity
              onPress={() => {
                navigation?.navigate('LiveAddFriends');
              }}
              activeOpacity={0.8}
              style={{}}>
              <View
                style={{
                  backgroundColor: colors.secondaryColor,
                  paddingVertical: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  gap: 8,
                }}>
                <SvgXml
                  xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.009 10.75C11.8496 10.75 12.6713 10.5007 13.3702 10.0337C14.0691 9.56675 14.6138 8.90299 14.9355 8.12641C15.2572 7.34982 15.3413 6.49529 15.1773 5.67087C15.0134 4.84645 14.6086 4.08917 14.0142 3.4948C13.4198 2.90042 12.6626 2.49565 11.8381 2.33166C11.0137 2.16768 10.1592 2.25184 9.3826 2.57351C8.60601 2.89519 7.94225 3.43992 7.47525 4.13883C7.00826 4.83774 6.759 5.65943 6.759 6.5C6.76032 7.62677 7.20851 8.707 8.00526 9.50375C8.802 10.3005 9.88224 10.7487 11.009 10.75ZM11.009 3.75C11.5529 3.75 12.0846 3.91129 12.5368 4.21346C12.9891 4.51563 13.3415 4.94513 13.5497 5.44762C13.7578 5.95012 13.8123 6.50305 13.7062 7.0365C13.6 7.56995 13.3381 8.05995 12.9535 8.44455C12.5689 8.82914 12.0789 9.09105 11.5455 9.19716C11.0121 9.30327 10.4591 9.24881 9.95662 9.04067C9.45412 8.83253 9.02463 8.48006 8.72246 8.02782C8.42028 7.57558 8.259 7.0439 8.259 6.5C8.25979 5.7709 8.54978 5.07189 9.06533 4.55634C9.58089 4.04078 10.2799 3.7508 11.009 3.75ZM4.75 18.02C4.75 19.583 5.423 20.25 7 20.25H14C14.1989 20.25 14.3897 20.329 14.5303 20.4697C14.671 20.6103 14.75 20.8011 14.75 21C14.75 21.1989 14.671 21.3897 14.5303 21.5303C14.3897 21.671 14.1989 21.75 14 21.75H7C4.582 21.75 3.25 20.425 3.25 18.02C3.25 15.358 4.756 12.25 9 12.25H13C14.3402 12.196 15.6579 12.6077 16.729 13.415C16.8085 13.4757 16.875 13.5516 16.9247 13.6384C16.9744 13.7252 17.0062 13.821 17.0183 13.9202C17.0304 14.0195 17.0226 14.1202 16.9952 14.2163C16.9678 14.3125 16.9215 14.4022 16.859 14.4802C16.7964 14.5582 16.7189 14.6229 16.631 14.6706C16.5431 14.7182 16.4466 14.7477 16.3471 14.7575C16.2476 14.7673 16.1471 14.757 16.0516 14.7274C15.9561 14.6978 15.8675 14.6494 15.791 14.585C14.984 13.9948 13.9986 13.7 13 13.75H9C8.42893 13.706 7.85512 13.7864 7.31816 13.9857C6.7812 14.185 6.29388 14.4985 5.88983 14.9044C5.48578 15.3104 5.17462 15.7992 4.97783 16.3371C4.78105 16.875 4.70331 17.4492 4.75 18.02ZM21.75 19C21.75 19.1989 21.671 19.3897 21.5303 19.5303C21.3897 19.671 21.1989 19.75 21 19.75H19.75V21C19.75 21.1989 19.671 21.3897 19.5303 21.5303C19.3897 21.671 19.1989 21.75 19 21.75C18.8011 21.75 18.6103 21.671 18.4697 21.5303C18.329 21.3897 18.25 21.1989 18.25 21V19.75H17C16.8011 19.75 16.6103 19.671 16.4697 19.5303C16.329 19.3897 16.25 19.1989 16.25 19C16.25 18.8011 16.329 18.6103 16.4697 18.4697C16.6103 18.329 16.8011 18.25 17 18.25H18.25V17C18.25 16.8011 18.329 16.6103 18.4697 16.4697C18.6103 16.329 18.8011 16.25 19 16.25C19.1989 16.25 19.3897 16.329 19.5303 16.4697C19.671 16.6103 19.75 16.8011 19.75 17V18.25H21C21.1989 18.25 21.3897 18.329 21.5303 18.4697C21.671 18.6103 21.75 18.8011 21.75 19Z" fill="${colors.textColor.normal}"/>
</svg>


`}
                />
              </View>
            </TouchableOpacity>
            {/* live add more member end */}
          </View>
          {/* ===============live joined and knock and voice run on or off start============ */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{}}
            onPress={() => {
              // setRunOnVoice(!runOnVoice);
              setNotify(!open);
            }}>
            <View
              style={{
                // backgroundColor: runOnVoice
                //   ? colors.primaryColor
                //   : colors.secondaryColor,
                backgroundColor: colors.primaryColor,

                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                borderRadius: 50,
                paddingHorizontal: 14,
                gap: 8,
              }}>
              {/* <SvgXml
                xml={
                  runOnVoice
                    ? `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_4364)">
<path d="M11 18C9.14413 17.9979 7.36487 17.2597 6.05257 15.9474C4.74026 14.6351 4.0021 12.8559 4.00001 11V7.49999C4.00001 5.64348 4.73751 3.863 6.05026 2.55025C7.36302 1.2375 9.14349 0.5 11 0.5C12.8565 0.5 14.637 1.2375 15.9497 2.55025C17.2625 3.863 18 5.64348 18 7.49999V11C17.9979 12.8559 17.2597 14.6351 15.9474 15.9474C14.6351 17.2597 12.8559 17.9979 11 18ZM11 2.25C9.76053 2.2523 8.56175 2.69263 7.61548 3.49319C6.66922 4.29376 6.03637 5.40302 5.82876 6.62499H8.37501C8.60707 6.62499 8.82963 6.71718 8.99373 6.88127C9.15782 7.04537 9.25001 7.26793 9.25001 7.49999C9.25001 7.73206 9.15782 7.95462 8.99373 8.11871C8.82963 8.2828 8.60707 8.37499 8.37501 8.37499H5.75001V10.125H8.37501C8.60707 10.125 8.82963 10.2172 8.99373 10.3813C9.15782 10.5454 9.25001 10.7679 9.25001 11C9.25001 11.2321 9.15782 11.4546 8.99373 11.6187C8.82963 11.7828 8.60707 11.875 8.37501 11.875H5.82876C6.03442 13.0978 6.66673 14.2082 7.61345 15.009C8.56017 15.8097 9.76003 16.2491 11 16.2491C12.24 16.2491 13.4398 15.8097 14.3866 15.009C15.3333 14.2082 15.9656 13.0978 16.1713 11.875H13.625C13.3929 11.875 13.1704 11.7828 13.0063 11.6187C12.8422 11.4546 12.75 11.2321 12.75 11C12.75 10.7679 12.8422 10.5454 13.0063 10.3813C13.1704 10.2172 13.3929 10.125 13.625 10.125H16.25V8.37499H13.625C13.3929 8.37499 13.1704 8.2828 13.0063 8.11871C12.8422 7.95462 12.75 7.73206 12.75 7.49999C12.75 7.26793 12.8422 7.04537 13.0063 6.88127C13.1704 6.71718 13.3929 6.62499 13.625 6.62499H16.1713C15.9636 5.40302 15.3308 4.29376 14.3845 3.49319C13.4383 2.69263 12.2395 2.2523 11 2.25Z" fill="#F4F4F4"/>
<path d="M1.37502 11C1.60708 11 1.82965 11.0922 1.99374 11.2563C2.15783 11.4204 2.25002 11.6429 2.25002 11.875C2.25234 13.9629 3.08276 15.9646 4.55911 17.4409C6.03545 18.9172 8.03714 19.7477 10.125 19.75H11.875C13.9628 19.7474 15.9644 18.9169 17.4407 17.4406C18.917 15.9644 19.7475 13.9628 19.75 11.875C19.75 11.6429 19.8422 11.4204 20.0063 11.2563C20.1704 11.0922 20.3929 11 20.625 11C20.8571 11 21.0796 11.0922 21.2437 11.2563C21.4078 11.4204 21.5 11.6429 21.5 11.875C21.497 14.4268 20.482 16.8732 18.6776 18.6776C16.8732 20.482 14.4268 21.497 11.875 21.5H10.125C7.57323 21.497 5.12683 20.482 3.32244 18.6776C1.51806 16.8732 0.503033 14.4268 0.500021 11.875C0.500021 11.6429 0.592209 11.4204 0.756302 11.2563C0.920397 11.0922 1.14296 11 1.37502 11Z" fill="#F4F4F4"/>
</g>
<defs>
<clipPath id="clip0_691_4364">
<rect width="21" height="21" fill="white" transform="matrix(-1 0 0 1 21.5 0.5)"/>
</clipPath>
</defs>
</svg>

`
                    : `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1609_1031)">
<path d="M13.5 18.5C11.6441 18.4979 9.86487 17.7597 8.55257 16.4474C7.24026 15.1351 6.5021 13.3559 6.50001 11.5V7.99999C6.50001 6.14348 7.23751 4.363 8.55026 3.05025C9.86302 1.7375 11.6435 1 13.5 1C15.3565 1 17.137 1.7375 18.4497 3.05025C19.7625 4.363 20.5 6.14348 20.5 7.99999V11.5C20.4979 13.3559 19.7597 15.1351 18.4474 16.4474C17.1351 17.7597 15.3559 18.4979 13.5 18.5ZM13.5 2.75C12.2605 2.7523 11.0617 3.19263 10.1155 3.99319C9.16922 4.79376 8.53637 5.90302 8.32876 7.12499H10.875C11.1071 7.12499 11.3296 7.21718 11.4937 7.38127C11.6578 7.54537 11.75 7.76793 11.75 7.99999C11.75 8.23206 11.6578 8.45462 11.4937 8.61871C11.3296 8.7828 11.1071 8.87499 10.875 8.87499H8.25001V10.625H10.875C11.1071 10.625 11.3296 10.7172 11.4937 10.8813C11.6578 11.0454 11.75 11.2679 11.75 11.5C11.75 11.7321 11.6578 11.9546 11.4937 12.1187C11.3296 12.2828 11.1071 12.375 10.875 12.375H8.32876C8.53442 13.5978 9.16673 14.7082 10.1135 15.509C11.0602 16.3097 12.26 16.7491 13.5 16.7491C14.74 16.7491 15.9398 16.3097 16.8866 15.509C17.8333 14.7082 18.4656 13.5978 18.6713 12.375H16.125C15.8929 12.375 15.6704 12.2828 15.5063 12.1187C15.3422 11.9546 15.25 11.7321 15.25 11.5C15.25 11.2679 15.3422 11.0454 15.5063 10.8813C15.6704 10.7172 15.8929 10.625 16.125 10.625H18.75V8.87499H16.125C15.8929 8.87499 15.6704 8.7828 15.5063 8.61871C15.3422 8.45462 15.25 8.23206 15.25 7.99999C15.25 7.76793 15.3422 7.54537 15.5063 7.38127C15.6704 7.21718 15.8929 7.12499 16.125 7.12499H18.6713C18.4636 5.90302 17.8308 4.79376 16.8845 3.99319C15.9383 3.19263 14.7395 2.7523 13.5 2.75Z" fill="#646464"/>
<path d="M3.87502 11.5C4.10708 11.5 4.32965 11.5922 4.49374 11.7563C4.65783 11.9204 4.75002 12.1429 4.75002 12.375C4.75234 14.4629 5.58276 16.4646 7.05911 17.9409C8.53545 19.4172 10.5371 20.2477 12.625 20.25H14.375C16.4628 20.2474 18.4644 19.4169 19.9407 17.9406C21.417 16.4644 22.2475 14.4628 22.25 12.375C22.25 12.1429 22.3422 11.9204 22.5063 11.7563C22.6704 11.5922 22.8929 11.5 23.125 11.5C23.3571 11.5 23.5796 11.5922 23.7437 11.7563C23.9078 11.9204 24 12.1429 24 12.375C23.997 14.9268 22.982 17.3732 21.1776 19.1776C19.3732 20.982 16.9268 21.997 14.375 22H12.625C10.0732 21.997 7.62683 20.982 5.82244 19.1776C4.01806 17.3732 3.00303 14.9268 3.00002 12.375C3.00002 12.1429 3.09221 11.9204 3.2563 11.7563C3.4204 11.5922 3.64296 11.5 3.87502 11.5Z" fill="#646464"/>
</g>
<line x1="1.06066" y1="1" x2="24" y2="23.9393" stroke="#646464" stroke-width="1.5" stroke-linecap="round"/>
<defs>
<clipPath id="clip0_1609_1031">
<rect width="21" height="21" fill="white" transform="matrix(-1 0 0 1 24 1)"/>
</clipPath>
</defs>
</svg>
`
                }
              /> */}
              <SvgXml
                xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_691_4337)">
<path d="M7.74006 9.51886C7.7041 8.85163 8.21819 8.28189 8.88646 8.24455C9.42785 8.21689 9.90529 8.54774 10.0871 9.03313C10.0778 8.97851 10.075 8.92561 10.075 8.87099C10.075 8.13219 10.6745 7.53133 11.4147 7.53133C11.907 7.53133 12.336 7.79926 12.568 8.19511C12.5659 8.16745 12.5639 8.14256 12.5639 8.1156C12.5639 7.37611 13.1633 6.77802 13.9028 6.77802C14.6423 6.77802 15.2404 7.37611 15.2404 8.1156" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5664 8.19531V9.71267" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5703 8.17419V9.49725" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2411 7.94167C15.164 7.27305 14.5977 6.75655 13.9101 6.75586C13.1692 6.75655 12.569 7.35464 12.569 8.0969C12.569 8.12179 12.5718 8.14737 12.5732 8.17468C12.3398 7.77953 11.9108 7.51229 11.4192 7.51229C10.6776 7.51229 10.0781 8.11176 10.0781 8.85194V8.87027C10.0788 8.9197 10.0823 8.96603 10.0888 9.01409L10.1117 9.51918" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5938 12.0635C12.5938 12.7698 13.186 13.3437 13.9165 13.3437C14.2203 13.3437 14.5 13.2444 14.7234 13.0775" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.64453 12.1264L7.65317 12.4444C7.69086 13.046 8.26682 13.512 8.9382 13.483C9.54874 13.4588 10.03 13.0325 10.0829 12.5025L10.1105 11.7962" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.1094 9.41538V9.61382V12.0636C10.1094 12.7699 10.6598 13.3438 11.3384 13.3438C12.0157 13.3438 12.566 12.7699 12.566 12.0636V8.11548" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.719 13.0718C14.7609 12.8471 14.9458 12.1204 15.0122 11.8981L14.3633 11.5848" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.722 13.0717C13.2952 14.0549 12.3594 15.6999 12.3594 17.5633V18.4694V19.8509" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.73908 9.49969C7.59527 11.89 7.59941 14.2319 7.81549 16.6374L7.84245 16.6225C7.96484 17.8792 8.52455 19.0062 9.36707 19.8508H16.372C17.2626 18.6477 17.7901 17.1584 17.7901 15.5463L17.7995 14.3646L17.8074 11.8122" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2383 9.06445V7.45064C15.2383 6.7478 15.8087 6.17737 16.5133 6.17737C17.2179 6.17737 17.7886 6.74746 17.7886 7.45064V10.2164L17.807 12.6506" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4607 9.92121L15.021 8.98052L14.3105 8.70291C14.1418 8.63687 13.9562 8.60576 13.7622 8.61786C13.0594 8.66315 12.5232 9.27299 12.5692 9.9786C12.5996 10.4512 12.8865 10.8477 13.2841 11.042L13.6658 11.2474L14.3645 11.5851" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.07372 3.55195L5.6136 4.62886L4.53738 7.09002L3.46116 4.62886L1 3.55195L3.46116 2.47642L4.53738 0.0152588L5.6136 2.47642L8.07372 3.55195Z" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.66016 19.8512H17.8083V23.9998H7.66016V19.8512Z" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.2512 4.96883L12.6016 1.81762L15.3141 3.54655L16.6395 0.615906L17.8143 3.60982L20.6118 2.02228L19.8015 5.13616L23 5.48879L20.5147 7.53302L22.8922 9.70101L19.6808 9.88977" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_691_4337">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
              />
            </View>
          </TouchableOpacity>
          {/*=============== live joined and knock and voice run on or off end================ */}
        </View>
      </View>

      <ModalOfBottom
        modalVisible={showShortProfile}
        setModalVisible={setShowShortProfile}
        onlyTopRadius={20}>
        <View>
          <View
            style={{
              // paddingHorizontal: '4%',
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
                source={require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg')}
              />
            </View>
            <View
              style={{
                gap: 4,
              }}>
              <View
                style={{
                  gap: -4,
                }}>
                <Text
                  style={{
                    fontFamily: font.PoppinsSemiBold,
                    fontSize: 17,
                    color: colors.textColor.primaryColor,
                  }}>
                  Mithila
                </Text>
                <Text
                  style={{
                    fontFamily: font.Poppins,
                    fontSize: 13,
                    color: colors.textColor.neutralColor,
                  }}>
                  amina111@gmail.com
                </Text>
              </View>
              <View
                style={{
                  gap: -4,
                }}>
                <Text
                  style={{
                    fontFamily: font.PoppinsSemiBold,
                    fontSize: 17,
                    color: colors.primaryColor,
                  }}>
                  420
                </Text>
                <Text
                  style={{
                    fontFamily: font.Poppins,
                    fontSize: 13,
                    color: colors.primaryColor,
                  }}>
                  friend
                </Text>
              </View>
            </View>
          </View>
          <View
            style={
              {
                // paddingHorizontal: '5%',
              }
            }>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://asadullah@insta.com');
              }}
              style={{
                marginTop: 16,
                flexDirection: 'row',

                alignItems: 'center',
                gap: 8,
              }}>
              <Image
                style={{
                  width: 16,
                  height: 16,
                }}
                source={require('../../assets/icons/instagram/instagram.png')}
              />
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.rare,
                }}>
                asadullah@insta.com
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                fontFamily: font.Poppins,
                fontSize: 14,
                color: colors.textColor.neutralColor,
              }}>
              scelerisque Praesent Donec amet, eget lorem. consectetur id varius
              at, nec nec dolor quam amet, tincidunt quis vitae In Ut laoreet
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              // marginHorizontal: '4%',
              gap: 24,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (isFriendRequest) {
                  setIsFriend(true);
                  setIsFriendRequest(false);
                }
                if (isFriend) {
                  setConfirmationModal(!confirmationModal);
                } else {
                  setIsFriendRequestSent(!isFriendRequestSent);
                }
              }}
              style={{
                backgroundColor: isFriend ? colors.redisLight : colors.redis,
                height: 35,
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                borderRadius: 50,
                elevation: 2,
              }}>
              {isFriend && (
                <SvgXml
                  xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75978 6.97436C8.4921 6.97436 9.20797 6.76984 9.81687 6.38666C10.4258 6.00349 10.9004 5.45887 11.1806 4.82167C11.4608 4.18447 11.5342 3.48331 11.3913 2.80687C11.2484 2.13042 10.8958 1.50906 10.378 1.02137C9.86014 0.533682 9.20038 0.20156 8.48213 0.0670067C7.76389 -0.0675468 7.0194 0.00151094 6.34282 0.265447C5.66625 0.529384 5.08797 0.976344 4.68112 1.54981C4.27426 2.12327 4.0571 2.79748 4.0571 3.48718C4.05826 4.41171 4.44873 5.29805 5.14286 5.95179C5.837 6.60553 6.77812 6.97327 7.75978 6.97436ZM7.75978 1.23077C8.23363 1.23077 8.69685 1.36311 9.09084 1.61104C9.48484 1.85898 9.79192 2.21139 9.97325 2.62369C10.1546 3.036 10.202 3.48968 10.1096 3.92738C10.0171 4.36509 9.78896 4.76714 9.4539 5.0827C9.11883 5.39827 8.69193 5.61317 8.22718 5.70023C7.76244 5.7873 7.28071 5.74261 6.84293 5.57183C6.40514 5.40105 6.03096 5.11184 5.7677 4.74078C5.50444 4.36971 5.36393 3.93346 5.36393 3.48718C5.36462 2.88894 5.61726 2.3154 6.06642 1.89238C6.51558 1.46936 7.12457 1.23142 7.75978 1.23077ZM2.30683 12.9395C2.30683 14.222 2.89316 14.7692 4.26707 14.7692H10.3656C10.5389 14.7692 10.7051 14.8341 10.8276 14.9495C10.9502 15.0649 11.019 15.2214 11.019 15.3846C11.019 15.5478 10.9502 15.7044 10.8276 15.8198C10.7051 15.9352 10.5389 16 10.3656 16H4.26707C2.16046 16 1 14.9128 1 12.9395C1 10.7553 2.31205 8.20513 6.0095 8.20513H9.49437C10.662 8.16083 11.8099 8.49859 12.7431 9.16103C12.8124 9.21082 12.8703 9.27314 12.9136 9.34433C12.9569 9.41552 12.9846 9.49415 12.9952 9.57558C13.0057 9.65701 12.9989 9.73961 12.9751 9.81852C12.9512 9.89742 12.9109 9.97104 12.8564 10.035C12.8019 10.0991 12.7344 10.1522 12.6578 10.1912C12.5812 10.2303 12.4971 10.2546 12.4104 10.2626C12.3237 10.2706 12.2362 10.2622 12.153 10.2379C12.0698 10.2136 11.9926 10.1738 11.9259 10.121C11.2228 9.63678 10.3643 9.39489 9.49437 9.4359H6.0095C5.51198 9.39979 5.01206 9.46578 4.54425 9.62932C4.07644 9.79286 3.65188 10.05 3.29986 10.3831C2.94785 10.7162 2.67676 11.1173 2.50532 11.5586C2.33388 12 2.26615 12.4711 2.30683 12.9395Z" fill="#767676"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5345 10.1258C15.712 10.2923 15.7105 10.5609 15.5313 10.7257L11.3806 14.5439C11.2941 14.6235 11.177 14.6676 11.0553 14.6667C10.9336 14.6656 10.8174 14.6195 10.7324 14.5386L9.12968 13.0113C8.95363 12.8436 8.95729 12.5749 9.13785 12.4114C9.31842 12.2478 9.60751 12.2512 9.78356 12.419L11.0651 13.6402L14.8888 10.1228C15.068 9.95792 15.3571 9.95926 15.5345 10.1258Z" fill="#767676"/>
</svg>
`}
                />
              )}

              {!isFriendRequestSent && !isFriend && (
                <Image
                  resizeMode="contain"
                  style={{
                    width: 16,
                    height: 16,
                  }}
                  source={require('../../assets/icons/user/add_user.png')}
                />
              )}
              {isFriendRequestSent && !isFriend && (
                <SvgXml
                  xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.75978 6.97436C8.4921 6.97436 9.20797 6.76984 9.81687 6.38666C10.4258 6.00349 10.9004 5.45887 11.1806 4.82167C11.4608 4.18447 11.5342 3.48331 11.3913 2.80687C11.2484 2.13042 10.8958 1.50906 10.378 1.02137C9.86014 0.533682 9.20038 0.20156 8.48213 0.0670067C7.76388 -0.0675468 7.0194 0.00151095 6.34282 0.265447C5.66625 0.529384 5.08797 0.976344 4.68112 1.54981C4.27426 2.12327 4.0571 2.79748 4.0571 3.48718C4.05826 4.41171 4.44873 5.29805 5.14286 5.95179C5.837 6.60553 6.77812 6.97327 7.75978 6.97436ZM7.75978 1.23077C8.23363 1.23077 8.69685 1.36311 9.09084 1.61104C9.48484 1.85898 9.79192 2.21139 9.97325 2.62369C10.1546 3.036 10.202 3.48968 10.1096 3.92738C10.0171 4.36509 9.78897 4.76714 9.4539 5.0827C9.11883 5.39827 8.69193 5.61317 8.22718 5.70023C7.76244 5.7873 7.28071 5.74261 6.84293 5.57183C6.40514 5.40105 6.03096 5.11184 5.7677 4.74078C5.50444 4.36971 5.36393 3.93346 5.36393 3.48718C5.36462 2.88894 5.61726 2.3154 6.06642 1.89238C6.51558 1.46936 7.12457 1.23142 7.75978 1.23077ZM2.30683 12.9395C2.30683 14.222 2.89316 14.7692 4.26707 14.7692H10.3656C10.5389 14.7692 10.7051 14.8341 10.8276 14.9495C10.9502 15.0649 11.019 15.2214 11.019 15.3846C11.019 15.5478 10.9502 15.7044 10.8276 15.8198C10.7051 15.9352 10.5389 16 10.3656 16H4.26707C2.16046 16 1 14.9128 1 12.9395C1 10.7553 2.31205 8.20513 6.0095 8.20513H9.49437C10.662 8.16083 11.8099 8.49859 12.7431 9.16103C12.8124 9.21082 12.8703 9.27314 12.9136 9.34433C12.9569 9.41552 12.9846 9.49415 12.9952 9.57558C13.0057 9.65701 12.9989 9.73961 12.9751 9.81852C12.9512 9.89742 12.9109 9.97104 12.8564 10.035C12.8019 10.0991 12.7344 10.1522 12.6578 10.1912C12.5812 10.2303 12.4971 10.2546 12.4104 10.2626C12.3237 10.2706 12.2362 10.2622 12.153 10.2379C12.0698 10.2136 11.9926 10.1738 11.9259 10.121C11.2228 9.63678 10.3643 9.39489 9.49437 9.4359H6.0095C5.51198 9.39979 5.01206 9.46578 4.54425 9.62932C4.07644 9.79286 3.65188 10.05 3.29986 10.3831C2.94785 10.7162 2.67676 11.1173 2.50532 11.5586C2.33388 12 2.26615 12.4711 2.30683 12.9395Z" fill="#FFFDFB"/>
<g clip-path="url(#clip0_517_4657)">
<path d="M11.6 13.7999C11.5477 13.7976 11.4979 13.7545 11.4613 13.6798C11.4248 13.605 11.4043 13.5046 11.4043 13.4C11.4043 13.2954 11.4248 13.195 11.4613 13.1202C11.4979 13.0455 11.5477 13.0023 11.6 13H15.1992C15.2515 13.0023 15.3012 13.0455 15.3378 13.1202C15.3744 13.195 15.3949 13.2954 15.3949 13.4C15.3949 13.5046 15.3744 13.605 15.3378 13.6798C15.3012 13.7545 15.2515 13.7976 15.1992 13.7999H11.6Z" fill="#FFFDFB"/>
</g>
<defs>
<clipPath id="clip0_517_4657">
<rect width="4.8" height="4.8" fill="white" transform="translate(11 11)"/>
</clipPath>
</defs>
</svg>

`}
                />
              )}
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: isFriend
                    ? colors.textColor.light
                    : colors.textColor.white,
                }}>
                {isFriend
                  ? 'friends'
                  : isFriendRequest
                  ? 'accept request'
                  : isFriendRequestSent
                  ? 'Cancel Request'
                  : 'Add friends'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setConfirmationModal(false); //
                setShowShortProfile(false); //)
                navigation?.navigate('NormalConversation');
              }}
              style={{
                backgroundColor: colors.primaryColor,
                height: 35,
                flexDirection: 'row',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                borderRadius: 50,
                elevation: 2,
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: 16,
                  height: 16,
                }}
                source={require('../../assets/icons/message/message.png')}
              />
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.white,
                }}>
                message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalOfBottom>
      <CustomModal
        modalVisible={confirmationModal}
        setModalVisible={setConfirmationModal}
        height={'14%'}
        containerColor={colors.bg}
        Radius={20}>
        <View
          style={{
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 12,
              color: colors.textColor.neutralColor,
            }}>
            Are you sure you want to remove your friend!
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setConfirmationModal(false);
              }}
              style={{
                borderRadius: 100,
                borderColor: colors.green['#00B047'],
                borderWidth: 1,
                paddingHorizontal: 10,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  color: colors.green['#00B047'],
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsFriend(false);
                setModalVisible(false);
                setConfirmationModal(false);
              }}
              style={{
                borderRadius: 100,
                backgroundColor: 'rgba(241, 99, 101, 1)',

                paddingHorizontal: 10,
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: font.PoppinsSemiBold,
                  fontSize: 12,
                  color: colors.white,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <ModalOfBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onlyTopRadius={20}
        backButton
        containerColor={colors.bg}
        height={'30%'}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.neutralColor,
            }}>
            Share
          </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              Linking.openURL(`https://www.sic.com/@Asadullah
              utm_medium=ch_profile&utm_campaign=DCDJyA3rtp`);
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: colors.blue,
                marginTop: '10%',
              }}>
              https://www.sic.com/@Asadullah
              utm_medium=ch_profile&utm_campaign=DCDJyA3rtp
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10%',
            }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  `https://www.sic.com/@Asadullahutm_medium=ch_profile&utm_campaign=DCDJyA3rtp`,
                );
                ToastAndroid.showWithGravity(
                  `link copy to https://www.sic.com/@Asadullahutm_medium=ch_profile&utm_campaign=DCDJyA3rtp`,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER,
                );
              }}
              style={{
                flexDirection: 'row',
                gap: 8,
                width: 84,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
                elevation: 2,
                backgroundColor: colors.white,
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons name="content-copy" size={15} />
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalOfBottom>
      <ModalOfBottom
        modalVisible={liveModal}
        setModalVisible={setLiveModal}
        onlyTopRadius={20}
        // backButton
        panOf
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
                    <>
                      {previewData?.image ? (
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
                      ) : (
                        <ActivityIndicator />
                      )}
                    </>
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
                      ? {uri: selectBook}
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
          <NormalButton
            onPress={() => {
              // setLiveModal(false);
              // navigation?.navigate('LiveConversation');
              setLiveModal(false);
            }}
            title="Updated Live"
          />
        </View>
      </ModalOfBottom>
      {/* book selection modal  */}
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
              marginTop: 15,
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
              data={Books}
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
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={Books}
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
                  setSelectBook(item.item.image);
                  setBooksModal(false);
                }}
                style={{
                  elevation: 2,
                  backgroundColor: colors.bg,
                  padding: 2,
                  borderRadius: 24,
                }}>
                <Image
                  style={{
                    height: height * 0.24,
                    width: width * 0.4,
                    borderRadius: 24,
                  }}
                  source={{
                    uri: item.item.image,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </>
      </CustomModal>
    </SafeAreaView>
  );
};

export default LiveConversationScreen;

const styles = StyleSheet.create({});
