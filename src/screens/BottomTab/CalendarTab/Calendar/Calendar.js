import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,FlatList,TouchableOpacity, Touchable
} from 'react-native';
import {db,line} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import {heart} from '../../../../assets';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
const Calendar = props => {
  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Calendar'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
    </View>
  );
};

export default Calendar;