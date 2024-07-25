import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {Image} from 'react-native';
import {getRandomColor} from '../../utils/GetRandomColor';

const friends = [
  {
    id: 1,
    name: 'Amina',
    img: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    lastMessage: 'Assalamuallikum, how are...',
  },
  {
    id: 2,
    name: 'Arif',
    img: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    lastMessage: 'Sir you are great.',
  },
  {
    id: 2,
    name: 'Arif',

    lastMessage: 'Sir you are great.',
  },
  {
    id: 2,
    name: 'Arif',
    img: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    lastMessage: 'Sir you are great.',
  },
  {
    id: 3,
    name: 'Rahman',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 3,
    name: 'Rahman',

    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 3,
    name: 'Rahman',

    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 3,
    name: 'Rahman',
    img: require('../../assets/tempAssets/51ad46951bbdc28be4cf7e384964f309.jpg'),
    lastMessage: 'Brother eid mubarak',
  },
  {
    id: 4,
    name: 'Mithila',
    img: require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg'),
    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 5,
    name: 'Samina',
    img: require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg'),
    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 5,
    name: 'Samina',

    lastMessage: 'you: I’m feeling good',
  },
  {
    id: 5,
    name: 'Samina',
    img: require('../../assets/tempAssets/7261c2ae940abab762a6e0130b36b3a9.jpg'),
    lastMessage: 'you: I’m feeling good',
  },
];

const MyAllFriends = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="My friends"
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
      <Text
        style={{
          textAlign: 'right',
          paddingHorizontal: '5%',
        }}>
        {friends.length} friends
      </Text>
      <View
        style={{
          paddingVertical: 20,
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={4}
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
          contentContainerStyle={{
            gap: 16,
            paddingRight: 20,
            paddingHorizontal: '5%',
          }}
          data={friends}
          renderItem={item => (
            <View style={{gap: 6}}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: colors.secondaryColor,
                  // paddingVertical: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 3,
                  borderRadius: 50,
                  padding: 3,
                  position: 'relative',
                }}>
                {/* <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 50,
                      backgroundColor: colors.green['#00B047'],
                      position: 'absolute',
                      right: 0,
                      zIndex: +1,
                      bottom: 5,
                    }}
                  /> */}
                {item.item.img ? (
                  <Image
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 30,
                      resizeMode: 'contain',
                    }}
                    source={item.item.img}
                  />
                ) : (
                  <View
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 30,
                      backgroundColor: getRandomColor(),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 35,
                        fontFamily: font.PoppinsBold,
                        color: getRandomColor(),
                        textAlign: 'center',
                        marginTop: 5,
                      }}>
                      {item.item.name?.slice(0, 1)}
                    </Text>
                  </View>
                )}
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
  );
};

export default MyAllFriends;

const styles = StyleSheet.create({});
