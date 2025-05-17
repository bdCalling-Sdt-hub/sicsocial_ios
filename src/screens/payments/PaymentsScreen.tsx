import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PopUpModal, {
  PopUpModalRef,
} from '../../components/common/modals/PopUpModal';
import {
  usePaymentIntentMutation,
  usePaymentRecordMutation,
} from '../../redux/apiSlices/paymnetSlices';

import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import CustomModal from '../../components/common/customModal/CustomModal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';
import NormalButton from '../../components/common/NormalButton';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import {useGetUserProfileQuery} from '../../redux/apiSlices/authSlice';

const PaymentsScreen = ({navigation}: NavigProps<null>) => {
  const {confirmPayment, loading} = useConfirmPayment();
  const modalRef = React.useRef<PopUpModalRef>();
  const {colors, font} = useStyles();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [extraLoading, setExtraLoading] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [paymentSSModal, setPaymentSSModal] = React.useState(false);
  const {data: userData} = useGetUserProfileQuery({});

  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState('');
  const [personalInfo, setPersonalInfo] = React.useState({
    customerName: userData?.data?.fullName || '',
    customerEmail: userData?.data?.email || '',
  });

  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  const [paymentIntent] = usePaymentIntentMutation();
  const [paymentRecord] = usePaymentRecordMutation();

  // console.log(userData?.data);

  const handlePayPress = async () => {
    try {
      // min 50

      setExtraLoading(true);
      // Gather the customer's billing information
      const billingDetails = {
        name: personalInfo.customerName,
        email: personalInfo.customerEmail,
      };

      // Fetch the intent client secret from the backend
      const paymentInt = await paymentIntent({
        price: Number(amount),
      });
      // console.log(paymentInt?.data?.data?.clientSecret);
      if (paymentInt?.error) {
        console.log('Payment intent error', paymentInt?.error);
      }
      if (paymentInt?.data?.data?.clientSecret) {
        // Confirm the payment with the card details
        const {paymentIntent, error} = await confirmPayment(
          paymentInt?.data?.data?.clientSecret,
          {
            paymentMethodType: 'Card',
            paymentMethodData: {
              billingDetails,
            },
          },
        );

        // console.log(paymentIntent);

        if (error) {
          setExtraLoading(false);
          setPaymentModal(false);
          if (Platform?.OS === 'ios') {
            Alert.alert('Payment Failed', error?.message);
          } else {
            modalRef.current?.open({
              title: 'Payment Failed',
              content: error.message,
            });
          }
        } else if (paymentIntent?.status === 'Succeeded') {
          setPaymentModal(false);

          await paymentRecord({
            amount: amount,
            transactionId: 'string', // Log or save customer name
          });
          setPaymentSSModal(true);
          setExtraLoading(false);
        }
      } else {
        setExtraLoading(false);
        modalRef.current?.open({
          title: 'Warning',
          content: 'Payment intent not found',
        });
        console.log('Payment intent not found');
      }
    } catch (error) {
      setExtraLoading(false);
      console.log(error);
    }
  };

  // Function to handle validation of amount
  const validateAmount = text => {
    // Check if the value is a number and at least 50
    const value = parseFloat(text);

    if (isNaN(value) || value < 50) {
      setError('Amount must be at least $50');
    } else {
      setError('');
    }

    setAmount(text);
  };

  return (
    <StripeProvider publishableKey="pk_test_51M6AQECe4QqAuKX4hQuRPLKDeB192L6xZiop8yWhLLrmbBTZjSsPKPyGvhhHVlKQNikct3mhaeZgyGjYTA17VwbT00l34SeOAr">
      <View
        style={{
          height: '100%',
          backgroundColor: colors.bg,
        }}>
        <BackButtonWithTitle
          navigation={navigation}
          thirdRoll
          title="Donation informations"
          titleStyle={{
            fontSize: 20,
            color: colors.textColor.primaryColor,
            fontFamily: font.PoppinsSemiBold,
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View
            style={{
              marginTop: 24,
              marginHorizontal: '5%',
              gap: 24,
            }}>
            {userData?.data?.fullName && (
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
                  Full name
                </Text>
                <TextInput
                  editable={false}
                  value={userData?.data?.fullName}
                  style={{
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.gray.variant,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="Enter full name"
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                />
              </View>
            )}
            {userData?.data?.email && (
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
                  Email <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  editable={false}
                  value={userData?.data?.email}
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                  style={{
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.gray.variant,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="Enter email"
                />
              </View>
            )}
            {userData?.data?.phoneNumber && (
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
                  Contact no
                </Text>
                <TextInput
                  editable={false}
                  value={userData?.data?.phoneNumber}
                  style={{
                    color: colors.textColor.normal,
                    fontFamily: font.Poppins,
                    backgroundColor: colors.gray.variant,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="Enter contact no"
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                />
              </View>
            )}
            {userData?.data?.address && (
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
                  Address
                </Text>
                <TextInput
                  editable={false}
                  value={userData?.data?.address}
                  style={{
                    fontFamily: font.Poppins,
                    backgroundColor: colors.gray.variant,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                    color: colors.textColor.normal,
                  }}
                  placeholder="Enter address"
                  placeholderTextColor={colors.textColor.palaceHolderColor}
                />
              </View>
            )}

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
                Donation Amounts
              </Text>
              <TextInput
                style={{
                  color: 'black', // Use your color here
                  fontFamily: 'Poppins', // Use your font here
                  backgroundColor: '#f0f0f0', // Use your color here
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                }}
                value={amount}
                onChangeText={validateAmount}
                placeholder="min-$50"
                placeholderTextColor="#aaa" // Use your color here
                keyboardType="decimal-pad"
              />

              {error ? (
                <Text style={{color: 'red', fontSize: 12}}>{error}</Text>
              ) : null}
            </View>
            <View
              style={{
                marginVertical: 10,
              }}>
              <NormalButton
                disabled={Number(amount) <= 49}
                onPress={() => {
                  setPaymentModal(true);
                }}
                title="Payment"
              />
            </View>
          </View>
        </ScrollView>
        {/* <CustomModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          Radius={15}
          width={'80%'}
          containerColor={colors.bg}
          // height={'43%'}
          backButton
          appearance>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                marginVertical: 10,
                color: colors.textColor.secondaryColor,
                fontFamily: font.PoppinsSemiBold,
              }}>
              Plus confirm your informatins
            </Text>

            <View
              style={{
                marginVertical: 10,
                //   justifyContent: 'center',
                //   alignItems: 'center',
                gap: 15,
                paddingHorizontal: '5%',
              }}>
              {userData?.data?.fullName && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsMedium,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    Name :
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    {userData?.data?.fullName}
                  </Text>
                </View>
              )}
              {userData?.data?.email && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsMedium,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    Email :
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    {userData?.data?.email}
                  </Text>
                </View>
              )}
              {userData?.data?.phoneNumber && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsMedium,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    Contact no:
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    {userData?.data?.phoneNumber}
                  </Text>
                </View>
              )}
              {userData?.data?.address && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsMedium,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    Address:
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 14,
                      color: colors.textColor.normal,
                      textTransform: 'capitalize',
                      width: '80%',
                    }}>
                    {userData?.data?.address}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Text
                  style={{
                    fontFamily: font.PoppinsMedium,
                    fontSize: 14,
                    color: colors.textColor.normal,
                  }}>
                  Donation :
                </Text>
                <Text
                  style={{
                    fontFamily: font.PoppinsMedium,
                    fontSize: 14,
                    color: colors.textColor.normal,
                  }}>
                  ${amount}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginVertical: 20,
              }}>
              <NormalButton
                title="Confirm"
                hight={45}
                textSize={14}
                width={'100%'}
                onPress={() => {
                  setModalVisible(false);
                  setPaymentModal(true);
                }}
              />
            </View>
          </View>
        </CustomModal> */}
        <ModalOfBottom
          setModalVisible={setPaymentModal}
          modalVisible={paymentModal}
          backButton
          containerColor={colors.bg}>
          <View
            style={{
              marginVertical: 20,
              // paddingHorizontal: '5%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: colors.textColor.secondaryColor,
                fontFamily: font.Poppins,
              }}>
              Add your payment information
            </Text>

            <View
              style={{
                marginVertical: 10,
                gap: -15,
                borderColor: colors.gray.variantTwo,
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: '3%',
              }}>
              <TextInput
                style={{
                  color: colors.textColor.normal,
                  height: 50,
                }}
                placeholderTextColor={colors.textColor.palaceHolderColor}
                placeholder="Full Name"
                value={personalInfo.customerName}
                onChangeText={text =>
                  setPersonalInfo({...personalInfo, customerName: text})
                }
              />
            </View>
            <View
              style={{
                marginVertical: 10,
                gap: -15,
                borderColor: colors.gray.variantTwo,
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: '3%',
              }}>
              <TextInput
                style={{
                  color: colors.textColor.normal,
                  height: 50,
                }}
                placeholderTextColor={colors.textColor.palaceHolderColor}
                placeholder="Email"
                value={personalInfo.customerEmail}
                onChangeText={text =>
                  setPersonalInfo({...personalInfo, customerEmail: text})
                }
              />
            </View>

            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: colors.bg,
                textColor: colors.textColor.normal,
                borderColor: colors.gray.variantTwo,
                borderWidth: 1,
                borderRadius: 8,
                placeholderColor: colors.textColor.palaceHolderColor,
              }}
              style={{
                width: '100%',
                height: 56,
                marginVertical: 10,
              }}
              onCardChange={cardDetails => {
                // console.log('cardDetails', cardDetails);
              }}
              onFocus={focusedField => {
                // console.log('focusField', focusedField);
              }}
            />

            <View
              style={{
                marginTop: 15,
              }}>
              <NormalButton
                title={'Pay $' + amount}
                hight={45}
                backGroundColor={colors.primaryColor}
                radius={5}
                disabled={loading || extraLoading}
                isLoading={loading || extraLoading}
                onPress={() => {
                  handlePayPress();
                }}
              />
            </View>
          </View>
        </ModalOfBottom>
        <CustomModal
          setModalVisible={setPaymentSSModal}
          modalVisible={paymentSSModal}
          containerColor={colors.bg}
          Radius={15}
          width={'80%'}
          // height={'40%'}
          backButton
          appearance>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                marginVertical: 10,
                color: '#F27405',
                fontFamily: font.PoppinsSemiBold,
                marginTop: 30,
              }}>
              Congratulations !
            </Text>
            <View
              style={{
                marginVertical: 10,
                //   justifyContent: 'center',
                //   alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 13,
                  color: colors.textColor.normal,
                  textAlign: 'justify',
                }}>
                {userData?.data?.fullName} , your donation is completed verify
                your email for donation derails .
              </Text>
              {userData?.data?.email && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsMedium,
                      fontSize: 13,
                      color: colors.textColor.normal,
                    }}>
                    Email :
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 14,
                      color: colors.textColor.normal,
                    }}>
                    {userData?.data?.email}
                  </Text>
                </View>
              )}

              {userData?.data?.address && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: font.PoppinsMedium,
                      fontSize: 13,
                      color: colors.textColor.normal,
                    }}>
                    Address:
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.Poppins,
                      fontSize: 13,
                      color: colors.textColor.normal,
                      textTransform: 'capitalize',
                      width: '80%',
                    }}>
                    {userData?.data?.address}
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                  marginVertical: 8,
                }}>
                <Text
                  style={{
                    fontFamily: font.PoppinsMedium,
                    fontSize: 20,
                    color: colors.green['#00B047'],
                  }}>
                  Dontion amount :
                </Text>
                <Text
                  style={{
                    fontFamily: font.PoppinsMedium,
                    fontSize: 20,
                    color: colors.green['#00B047'],
                  }}>
                  ${amount}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 24,
                marginVertical: 5,
                marginBottom: 10,
              }}>
              <NormalButton
                title="Donate again"
                hight={40}
                textSize={14}
                outLine
                width={'45%'}
                onPress={() => {
                  setPaymentModal(false);
                  setPaymentSSModal(false);

                  setAmount('');
                }}
              />
              <NormalButton
                title="Back to home"
                hight={40}
                textSize={14}
                // outLine
                width={'45%'}
                onPress={() => {
                  setPaymentSSModal(false);
                  setAmount('');
                  setPersonalInfo({
                    customerName: '',
                    customerEmail: '',
                  });
                  navigation?.navigate('Home');
                }}
              />
            </View>
          </View>
        </CustomModal>
        <PopUpModal ref={modalRef} />
      </View>
    </StripeProvider>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
