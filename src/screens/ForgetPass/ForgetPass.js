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
const ForgetPass = props => {
const[email,setemail]=useState('');
const[loading,setloading]=useState(false);

const login =async () => {
    if (email !== '') {
  await auth()
        .sendPasswordResetEmail(email);
            setloading(false);
            props.navigation.navigate('Signin');
          Snackbar.show({
            text: 'Password Reset link is sent on your email',
            backgroundColor: 'black',
            duration: Snackbar.LENGTH_LONG,
          });
    } else {
        setloading(false)
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
            <Text style={[styles.title]}>Forgot Password</Text>
        <View >
        
          <View style={{marginTop:30}}>
            <TextInput
            style={styles.InputContainer}
              placeholder="Email"
              onChangeText={text => setemail( text.trim())}
              value={email}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <TouchableOpacity
        disabled={email===''?true:false}
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
              fontFamily:Fonts.Poppins,fontSize:17}}>Sent Email</Text>)}
</TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ForgetPass;
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
