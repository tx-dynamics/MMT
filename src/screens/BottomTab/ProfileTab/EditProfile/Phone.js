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
import AntDesign from 'react-native-vector-icons/AntDesign'
const Phone = props => {
    const[phone,setphone]=useState('');
    const[countryCode,setcountryCode]=useState('PK +92');
    const[loading,setloading]=useState(false)
  const navigation = props.navigation;
  return (
    <View  style={{flex: 1, backgroundColor: theme.colors.p1}}>
    <Header
      backgroundColor={theme.colors.p1}
      containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
      centerComponent={<HeaderCenterComponent name='Phone'/>}
      leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
      />
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={Platform.OS === "ios" ? true : false}
    style={{flex: 1, backgroundColor: theme.colors.p1}}
    >
    <Text style={{marginTop:20}}></Text>
    <Text style={[styles.smalltitle,{color:'#F3A3BC'}]}>You can change your Phone number here</Text>
    <View>
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

export default Phone;

