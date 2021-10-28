/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {next} from '../assets';
import theme from '../theme';
import {Fonts} from '../utils/Fonts';

const HeaderRight = ({onPress,txt}) => {
  return (
    <TouchableOpacity style={{top:13}} onPress={onPress}>
     <Text style={styles.textStyle}>{txt}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    fontFamily: Fonts.Poppins,
    color: 'white'
  },
});
export default HeaderRight;
