import React, {useCallback} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {isSmall, isTablet} from '../../../utils/utils';

import {useSharedValue} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';
import FriendCard from '../../../components/friend/FriendCard';
import {useStyles} from '../../../context/ContextApi';
import {NavigProps} from '../../../interfaces/NaviProps';
import {useGetFriendReceivedRequestsQuery} from '../../../redux/apiSlices/friendsSlices';

const FriendRequest = ({navigation}: NavigProps<null>) => {
  const {
    data: receivedRequestFriend,
    refetch: receivedRequestRefetch,
    isLoading: receivedRequestIsLoading,
  } = useGetFriendReceivedRequestsQuery({});
  // console.log(suggestedFriends);
  const {colors, font} = useStyles();
  const [isRequest, setIsRequest] = React.useState<boolean>(false);
  const {height, width} = useWindowDimensions();

  const progress = useSharedValue(0);
  const listRef = React.useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const onSwipeRight = () => {
    const Length = receivedRequestFriend?.data?.length || 0;
    const nextIndex = currentIndex + 1;
    if (nextIndex < Length) {
      setCurrentIndex(nextIndex); // Update the current index
      listRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }
  };

  const onSwipeLeft = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex); // Update the current index
      listRef.current?.scrollToIndex({
        index: prevIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const itemWidth = width;
  const onScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x; // Get the X position of the scroll
      const index = Math.round(contentOffsetX / itemWidth); // Calculate the current index based on width
      setCurrentIndex(index); // Update the current index state
    },
    [],
  );

  return (
    <View
      style={{
        // flex: 1,
        marginVertical: isTablet() ? '2%' : isSmall() ? '3%' : '10%',
        position: 'relative',
      }}>
      {receivedRequestFriend?.data?.length > 1 && (
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

            width: '100%',
            top: '45%',
            // height: '100%',
            paddingHorizontal: '6%',
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity onPress={() => onSwipeLeft()}>
            <SvgXml
              xml={`<svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.3487 24.0041C10.4803 24.0049 10.6108 23.9796 10.7326 23.9299C10.8544 23.8801 10.9653 23.8068 11.0587 23.7141C11.1524 23.6211 11.2268 23.5105 11.2776 23.3887C11.3284 23.2668 11.3545 23.1361 11.3545 23.0041C11.3545 22.8721 11.3284 22.7414 11.2776 22.6195C11.2268 22.4977 11.1524 22.3871 11.0587 22.2941L2.88869 14.1241C2.32689 13.5616 2.01133 12.7991 2.01133 12.0041C2.01133 11.2091 2.32689 10.4466 2.88869 9.88409L11.0587 1.71409C11.247 1.52579 11.3528 1.27039 11.3528 1.00409C11.3528 0.73779 11.247 0.482395 11.0587 0.294092C10.8704 0.105788 10.615 0 10.3487 0C10.0824 0 9.827 0.105788 9.63869 0.294092L1.46869 8.46409C1.00306 8.92855 0.633634 9.4803 0.381569 10.0878C0.129504 10.6952 -0.000244141 11.3464 -0.000244141 12.0041C-0.000244141 12.6618 0.129504 13.313 0.381569 13.9204C0.633634 14.5279 1.00306 15.0796 1.46869 15.5441L9.63869 23.7141C9.73213 23.8068 9.84295 23.8801 9.96479 23.9299C10.0866 23.9796 10.2171 24.0049 10.3487 24.0041Z" fill="#A1A1A1"/>
        </svg>
        `}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSwipeRight()}>
            <SvgXml
              xml={`<svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.36029 24.0041C1.22868 24.0049 1.09822 23.9796 0.976384 23.9299C0.854547 23.8801 0.743731 23.8068 0.65029 23.7141C0.556562 23.6211 0.482168 23.5105 0.431399 23.3887C0.380631 23.2668 0.354492 23.1361 0.354492 23.0041C0.354492 22.8721 0.380631 22.7414 0.431399 22.6195C0.482168 22.4977 0.556562 22.3871 0.65029 22.2941L8.82029 14.1241C9.38209 13.5616 9.69765 12.7991 9.69765 12.0041C9.69765 11.2091 9.38209 10.4466 8.82029 9.88409L0.65029 1.71409C0.461987 1.52579 0.356199 1.27039 0.356199 1.00409C0.356199 0.73779 0.461987 0.482395 0.65029 0.294092C0.838594 0.105788 1.09399 0 1.36029 0C1.62659 0 1.88199 0.105788 2.07029 0.294092L10.2403 8.46409C10.7059 8.92855 11.0754 9.4803 11.3274 10.0878C11.5795 10.6952 11.7092 11.3464 11.7092 12.0041C11.7092 12.6618 11.5795 13.313 11.3274 13.9204C11.0754 14.5279 10.7059 15.0796 10.2403 15.5441L2.07029 23.7141C1.97685 23.8068 1.86603 23.8801 1.7442 23.9299C1.62236 23.9796 1.4919 24.0049 1.36029 24.0041Z" fill="#A1A1A1"/>
  </svg>
  
  `}
            />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        ref={listRef} // Assign the ref to FlatList
        // keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={receivedRequestIsLoading}
            onRefresh={receivedRequestRefetch}
            colors={[colors.primaryColor]}
          />
        }
        horizontal // Assuming the list is horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth} // Ensure it snaps to the item width
        decelerationRate="fast" // Smooth scrolling effect
        onMomentumScrollEnd={onScrollEnd} // Detect when scrolling stops
        scrollEventThrottle={16} // Update every 16
        data={receivedRequestFriend?.data}
        contentContainerStyle={{
          // paddingHorizontal: 30,
          // gap: 20,
          paddingVertical: isTablet() ? '2%' : isSmall() ? '3%' : '5%',
        }}
        renderItem={({item}) => {
          return (
            <FriendCard
              isFriendRequest={true}
              item={item}
              onPress={() => {
                navigation?.navigate('FriendsProfile', {
                  data: {id: item?._id},
                });
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default FriendRequest;
