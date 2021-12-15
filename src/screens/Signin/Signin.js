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
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
const Signin = props => {
const[email,setemail]=useState('');
const[password,setpassword]=useState('');
const[loading,setloading]=useState(false);
useEffect(() => {
  createChannels();
}, []);
const createChannels = () => {
  PushNotification.createChannel(
      {
          channelId: "mmt",
          channelName: "MMT"
      }
  )
}
async function login() {
  if (email !== '' && password !== '') {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setloading(false);
        props.navigation.navigate('Root',{screen:'Home'});
        Snackbar.show({
          text: `Sign in Succesfully`,
          backgroundColor: theme.colors.primary,
          duration: Snackbar.LENGTH_LONG,
        });
      })
      .catch(err =>{
        setloading(false);
        Snackbar.show({
          text: err.message,
          backgroundColor: 'black',
        });
      });
  } else {
    setloading(false);
    Snackbar.show({
      text: 'Kindly Fill all the fields',
      backgroundColor: 'black',
    });
  }
};
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
            <Text style={[styles.title]}>Welcome Back!</Text>
            <Text style={[styles.smalltitle]}>Enter email & passoword to continue</Text>
        <View >
        
          <View style={{marginTop:30}}>
            <TextInput
            style={styles.InputContainer}
              placeholder="Email/Username"
              onChangeText={text => setemail( text.trim())}
              value={email}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
          <View  style={{marginTop:10}}>
            <TextInput
              style={styles.InputContainer}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={text => setpassword( text)}
              value={password}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={{width:'90%',alignSelf:'center',textAlign:'right',
fontWeight:'300',
fontFamily:Fonts.Poppins,fontSize:15,marginTop:3,color:'white'}}>Forgot Password?</Text>
        </View>

        <TouchableOpacity
        disabled={email===''||password===''?true:false}
        onPress={()=>{login(),setloading(true)}}
        style={{marginTop:25,borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
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
              <Text style={{color:'white',fontWeight:'500',
              fontFamily:Fonts.Poppins,fontSize:17}}>Log In</Text>)}
</TouchableOpacity>
<TouchableOpacity
onPress={()=>props.navigation.navigate('Signup')}
style={{position:'absolute',bottom:20,alignSelf:'center'}}>
<Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:15}}>New here?</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Signin;
export function Errors({errors}) {
  return (
    <Text
      style={{
        fontSize: 12,
        fontWeight: 'bold',
        width: '95%',
        alignSelf: 'center',
        marginTop: 5,
        color: 'red',
      }}>
      {errors}
    </Text>
  );
}
