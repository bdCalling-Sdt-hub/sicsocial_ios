import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import {
  useContextApi,
  useStyles
} from '../../context/ContextApi';

import Clipboard from '@react-native-clipboard/clipboard';
import { format } from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConversationalCard from '../../components/common/ConversationalCard';
import ConversationalModal from '../../components/common/ConversationalModal/ConversationalModal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import { IConversationProps } from '../../interfaces/Interface';
import { NavigProps } from '../../interfaces/NaviProps';
import { imageUrl } from '../../redux/api/baseApi';
import { useGetUserProfileQuery } from '../../redux/apiSlices/authSlice';
import { useGetNewsFeetQuery } from '../../redux/apiSlices/homeSlices';
import { isTablet } from '../../utils/utils';

const HomeScreen = ({navigation}: NavigProps<null>) => {
  const {isLive, setIsLive, isDark} = useContextApi();

  const {data : newsFeet} = useGetNewsFeetQuery({});
  const {data : userProfile} = useGetUserProfileQuery({});
  // console.log(userProfile);
  const {colors, font} = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);

  const [addNewVoiceCard, setAddNewVoiceCard] = React.useState<
    Array<IConversationProps>
  >([]);
  // lines of modal animation

  const scrollViewGapHight = useSharedValue('0%');

  useEffect(() => {
    if (isLive) {
      scrollViewGapHight.value = withTiming( isTablet() ? "10%" : '25%', {
        duration: 1000,
      });
    }
    if (!isLive) {
      scrollViewGapHight.value = withTiming('0%', {
        duration: 1000,
      });
    }
    return () => {};
  }, [isLive]);

  // is live  card have checker and create animation asaa
 const profileImage = userProfile?.data?.avatar.startsWith("https") ? userProfile?.data?.avatar : `${imageUrl}/${userProfile?.data?.avatar}`
  return (
    <SafeAreaView
      style={{
        height: '100%',
        // backgroundColor: 'gray',
        backgroundColor: colors.bg,
      }}>
      {/*=============== border cover ================== */}
      <View
        style={{
          height: '7.2%',
        }}
      />
      {/*==================== profile card start ===================  */}

      <LinearGradient
        colors={colors.gradient.variantTwo}
        style={{
          height: 80,
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 99999,
        }}>
        <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>navigation?.navigate("UserProfile")}
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
              uri : profileImage
            }}
          />
          <View
            style={{
              gap: -2,
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: '#720B24',
              }}>
              Welcome to SIC
            </Text>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 16,
                color: colors.textColor.primaryColor,
              }}>
              {userProfile?.data?.fullName}
            </Text>
          </View>
        </TouchableOpacity>
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
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.neutralColor}"/>
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
<path d="M17 17.5H1L1.39999 16.9667L1.5 16.8334V16.6667V8C1.5 3.85786 4.85786 0.5 9 0.5C13.1422 0.5 16.5 3.85786 16.5 8V16.6667V16.8334L16.6 16.9667L17 17.5ZM17 17.5L17 17.5L17 17.5L17 17.5L17 17.5L17 17.5ZM2.5 16V16.5H3H15H15.5V16V8C15.5 4.41015 12.5898 1.5 9 1.5C5.41015 1.5 2.5 4.41015 2.5 8V16ZM10.937 19.5C10.715 20.3626 9.93191 21 9 21C8.06809 21 7.28504 20.3626 7.06301 19.5H10.937Z" fill="${colors.textColor.neutralColor}" stroke="${colors.textColor.neutralColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/*==================== profile card end ===================  */}
       
   
        {/*========================== conversation card start ======================= */}
     

        <FlatList
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{
          gap: 16,
          paddingVertical: 16,
          
          // paddingBottom: isLive ? LIVE_ACTIVE_VALUE + 30 : 16,
          paddingHorizontal: '5%',
        }}
      data={newsFeet?.data}
      renderItem={({ item }) => (
        <ConversationalCard
      conversationStyle="normal"
      onPress={() => {
        navigation?.navigate('NormalConversation');
      }}
      participants={item.participants}
      cardStyle={item.participants.length > 4 ? "three" : item?.participants.length === 4 ? "four" : item?.participants.length === 3 ? "three" : item?.participants.length === 2 ? "two" : "single"}
      manyPeople={item.participants.length > 4 ? true : false}
      conversationTitle={item.lastMessage.sender._id === userProfile?.data?._id ? "You" : userProfile?.data?.fullName}
      conversationSubtitle={item.lastMessage.sender._id === userProfile?.data?._id ? "send a message" : "Reply to the message"}
      lastMessageTime={format(new Date(item.updatedAt), "hh :mm a")}
      lastMessage={item.lastMessage.audio ? "send a audio message" : item.lastMessage.image ? "send an image message" : item.lastMessage.text ? item.lastMessage.text : item.lastMessage.path ? "send a book" : "Start a chat"}
    />
  )}
      // estimatedItemSize={150}
    />
        {/* <ConversationalCard
          disabled
          conversationStyle="donation"
          conversationTitle={`Hello ${userProfile?.data?.fullName}`}
          // conversationSubtitle="Contribute and share with others."
          lastMessage="Contribute and share with others."
          onDonationShearPress={() => {
            setModalVisible(true);
          }}
          onDonationViewDetailsPress={() => {
            navigation?.navigate('donation');
          }}
        />
  

        <ConversationalCard
          conversationStyle="normal"
          onPress={() => {
            navigation?.navigate('NormalConversation');
          }}
          cardStyle="single"
          conversationTitle="You"
          conversationSubtitle="Start a chat"
          lastMessageTime="9:30 am"
          lastMessage="All of my friends pleas 
            Share your story my friends"
        />
        <ConversationalCard
          conversationStyle="normal"
          onPress={() => {
            navigation?.navigate('NormalConversation');
          }}
          cardStyle="shear_book"
          conversationTitle="You"
          conversationSubtitle="Start a chat"
          lastMessageTime="9:30 am"
          lastMessage="All of my friends pleas 
            Share your story my friends"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="two"
          // havNotUser
          onPress={() => {
            navigation?.navigate('GroupConversation');
          }}
          conversationTitle="Khushi Aktar"
          isReply
          conversationSubtitle="replied in chat"
          lastMessageTime="9:30 am"
          lastMessage="Hello asad vai, i`m 
coming from Banasri"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="two"
          onPress={() => {
            navigation?.navigate('GroupConversation');
          }}
          havNotUser
          conversationTitle="Khushi Aktar"
          isReply
          conversationSubtitle="replied in chat"
          lastMessageTime="9:30 am"
          lastMessage="Hello asad vai, i`m 
coming from Banasri"
        />

        <ConversationalCard
          conversationStyle="normal"
          cardStyle="book_promotion"
          onPress={() => {
            navigation?.navigate('BookShare');
          }}
          conversationTitle="SIC Discussion"
          conversationSubtitle="recommendations"
          lastMessageTime="9:30 am"
          lastMessage="Hello Asadullah some books
is recognize for SIC "
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="three"
          onPress={() => {
            navigation?.navigate('FaceDownConversation');
          }}
          conversationTitle="Reader lovers"
          conversationSubtitle="join FaceDwn"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in facedwn"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="four"
          conversationTitle="COFFE HOUSE"
          onPress={() => {
            setIsLive(!isLive);
            navigation?.navigate('LiveConversation');
          }}
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="Hello Asadullah some books
is recognize for SIC "
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="three"
          manyPeople
          havNotUser
          onPress={() => {
            setIsLive(!isLive);
            navigation?.navigate('LiveConversation');
          }}
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        /> */}

        <Animated.View
          style={{
            paddingBottom: scrollViewGapHight,
          }}
        />
    
      {/*==================== Body part Start ===================  */}

      <ConversationalModal
        navigation={navigation}
      />

      {/* donation modal  */}
      <ModalOfBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onlyTopRadius={20}
       
        // backButton
      >
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.neutralColor,
            }}>
            Share Integrity Donation
          </Text>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              Linking.openURL('https://www.sic.com/donation');
            }}>
            <Text
              style={{
                fontFamily: font.Poppins,
                fontSize: 12,
                color: colors.blue,
                marginTop: '10%',
              }}>
              https://www.sic.com/donation
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
                Clipboard.setString('https://www.sic.com/donation');
                ToastAndroid.showWithGravity(
                  'link copy to https://www.sic.com/donation',
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
                marginBottom: 10,
              }}>
              <MaterialCommunityIcons
                name="content-copy"
                size={15}
                color={'rgba(0,0,0,.5)'}
              />
              <Text
                style={{
                  fontFamily: font.Poppins,
                  // fontSize: 12,
                  color: 'rgba(0,0,0,.5)',
                }}>
                Copy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalOfBottom>

      <View
        style={{
          height: '7.2%',
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
