import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {Books} from './ShareBooksScreen';
import ConversationCarousal from '../../components/common/ConversationCarousal/ConversationCarousal';
import {SvgXml} from 'react-native-svg';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';

const BookShareScreen = ({navigation, route}: NavigProps<Books>) => {
  const {colors, font} = useStyles();
  const {height, width} = useWindowDimensions();
  const [modalVisible, setModalVisible] = React.useState(false);
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
            activeOpacity={0.8}
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <SvgXml
              xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7091 5.69031C9.40521 5.86132 6.31623 7.23667 3.94627 9.60668C1.40904 12.1439 0.0117188 15.5055 0.0117188 19.0723V24L1.79676 19.8851C3.88171 15.7306 8.1098 12.9761 12.7091 12.7198V18.3986L23.9884 9.18537L12.7091 0V5.69031ZM14.1147 7.07774V2.95742L21.7644 9.18701L14.1147 15.4355V11.2946H13.4119C10.747 11.2946 8.12999 12.0439 5.84399 13.4615C4.11284 14.5351 2.63788 15.9505 1.50565 17.613C2.22758 11.6846 7.29178 7.07774 13.4119 7.07774H14.1147Z" fill="#333333"/>
</svg>
`}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '4%',
            paddingVertical: '5%',
            gap: 10,
          }}>
          <Image
            style={{
              width: width * 0.5,
              height: height * 0.31,
              resizeMode: 'stretch',
              borderRadius: 20,
            }}
            source={
              route?.params?.data?.image
                ? {
                    uri: route?.params?.data?.image,
                  }
                : require('../../assets/tempAssets/book.jpg')
            }
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
              Educated a memoir
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.textColor.neutralColor,
                fontFamily: font.Poppins,
              }}>
              Tara wetoyer
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: '4%',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: colors.textColor.neutralColor,
              fontFamily: font.Poppins,
              marginBottom: 10,
              textAlign: 'justify',
              letterSpacing: 0.6,
              lineHeight: 24,
            }}>
            efficitur. ac gravida sit turpis id elit. tincidunt sodales. laoreet
            facilisis vehicula, convallis. varius amet, faucibus non. placerat
            turpis eget sapien ipsum tempor felis, vitae ex Quisque ipsum
            convallis. tortor. at, quis lorem. non. eu placerat sed Nam non
            {'\n'}
            {'\n'}
            nulla, venenatis dui. eu ipsum odio leo. elit. viverra Sed Praesent
            ipsum id faucibus efficitur. tincidunt hendrerit placerat. viverra
            elementum nulla, risus elit id commodo lacus, nibh odio viverra
            {'\n'}
            {'\n'}
            consectetur sit malesuada Nunc porta amet, non adipiscing eget Donec
            facilisis malesuada varius ex Nam ipsum tincidunt scelerisque ipsum
            facilisis tortor. tincidunt scelerisque non. Donec nisi volutpat
            convallis. efficitur. tincidunt quis eu enim. sit Ut efficitur. ac
            gravida sit turpis id elit. tincidunt sodales. laoreet facilisis
            {'\n'}
            {'\n'}
            {'\n'}
            vehicula, convallis. varius amet, faucibus non. placerat turpis eget
            sapien ipsum tempor felis, vitae ex Quisque ipsum convallis. tortor.
            at, quis lorem. non. eu placerat sed Nam non nulla, venenatis dui.
            eu ipsum odio leo. elit. viverra Sed Praesent ipsum id faucibus
            efficitur. tincidunt hendrerit placerat. viverra elementum nulla,
            {'\n'}
            {'\n'}
            {'\n'}
            risus elit id commodo lacus, nibh odio viverra consectetur sit
            malesuada Nunc porta amet, non adipiscing eget Donec facilisis
            malesuada varius ex Nam ipsum tincidunt scelerisque ipsum facilisis
            tortor. tincidunt scelerisque non. Donec nisi volutpat convallis.
            efficitur. tincidunt quis eu enim. sit Ut
          </Text>
        </View>
      </ScrollView>
      <ModalOfBottom
        height={'22%'}
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
              // setModalVisible(false);
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
              // setModalVisible(false);
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
    </View>
  );
};

export default BookShareScreen;

const styles = StyleSheet.create({});
