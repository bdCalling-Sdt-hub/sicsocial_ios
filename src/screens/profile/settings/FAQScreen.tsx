import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useStyles} from '../../../context/ContextApi';
import {NavigProps} from '../../../interfaces/NaviProps';
import BackButtonWithTitle from '../../../components/common/BackButtonWithTitle';
import {SvgXml} from 'react-native-svg';
import FaqCard from '../../../components/FAQ/FaqCard';

const data = [
  {
    id: 1,
    question: 'How to use the app?',
    answer:
      'The app is easy to use. Just follow the steps below and you will be able to find the answers you are looking for.',
  },
  {
    id: 2,
    question: 'What are the benefits of using the app?',
    answer:
      'Using the app can help you find answers to your questions, save time, and make it easier to find information.',
  },
  {
    id: 3,
    question: 'Can I use the app anonymously?',
    answer:
      'Yes, you can use the app anonymously. Your answers will be saved and used for research purposes only.',
  },
  {
    id: 4,
    question: 'Do I need to pay for the app?',
    answer:
      'No, you do not need to pay for the app. It is completely free and open-source.',
  },
  {
    id: 5,
    question: 'How can I contribute to the app?',
    answer:
      'You can contribute to the app by sharing your knowledge, asking questions, and helping others. Just sign up and start contributing.',
  },
  {
    id: 6,
    question: 'What are the legal and ethical considerations?',
    answer:
      'The app is designed to be free, open-source, and transparent. However, it is important to remember that using the app may lead to misuse of information, privacy concerns, and potential legal issues.',
  },
  {
    id: 7,
    question: 'Can I report a bug or issue?',
    answer:
      'Yes, you can report a bug or issue by contacting us at 123-456-7890 or by emailing us at support@example.com.',
  },
  {
    id: 8,
    question: 'Can I use the app in my country?',
    answer:
      'Yes, you can use the app in your country. The app is designed to be as open-source and transparent as possible, and we will strive to make it as easy as possible for you to use.',
  },
  {
    id: 9,
    question: 'How can I find more information about the app?',
    answer:
      'You can find more information about the app by visiting our website at www.example.com or by contacting us at 123-456-7890 or by emailing us at support@example.com.',
  },
  {
    id: 10,
    question:
      'Question for frequently asked question that your can update from dashboard',
    answer:
      'Yes, you can use the app in a remote location. The app is designed to be as open-source and transparent as possible, and we will strive to make it as easy as possible for you to use.',
  },
];

const FAQScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="FAQ"
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
      <View
        style={{
          paddingHorizontal: '4%',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontFamily: font.Poppins,
            fontSize: 14,
            color: colors.textColor.neutralColor,
            marginBottom: 20,
          }}>
          All possible questions related to the app are answered. If you want to
          know more about us, you can email us.
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: '4%',
          paddingBottom: 20,
        }}
        data={data}
        renderItem={item => {
          return <FaqCard item={item.item} />;
        }}
      />
    </View>
  );
};

export default FAQScreen;

const styles = StyleSheet.create({});
