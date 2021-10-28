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
const UserName = props => {
  const [loading, setLoading] = useState(false);
  const [userName, setuserName] = useState('');
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const navigation = props.navigation;
  return (
    <View  style={{flex: 1, backgroundColor: theme.colors.p1}}>
    <Header
      backgroundColor={theme.colors.p1}
      containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
      centerComponent={<HeaderCenterComponent name='Username'/>}
      leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
      />
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={Platform.OS === "ios" ? true : false}
    style={{flex: 1, backgroundColor: theme.colors.p1}}
    >
    <Text style={{marginTop:20}}></Text>
    <Text style={[styles.smalltitle,{color:'#F3A3BC'}]}>You can change your name/username here</Text>
    <View>
    <View style={{marginTop:20,flexDirection:'row',
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

export default UserName;

