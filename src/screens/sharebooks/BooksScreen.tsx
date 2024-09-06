import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import React from 'react';
import { SvgXml } from 'react-native-svg';
import AntDesign from "react-native-vector-icons/AntDesign";
import BackButtonWithTitle from '../../components/common/BackButtonWithTitle';
import { useStyles } from '../../context/ContextApi';
import { NavigProps } from '../../interfaces/NaviProps';
import { TemBooks } from '../../utils/GetRandomColor';

export interface Books {
  id: number;
  content: string;
  image: string;
}

const data = [
  {
    id: 1,
    content: 'All',
  },
  {
    id: 2,
    content: 'Way of Life',
  },
  {
    id: 3,
    content: 'Business',
  },
  {
    id: 4,
    content: 'Human Family',
  },
  {
    id: 5,
    content: 'Worldview',
  },
];

const BooksScreen = ({navigation}: NavigProps<null>) => {
  const {colors, font} = useStyles();
  const [selectItem, setSelectIItem] = React.useState<number>(1);
  const {height, width} = useWindowDimensions();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: colors.bg,
      }}>
      <BackButtonWithTitle
        navigation={navigation}
        title="Books Library"
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
          // marginTop: 5,
        }}>
        <View
          style={{
            backgroundColor: colors.search,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            height: 48,
            paddingHorizontal: 20,
            marginVertical : 10,
            borderRadius: 50,
          }}>
          <SvgXml
            xml={`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6267 11.5129L16 14.8861L14.8861 16L11.5129 12.6267C10.3 13.5971 8.76177 14.1776 7.08881 14.1776C3.17579 14.1776 0 11.0018 0 7.08881C0 3.17579 3.17579 0 7.08881 0C11.0018 0 14.1776 3.17579 14.1776 7.08881C14.1776 8.76177 13.5971 10.3 12.6267 11.5129ZM11.0465 10.9284C12.0096 9.93584 12.6023 8.58187 12.6023 7.08881C12.6023 4.04259 10.135 1.57529 7.08881 1.57529C4.04259 1.57529 1.57529 4.04259 1.57529 7.08881C1.57529 10.135 4.04259 12.6023 7.08881 12.6023C8.58187 12.6023 9.93584 12.0096 10.9284 11.0465L11.0465 10.9284Z" fill="${colors.textColor.neutralColor}"/>
</svg>
`}
          />
          <TextInput
            style={{flex: 1}}
            placeholder="Search your books"
            placeholderTextColor={colors.textColor.neutralColor}
          />
        </View>
      </View>
   
       
     <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false} >
        {
          TemBooks.map((book,index) =>
          (
            <View key={book.id}>
         <TouchableOpacity onPress={()=> navigation?.navigate("BookShareWithCategory" ,{data : TemBooks[index].category })} style={{
          flexDirection :"row",
          justifyContent : "space-between",
          width : width,
          paddingHorizontal : '5%',
        paddingVertical : 10
         }}>
         <Text style={{
          color : colors.textColor.rare,
          fontSize : 15,
          fontFamily : font.PoppinsSemiBold,
         }}>
             {TemBooks[index].category}
          </Text>
        <View style={{
          flexDirection : "row",
          alignItems : "center",
          justifyContent : "center",
          gap : 10
 
        }}>
        <Text style={{
            color : colors.textColor.rare
         }}>
             {data.length}
          </Text>
          <AntDesign name='right' size={15}  color={colors.textColor.rare}/>
        </View>
         </TouchableOpacity>
        <FlatList
       horizontal
       showsHorizontalScrollIndicator={false}
        data={TemBooks}
        contentContainerStyle={{
          gap: 20,
          paddingBottom: 20,
          paddingHorizontal: '5%',
        }}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('BookShare', {data: item.item});
            }}
            style={{
              // elevation: 2,
              // backgroundColor: colors.bg,
              // padding: 2,
              borderRadius: 24,
              // height: height * 0.243,
              // alignItems : "center",
              // justifyContent : "center",
            }}>
         <View style={{
          elevation : 1,
          padding : 3,
       
       
         }}>
         <Image
            resizeMode='stretch'
              style={{
                height: height * 0.24,
                width: width * 0.41,
                borderRadius: 24,
                borderWidth : 2,
                borderColor : colors.bg
              }}
              source={item.item.image}
            />
         </View>
            <View style={{
              marginTop : 10,
              alignItems : "center",
              gap : 5,
              maxWidth : width * 0.41,
            }}>
            <Text style={{
              color: colors.textColor.light,
              fontSize: 14,
              fontFamily: font.PoppinsMedium,
              
            }}>{item.item.title}</Text>
            <Text style={{
              color: colors.textColor.neutralColor,
              fontSize: 12,
              fontFamily: font.Poppins,
              
            }}>{item.item.publisher}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
        </View>
          )
          )
        }
       
      </ScrollView>
    </View>
  );
};

export default BooksScreen;

const styles = StyleSheet.create({});
