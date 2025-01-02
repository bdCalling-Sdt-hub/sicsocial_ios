import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  useGetUserProfileQuery,
  useUserUpdateMutation,
} from '../../redux/apiSlices/authSlice';

import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NormalButton from '../../components/common/NormalButton';
import InterestCard from '../../components/interest/InterestCard';
import {useStyles} from '../../context/ContextApi';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const data = [
  {
    id: 1,
    title: 'Way of Life',
    sub: [
      {
        id: 1,
        title: 'Social Structures',
      },
      {
        id: 2,
        title: 'Cultural',
      },
      {
        id: 3,
        title: 'Knowledge',
      },
      {
        id: 4,
        title: 'Political',
      },
      {
        id: 5,
        title: 'celebrations',
      },
      {
        id: 6,
        title: 'Arts',
      },
      {
        id: 7,
        title: 'Music',
      },
      {
        id: 8,
        title: 'Innovations',
      },
      {
        id: 9,
        title: 'Media',
      },
      {
        id: 10,
        title: 'Books',
      },
      {
        id: 11,
        title: 'Film',
      },
    ],
  },
  {
    id: 2,
    title: 'Business',
    sub: [
      {
        id: 1,
        title: 'E-commerce',
      },
      {
        id: 2,
        title: 'Marketing',
      },
      {
        id: 3,
        title: 'Branding',
      },
      {
        id: 4,
        title: 'Accounting',
      },
      {
        id: 5,
        title: 'Investment',
      },
      {
        id: 6,
        title: 'Networking',
      },
      {
        id: 7,
        title: 'Human Resources',
      },
      {
        id: 8,
        title: 'Business Developmen',
      },
    ],
  },
  {
    id: 3,
    title: 'Health',
    sub: [
      {
        id: 1,
        title: 'Physical Health',
      },
      {
        id: 2,
        title: 'Social Health',
      },
      {
        id: 3,
        title: 'Epidemic',
      },
      {
        id: 4,
        title: 'Healthcare',
      },
      {
        id: 5,
        title: 'Reproductive',
      },
      {
        id: 6,
        title: 'Addiction',
      },
      {
        id: 7,
        title: 'Health Education',
      },
      {
        id: 8,
        title: 'Health Policies',
      },
      {
        id: 9,
        title: 'Social',
      },
    ],
  },
  {
    id: 4,
    title: 'Human Family',
    sub: [
      {
        id: 1,
        title: 'Family Structure',
      },
      {
        id: 2,
        title: 'Family Roles',
      },
      {
        id: 3,
        title: 'Cultural',
      },
      {
        id: 4,
        title: 'Social Status',
      },
      {
        id: 5,
        title: 'Legal Aspects',
      },
      {
        id: 6,
        title: 'Wellness',
      },
      {
        id: 7,
        title: 'Educational',
      },
    ],
  },
  {
    id: 5,
    title: 'Worldview',
    sub: [
      {
        id: 1,
        title: 'Religious',
      },
      {
        id: 2,
        title: 'Political',
      },
      {
        id: 3,
        title: 'Environment',
      },
      {
        id: 4,
        title: 'Technological',
      },
      {
        id: 5,
        title: 'Scientific',
      },
      {
        id: 6,
        title: 'Philosophical',
      },
      {
        id: 7,
        title: 'Cultural',
      },
    ],
  },
  {
    id: 6,
    title: `I'm YOU(2)'RE ME`,
    sub: [
      {
        id: 1,
        title: 'Arts',
      },
      {
        id: 2,
        title: 'Creativity',
      },
      {
        id: 3,
        title: 'Physical Activities',
      },
      {
        id: 4,
        title: 'Science',
      },
      {
        id: 5,
        title: 'Technology',
      },
      {
        id: 6,
        title: 'Writing',
      },
      {
        id: 7,
        title: 'Sports',
      },
      {
        id: 8,
        title: 'Outdoor Activities',
      },
      {
        id: 9,
        title: 'Cooking',
      },
      {
        id: 10,
        title: 'Games and Puzzles',
      },
      {
        id: 11,
        title: 'Pets',
      },
      {
        id: 12,
        title: 'Fashion',
      },
      {
        id: 13,
        title: 'Magic tricks',
      },
      {
        id: 14,
        title: 'Traveling',
      },
      {
        id: 15,
        title: 'Computer games',
      },
    ],
  },
];

const InterestScreen = ({navigation, route}: NavigProps<{info: any}>) => {
  const {colors, font} = useStyles();
  // Your code here...
  const {data: userProfile} = useGetUserProfileQuery({});
  // console.log(userProfile?.data.interests);
  const [userUpdate, results] = useUserUpdateMutation();
  const [selectSubsItems, setSelectSubsItems] = React.useState<Array<string>>(
    userProfile?.data.interests || [],
  );
  const handleUserUpdated = React.useCallback(async () => {
    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        interests: selectSubsItems,
      }),
    );
    console.log(route?.params?.data?.info);
    const result = await userUpdate(formData);
    // console.log(result);
    if (result && route?.params?.data?.info === 'signup') {
      (navigation as any)?.replace('HomeRoutes');
    } else if (navigation?.canGoBack()) {
      navigation.goBack();
    } else {
      (navigation as any)?.replace('Login');
    }
  }, [selectSubsItems]);

  console.log(selectSubsItems);
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        offBack
        title="Choose your interest"
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.neutralColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 20,
          gap: 16,
          //   flex: 1,
          paddingBottom: 200,
        }}
        style={{}}
        renderItem={item => {
          return <InterestCard item={item.item} />;
        }}
      /> */}
      {/* must be selected at least 3 */}
      <View style={tw`flex-row justify-center items-center px-4 w-full`}>
        <Text
          style={[
            tw`text-xs font-semibold text-gray-500  text-center`,
            {fontFamily: font.Poppins},
          ]}>
          Must be selected at least 3
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 20,
          gap: 16,
          //   flex: 1,
          paddingBottom: 200,
        }}
        style={{}}
        renderItem={item => {
          return (
            <InterestCard
              selectSubsItems={selectSubsItems}
              setSelectSubsItems={setSelectSubsItems}
              item={item.item}
            />
          );
        }}
      />

      <View
        style={{
          paddingHorizontal: '4%',
          marginBottom: 20,
        }}>
        <NormalButton
          title="Continue"
          disabled={selectSubsItems.length < 3}
          onPress={() => {
            // chack user have miximum on interest
            if (selectSubsItems.length < 3) {
              return;
            }
            handleUserUpdated();
          }}
          isLoading={results.isLoading}
        />
        {/* <TouchableOpacity
          onPress={() => {
            navigation?.navigate('HomeRoutes');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textDecorationLine: 'underline',
              color: colors.blue,
              fontSize: 16,
              fontFamily: font.Poppins,
              marginVertical: 10,
            }}>
            Skip
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({});
