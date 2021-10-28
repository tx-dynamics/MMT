import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,KeyboardAvoidingView,Platform, Dimensions
} from 'react-native';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import styles from '../../../SignupScreen/styles';
import { Fonts } from '../../../../utils/Fonts';
import {botom} from '../../../../assets';
const Password = props => {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setcurrentPassword] = useState('');
  const [password, setpassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const navigation = props.navigation;
  return (
    <View  style={{flex: 1, backgroundColor: theme.colors.p1}}>
    <Header
      backgroundColor={theme.colors.p1}
      containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
      centerComponent={<HeaderCenterComponent name='Password'/>}
      leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
      />
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={Platform.OS === "ios" ? true : false}
    style={{flex: 1, backgroundColor: theme.colors.p1}}
    >
    <Text style={{marginTop:20}}></Text>
    <Text style={[styles.smalltitle,{color:'#F3A3BC'}]}>You can change your password here</Text>
    <View>
        <View  style={{marginTop:10}}>
            <TextInput
              style={styles.InputContainer}
              placeholder="Current Password"
              secureTextEntry={true}
              onChangeText={text => setcurrentPassword( text)}
              value={currentPassword}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
          <View  style={{marginTop:10}}>
            <TextInput
              style={styles.InputContainer}
              placeholder="New Password"
              secureTextEntry={true}
              onChangeText={text => setnewPassword( text)}
              value={newPassword}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
          <View  style={{marginTop:10}}>
            <TextInput
              style={styles.InputContainer}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onChangeText={text => setpassword( text)}
              value={password}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <TouchableOpacity
         onPress={()=>navigation.goBack()}
        style={{marginTop:25,borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Save</Text>
</TouchableOpacity>
    </KeyboardAvoidingView>
    <Image source={botom} resizeMode='contain' style={{height:136,width:136,position:'absolute',bottom:-5,alignSelf:'flex-end'}} />
    
    </View>
  );
};

export default Password;

