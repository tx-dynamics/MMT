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
const TrakeePeriodCycle = props => {
const[Name,setName]=useState('');
const[loading,setloading]=useState(false);
async function oncycle(){
  const key=props.route.params.key;
  if(Name!=='')
  { 
  const dataupload= database().ref('trakees/'+ auth().currentUser?.uid+'/'+key+'/');
  dataupload.update({
    cycle:Name
  });
  
  setTimeout(()=>{
    setloading(false);
    setName('');
    props.navigation.navigate('Root',{screen:'Home'});
    Snackbar.show({
       text: 'Trakee Period Cycle Added',
       backgroundColor: 'black',
     });
  },1000)
} else{
  setTimeout(()=>{
    setloading(false);
    Snackbar.show({
      text: 'Kindly Enter Trakee Period Cycle',
      backgroundColor: 'black',
    });
  },300)
   
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
            <Text style={[styles.title]}>{'Enter Your Trackee Period\nCycle'}</Text>
            <Text style={[styles.smalltitle]}>{'Enter your trackee period cycle length'}</Text>
        <View >
        
          <View style={[styles.InputContainer,{marginTop:30,flexDirection:'row',alignItems:"center"}]}>
              
            <TextInput
            style={{width:'70%',width:'70%',color:'#FFB5CC',fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins}}
              onChangeText={text => setName(text)}
              value={Name}
              placeholder='28'
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
              keyboardType='number-pad'
            />
           
          </View>
        </View>
      
<View style={{flex:0.1}}></View>
        <TouchableOpacity onPress={()=>{oncycle(),setloading(true)}}
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

export default TrakeePeriodCycle;