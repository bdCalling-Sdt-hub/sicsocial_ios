import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigProps} from '../../interfaces/NaviProps';

import Feather from 'react-native-vector-icons/Feather';
import {SvgXml} from 'react-native-svg';
import {useStyles} from '../../context/ContextApi';
import LinearGradient from 'react-native-linear-gradient';

interface IConversationHeaderProps extends NavigProps<null> {}
const ConversationHeader = ({navigation}: IConversationHeaderProps) => {
  const {colors, font} = useStyles();
  return (
    <LinearGradient
      colors={colors.gradient.variantTwo}
      style={[
        {
          height: 80,
          width: '100%',
          paddingHorizontal: '4%',
          padding: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 99999,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation && navigation.goBack()}>
          <Feather name="arrow-left" color="#636363" size={24} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <SvgXml
            xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_527_1901)">
<path d="M13.5058 2.90655C12.7431 2.08066 11.8041 1.43713 10.7587 1.02372C9.71324 0.610321 8.58811 0.43766 7.46681 0.518554C5.55516 0.679892 3.77507 1.55762 2.48319 2.97588C1.19131 4.39414 0.483045 6.24819 0.500308 8.16655V15.0001C0.500283 15.0989 0.529579 15.1956 0.584491 15.2778C0.639403 15.3601 0.717465 15.4242 0.808808 15.4621C0.869474 15.4873 0.934581 15.5003 1.00031 15.5001C1.13291 15.5 1.26006 15.4473 1.35381 15.3536L2.53581 14.1721C2.68001 14.0312 2.86983 13.9465 3.071 13.9333C3.27217 13.9201 3.47143 13.9792 3.63281 14.1001C5.14317 15.1854 7.00292 15.6708 8.85104 15.4621C10.6992 15.2534 12.4038 14.3654 13.6341 12.9706C14.8644 11.5758 15.5325 9.77358 15.5088 7.91386C15.4851 6.05414 14.7712 4.26957 13.5058 2.90655ZM14.4268 8.99305C14.2575 10.0909 13.8096 11.1271 13.1259 12.0026C12.4422 12.8782 11.5455 13.5639 10.5215 13.9943C9.49741 14.4248 8.38011 14.5856 7.27621 14.4614C6.17231 14.3373 5.11866 13.9323 4.21581 13.2851C3.89704 13.0548 3.51403 12.9305 3.12081 12.9296C2.88078 12.9292 2.64304 12.9763 2.4213 13.0682C2.19956 13.1601 1.9982 13.295 1.82881 13.4651L1.50031 13.7931V8.16655C1.48243 6.50123 2.09445 4.89065 3.21377 3.65747C4.3331 2.42429 5.87704 1.65958 7.53631 1.51655C8.51056 1.44725 9.48791 1.59824 10.3958 1.95832C11.3037 2.31841 12.1189 2.87833 12.7808 3.59655C13.4428 4.31476 13.9344 5.17282 14.2194 6.10705C14.5043 7.04128 14.5752 8.02768 14.4268 8.99305Z" fill="#DBB162"/>
<rect x="4.66699" y="6" width="1.33333" height="3.33333" rx="0.666667" fill="#DBB162"/>
<rect x="7.33398" y="4" width="1.33333" height="7.33333" rx="0.666667" fill="#DBB162"/>
<rect x="10" y="5.33337" width="1.33333" height="4.66667" rx="0.666667" fill="#DBB162"/>
</g>
<defs>
<clipPath id="clip0_527_1901">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`}
          />
          <Text
            style={{
              color: colors.neutralColor,
              fontFamily: font.Poppins,
              fontSize: 13,
            }}>
            Voice message
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => {}}>
        <SvgXml
          xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_854_4542)">
<path d="M9.75 12C9.75 13.2405 10.7595 14.25 12 14.25C13.2405 14.25 14.25 13.2405 14.25 12C14.25 10.7595 13.2405 9.75 12 9.75C10.7595 9.75 9.75 10.7595 9.75 12Z" fill="#333333"/>
<path d="M9.75 19.5C9.75 20.7405 10.7595 21.75 12 21.75C13.2405 21.75 14.25 20.7405 14.25 19.5C14.25 18.2595 13.2405 17.25 12 17.25C10.7595 17.25 9.75 18.2595 9.75 19.5Z" fill="#333333"/>
<path d="M9.75 4.5C9.75 5.7405 10.7595 6.75 12 6.75C13.2405 6.75 14.25 5.7405 14.25 4.5C14.25 3.2595 13.2405 2.25 12 2.25C10.7595 2.25 9.75 3.2595 9.75 4.5Z" fill="#333333"/>
</g>
<defs>
<clipPath id="clip0_854_4542">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ConversationHeader;

const styles = StyleSheet.create({});
