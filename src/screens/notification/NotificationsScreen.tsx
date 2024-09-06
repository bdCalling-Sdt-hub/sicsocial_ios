import { ScrollView, StyleSheet, View } from 'react-native';

import React from 'react';
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import NotificationCard from '../../components/notificaiton/NotificationCard';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';

const NotificationsScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        title="Activities"
        containerStyle={{
          justifyContent: 'flex-start',
          gap: 20,
        }}
        navigation={navigation}
        titleStyle={{
          fontSize: 20,
          color: colors.textColor.primaryColor,
          fontFamily: font.PoppinsSemiBold,
        }}
      />

       
     <ScrollView
          showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: '4%',
          gap: 16,
          paddingBottom: 20,
          paddingTop: 10,
        }}>
        <NotificationCard
          title="Hilari don"
          content="Send you friend request"
        />
        <NotificationCard
          title="Hamulul hai"
          content="Add you in a house"
          img="https://s3-alpha-sig.figma.com/img/9286/b692/51aa83c10615c1bc383e1b2573c0456e?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=awmNnsCbVB0A8kK5Rpa3EMr16qfGkgKVUmL681BBU-S-1nkEQSYg~GChTVkbnbXmXaRZYAPkxAm7wBcpfNrIfCtt~jAa9dTiweNymXigLPTPCLP2aOD5rkpf5vPzXjdYj-V7QSR1c3asp9R15nbLvHFTEthhfRANPCtPGJrTy2d9LS4K8lV57aBlUGnezh27FZ49lLNL0wWAC3tjppsIhborRU-yTcIZMsCuZHDCrFDdWfjJWQt9zF0bz9YR38ZP6gWcvOWppyBMuaURQIFkM0QNT1nMTWhJx7udDg8W1DSsL0dj8p7Qtnf1DHvul0zQnwmoswBCgPUYooPjlX~P6A__"
        />
        <NotificationCard title="Shakib" content="join you in live chat" />
        <NotificationCard
          title="Lavlu"
          content="replyed i a group"
          img="https://s3-alpha-sig.figma.com/img/3192/58e3/c3641c90c78233cf072df4312127531e?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BIleb9ezqUtCpk01kyD28dhJe0StlrzeBDHWrLm-W0-TMKq8WpPJZudOLol3pIcTWApZYVfBhPOtgUKn4oBJZk-T3davkZCjgszFn6VDONeW2GJ~5ZGJSCTSxlspVFUzbxllbyPOXUhWWyivruXEaySNei3JYoKgIdZLjQBy8xouDrcrKtgD8eX83yoSVvt7FPm0lvLrTappw1vtxOLekS3E8PBx6ASdLb82SwPlB-d9nr~yGlQl1oYcK6ZqUPvr2rsbYm0htKubdAo93GUoD7bLZrkAXaiA-IOsnEuZaqNu5zyrTctUasigi72UdSaoXK~bIrPdemIgDvrqgNQAAg__"
        />
        <NotificationCard title="Juie" content="replyed in voice chat" />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
        <NotificationCard
          title="Ummehuney "
          content="Send you friend request"
        />
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
