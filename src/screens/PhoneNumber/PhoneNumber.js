import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,KeyboardAvoidingView,Platform
} from 'react-native';
import theme from '../../theme';
import {heart} from '../../assets';
import styles from './styles';
import { Fonts } from '../../utils/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const PhoneNumber = props => {
const[phone,setphone]=useState('');
const[countryCode,setcountryCode]=useState('PK +92');
const[loading,setloading]=useState(false);
async function onphone(){
  if(phone!==''){
  database().ref('users/'+auth().currentUser?.uid).update({
    phone
  }).then
 (()=>
  {
    setloading(false);
    props.navigation.navigate('DOB');
    Snackbar.show({
    text: 'Phone Number Added',
    backgroundColor: 'black',
  });
}
  )
  }
}
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
            <Text style={[styles.title]}>Enter Your Phone Number</Text>
            <Text style={[styles.smalltitle]}>Enter phone number to continue</Text>
        <View >
        
          <View style={[styles.InputContainer,{marginTop:30,flexDirection:'row',alignItems:"center"}]}>
              <Text style={{color:'#FFB5CC',fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins}}>{countryCode}</Text>
              <AntDesign name='down' size={9} color={'#FFB5CC'} style={{marginLeft:3}} />
             <Text style={{color:'#FFB5CC',marginLeft:5,bottom:2}}>|</Text>
            <TextInput
            style={{width:'70%',color:'#FFB5CC',fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins}}
              onChangeText={text => setphone( text.trim())}
              value={phone}
              placeholder='8659273'
              placeholderTextColor={'#FFB5CC'}
              underlineColorAndroid="transparent"
              keyboardType='number-pad'
            />
           
          </View>
        </View>
      
<View style={{flex:0.1}}></View>
        <TouchableOpacity 
        disabled={phone===''?true:false}
        // onPress={()=>props.navigation.navigate('DOB')}
        onPress={()=>{onphone(),setloading(true)}}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
            {loading ? (
                <ActivityIndicator
                  animating
                  color={'white'}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}
                />
              ) : (
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Next</Text>)}
</TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default PhoneNumber;