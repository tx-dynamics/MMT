import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,Modal,TouchableOpacity, ImageBackground, Dimensions,TextInput,ActivityIndicator
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
import DocumentPicker from 'react-native-document-picker';
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
const Profile = (props) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const[uri,seturi]=useState();
  const[namee,setname]=useState();
  const isFocused = useIsFocused();
  const[uid,setuid]=useState();
  const[loading,setloading]=useState(false);
  const [pdate, setpDate] = useState(new Date());
  useEffect(()=>{
    const {cycle,dp,id,item_count,lastDate,name}= props?.route?.params?.data;
    console.log(item_count);
    if(props?.route?.params?.data)
    {
      seturi(dp);
      setname(name);
      setuid(id);
      setDate(lastDate);
    }
  },[]);
  async function pickImage(){
    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        })
        res.map(item=>{
            console.log(item.uri);
            seturi(item.uri);
            if(item.uri){
              onupload(item.uri);
            }
        })
       
      } catch (err) {
        setloading(false);
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err
        }
      }
}
async function onupload(url){
  console.log('uri here from upload start',url);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed')); // error occurred, rejecting
    };
    xhr.responseType = 'blob'; // use BlobModule's UriHandler
    xhr.open('GET', url, true); // fetch the blob from uri in async mode
    xhr.send(null); // no initial data
  });
  var timestamp = new Date().getTime();
  var imageRef = storage().ref(`TrakeeImages/` + timestamp + '/');

  return imageRef
    .put(blob)
    .then(() => {
      blob.close();
      return imageRef.getDownloadURL();
    })
    .then(dwnldurl => {
      console.log('finall uploaded uri',dwnldurl);
      seturi(dwnldurl);
      onload(dwnldurl);
    });
}
async function onload(uri){
  const {id}= props?.route?.params?.data;
  const dataupload= database().ref('trakees/'+ auth().currentUser?.uid+'/'+id+'/');
  dataupload.update({
    dp:uri
  });
  props.navigation.goBack();
  setTimeout(()=>{
    setloading(false);
    Snackbar.show({
       text: 'Trakee Image Added',
       backgroundColor: 'black',
     });
  },1000)
}
const {cycle,dp,id,item_count,lastDate,name}= props?.route?.params?.data;
async function startDate(){
  const data= database().ref('trakees/'+auth().currentUser?.uid+'/'+id+'/');
  data.update({
    lastDate:date.toJSON()
  });
  console.log(date);
  setTimeout(()=>{
    setloading(false);
    setmodalVisible(false);
    Snackbar.show({
       text: 'Trakee Date Updated',
       backgroundColor: theme.colors.primary,
      duration: Snackbar.LENGTH_LONG,
     });
     props.navigation.goBack();
  },300)
}

  return (
  <View style={{flex: 1, backgroundColor: '#ED618C'}}>
    <Header
        backgroundColor={'#ED618C'}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Trackee Profile'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
    <View style={{flex:0.4,}}>
      <TouchableOpacity
      onPress={()=>{pickImage(),setloading(true)}}
      >
        <ImageBackground  borderRadius={53} source={uri?{uri}:db}
        style={{height:106,width:106,alignSelf:'center',justifyContent:'flex-end',marginTop:25}}>
           {loading ? 
                <ActivityIndicator
                  animating
                  color={theme.colors.s2}
                  style={{
                    color: 'white',
                    textAlign: 'center',opacity:1
                  }}
                  size={30}
                />:
            <Image source={image} style={{height:26,width:26,alignSelf:'flex-end'}} />}
        </ImageBackground>
        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:15}}>
            <Text style={{fontFamily:Fonts.Roboto,fontSize:22,
            fontWeight:'500',color:'white'}}>{namee}</Text>
             {/* <Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} /> */}
        </View>
    </View>
    <View  style={{flex:0.6, backgroundColor:theme.colors.p1,borderTopLeftRadius:45,borderTopRightRadius:45}}>
<TouchableOpacity 
onPress={()=>props.navigation.navigate('Relationship',{item_count,key:id})}
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
onPress={()=>props.navigation.navigate('PeriodCycle',{key:id,cycle})}
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
<TouchableOpacity onPress={()=>{startDate(),setloading(true)}}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,marginTop:20}}>
           {loading ? 
                <ActivityIndicator
                  animating
                  color={theme.colors.s2}
                  style={{
                    color: 'white',
                    textAlign: 'center',opacity:1
                  }}
                  size={30}
                />:
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Save</Text>}
</TouchableOpacity>

        </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;