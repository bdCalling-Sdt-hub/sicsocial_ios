import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {SvgXml} from 'react-native-svg';

const MyFaceDown = [
  {
    id: 1,
    name: 'Asad Face',
    img: 'https://s3-alpha-sig.figma.com/img/a963/5111/9298a7b25821b6b5a2ef8104464db1a4?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lNBH6-vX8Uo3rPHZWapkYFBzIL0qKJ9cBRxc~W9GSjQyKr2xeY9ifz9oYdWdT0FobcK-Tx9BRQotPDOwS3Of0lm4ewfAGW4Qc05mwqygaK6q1j9kZKGjHgPOArJ5We~Oza55jWQ4cPS8NFBvj6FNOMFyyb9ASAxPHHxKX99or6Po2zoHQm-L4KS3JJ84YuINCBQi8pJLDvCiOHPGOIZRnjC8zlibDpD6J69aDBs7sOOpjT~1yLY4xfST7lXkYD-6HJLm50vRvFhzuhMstffm0TOKBcPyiUrujsvXo~L4RvXtBO5Uf6EqIB1O-n5bU43UgqaYC73yz0bpEIXn98QT5Q__',
  },
];

const FaceDown = [
  {
    id: 2,
    name: 'Cricket club',
    img: 'https://s3-alpha-sig.figma.com/img/f1c1/7d5e/4d68c81ba9bf66877ac4f8230081fe0c?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oGcr0K97wQ3MhTQX4oLbQ4P5cnISeUeLYLQ5rlQXWv-cK~B1~ZKb1qbZARsDypCYlGuiVHyOn1jmWSD142DEYANqeCD4Ud-KH858xCvBRwnymOeE3CrT7wAXjyoFn~NqGQqEe0F1Q0J1ZpP~DEAyvU3mibobfE--klTq1fzIQW~4-kJwmQ5KmY913uOSKyuF8VkcQK5eraMrYzFBe4j1KGfRnbaxr~S5h~5~cUSx7mFl1E~dgStVcSbth~RAa0Vqw~14-Z9uCBZw1ReodXrQ0RgC37wnAi6NE8bfMML265U7uuH2ckcAexJHQ3BoVE34bxbZwBpJ78g6Ns4W4I26oQ__',
  },
  {
    id: 3,
    name: 'T20 2024',
    img: 'https://s3-alpha-sig.figma.com/img/4f46/2122/9d05939f0d46d30b533001f66200dd39?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AchyR3o5rmcHB1xpVUqJlnBpoyDjrOe6H4LoLAB94QW7zbRdPuXI-7gry4M~5a7JI0bzpdfw2ZVYR2FkHLSxLwk3QHlpfsWwZQQUee4QKJtw5Qmnh-riKwUTz2XbUMGCxbrIgvicz79uWS18CaTkkzNksq1FK9pu11Mdt11k9j5ryXqf8ME9UGiapujlz4OdIoursN~8yhs0VC4RQVHmzm0ZBs44YNND75o2EYBOdVtVc1zuqRiYTeVUthfmZsn3gqKb304XTlNwPCDTqmRORXXb6c07O3u0upCI-vDYQwtukrdUq3aNVE00qTcXtDJ2pER-bdiiIV1g41TJczqDmw__',
  },
];

const ViewAllFaceDown = ({navigation}: NavigProps<null>) => {
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
            data={MyFaceDown}
            ListFooterComponent={() => {
              return (
                <View style={{gap: 6}}>
                  <TouchableOpacity
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
                  onPress={() => {}}
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
                      uri: item.item.img,
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
            data={FaceDown}
            renderItem={item => (
              <View style={{gap: 6}}>
                <TouchableOpacity
                  onPress={() => {}}
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
                      uri: item.item.img,
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
