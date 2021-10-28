/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {back} from '../assets';
import theme from '../theme';
import {Fonts} from '../utils/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'
const HeaderLeftComponent = ({navigation}) => {
  return (
    <View style={{top:10}}>
      <TouchableWithoutFeedback
        activeOpacity={0}
        onPress={() => {
          navigation.goBack();
        }}>
        {/* <Image source={back} resizeMode={'contain'} style={styles.drawerIcon} /> */}
        {/* <Text style={styles.txt}>Back</Text> */}
        <AntDesign name='left' size={21} color='white'/>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HeaderLeftComponent;

const styles = StyleSheet.create({
  drawerIcon: {
    height: 21,
    width: 11,
    tintColor: 'white',
  },
});
