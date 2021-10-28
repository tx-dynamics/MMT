import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,ScrollView,Platform, Dimensions
} from 'react-native';
import theme from '../../theme';
import {heart} from '../../assets';
import styles from './styles';
import { Fonts } from '../../utils/Fonts';
const SignupScreen = props => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setuserName] = useState('');
  const [email, setemail] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [emailMessage, setemailMessage] = useState('');
  const [passwordMessage, setpasswordMessage] = useState('');
  const [confirmMessage, setconfirmMessage] = useState('');
  const [fNameMessage, setfNameMessage] = useState('');
  const [lNameMessage, setlNameMessage] = useState('');
  const navigation = props.navigation;
  return (

    <ScrollView
      
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
            <Text style={[styles.title]}>Let’s Get Started!</Text>
            <Text style={[styles.smalltitle]}>Create an account to continue</Text>
        <View >
        
          <View style={{marginTop:30,flexDirection:'row',
          width:'90%',alignSelf:'center',justifyContent:'space-between'}}>
            <TextInput
            style={styles.smallInput}
              placeholder="First Name"
              onChangeText={text => setfName( text.trim())}
              value={fName}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
               <TextInput
            style={styles.smallInput}
              placeholder="Last Name"
              onChangeText={text => setlName( text.trim())}
              value={lName}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
          <View  style={{marginTop:10}}>
            <TextInput
              style={styles.InputContainer}
              placeholder="Username"
              onChangeText={text => setuserName( text)}
              value={userName}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
          <View  style={{marginTop:10}}>
            <TextInput
              style={styles.InputContainer}
              placeholder="Email"
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
              onChangeText={text => setPassword( text)}
              value={password}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
        
        </View>

        <TouchableOpacity
         onPress={()=>props.navigation.navigate('Trakee',{screen:'Phone'})}
        style={{marginTop:25,borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Next</Text>
</TouchableOpacity>
<TouchableOpacity
 onPress={()=>props.navigation.navigate('Signin')}
style={{alignSelf:'center',marginTop:Dimensions.get('window').height/6}}>
<Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:15}}>Already have an account?</Text>
    </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;
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
