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
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const TrakeeName = props => {
const[Name,setName]=useState('');
const[countryCode,setcountryCode]=useState('PK +92');
const[loading,setloading]=useState(false);
async function onName(){
  var regex = /^[a-zA-Z ]*$/;
    const Firstvalid=regex.test(Name);
    if(Firstvalid)
 { var newPostKey = database()
  .ref('trakees/')
  .child(auth().currentUser?.uid)
  .push().key;
console.log('post key===\n', newPostKey);
  const data={Name};
  const up= database()
  .ref('trakees/' + auth().currentUser?.uid+'/'+newPostKey);
  setloading(false);
  up.set(data);
  setTimeout(()=>{
    setloading(false);
    setName('');
    props.navigation.navigate('TrakeePic',{key:newPostKey});
    Snackbar.show({
       text: 'Trakee Name Added',
       backgroundColor: 'black',
     });
  },1000)}else {
    setTimeout(() => {
      setloading(false);
      Snackbar.show({
        text: 'Kindly Enter Correct Name',
        backgroundColor: 'red',
      });
    }, 300);
  
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
            <Text style={[styles.title]}>Enter New Trackee Name</Text>
            <Text style={[styles.smalltitle]}>Enter your new trackee name</Text>
        <View >
        
          <View style={[styles.InputContainer,{marginTop:30,flexDirection:'row',alignItems:"center"}]}>
              
            <TextInput
            style={{width:'70%',width:'70%',color:'#FFB5CC',fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins}}
              onChangeText={text => setName(text)}
              value={Name}
              // placeholder='Trackee name'
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
              keyboardType='email-address'
            />
           
          </View>
        </View>
      
<View style={{flex:0.1}}></View>
        <TouchableOpacity 
        disabled={Name!==''?false:true}
        // onPress={()=>props.navigation.navigate('TrakeePic')}
        onPress={()=>{onName(),setloading(true)}}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'25%',alignSelf:'center',alignItems:'center',padding:10,borderRadius:10,}}>
             {loading ? 
                <ActivityIndicator
                  animating
                  color={'white'}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}
                />:
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Done</Text>}
</TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default TrakeeName;