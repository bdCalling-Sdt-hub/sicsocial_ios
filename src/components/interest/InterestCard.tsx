import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {useStyles} from '../../context/ContextApi';

type subItem = {
  id: number;
  title: string;
}[];

interface InterestCardPops {
  item: {
    id: number;
    title: string;
    sub: subItem;
  };
}

const InterestCard = ({item}: InterestCardPops) => {
  const {colors, font} = useStyles();
  const [selectItem, setSelectItem] = React.useState(false);

  const rotatedValue = useSharedValue('0deg');
  const ViewHight = useSharedValue(1);
  const paddingTop = useSharedValue(0);
  const opacity = useSharedValue(0);

  const [selectSubsItems, setSelectSubsItems] = React.useState<Array<string>>(
    [],
  );

  // useEffect(() => {
  //   return () => {
  //     paddingTop.value = withTiming(0, {duration: 500});
  //     opacity.value = withTiming(0, {duration: 500});
  //     ViewHight.value = withTiming(1, {duration: 500});
  //     rotatedValue.value = withTiming('0deg', {
  //       duration: 500,
  //     });
  //     setSelectSubsItems([]);
  //   };
  // }, []);

  return (
    <View>
      <TouchableOpacity
        onPressIn={() => {
          setSelectItem(!selectItem);
        }}
        onPress={() => {
          if (selectItem) {
            paddingTop.value = withTiming(16, {duration: 500});
            opacity.value = withTiming(1, {duration: 500});
            ViewHight.value = withTiming(140, {duration: 500});
            rotatedValue.value = withTiming('90deg', {
              duration: 500,
            });
          } else {
            paddingTop.value = withTiming(0, {duration: 500});
            opacity.value = withTiming(0, {duration: 500});
            ViewHight.value = withTiming(1, {duration: 500});
            rotatedValue.value = withTiming('0deg', {
              duration: 500,
            });
          }
        }}>
        <LinearGradient
          style={{
            height: 45,
            width: '100%',
            borderRadius: 100,
            paddingHorizontal: 10,
            // alignItems: 'center',
            justifyContent: 'center',
          }}
          colors={['rgba(236, 224, 217, 1)', 'rgba(255, 191, 158, 1)']}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: colors.textColor.neutralColor,
                fontFamily: font.PoppinsSemiBold,
                marginLeft: 15,
              }}>
              {item.title}
            </Text>
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: rotatedValue,
                    },
                  ],
                }}>
                <SvgXml
                  xml={`<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.14885 2.27063C1.14885 2.27063 5.62791 6.46866 7.25729 7.99569L1.14885 13.7208C0.846765 14.0038 0.831551 14.4787 1.11473 14.7806C1.39799 15.0825 1.87315 15.0977 2.17515 14.8147L8.86721 8.54268C9.0184 8.4009 9.1042 8.20289 9.1042 7.99569C9.1042 7.7885 9.0184 7.59049 8.86721 7.44871L2.17515 1.17673C1.87315 0.893682 1.39799 0.908896 1.11473 1.21076C0.831551 1.5127 0.846765 1.98758 1.14885 2.27063Z" fill="#767676"/>
</svg>
`}
                />
              </Animated.View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <Animated.View
        style={{
          flexDirection: 'row',
          paddingVertical: paddingTop,
          flexWrap: 'wrap',
          // justifyContent: 'space-between',
          justifyContent: 'flex-start',
          paddingHorizontal: 5,

          gap: 15,
          height: ViewHight,
          opacity: opacity,
        }}>
        {item.sub.map(subItem => (
          <TouchableOpacity
            onPress={() => {
              if (selectSubsItems.includes(subItem?.title)) {
                setSelectSubsItems(
                  selectSubsItems.filter(item => item !== subItem.title),
                );
              } else {
                setSelectSubsItems([...selectSubsItems, subItem.title]);
              }
            }}
            key={subItem.id}
            style={{
              backgroundColor: selectSubsItems.includes(subItem?.title)
                ? colors.secondaryColor
                : colors.gray.variant,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 100,
              elevation: selectSubsItems.includes(subItem?.title) ? 2 : 0,
            }}>
            <Text>{subItem.title}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

export default InterestCard;

const styles = StyleSheet.create({});
