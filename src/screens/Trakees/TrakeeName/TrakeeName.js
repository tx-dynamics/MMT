import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,KeyboardAvoidingView,Platform
} from 'react-native';
import theme from '../../../theme';
import {heart} from '../../../assets';
import styles from '../../PhoneNumber/styles';
// import CountryCodeList from 'react-native-country-code-list'
import { Fonts } from '../../../utils/Fonts';
const TrakeeName = props => {
const[Name,setName]=useState('');
const[countryCode,setcountryCode]=useState('PK +92');
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
            <Text style={[styles.title]}>Enter New Trackee Name</Text>
            <Text style={[styles.smalltitle]}>Enter your new trackee name</Text>
        <View >
        
          <View style={[styles.InputContainer,{marginTop:30,flexDirection:'row',alignItems:"center"}]}>
              
            <TextInput
            style={{width:'70%',width:'70%',color:'#FFB5CC',fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins}}
              onChangeText={text => setName(text)}
              value={Name}
              placeholder='Trackee name'
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
              keyboardType='email-address'
            />
           
          </View>
        </View>
      
<View style={{flex:0.1}}></View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TrakeePic')}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'25%',alignSelf:'center',alignItems:'center',padding:10,borderRadius:10,}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Done</Text>
</TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default TrakeeName;