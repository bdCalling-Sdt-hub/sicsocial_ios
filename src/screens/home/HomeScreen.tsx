import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {GFonts} from '../../styles/GFonts';
import {GColors} from '../../styles/GColors';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import {SvgUri, SvgXml} from 'react-native-svg';
import ConversationalCard from '../../components/common/ConversationalCard';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import {Link, useTheme} from '@react-navigation/native';
import {NavigProps} from '../../interfaces/NaviProps';
import {ContextProvider} from '../../context/ContextApi';

const HomeScreen = ({navigation}: NavigProps<null>) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const {isDark, setDark} = useContext(ContextProvider);
  console.log(isDark);
  return (
    <View
      style={{
        height: '100%',
        // backgroundColor: 'gray',
        backgroundColor: 'white',
      }}>
      {/*=============== border cover ================== */}
      <View
        style={{
          height: '7.2%',
        }}
      />
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
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 99999,
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
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Search');
            }}>
            <Image source={require('../../assets/icons/search/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Notifications');
              // setDark(!isDark);
            }}>
            <Image source={require('../../assets/icons/bell/bell.png')} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/*==================== profile card end ===================  */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 16,
          paddingTop: 16,
          paddingBottom: 16,
        }}>
        {/*========================== conversation card start ======================= */}

        <ConversationalCard
          disabled
          conversationStyle="donation"
          conversationTitle="Hello Asadullah"
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
          cardStyle="single"
          conversationTitle="You"
          conversationSubtitle="Start a chat"
          lastMessageTime="9:30 am"
          lastMessage="All of my friends pleas 
            Share your story my friends"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="two"
          conversationTitle="Khushi Aktar"
          conversationSubtitle="replied in chat"
          lastMessageTime="9:30 am"
          lastMessage="Hello asad vai, i`m 
coming from Banasri"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="book"
          conversationTitle="SIC Discussion"
          conversationSubtitle="recommendations"
          lastMessageTime="9:30 am"
          lastMessage="Hello Asadullah some books
is recognize for SIC "
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="many"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="many"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="many"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
        <ConversationalCard
          conversationStyle="normal"
          cardStyle="many"
          conversationTitle="COFFE HOUSE"
          conversationSubtitle="join room"
          lastMessageTime="8:10 am"
          lastMessage="nadin invite you in room"
        />
      </ScrollView>
      {/*==================== Body part Start ===================  */}

      <View
        style={{
          position: 'absolute',
          bottom: 65,
          borderRadius: 100,
          // width: '100%',
          alignSelf: 'center',
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

      <ModalOfBottom
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onlyTopRadius={20}
        backButton
        height={'30%'}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: GFonts.PoppinsSemiBold,
              color: GColors.textColor.blackSemiBold,
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
                fontFamily: GFonts.Poppins,
                fontSize: 12,
                color: GColors.blue,
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
                backgroundColor: GColors.white,
                borderRadius: 100,
              }}>
              <MaterialCommunityIcons name="content-copy" size={15} />
              <Text>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalOfBottom>
      {/*==================== Body part end ===================  */}
      <View
        style={{
          height: '7.2%',
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
