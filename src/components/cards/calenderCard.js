import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';

const CalenderCard = ({image, name}) => {
  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={{alignItems: 'center'}}>
        <Image
          source={image}
          resizeMode={'contain'}
          style={{height: 35, width: 35}}
        />
        <Text style={styles.text}>{name}</Text>
      </View>
      <Pressable
        style={{
          width: 25,
          height: 25,
          backgroundColor: 'white',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/images/notes.png')}
          resizeMode={'contain'}
          style={{width: 16, height: 16}}
        />
      </Pressable>
    </View>
  );
};

export default CalenderCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.s2,
    marginHorizontal: '5%',
    borderRadius: 5,
    marginBottom: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5%',
  },
  text: {
    fontSize: 12,
    fontFamily: Fonts.Poppins,
    color: 'white',
    fontWeight: '700',
  },
});
