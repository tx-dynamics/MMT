import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,KeyboardAvoidingView,Platform
} from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import theme from '../../../theme';
import {upload,heart} from '../../../assets';
import styles from '../../PhoneNumber/styles';
import { Fonts } from '../../../utils/Fonts';
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
const TrakeePic = props => {
const[Name,setName]=useState('');
const[loading,setloading]=useState(false);
const [uri,seturi]=useState('');
const[id,setid]=useState('');
useEffect(()=>{
  const key=props.route.params.key;
  setid(key);
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
      setloading(false);
    });
}
async function onload(){
  const dataupload= database().ref('trakees/'+ auth().currentUser?.uid+'/'+id+'/');
  dataupload.update({
    dp:uri
  });
  
  setTimeout(()=>{
    setloading(false);
    setName('');
  props.navigation.navigate('TrakeeRelationship',{key:id});
    Snackbar.show({
       text: 'Trakee Image Added',
       backgroundColor: theme.colors.primary,
      duration: Snackbar.LENGTH_LONG,
     });
  },1000)
}
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
            <Text style={[styles.title]}>Upload Trackee Image</Text>
            <Text style={[styles.smalltitle]}>Upload your trackee image</Text>
            <View style={{flex:0.1}}></View>
        <View style={{width:'90%',alignSelf:'center'}} >
            
        <ImageBackground resizeMode='contain' source={upload} style={{width:'100%',height:176,alignSelf:'center'}}>
        { uri===''?  <TouchableOpacity onPress={()=>{pickImage(),setloading(true)}} style={{width:'100%',height:'100%',justifyContent:'center'}}>
            <Text style={{fontSize:15,fontFamily:Fonts.Poppins,
                fontWeight:'400',backgroundColor:'#A43256',width:'40%',alignSelf:'center',
                textAlign:'center',padding:10,borderRadius:23,color:'white'
                }}>Upload Image</Text>
            </TouchableOpacity>: <Image
          source={{uri:uri}}
          style={{
            height: '100%',
            width: '100%',}}/>}
        </ImageBackground>
        </View>
      
<View style={{flex:0.1}}></View>
        <TouchableOpacity onPress={()=>{onload(),setloading(true)}}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
            {loading ? 
                <ActivityIndicator
                  animating
                  color={'white'}
                  style={{
                    color: 'white',
                    textAlign: 'center',
                  }}
                />:
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Done</Text>}
</TouchableOpacity>
<View style={{flex:0.1}}></View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TrakeeRelationship',{key:id})}
        style={{alignSelf:'center'}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Skip!</Text>
</TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default TrakeePic;