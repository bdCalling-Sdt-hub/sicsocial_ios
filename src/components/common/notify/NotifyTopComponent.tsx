import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {SvgXml} from 'react-native-svg';
import {useStyles} from '../../../context/ContextApi';

interface NotifyTopComponentProps {
  onDismiss?: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  variant?: 'success' | 'error' | 'normal';
  normalOnPress?: () => void;

  onRejectOnPress?: () => void;
  name?: string;
}

const NotifyTopComponent = ({
  onDismiss,
  variant,
  open,

  normalOnPress,
  onRejectOnPress,
  name,
}: NotifyTopComponentProps) => {
  const {height, width} = useWindowDimensions();
  const {colors, font} = useStyles();

  const positionAValue = useSharedValue(height * -0.08);

  const rStyle = useAnimatedStyle(() => {
    return {
      top: positionAValue.value,
    };
  });
  useEffect(() => {
    if (open) {
      positionAValue.value = withSpring(0, {duration: 400});
      setTimeout(() => {
        onDismiss && onDismiss(false);
        positionAValue.value = withTiming(height * -0.08, {duration: 100});
      }, 5000);
    }
    if (!open) {
      onDismiss && onDismiss(false);
      positionAValue.value = withTiming(height * -0.08, {duration: 100});
    }
  }, [open]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          zIndex: +99999999,
          width: width,
        },
        rStyle,
      ]}>
      <View
        style={{
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 16,
          flexDirection: 'row',
          height: height * 0.08,
          width: width,
          alignItems: 'center',
          justifyContent: 'space-between',

          backgroundColor:
            variant === 'success'
              ? 'rgba(0, 176, 71, 1)'
              : variant === 'error'
              ? 'rgba(241, 99, 101, 1)'
              : 'rgba(66, 137, 255, 1)',
        }}>
        <View
          style={{
            gap: 15,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <SvgXml
            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1706_423)">
<path d="M7.74006 9.51887C7.7041 8.85164 8.21819 8.2819 8.88646 8.24456C9.42785 8.2169 9.90529 8.54775 10.0871 9.03314C10.0778 8.97851 10.075 8.92562 10.075 8.871C10.075 8.1322 10.6745 7.53134 11.4147 7.53134C11.907 7.53134 12.336 7.79927 12.568 8.19512C12.5659 8.16746 12.5639 8.14257 12.5639 8.1156C12.5639 7.37612 13.1633 6.77802 13.9028 6.77802C14.6423 6.77802 15.2404 7.37612 15.2404 8.1156" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5664 8.1953V9.71266" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5703 8.1742V9.49726" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2411 7.94168C15.164 7.27306 14.5977 6.75656 13.9101 6.75587C13.1692 6.75656 12.569 7.35465 12.569 8.09691C12.569 8.1218 12.5718 8.14738 12.5732 8.17469C12.3398 7.77954 11.9108 7.5123 11.4192 7.5123C10.6776 7.5123 10.0781 8.11177 10.0781 8.85195V8.87028C10.0788 8.91971 10.0823 8.96604 10.0888 9.01409L10.1117 9.51919" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.5938 12.0634C12.5938 12.7698 13.186 13.3436 13.9165 13.3436C14.2203 13.3436 14.5 13.2444 14.7234 13.0774" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.64453 12.1263L7.65317 12.4444C7.69086 13.0459 8.26682 13.512 8.9382 13.4829C9.54874 13.4587 10.03 13.0325 10.0829 12.5025L10.1105 11.7962" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.1094 9.41537V9.61381V12.0636C10.1094 12.7699 10.6598 13.3438 11.3384 13.3438C12.0157 13.3438 12.566 12.7699 12.566 12.0636V8.11547" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.719 13.0717C14.7609 12.847 14.9458 12.1203 15.0122 11.898L14.3633 11.5848" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.722 13.0717C13.2952 14.0549 12.3594 15.6999 12.3594 17.5633V18.4694V19.8509" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.73908 9.49969C7.59527 11.89 7.59941 14.2319 7.81549 16.6374L7.84245 16.6225C7.96484 17.8792 8.52455 19.0062 9.36707 19.8508H16.372C17.2626 18.6477 17.7901 17.1584 17.7901 15.5463L17.7995 14.3646L17.8074 11.8122" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.2383 9.06444V7.45063C15.2383 6.74779 15.8087 6.17735 16.5133 6.17735C17.2179 6.17735 17.7886 6.74744 17.7886 7.45063V10.2164L17.807 12.6506" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4607 9.9212L15.021 8.9805L14.3105 8.70289C14.1418 8.63686 13.9562 8.60574 13.7622 8.61784C13.0594 8.66313 12.5232 9.27298 12.5692 9.97859C12.5996 10.4512 12.8865 10.8477 13.2841 11.042L13.6658 11.2474L14.3645 11.5851" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.07372 3.55194L5.6136 4.62885L4.53738 7.09001L3.46116 4.62885L1 3.55194L3.46116 2.47641L4.53738 0.0152531L5.6136 2.47641L8.07372 3.55194Z" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.66016 19.8512H17.8083V23.9998H7.66016V19.8512Z" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.2512 4.96885L12.6016 1.81764L15.3141 3.54657L16.6395 0.615925L17.8143 3.60984L20.6118 2.0223L19.8015 5.13618L23 5.48881L20.5147 7.53304L22.8922 9.70103L19.6808 9.88979" stroke="#F4F4F4" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1706_423">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
          />
          <Text
            style={{
              fontSize: 14,
              fontFamily: font.Poppins,
              color: colors.textColor.white,
              width:
                variant === 'normal'
                  ? '80%'
                  : variant === 'success'
                  ? '85%'
                  : '100%',
            }}>
            {variant === 'error'
              ? 'knock for join this live conversations'
              : variant === 'normal'
              ? `${name} knocked for join this live conversations`
              : 'knock is accepted for this live conversations'}
          </Text>
        </View>
        <View>
          {variant === 'success' && (
            <SvgXml
              xml={`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3425 7.0925L16.4075 8.1575L9.06501 15.5L5.54 11.09L6.71 10.16L9.18501 13.25L15.3425 7.0925ZM21.5 11C21.5 13.0767 20.8842 15.1068 19.7304 16.8335C18.5767 18.5602 16.9368 19.906 15.0182 20.7007C13.0996 21.4955 10.9884 21.7034 8.95156 21.2982C6.91476 20.8931 5.04383 19.8931 3.57538 18.4246C2.10693 16.9562 1.1069 15.0852 0.701759 13.0484C0.296614 11.0116 0.504549 8.90045 1.29927 6.98182C2.09399 5.0632 3.4398 3.42332 5.16652 2.26957C6.89323 1.11581 8.9233 0.5 11 0.5C13.7848 0.5 16.4555 1.60625 18.4246 3.57538C20.3938 5.54451 21.5 8.21523 21.5 11ZM20 11C20 9.21997 19.4722 7.47991 18.4832 5.99987C17.4943 4.51983 16.0887 3.36627 14.4442 2.68508C12.7996 2.0039 10.99 1.82567 9.24419 2.17293C7.49836 2.5202 5.89472 3.37737 4.63604 4.63604C3.37737 5.89471 2.5202 7.49836 2.17294 9.24419C1.82567 10.99 2.0039 12.7996 2.68509 14.4442C3.36628 16.0887 4.51983 17.4943 5.99987 18.4832C7.47992 19.4722 9.21997 20 11 20C13.387 20 15.6761 19.0518 17.364 17.364C19.0518 15.6761 20 13.3869 20 11Z" fill="#F4F4F4"/>
</svg>
`}
            />
          )}
          {variant === 'normal' && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  onRejectOnPress && onRejectOnPress();
                  onDismiss && onDismiss(false);
                }}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: colors.white,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // elevation: 5,
                }}>
                <SvgXml
                  xml={`<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.07143 0.428558C4.82284 0.428558 3 2.2514 3 4.49999C3 6.74857 4.82284 8.57142 7.07143 8.57142C9.32006 8.57142 11.1429 6.74857 11.1429 4.49999C11.1429 2.2514 9.32006 0.428558 7.07143 0.428558ZM4.28571 4.49999C4.28571 2.96148 5.53292 1.71427 7.07143 1.71427C8.60991 1.71427 9.85714 2.96148 9.85714 4.49999C9.85714 6.0385 8.60991 7.2857 7.07143 7.2857C5.53292 7.2857 4.28571 6.0385 4.28571 4.49999Z" fill="#F16365"/>
<path d="M14.4881 6.72085C14.237 6.4698 13.83 6.4698 13.5789 6.72085C13.3279 6.9719 13.3279 7.37894 13.5789 7.62999L14.9426 8.99366L13.5789 10.3574C13.3279 10.6084 13.3279 11.0155 13.5789 11.2665C13.83 11.5176 14.237 11.5176 14.4881 11.2665L15.8518 9.90283L17.2155 11.2665C17.4666 11.5176 17.8735 11.5176 18.1246 11.2665C18.3757 11.0155 18.3757 10.6084 18.1246 10.3574L16.7609 8.99366L18.1246 7.62999C18.3757 7.37894 18.3757 6.9719 18.1246 6.72085C17.8735 6.4698 17.4666 6.4698 17.2155 6.72085L15.8518 8.08457L14.4881 6.72085Z" fill="#F16365"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.50112 9.85712C2.25253 9.85712 0.429688 11.6799 0.429688 13.9285C0.429688 16.1772 2.25253 18 4.50112 18H9.64397C11.8926 18 13.7154 16.1772 13.7154 13.9285C13.7154 11.6799 11.8926 9.85712 9.64397 9.85712H4.50112ZM1.7154 13.9285C1.7154 12.3901 2.9626 11.1428 4.50112 11.1428H9.64397C11.1825 11.1428 12.4297 12.3901 12.4297 13.9285C12.4297 15.467 11.1825 16.7143 9.64397 16.7143H4.50112C2.9626 16.7143 1.7154 15.467 1.7154 13.9285Z" fill="#F16365"/>
</svg>
`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  normalOnPress && normalOnPress();
                }}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: colors.white,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SvgXml
                  xml={`<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.07143 0.428558C4.82284 0.428558 3 2.2514 3 4.49999C3 6.74857 4.82284 8.57142 7.07143 8.57142C9.32006 8.57142 11.1429 6.74857 11.1429 4.49999C11.1429 2.2514 9.32006 0.428558 7.07143 0.428558ZM4.28571 4.49999C4.28571 2.96148 5.53292 1.71427 7.07143 1.71427C8.60991 1.71427 9.85714 2.96148 9.85714 4.49999C9.85714 6.0385 8.60991 7.2857 7.07143 7.2857C5.53292 7.2857 4.28571 6.0385 4.28571 4.49999Z" fill="#00B047"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.50112 9.85712C2.25253 9.85712 0.429688 11.6799 0.429688 13.9285C0.429688 16.1772 2.25253 18 4.50112 18H9.64397C11.8926 18 13.7154 16.1772 13.7154 13.9285C13.7154 11.6799 11.8926 9.85712 9.64397 9.85712H4.50112ZM1.7154 13.9285C1.7154 12.3901 2.9626 11.1428 4.50112 11.1428H9.64397C11.1825 11.1428 12.4297 12.3901 12.4297 13.9285C12.4297 15.467 11.1825 16.7143 9.64397 16.7143H4.50112C2.9626 16.7143 1.7154 15.467 1.7154 13.9285Z" fill="#00B047"/>
<path d="M18.3138 6.89774L17.9985 6.55114C17.922 6.4705 17.8193 6.42645 17.7131 6.42864C17.6069 6.43083 17.5059 6.4791 17.4321 6.56283C16.6881 7.44032 14.7031 9.76711 14.6269 9.76711C14.5508 9.76711 13.8254 8.93642 13.4167 8.46259C13.3427 8.38013 13.242 8.33296 13.1365 8.33132C13.0309 8.32968 12.929 8.3737 12.853 8.45381L12.5404 8.79895C12.4693 8.88055 12.4297 8.98896 12.4297 9.10168C12.4297 9.21441 12.4693 9.32282 12.5404 9.40442L14.3464 11.4416C14.3837 11.4828 14.428 11.5154 14.4768 11.5377C14.5256 11.5599 14.578 11.5714 14.6309 11.5714C14.6838 11.5714 14.7362 11.5599 14.785 11.5377C14.8339 11.5154 14.8782 11.4828 14.9155 11.4416L18.3218 7.49881C18.3924 7.41734 18.4311 7.30883 18.4296 7.19649C18.4281 7.08415 18.3866 6.97692 18.3138 6.89774Z" fill="#00B047"/>
</svg>
`}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default NotifyTopComponent;

const styles = StyleSheet.create({});
