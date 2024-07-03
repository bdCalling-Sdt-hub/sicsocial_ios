import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {GColors} from '../../styles/GColors';
import {GFonts} from '../../styles/GFonts';
import {NavigProps} from '../../interfaces/NaviProps';

const EmailConfirmationScreen = ({navigation}: NavigProps<null>) => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        containerStyle={{
          marginTop: 10,
        }}
        // offBack
        // thirdColl
        // title="Welcome Back !"
        offTitle
        titleStyle={{
          fontSize: 24,
          // marginTop: 10,
          color: GColors.textColor.blackNormal,
          fontFamily: GFonts.PoppinsSemiBold,
        }}
      />

      <View
        style={{
          marginHorizontal: '5%',
          gap: 24,
          flex: 1,
          //   alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 80,
        }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: GFonts.PoppinsSemiBold,
              color: GColors.textColor.blackNormal,
              textAlign: 'center',
            }}>
            Email Confirmation
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: GFonts.Poppins,
              color: GColors.textColor.blacklight,
              textAlign: 'center',
            }}>
            Enter Your email for verification.
          </Text>
        </View>
        <View
          style={{
            gap: 8,
          }}>
          <Text
            style={{
              fontFamily: GFonts.Poppins,
              fontSize: 14,
              color: '#A1A1A1',
            }}>
            Email
          </Text>
          <TextInput
            value="Gabrail101@gmail.com"
            style={{
              fontFamily: GFonts.Poppins,
              backgroundColor: GColors.primaryColor,
              borderRadius: 100,
              fontSize: 14,
              paddingHorizontal: 20,
              height: 56,
            }}
            placeholder="type "
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              // navigation?.navigate('HomeRoutes');
              // handleSubmit();
            }}
            style={{
              backgroundColor: GColors.secondaryColor,
              borderRadius: 100,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 24,
            }}>
            <Text
              style={{
                fontFamily: GFonts.PoppinsSemiBold,
                fontSize: 16,
                color: 'white',
              }}>
              Send Verification Code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmailConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
