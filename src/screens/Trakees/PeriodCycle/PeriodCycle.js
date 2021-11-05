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
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../../components/HeaderLeftComponent';
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const PeriodCycle = props => {
const[Name,setName]=useState('');
const[loading,setloading]=useState(false);
useEffect(()=>{
  const item= props?.route?.params?.cycle;
  setName(item);
},[]);
async function updateCycle(){
  const id=props.route.params.key;
  const data= database().ref('trakees/'+auth().currentUser?.uid+'/'+id+'/');
  data.update({
    cycle:Name
  });
  setTimeout(()=>{
    setloading(false);
    props.navigation.navigate('Root',{screen:'Home'});
    Snackbar.show({
       text: 'Trakee Date Updated',
       backgroundColor: 'black',
     });
  },1000)
}
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={Platform.OS === "ios" ? true : false}
      style={{flex: 1, backgroundColor: theme.colors.p1}}
    >
   <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Period Cycle'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
        <View style={{flex:0.05}}></View>
         <Text
         style={{fontFamily:Fonts.Roboto,fontSize:15,width:'90%',alignSelf:'center',
         fontWeight:'300',color:'#F3A3BC',}}>You can change your Trackee Relationship here</Text>
    <View style={[styles.InputContainer,{marginTop:20,flexDirection:'row',alignItems:"center"}]}>
              
            <TextInput
            style={{width:'70%',width:'70%',color:'#FFB5CC',fontWeight:'300',fontSize:15,fontFamily:Fonts.Poppins}}
              onChangeText={text => setName(text)}
              value={Name}
              placeholder='28'
              maxLength={2}
              placeholderTextColor={theme.colors.s2}
              underlineColorAndroid="transparent"
              keyboardType='number-pad'
            />
           
    </View>
      
<View style={{flex:0.1}}></View>
        <TouchableOpacity
        disabled={Name===''?true:false}
        onPress={()=>{updateCycle(),setloading(true)}}
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
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Save</Text>}
</TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default PeriodCycle;