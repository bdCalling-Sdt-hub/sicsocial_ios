import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import {SvgXml} from 'react-native-svg';

interface FriendCardProps {
  item?: {
    name?: string | undefined;
    image?: string | undefined;
    status?: string | undefined;
    lastSeen?: string | undefined;
    id?: number | undefined;
  };
  onPress?: () => void;
  onLongPress?: () => void;
  isFriendRequest?: boolean;
  isFriend?: boolean;
  isFriendRequestSent?: boolean;
  onAcceptFriendRequestPress?: () => void;
  onDeclineFriendRequestPress?: () => void;
  onFriendRequestCancelPress?: () => void;
}

const FriendCard = ({
  item,
  onLongPress,
  onPress,
  isFriend,
  isFriendRequest,
  isFriendRequestSent,
  onAcceptFriendRequestPress,
  onDeclineFriendRequestPress,
  onFriendRequestCancelPress,
}: FriendCardProps) => {
  const {colors, font} = useStyles();
  const {width} = useWindowDimensions();
  return (
    <>
      {/*============== card start ============ */}
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 370,
            width: 300,
            backgroundColor: colors.friedCardBg,
            borderRadius: 42,
            paddingHorizontal: 42,
            paddingVertical: 24,
            elevation: 2,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                elevation: 1,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
              }}>
              <Image
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: colors.textColor.white,
                }}
                source={{
                  uri: item?.image,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: font.PoppinsBold,
                fontSize: 20,
                color: colors.textColor.light,
                marginVertical: 15,
              }}>
              {item?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    borderRadius: 100,
                    borderColor: colors.blue,
                    borderWidth: 1,
                    // padding: 1,
                    // width: 27,
                    position: 'relative',
                    left: 10,
                  }}>
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 100,
                    }}
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/3d5c/b72f/ae1e058c2ed75ab981a9f8bb62e96a13?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eJaHp1JALpTwbH-LSjIAIvY821a5NKO6rK5gu~-rGeFwsPliOnXzKteirjOx4iEKdiqOPvSUa7FeiTOyK~H836mreo~PcxMtwmaJGpEJcM6Fh1yVFAJBCyk1VHjKPQ9dqaodOQ0ZEdykoxaq24C4qvaeIQKV~wZO6s4xjed21grqnXsN307KjWHHIZbYVfrcBgDRk5d7brULhHZidnLrXNPP-XE2tgf7qUsa7lsDw9UwxJbqagf1UAeyiufB6ZwfblJXUprYoOnw~z~MRKOqpcnVVt-ax3sJ0p~66nkeBM-RZkVMVaT1YGxNTbu1I1TqayL5NP1qHcsv8e5B8cpcCA__',
                    }}
                  />
                </View>
                <View
                  style={{
                    borderRadius: 100,
                    borderColor: colors.blue,
                    borderWidth: 1,
                    // padding: 1,
                    // width: 27,
                  }}>
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 100,
                    }}
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/bdc6/db2a/3a906b3de8eaa53e14582edf5c918b5d?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7P8CfaZR8VN~AB1t4yamhll4GWaFTFOGHWe5KuCLxDNe4~p9UhUbNtg9VA8aaFLDKPmwuByzP7CpTyF1KFHwPwChykfMqAhFl6iJGCErm9vbcCeYixeYDT1QE1JWrVlT5y4YfuzY2H1hH9V0dHwAzKAc8hMALmYPIoMNsqxZICi6T0PjW0ATcq~eeOYXaxtY9S30thVMs3WHidear3kaHFhkU-MO7VCCQVDbjVzVvy~PWSw-QZcZiqNvkC-lm0DLJlzBtuVkjIlOgoW2JTZqVMcaNUau2ybiuv2uIAR~tRoO18JRvqWgC55EfDQZ1lvwk1mAkeoSHqBPHP954d7kQ__',
                    }}
                  />
                </View>
              </View>
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 14,
                  color: colors.textColor.light,
                  marginLeft: 10,
                }}>
                2 mutual friend
              </Text>
            </View>
            {isFriendRequest && (
              <Text
                style={{
                  fontFamily: font.Poppins,
                  fontSize: 12,
                  color: colors.textColor.light,
                  marginTop: 20,
                  paddingVertical: 2,
                }}>
                Send a friend request at 02:50am
              </Text>
            )}
          </View>

          <View
            style={{
              elevation: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              flex: 1,
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                backgroundColor: colors.btn.normal,
                borderRadius: 100,
                padding: 1,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 2,
              }}>
              <SvgXml
                xml={`<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.3232 12.5257C21.668 13.3153 20.6422 13.8058 19.646 13.8058H17.0107C17.6038 14.7509 18.0502 15.7019 18.3222 16.6075C18.7372 17.9895 18.7227 19.1942 18.2801 20.0914C17.7816 21.1019 16.7714 21.6584 15.4356 21.6584C15.1318 21.6584 14.858 21.4752 14.7422 21.1943C13.7022 18.6716 10.9893 15.0458 8.43337 12.6573C8.17256 13.5633 7.33673 14.2282 6.348 14.2282H3.13706C1.94039 14.2282 0.966797 13.2546 0.966797 12.0579V2.51203C0.966797 1.31535 1.94039 0.341759 3.13706 0.341759H6.348C7.08005 0.341759 7.72814 0.706493 8.12142 1.26337C8.71636 0.690979 9.50508 0.341759 10.3693 0.341759H18.4544C19.3482 0.341759 20.1441 0.722338 20.7562 1.44234C21.2608 2.03592 21.6191 2.83781 21.7925 3.76129L22.9842 10.1094C23.1441 10.9612 22.9093 11.8192 22.3232 12.5257ZM7.01822 2.51198C7.01822 2.14242 6.71756 1.84171 6.348 1.84171H3.13706C2.7675 1.84171 2.4668 2.14242 2.4668 2.51198V12.0579C2.4668 12.4274 2.7675 12.7281 3.13706 12.7281H6.348C6.71756 12.7281 7.01822 12.4274 7.01822 12.0579V2.51198ZM21.5099 10.3862L20.3182 4.03799C20.1189 2.97623 19.5246 1.84171 18.4543 1.84171H10.3693C9.34861 1.84171 8.51827 2.76487 8.51827 3.89962V10.7312C11.3453 13.0782 14.5114 17.1089 15.9091 20.1216C16.6549 19.9954 16.8597 19.5802 16.935 19.4278C17.4217 18.441 17.0177 16.1689 14.9804 13.5122C14.8066 13.2856 14.7766 12.98 14.903 12.724C15.0293 12.4679 15.29 12.3058 15.5756 12.3058H19.6461C20.1992 12.3058 20.7969 12.0162 21.1688 11.5679C21.3782 11.3154 21.6075 10.9056 21.5099 10.3862Z" fill="#F16365"/>
</svg>
`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                backgroundColor: colors.btn.normal,
                borderRadius: 100,
                padding: 1,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 2,
              }}>
              <SvgXml
                xml={`<svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.67681 9.47435C2.33199 8.68474 3.3578 8.19424 4.35398 8.19424H6.98925C6.39619 7.24915 5.94984 6.2981 5.67783 5.39247C5.26275 4.01051 5.27728 2.80582 5.71988 1.90863C6.21839 0.8981 7.22864 0.341553 8.56439 0.341553C8.86819 0.341553 9.14198 0.524834 9.25776 0.805709C10.2978 3.32838 13.0107 6.95416 15.5666 9.34268C15.8274 8.43672 16.6633 7.77185 17.652 7.77185H20.8629C22.0596 7.77185 23.0332 8.74544 23.0332 9.94207V19.488C23.0332 20.6846 22.0596 21.6582 20.8629 21.6582H17.652C16.92 21.6582 16.2719 21.2935 15.8786 20.7366C15.2836 21.309 14.4949 21.6582 13.6307 21.6582H5.54564C4.65183 21.6582 3.85589 21.2777 3.2438 20.5577C2.73923 19.9641 2.38087 19.1622 2.20753 18.2387L1.01583 11.8906C0.855938 11.0388 1.09069 10.1808 1.67681 9.47435ZM16.9818 19.488C16.9818 19.8576 17.2824 20.1583 17.652 20.1583H20.8629C21.2325 20.1583 21.5332 19.8576 21.5332 19.488V9.94211C21.5332 9.57255 21.2325 9.2719 20.8629 9.2719H17.652C17.2824 9.2719 16.9818 9.57255 16.9818 9.94211V19.488ZM2.49009 11.6138L3.68175 17.962C3.88106 19.0238 4.47539 20.1583 5.54569 20.1583H13.6307C14.6514 20.1583 15.4817 19.2351 15.4817 18.1004V11.2688C12.6547 8.92183 9.48858 4.8911 8.09086 1.87844C7.34513 2.00463 7.14028 2.4198 7.06505 2.57224C6.57825 3.55901 6.98227 5.83108 9.01959 8.48782C9.19336 8.71437 9.22336 9.01999 9.09703 9.27602C8.9707 9.53205 8.70998 9.69419 8.42442 9.69419H4.35394C3.80081 9.69419 3.20306 9.98383 2.83116 10.4321C2.62177 10.6846 2.39255 11.0944 2.49009 11.6138Z" fill="#00B047"/>
</svg>

`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {/*============== card end ============ */}
    </>
  );
};

export default FriendCard;

const styles = StyleSheet.create({});
