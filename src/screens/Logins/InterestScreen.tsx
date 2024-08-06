import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import InterestCard from '../../components/interest/InterestCard';
import NormalButton from '../../components/common/NormalButton';
import {NavigProps} from '../../interfaces/NaviProps';

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

const InterestScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  // Your code here...
  const [selectItem, setSelectItem] = React.useState(0);

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
          return <InterestCard item={item.item} />;
        }}
      />
      <View
        style={{
          paddingHorizontal: '4%',
          marginBottom: 20,
        }}>
        <NormalButton
          title="Continue"
          onPress={() => {
            navigation?.navigate('HomeRoutes');
          }}
        />
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InterestScreen;

const styles = StyleSheet.create({});
