import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,Modal,TouchableOpacity, ImageBackground, Dimensions,TextInput
} from 'react-native';
import {db,edit,image,botom} from '../../../assets';
import { Fonts } from '../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../components/HeaderCenterComponent';
import theme from '../../../theme';
import HeaderLeftComponent from '../../../components/HeaderLeftComponent';
import DatePicker from 'react-native-date-picker'
import styles from '../../PhoneNumber/styles';
import {useIsFocused} from '@react-navigation/native';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';
const Profile = (props) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const[uri,seturi]=useState();
  const[name,setname]=useState();
  const isFocused = useIsFocused();
  const[uid,setuid]=useState();
  const [pdate, setpDate] = useState(new Date());
  useEffect(()=>{
    const {cycle,dp,id,item_count,lastDate,name}= props?.route?.params?.data;
    if(props?.route?.params?.data)
    {
      seturi(dp);
      setname(name);
      setuid(uid);
      setDate(lastDate);
    }
  },[]);
  return (
  <View style={{flex: 1, backgroundColor: '#ED618C'}}>
    <Header
        backgroundColor={'#ED618C'}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Trackee Profile'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
    <View style={{flex:0.4,}}>
        <ImageBackground  borderRadius={53} source={uri?{uri}:db}
        style={{height:106,width:106,alignSelf:'center',justifyContent:'flex-end',marginTop:25}}>
            <Image source={image} style={{height:26,width:26,alignSelf:'flex-end'}} />
        </ImageBackground>
        <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:15}}>
            <Text style={{fontFamily:Fonts.Roboto,fontSize:22,
            fontWeight:'500',color:'white'}}>{name}</Text>
             <Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} />
        </View>
    </View>
    <View  style={{flex:0.6, backgroundColor:theme.colors.p1,borderTopLeftRadius:45,borderTopRightRadius:45}}>
<TouchableOpacity 
onPress={()=>props.navigation.navigate('Relationship')}
style={{borderBottomWidth:1,borderColor:'white',paddingVertical:10,width:'85%',alignSelf:'center',marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20}}>Relationship</Text>
<Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} />
</TouchableOpacity>
<TouchableOpacity 
onPress={()=>setmodalVisible(true)}
style={{borderBottomWidth:1,borderColor:'white',paddingVertical:10,width:'85%',alignSelf:'center',marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20}}>Last Start Date</Text>
<Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} />
</TouchableOpacity>
<TouchableOpacity
onPress={()=>props.navigation.navigate('PeriodCycle')}
style={{borderBottomWidth:1,borderColor:'white',paddingVertical:10,width:'85%',alignSelf:'center',marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
<Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20}}>Period Cycle</Text>
<Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} />
</TouchableOpacity>
<Image source={botom} resizeMode='contain' style={{height:136,width:136,position:'absolute',bottom:-5,alignSelf:'flex-end'}} />
</View>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
          <View style={{height: '100%',backgroundColor: 'rgba(64, 77, 97, 0.5)',}}>
          <View style={{backgroundColor:'#ED6591',width:'100%',position:'absolute',
          height:Dimensions.get('window').height/2,borderTopLeftRadius:30,borderTopRightRadius:30,
          alignSelf:'center',bottom:0,borderRadius:5}}>
        <View style={[styles.InputContainer,
          {marginTop:30,flexDirection:'row',alignItems:"center"}]}>
          <TextInput
          style={{width:'70%'}}
            value={moment(date).format('DD MMM, YYYY')}
            placeholderTextColor={theme.colors.s2}
            underlineColorAndroid="transparent"
            editable={false}
            placeholder='09 May 1998'
          />
        </View>
      <DatePicker 
        mode='date'
        textColor='white'
        fadeToColor='white'
        androidVariant='nativeAndroid'
        date={pdate}
        maximumDate={moment().subtract(10, "day").toDate()}
        style={{alignSelf:'center',marginTop:10}}
        onDateChange={txt=>{setDate(txt),setpDate(txt)}} />
<TouchableOpacity onPress={()=>setmodalVisible(false)}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,marginTop:20}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Save</Text>
</TouchableOpacity>

        </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;