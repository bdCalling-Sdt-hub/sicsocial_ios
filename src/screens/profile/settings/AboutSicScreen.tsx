import { ScrollView, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import { useStyles } from '../../../context/ContextApi';
import { NavigProps } from '../../../interfaces/NaviProps';
import { useGetAboutSicQuery } from '../../../redux/apiSlices/additionalSlices';

const AboutSicScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  const {data : aboutSic} = useGetAboutSicQuery({})

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="About SIC"
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

       
     <ScrollView
          showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: '5%',
          marginTop: 10,
          paddingBottom: 20,
        }}>
          {
            aboutSic?.data?.map((item)=>{
              return <Text
              key={item?._id}
              style={{
                fontSize: 14,
                fontFamily: font.Poppins,
                color: colors.textColor.neutralColor,
                letterSpacing: 0.3,
                lineHeight: 24,
                textAlign: 'justify',
              }}>
                {item?.content}
              </Text>
            })
          }
        {/* <Text
          style={{
            fontSize: 14,
            fontFamily: font.Poppins,
            color: colors.textColor.neutralColor,
            letterSpacing: 0.3,
            lineHeight: 24,
            textAlign: 'justify',
          }}>
          {` Sic is a social audio app — think of it as a call-in radio show for the 21st century. Users enter “Rooms,” where they can listen to (and participate in) conversations about specific topics.
When it was first released on iOS in March 2020, Sic generated a ton of buzz, partly because of its exclusivity: you had to be “nominated” (aka invited) to join. At one point, users were even selling invites on eBay, and its valuation spiked from $100 million in May 2020 to 4 billion USD in April 2021.
The Sic frenzy drove other social media apps to develop their own versions of Sic, resulting in Twitter Spaces, Facebook Live Audio Rooms, Spotify Greenroom, and Amazon’s forthcoming Project Mic.
Sic is secretive about numbers, but interest has definitely cooled over the last year. It looks like downloads hit an all-time high in February 2021 and dropped sharply from there.
There’s still room for growth, though. Clubhouse has become a popular venue for discussing global and political topics. For example, a room for discussion on the situation in Ukraine reached one million users in mid-April.
The app is still drawing big names, too. In April 2022, former InStyle magazine editor Laura Brown announced a new Club (more on those later) featuring weekly interviews with celebrities like Elle Fanning, Sophie Turner, and Rebel Wilson.
         `}
        </Text> */}
      </ScrollView>
    </View>
  );
};

export default AboutSicScreen;

const styles = StyleSheet.create({});
