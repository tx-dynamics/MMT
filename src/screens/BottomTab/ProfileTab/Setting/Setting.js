import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,Modal,TouchableOpacity, ImageBackground, Dimensions,TextInput
} from 'react-native';
import {db,edit,image,botom} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import DatePicker from 'react-native-date-picker'
import styles from '../../../PhoneNumber/styles';
const Setting = props => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
  <View style={{flex: 1, backgroundColor: theme.colors.p1}}>
    <Header
        backgroundColor={ theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Password'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('Password')}
        style={{paddingVertical:10,width:'85%',alignSelf:'center',marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20}}>Password</Text>
<Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'#FFB5CC'}} />
</TouchableOpacity>
<Image source={botom} resizeMode='contain' style={{height:136,width:136,position:'absolute',bottom:-5,alignSelf:'flex-end'}} />

    </View>
  );
};

export default Setting;