import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useStyles} from '../../context/ContextApi';
import {SvgXml} from 'react-native-svg';

interface FaqCardProps {
  item: {
    id: number;
    question: string;
    answer: string;
  };
}

const FaqCard = ({item}: FaqCardProps) => {
  const {colors, font} = useStyles();
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => setShowAnswer(!showAnswer)}
        style={{
          backgroundColor: colors.secondaryColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          borderRadius: 10,
        }}>
        <Text
          //   numberOfLines={1}
          style={{
            fontFamily: font.Poppins,
            fontSize: 12,
            color: colors.textColor.neutralColor,
          }}>
          Q: {item.question}
        </Text>
        <View>
          {showAnswer ? (
            <SvgXml
              xml={`<svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2967 0.708396C14.2038 0.614668 14.0932 0.540273 13.9713 0.489504C13.8494 0.438736 13.7187 0.412598 13.5867 0.412598C13.4547 0.412598 13.324 0.438736 13.2022 0.489504C13.0803 0.540273 12.9697 0.614668 12.8767 0.708396L8.29673 5.2884C8.20377 5.38212 8.09317 5.45652 7.97131 5.50729C7.84945 5.55806 7.71874 5.58419 7.58673 5.58419C7.45472 5.58419 7.32401 5.55806 7.20215 5.50729C7.08029 5.45652 6.96969 5.38212 6.87673 5.2884L2.29673 0.708396C2.20377 0.614668 2.09317 0.540273 1.97131 0.489504C1.84945 0.438736 1.71874 0.412598 1.58673 0.412598C1.45472 0.412598 1.32401 0.438736 1.20215 0.489504C1.08029 0.540273 0.969693 0.614668 0.87673 0.708396C0.690479 0.895758 0.585938 1.14921 0.585937 1.4134C0.585938 1.67758 0.690479 1.93103 0.87673 2.1184L5.46673 6.7084C6.02923 7.2702 6.79173 7.58576 7.58673 7.58576C8.38173 7.58576 9.14423 7.2702 9.70673 6.7084L14.2967 2.1184C14.483 1.93103 14.5875 1.67758 14.5875 1.4134C14.5875 1.14921 14.483 0.895758 14.2967 0.708396Z" fill="#415D71"/>
</svg>
`}
            />
          ) : (
            <SvgXml
              xml={`<svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.20986 0.289941C1.11613 0.382904 1.04174 0.493504 0.990969 0.615363C0.9402 0.737223 0.914062 0.867929 0.914062 0.99994C0.914062 1.13195 0.9402 1.26266 0.990969 1.38452C1.04174 1.50638 1.11613 1.61698 1.20986 1.70994L5.78986 6.28994C5.88359 6.3829 5.95798 6.4935 6.00875 6.61536C6.05952 6.73722 6.08566 6.86793 6.08566 6.99994C6.08566 7.13195 6.05952 7.26266 6.00875 7.38452C5.95798 7.50638 5.88359 7.61698 5.78986 7.70994L1.20986 12.2899C1.11613 12.3829 1.04174 12.4935 0.990969 12.6154C0.9402 12.7372 0.914062 12.8679 0.914062 12.9999C0.914062 13.132 0.9402 13.2627 0.990969 13.3845C1.04174 13.5064 1.11613 13.617 1.20986 13.7099C1.39722 13.8962 1.65067 14.0007 1.91486 14.0007C2.17905 14.0007 2.4325 13.8962 2.61986 13.7099L7.20986 9.11994C7.77166 8.55744 8.08722 7.79494 8.08722 6.99994C8.08722 6.20494 7.77166 5.44244 7.20986 4.87994L2.61986 0.289941C2.4325 0.10369 2.17905 -0.000853594 1.91486 -0.000853582C1.65067 -0.000853571 1.39722 0.10369 1.20986 0.289941Z" fill="#415D71"/>
    </svg>
    `}
            />
          )}
        </View>
      </TouchableOpacity>

      {showAnswer && (
        <View
          style={{
            backgroundColor: 'rgba(241, 231, 233, 1)',

            padding: 16,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: font.Poppins,
              fontSize: 12,
              color: colors.textColor.neutralColor,
            }}>
            A: {item.answer}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FaqCard;

const styles = StyleSheet.create({});
