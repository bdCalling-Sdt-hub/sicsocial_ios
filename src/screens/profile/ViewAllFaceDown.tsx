import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import { SvgXml } from 'react-native-svg';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';
import { useGetFaceDownQuery } from '../../redux/apiSlices/facedwonSlice';
import { makeImage } from '../../utils/utils';

const MyFaceDown = [
  {
    id: 1,
    name: 'Asad Face',
    img: require('../../assets/tempAssets/face1.jpg'),
  },
];
const FaceDown = [
  {
    id: 2,
    name: 'Cricket club',
    img: require('../../assets/tempAssets/face2.png'),
  },
  {
    id: 3,
    name: 'T20 2024',
    img: require('../../assets/tempAssets/face3.png'),
  },
];
const ViewAllFaceDown = ({navigation}: NavigProps<null>) => {
  const {data : myFaceDowns} = useGetFaceDownQuery({})  
  const {colors, font} = useStyles();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="All Face Dwn"
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
      <View
        style={{
          gap: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            gap: 10,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 16,
              color: colors.textColor.light,
              paddingHorizontal: '4%',
            }}>
            My Face Dwn
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
              paddingRight: 20,
              paddingHorizontal: '5%',
            }}
            data={myFaceDowns?.data}
            ListFooterComponent={() => {
              return (
                <View style={{gap: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('CreateFaceDown');
                    }}
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 20,
                      backgroundColor: colors.secondaryColor,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <SvgXml
                      xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.1667 9.91667H12.0833V1.83333C12.0833 1.54602 11.9692 1.27047 11.766 1.0673C11.5629 0.864137 11.2873 0.75 11 0.75C10.7127 0.75 10.4371 0.864136 10.234 1.0673C10.0308 1.27046 9.91667 1.54601 9.91667 1.83333V9.91667H1.83333C1.54601 9.91667 1.27046 10.0308 1.0673 10.234C0.864136 10.4371 0.75 10.7127 0.75 11C0.75 11.2873 0.864137 11.5629 1.0673 11.766C1.27047 11.9692 1.54602 12.0833 1.83333 12.0833H9.91667V20.1667C9.91667 20.454 10.0308 20.7295 10.234 20.9327C10.4371 21.1359 10.7127 21.25 11 21.25C11.2873 21.25 11.5629 21.1359 11.766 20.9327C11.9692 20.7295 12.0833 20.454 12.0833 20.1667V12.0833H20.1667C20.454 12.0833 20.7295 11.9692 20.9327 11.766C21.1359 11.5629 21.25 11.2873 21.25 11C21.25 10.7127 21.1359 10.4371 20.9327 10.234C20.7295 10.0308 20.454 9.91667 20.1667 9.91667Z" fill="#767676" stroke="#767676" stroke-width="0.5"/>
</svg>
`}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: font.Poppins,
                      color: colors.textColor.neutralColor,
                      textAlign: 'center',
                    }}>
                    New Face
                  </Text>
                </View>
              );
            }}
            renderItem={item => (
              <View style={{gap: 6}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('FaceDownConversation');
                  }}
                  style={{
                    backgroundColor: colors.secondaryColor,
                    // paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 2,
                    borderRadius: 20,
                    padding: 2,
                    position: 'relative',
                  }}>
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 20,
                      resizeMode: 'stretch',
                    }}
                    source={{
                      uri : makeImage(item.item.image)
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: font.Poppins,
                    color: colors.textColor.neutralColor,
                    textAlign: 'center',
                  }}>
                  {item.item.name}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            gap: 10,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 16,
              color: colors.textColor.light,
              paddingHorizontal: '4%',
            }}>
            Other Face Dwn
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 20,
              paddingRight: 20,
              paddingHorizontal: '5%',
            }}
            data={myFaceDowns?.data}
            renderItem={item => (
              <View style={{gap: 6}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation?.navigate('FaceDownConversation');
                  }}
                  style={{
                    backgroundColor: colors.secondaryColor,
                    // paddingVertical: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 2,
                    borderRadius: 20,
                    padding: 2,
                    position: 'relative',
                  }}>
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 20,
                      resizeMode: 'stretch',
                    }}
                    source={{
                      uri : makeImage(item.item.image)
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: font.Poppins,
                    color: colors.textColor.neutralColor,
                    textAlign: 'center',
                  }}>
                  {item.item.name}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ViewAllFaceDown;

const styles = StyleSheet.create({});
