import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,KeyboardAvoidingView,Platform, Dimensions
} from 'react-native';
import theme from '../../../theme';
import {heart} from '../../../assets';
import styles from '../../PhoneNumber/styles';
import DatePicker from 'react-native-date-picker'
import { Fonts } from '../../../utils/Fonts';
const TrakeeDate = props => {
const [date, setDate] = useState(new Date())
const[loading,setloading]=useState(false)
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={Platform.OS === "ios" ? true : false}
      keyboardVerticalOffset={-60}
      style={{flex: 1, backgroundColor: theme.colors.p1}}
    >
     <Image
          source={heart}
          style={{
            height: 240,
            width: 171,
            alignSelf: 'center',
            marginTop: 10,
          }}/>
            <Text style={[styles.title]}>{'Enter Trackee Last Start \nDate'}</Text>
            <Text style={[styles.smalltitle]}>Enter your trackee last start date</Text>
        <View >
        
          <TouchableOpacity style={[styles.InputContainer,{marginTop:30,flexDirection:'row',alignItems:"center"}]}>
            
            <TextInput
            style={{width:'70%'}}
              value={date}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
              editable={false}
              placeholder='09 May 1998'
            />
           
          </TouchableOpacity>
        </View>
        <View style={{flex:0.1}}></View>
        <DatePicker 
        mode='date'
        textColor='white'
        fadeToColor='white'
        androidVariant='nativeAndroid'
        date={date} 
        style={{alignSelf:'center',}}
        onDateChange={txt=>console.log(txt)} />
<View style={{flex:0.15}}></View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TrakeeCycle')}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Done</Text>
</TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default TrakeeDate;