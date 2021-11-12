import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,ActivityIndicator,TouchableOpacity,ImageBackground
} from 'react-native';
import {db,setting,edit,editProfile} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const Profile = props => {
  const[uri,seturi]=useState();
  const[name,setname]=useState();
  const isFocused = useIsFocused();
  const[loading,setloading]=useState(false);
  useEffect(()=>{
    loadData();
  },[isFocused])
  async function loadData(){
    const data=database().ref('users/'+auth().currentUser?.uid+'/');
    data.on('value',child=>{
      seturi(child?.val()?.dp);
      setname(child?.val()?.fName+' '+child?.val()?.lName);
    })
  }
  async function onlogout(){
    auth()
      .signOut()
      .then(() => {
        setloading(false);
        props.navigation.navigate('Auth',{screen:'Signin'});
        Snackbar.show({
          text: 'Bye Bye',
          backgroundColor: 'black',
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }
  return (
  <View style={{flex: 1, backgroundColor:'#ED6591'}}>
    <Header
        backgroundColor={'#ED6591'}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Profile'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
    <View style={{flex:0.4,}}>
      
        <ImageBackground borderRadius={53} source={uri?{uri}:db}
        style={{height:106,width:106,alignSelf:'center',justifyContent:'flex-end',marginTop:25,borderRadius:53}}/>
        <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:15}}>
        <Text style={{fontFamily:Fonts.Roboto,fontSize:22,fontWeight:'500',color:'white'}}>{name}</Text>
        </View>
    </View>
    <View  style={{flex:0.6, backgroundColor:theme.colors.p1,borderTopLeftRadius:45,borderTopRightRadius:45}}>
<TouchableOpacity 
onPress={()=>props.navigation.navigate('EditProfile')}
style={{paddingVertical:10,width:'85%',alignSelf:'center',
marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{height:55,width:55,backgroundColor:'#FFB6D1',borderRadius:11,
justifyContent:'center',alignItems:'center'}}>
<Image source={editProfile} style={{height:28,width:26.15,marginLeft:10,tintColor:'#E74779'}} />
</View>
<Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20,left:15}}>Edit profile</Text>
</View>
<AntDesign name='right' size={13} color='white'/>
</TouchableOpacity>
<TouchableOpacity 
onPress={()=>props.navigation.navigate('Setting')}
style={{paddingVertical:10,width:'85%',alignSelf:'center',
marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{height:55,width:55,backgroundColor:'#FFB6D1',borderRadius:11,
justifyContent:'center',alignItems:'center'}}>
<Image source={editProfile} style={{height:28,width:26.15,marginLeft:10,tintColor:'#E74779'}} />
</View>
<Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20,left:15}}>Settings</Text>
</View>
<AntDesign name='right' size={13} color='white'/>
</TouchableOpacity>
<TouchableOpacity 
onPress={()=>{onlogout(),setloading(true)}}
style={{paddingVertical:10,width:'85%',alignSelf:'center',
marginTop:10,
flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<View style={{flexDirection:'row',alignItems:'center'}}>
<View style={{height:55,width:55,backgroundColor:'#FFB6D1',borderRadius:11,
justifyContent:'center',alignItems:'center'}}>
    {loading?
                <ActivityIndicator
                  animating
                  color={theme.colors.p1}
                  size={25}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}
                />:
<Entypo name='log-out' size={26} color={theme.colors.p1}/>}
</View>
<Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20,left:15}}>Logout</Text>
</View>
<AntDesign name='right' size={13} color='white'/>
</TouchableOpacity>

</View>
    </View>
  );
};

export default Profile;