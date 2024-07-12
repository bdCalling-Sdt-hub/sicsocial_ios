import {
  Button,
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
import {Formik} from 'formik';
import Feather from 'react-native-vector-icons/Feather';
import NormalButton from '../../components/common/NormalButton';
import CustomModal from '../../components/common/customModal/CustomModal';
import ModalOfBottom from '../../components/common/customModal/ModalOfButtom';

const PaymentsScreen = ({navigation}: NavigProps<null>) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [paymentSSModal, setPaymentSSModal] = React.useState(false);

  const [isShow, setIsShow] = React.useState(false);
  const [check, setCheck] = React.useState(false);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        thirdColl
        title="Donation informations"
        titleStyle={{
          fontSize: 20,
          color: GColors.textColor.blackNormal,
          fontFamily: GFonts.PoppinsSemiBold,
        }}
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            name: 'Asadullah',
            email: 'Gabrail101@gmail.com',
            contract: '+99000000000000',
            password: 'asdfsadf',
            address: '74C Aaliyah River ,Bayerhaven',
          }}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View
              style={{
                marginTop: 24,
                marginHorizontal: '5%',
                gap: 24,
              }}>
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
                  Name
                </Text>
                <TextInput
                  value="Asadullah"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="type "
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values?.name}
                />
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
                  Email <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  value="Gabrail101@gmail.com"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="type "
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values?.email}
                />
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
                  Contact no
                </Text>
                <TextInput
                  value="+99000000000000"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="type "
                  onChangeText={handleChange('contract')}
                  onBlur={handleBlur('contract')}
                  value={values?.contract}
                />
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
                  Address
                </Text>
                <TextInput
                  value="Gabrail10"
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="type "
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values?.address}
                />
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
                  Donation Amounts
                </Text>
                <TextInput
                  style={{
                    fontFamily: GFonts.Poppins,
                    backgroundColor: GColors.secondaryColor,
                    borderRadius: 100,
                    fontSize: 14,
                    paddingHorizontal: 20,
                    height: 56,
                  }}
                  placeholder="$ "
                  keyboardType="decimal-pad"
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                }}>
                <NormalButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  title="Payment"
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <CustomModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        Radius={15}
        width={'80%'}
        height={'43%'}
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
              color: GColors.textColor.blackNormal,
              fontFamily: GFonts.PoppinsSemiBold,
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
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Name :
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.Poppins,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Asadullah
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Email :
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.Poppins,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Gabrail101@gmail.com
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Contact no:
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.Poppins,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                +09999999
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Address:
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.Poppins,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                  textTransform: 'capitalize',
                  width: '80%',
                }}>
                74C Aaliyah River ,Bayerhaven
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Donation :
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                $200
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
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
        height={'50%'}
        backButton
        backButtonColor={'white'}
        containerColor="#333333">
        <View
          style={{
            marginVertical: 20,
            // paddingHorizontal: '5%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: GColors.white,
              fontFamily: GFonts.Poppins,
            }}>
            Add your payment information
          </Text>

          <View
            style={{
              height: 106,
              backgroundColor: '#767676',
              marginVertical: 5,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#C0C0C0',
            }}>
            <View
              style={{
                padding: 2,
                paddingHorizontal: 5,
                gap: -15,
                borderBottomColor: '#C0C0C0',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: '#C0C0C0',
                  paddingLeft: 2,
                }}>
                Card no
              </Text>
              <TextInput
                style={{
                  color: GColors.white,
                  height: 40,
                }}
                placeholderTextColor={'white'}
                placeholder="7777 7777 7777 7007"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  padding: 2,
                  paddingHorizontal: 5,
                  gap: -15,
                  flex: 1,
                  paddingLeft: 10,
                }}>
                <Text
                  style={{
                    fontFamily: GFonts.PoppinsMedium,
                    fontSize: 14,
                    color: '#C0C0C0',
                    paddingLeft: 2,
                  }}>
                  MM / YY
                </Text>
                <TextInput
                  style={{
                    color: GColors.white,
                    height: 40,
                  }}
                  placeholderTextColor={'white'}
                  placeholder="1/42"
                />
              </View>
              <View
                style={{
                  padding: 2,
                  paddingHorizontal: 5,
                  gap: -15,
                  flex: 1,
                  borderLeftWidth: 1,
                  borderLeftColor: '#C0C0C0',
                  marginRight: 5,
                  paddingLeft: 10,
                }}>
                <Text
                  style={{
                    fontFamily: GFonts.PoppinsMedium,
                    fontSize: 14,
                    color: '#C0C0C0',
                    paddingLeft: 2,
                  }}>
                  CVC
                </Text>
                <TextInput
                  style={{
                    color: GColors.white,
                    height: 40,
                  }}
                  placeholderTextColor={'white'}
                  placeholder="121"
                />
              </View>
            </View>
          </View>
          <View
            style={{
              height: 106,
              backgroundColor: '#767676',
              marginVertical: 5,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#C0C0C0',
            }}>
            <View
              style={{
                padding: 2,
                paddingHorizontal: 5,
                gap: -15,
                borderBottomColor: '#C0C0C0',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: '#C0C0C0',
                  paddingLeft: 2,
                }}>
                Country or region
              </Text>
              <TextInput
                style={{
                  color: GColors.white,
                  height: 40,
                }}
                placeholderTextColor={'white'}
                placeholder="United Kingdom"
              />
            </View>

            <View
              style={{
                padding: 2,
                paddingHorizontal: 5,
                gap: -15,
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: '#C0C0C0',
                marginRight: 5,
                paddingLeft: 10,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 14,
                  color: '#C0C0C0',
                  paddingLeft: 2,
                }}>
                postcode
              </Text>
              <TextInput
                style={{
                  color: GColors.white,
                  height: 40,
                }}
                placeholderTextColor={'white'}
                placeholder="QERT"
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
            }}>
            <Button
              title="Pay 100€ "
              onPress={() => {
                setPaymentSSModal(true);
                setPaymentModal(!paymentModal);
              }}
            />
          </View>
        </View>
      </ModalOfBottom>
      <CustomModal
        setModalVisible={setPaymentSSModal}
        modalVisible={paymentSSModal}
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
              fontFamily: GFonts.PoppinsSemiBold,
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
                fontFamily: GFonts.Poppins,
                fontSize: 13,
                color: GColors.textColor.blacklight,
                textAlign: 'justify',
              }}>
              Asadullah , your donation is completed verify your email for
              donation derails .
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 13,
                  color: GColors.textColor.blacklight,
                }}>
                Email :
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.Poppins,
                  fontSize: 14,
                  color: GColors.textColor.blacklight,
                }}>
                Gabrail101@gmail.com
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 13,
                  color: GColors.textColor.blacklight,
                }}>
                Address:
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.Poppins,
                  fontSize: 13,
                  color: GColors.textColor.blacklight,
                  textTransform: 'capitalize',
                  width: '80%',
                }}>
                13th Street. 47 W 13th St, NewYork
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                marginVertical: 8,
              }}>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 20,
                  color: GColors.green['#00B047'],
                }}>
                Dontion amount :
              </Text>
              <Text
                style={{
                  fontFamily: GFonts.PoppinsMedium,
                  fontSize: 20,
                  color: GColors.green['#00B047'],
                }}>
                $800
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
                setModalVisible(false);
                setPaymentSSModal(false);
              }}
            />
            <NormalButton
              title="Back to home"
              hight={40}
              textSize={14}
              // outLine
              width={'45%'}
              onPress={() => {
                setPaymentModal(false);
                setModalVisible(false);
                navigation?.navigate('Home');
              }}
            />
          </View>
        </View>
      </CustomModal>
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
