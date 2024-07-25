import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {NavigProps} from '../../interfaces/NaviProps';
import FriendCard from '../../components/friend/FriendCard';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';

const data = [
  {
    id: 1,
    name: 'Mithila',
    image: require('../../assets/tempAssets/3a906b3de8eaa53e14582edf5c918b5d.jpg'),
    status: 'active',
    distance: '2.5 km away',
    lastSeen: '5 minutes ago',
  },
  {
    id: 2,
    name: 'Jane Smith',
    image: require('../../assets/tempAssets/4005b22a3c1c23d7c04f6c9fdbd85468.jpg'),
    status: 'active',
    distance: '3.2 km away',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    image: require('../../assets/tempAssets/691af02d3a7ca8be2811716f82d9212b.jpg'),
    status: 'active',
    distance: '4.5 km away',
  },
];

const FriendsScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [isRequest, setIsRequest] = React.useState<boolean>(false);
  const {height, width} = useWindowDimensions();

  const progress = useSharedValue(0);
  const ref = React.useRef<ICarouselInstance>(null);
  const onRightSwipe = () => {
    ref.current?.scrollTo({
      count: progress.value + 1,
      animated: true,
    });
  };
  const onLeftSwipe = () => {
    ref.current?.scrollTo({
      count: progress.value - 1,
      animated: true,
    });
  };
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          height: '7.2%',
        }}
      />
      <LinearGradient
        colors={colors.gradient.variantTwo}
        style={{
          height: 80,
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 99999,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: font.PoppinsSemiBold,
                fontSize: 20,
                color: colors.textColor.primaryColor,
              }}>
              Make Friend
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 19,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Search');
            }}>
            <SvgXml
              xml={`<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('Notifications');
              // setDark(!isDark);
            }}>
            <SvgXml
              xml={`<svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 17.5H1L1.39999 16.9667L1.5 16.8334V16.6667V8C1.5 3.85786 4.85786 0.5 9 0.5C13.1422 0.5 16.5 3.85786 16.5 8V16.6667V16.8334L16.6 16.9667L17 17.5ZM17 17.5L17 17.5L17 17.5L17 17.5L17 17.5L17 17.5ZM2.5 16V16.5H3H15H15.5V16V8C15.5 4.41015 12.5898 1.5 9 1.5C5.41015 1.5 2.5 4.41015 2.5 8V16ZM10.937 19.5C10.715 20.3626 9.93191 21 9 21C8.06809 21 7.28504 20.3626 7.06301 19.5H10.937Z" fill="${colors.textColor.secondaryColor}" stroke="${colors.textColor.secondaryColor}"/>
</svg>
`}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: '4%',
        }}>
        <Text
          style={{
            fontFamily: font.Poppins,
            fontSize: 14,
            color: colors.textColor.light,
            width: '70%',
          }}>
          Add interesting people to bring your{' '}
          <Text
            style={{
              fontFamily: font.PoppinsBold,
              color: colors.textColor.light,
            }}>
            hallway
          </Text>{' '}
          to life
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: '10%',
          flexDirection: 'row',
          gap: 24,
          paddingVertical: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgba(192, 192, 192, 1)',
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsRequest(false);
          }}
          style={{
            backgroundColor: isRequest
              ? colors.btn.variantTwo
              : colors.btn.variantOne,

            paddingHorizontal: 20,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            elevation: isRequest ? 0 : 2,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 14,
              color: colors.textColor.light,
              textAlign: 'center',
            }}>
            People you know
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsRequest(true);
          }}
          style={{
            backgroundColor: isRequest
              ? colors.btn.variantOne
              : colors.btn.variantTwo,

            paddingHorizontal: 20,
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            elevation: isRequest ? 0 : 2,
          }}>
          <Text
            style={{
              fontFamily: font.PoppinsSemiBold,
              fontSize: 14,
              color: colors.textColor.light,
              textAlign: 'center',
            }}>
            Friend request
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, marginTop: '10%', position: 'relative'}}>
        <TouchableOpacity
          onPress={() => onLeftSwipe()}
          style={{
            padding: 10,
            position: 'absolute',
            zIndex: 100,
            left: 20,
            top: 0,
            transform: [{translateY: 150}],
          }}>
          <SvgXml
            xml={`<svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.3487 24.0041C10.4803 24.0049 10.6108 23.9796 10.7326 23.9299C10.8544 23.8801 10.9653 23.8068 11.0587 23.7141C11.1524 23.6211 11.2268 23.5105 11.2776 23.3887C11.3284 23.2668 11.3545 23.1361 11.3545 23.0041C11.3545 22.8721 11.3284 22.7414 11.2776 22.6195C11.2268 22.4977 11.1524 22.3871 11.0587 22.2941L2.88869 14.1241C2.32689 13.5616 2.01133 12.7991 2.01133 12.0041C2.01133 11.2091 2.32689 10.4466 2.88869 9.88409L11.0587 1.71409C11.247 1.52579 11.3528 1.27039 11.3528 1.00409C11.3528 0.73779 11.247 0.482395 11.0587 0.294092C10.8704 0.105788 10.615 0 10.3487 0C10.0824 0 9.827 0.105788 9.63869 0.294092L1.46869 8.46409C1.00306 8.92855 0.633634 9.4803 0.381569 10.0878C0.129504 10.6952 -0.000244141 11.3464 -0.000244141 12.0041C-0.000244141 12.6618 0.129504 13.313 0.381569 13.9204C0.633634 14.5279 1.00306 15.0796 1.46869 15.5441L9.63869 23.7141C9.73213 23.8068 9.84295 23.8801 9.96479 23.9299C10.0866 23.9796 10.2171 24.0049 10.3487 24.0041Z" fill="#A1A1A1"/>
</svg>
`}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onRightSwipe()}
          style={{
            padding: 10,
            position: 'absolute',
            zIndex: 100,
            right: 20,
            top: 0,
            transform: [{translateY: 150}],
          }}>
          <SvgXml
            xml={`<svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.36029 24.0041C1.22868 24.0049 1.09822 23.9796 0.976384 23.9299C0.854547 23.8801 0.743731 23.8068 0.65029 23.7141C0.556562 23.6211 0.482168 23.5105 0.431399 23.3887C0.380631 23.2668 0.354492 23.1361 0.354492 23.0041C0.354492 22.8721 0.380631 22.7414 0.431399 22.6195C0.482168 22.4977 0.556562 22.3871 0.65029 22.2941L8.82029 14.1241C9.38209 13.5616 9.69765 12.7991 9.69765 12.0041C9.69765 11.2091 9.38209 10.4466 8.82029 9.88409L0.65029 1.71409C0.461987 1.52579 0.356199 1.27039 0.356199 1.00409C0.356199 0.73779 0.461987 0.482395 0.65029 0.294092C0.838594 0.105788 1.09399 0 1.36029 0C1.62659 0 1.88199 0.105788 2.07029 0.294092L10.2403 8.46409C10.7059 8.92855 11.0754 9.4803 11.3274 10.0878C11.5795 10.6952 11.7092 11.3464 11.7092 12.0041C11.7092 12.6618 11.5795 13.313 11.3274 13.9204C11.0754 14.5279 10.7059 15.0796 10.2403 15.5441L2.07029 23.7141C1.97685 23.8068 1.86603 23.8801 1.7442 23.9299C1.62236 23.9796 1.4919 24.0049 1.36029 24.0041Z" fill="#A1A1A1"/>
</svg>

`}
          />
        </TouchableOpacity>

        <Carousel
          ref={ref}
          width={width}
          height={height}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.99,
            parallaxScrollingOffset: 80,
          }}
          data={data}
          renderItem={item => (
            <FriendCard
              isFriendRequest={isRequest}
              item={item.item}
              onPress={() => {
                navigation?.navigate('FriendsProfile');
              }}
            />
          )}
        />
      </View>
      <View
        style={{
          height: '7.2%',
        }}
      />
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
