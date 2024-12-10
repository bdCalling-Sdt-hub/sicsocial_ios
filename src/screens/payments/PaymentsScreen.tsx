import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
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

  const [amount, setAmount] = React.useState('');
  const [personalInfo, setPersonalInfo] = React.useState({
    customerName: '',
    customerEmail: '',
  });

  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  const {data: userData} = useGetUserProfileQuery({});

  const [paymentIntent] = usePaymentIntentMutation();
  const [paymentRecord] = usePaymentRecordMutation();

  // console.log(userData?.data);

  const handlePayPress = async () => {
    try {
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
        // console.log('Payment intent error', paymentInt?.error);
      }
      if (paymentInt?.data?.data?.clientSecret) {
        // Confirm the payment with the card details
        const {paymentIntent, error} = await confirmPayment(
          paymentInt?.data?.data?.clientSecret,
          {
            paymentMethodType: 'Card',
            // paymentMethodData: {
            //   billingDetails,
            // },
          },
        );

        if (error) {
          setExtraLoading(false);
          // console.log('Payment confirmation error', error);
          modalRef.current?.open({
            title: 'Warning',
            content: error.message,
          });
          setPaymentModal(false);
        } else if (paymentIntent) {
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

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        thirdColl
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
                  fontFamily: font.Poppins,
                  backgroundColor: colors.gray.variant,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  color: colors.textColor.normal,
                }}
                placeholder="type "
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
                style={{
                  fontFamily: font.Poppins,
                  backgroundColor: colors.gray.variant,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  color: colors.textColor.normal,
                }}
                placeholder="type "
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
                  fontFamily: font.Poppins,
                  backgroundColor: colors.gray.variant,
                  borderRadius: 100,
                  fontSize: 14,
                  paddingHorizontal: 20,
                  height: 56,
                  color: colors.textColor.normal,
                }}
                placeholder="type "
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
                placeholder="type "
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
                fontFamily: font.Poppins,
                backgroundColor: colors.secondaryColor,
                borderRadius: 100,
                fontSize: 14,
                paddingHorizontal: 20,
                height: 56,
                color: colors.textColor.normal,
              }}
              value={amount}
              onChangeText={text => setAmount(text)}
              placeholder="min-$50"
              placeholderTextColor={colors.textColor.neutralColor}
              keyboardType="decimal-pad"
            />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}>
            <NormalButton
              disabled={!amount}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              title="Payment"
            />
          </View>
        </View>
      </ScrollView>
      <CustomModal
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
                setPaymentModal(!paymentModal);
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </CustomModal>
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
              placeholderTextColor={colors.textColor.gray}
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
              placeholderTextColor={colors.textColor.gray}
              placeholder="Email"
              value={personalInfo.customerEmail}
              onChangeText={text =>
                setPersonalInfo({...personalInfo, customerEmail: text})
              }
            />
          </View>

          <StripeProvider publishableKey="pk_test_51M6AQECe4QqAuKX4hQuRPLKDeB192L6xZiop8yWhLLrmbBTZjSsPKPyGvhhHVlKQNikct3mhaeZgyGjYTA17VwbT00l34SeOAr">
            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                borderColor: '#D1D1D1',
                borderWidth: 1,
                borderRadius: 8,
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
          </StripeProvider>

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
        height={'40%'}
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
              marginTop: 5,
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
