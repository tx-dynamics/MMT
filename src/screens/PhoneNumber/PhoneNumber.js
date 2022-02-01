import React, {useState, useRef} from 'react';
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
import PhoneInput from "react-native-phone-number-input";
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const PhoneNumber = props => {
const[phone,setphone]=useState('');
const[countryCode,setcountryCode]=useState('PK +92');
const[loading,setloading]=useState(false);
const [formattedValue, setFormattedValue] = useState("");

const [value, setValue] = useState("");
const [show, setshow] = useState(false);
const phoneInput = useRef();
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
    backgroundColor: theme.colors.primary,
    duration: Snackbar.LENGTH_LONG,
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
            { !show?<TouchableOpacity 
    onPress={()=>{setshow(true),setphone('')}}
    style={[styles.InputContainer,{marginTop:30,flexDirection:'row',alignItems:"center"}]}>
    <Text style={{color:'#FFB5CC',fontWeight:'300',fontSize:15,
    fontFamily:Fonts.Poppins}}>{phone===''?'+92':phone.slice(0,3)}</Text>
    <AntDesign name='down' size={9} color={'#FFB5CC'} style={{marginLeft:3}} />
    <Text style={{color:'#FFB5CC',marginLeft:5,bottom:2}}>|</Text>
    <TextInput
    style={{width:'70%',color:'#FFB5CC',fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins}}
    onChangeText={text => setphone( text.trim())}
    value={phone.slice(3,phone.length)}
    editable={false}
    placeholder='8659273'
    placeholderTextColor={'#FFB5CC'}
    underlineColorAndroid="transparent"
    keyboardType='phone-pad'
    />
    </TouchableOpacity>
    :
        <PhoneInput
        containerStyle={
          {marginTop:30,flexDirection:'row',
          alignItems:"center",backgroundColor:theme.colors.p1,
          width:'90%',alignSelf:'center',borderWidth:1.4,borderColor:'#ED6877',borderRadius:10,
         }}
          textInputStyle={{ color:'#FFB5CC',fontWeight:'300',
          fontFamily:Fonts.Poppins,fontSize:15}}
          codeTextStyle={{color:'#FFB5CC',
          fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins,backgroundColor:theme.colors.p1}}
          textContainerStyle={{width:'70%',color:'#FFB5CC',
          fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins,backgroundColor:theme.colors.p1}}
            ref={phoneInput}
            defaultValue={phone}
            value={phone}
            defaultCode='PK'
            layout='second'
            onChangeText={(text) => {
              setValue(text),setphone(text)
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text),console.log('txt==>',text),setphone(text)
            }}
            autoFocus
          />}
        
      
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