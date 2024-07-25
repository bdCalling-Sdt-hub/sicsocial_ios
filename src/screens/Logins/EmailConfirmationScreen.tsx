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
import {NavigProps} from '../../interfaces/NaviProps';
import {useStyles} from '../../context/ContextApi';

const EmailConfirmationScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
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
          color: colors.textColor.secondaryColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

      <View
        style={{
          marginHorizontal: '5%',
          gap: 25,
          flex: 1,
          //   alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 80,
        }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: font.PoppinsSemiBold,
              color: colors.textColor.secondaryColor,
              textAlign: 'center',
            }}>
            Email Confirmation
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.neutralColor,
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
              fontFamily: font.Poppins,
              fontSize: 14,
              color: '#A1A1A1',
            }}>
            Email
          </Text>
          <TextInput
            value="Gabrail101@gmail.com"
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

        <View>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('VerifyEmail');
              // handleSubmit();
            }}
            style={{
              backgroundColor: colors.primaryColor,
              borderRadius: 100,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 24,
            }}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
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
