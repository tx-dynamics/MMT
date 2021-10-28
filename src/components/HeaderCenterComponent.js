/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {drawer} from '../assets';
import theme from '../theme';
import {Fonts} from '../utils/Fonts';

const HeaderCenterComponent = ({name}) => {
  return (
    <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',
    height:48,width:'100%',}}>
      <Text numberOfLines={1} style={styles.textStyle}>{name}</Text>
    </View>
  );
};
export default HeaderCenterComponent;
export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
    fontFamily: Fonts.Poppins,
    color: 'white',fontWeight:'600'
  },
});
