import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,Modal,TouchableOpacity, ImageBackground, Dimensions,TextInput
} from 'react-native';
import {db,edit,image,botom} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import DatePicker from 'react-native-date-picker'
import styles from '../../../PhoneNumber/styles';
const EditProfile = props => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
  <View style={{flex: 1, backgroundColor: theme.colors.p1}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Edit Profile'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
        <ImageBackground resizeMode='contain' borderRadius={53} source={db}
        style={{height:106,width:106,alignSelf:'center',justifyContent:'flex-end',marginTop:25}}>
            <Image source={image} style={{height:26,width:26,alignSelf:'flex-end'}} />
        </ImageBackground>
       
    <View  style={{}}>
        <TouchableOpacity 
        onPress={()=>props.navigation.navigate('UserName')}
        style={{borderBottomWidth:0.5,borderColor:'#FFB5CC',paddingVertical:5,width:'85%',alignSelf:'center',
        marginTop:30,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20}}>Name/Username</Text>
            <Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('Phone')}
        style={{borderBottomWidth:0.5,borderColor:'#FFB5CC',paddingVertical:5,
        width:'85%',alignSelf:'center',marginTop:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20}}>Phone</Text>
            <Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} />
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>setmodalVisible(true)}
        style={{borderBottomWidth:0.5,borderColor:'#FFB5CC',
        paddingVertical:5,width:'85%',alignSelf:'center',marginTop:20,
        flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Text style={{color:'white',fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:20}}>Age</Text>
            <Image source={edit} style={{height:12,width:12,marginLeft:10,tintColor:'white'}} />
        </TouchableOpacity>
        
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
          height:Dimensions.get('window').height/1.8,borderTopLeftRadius:30,borderTopRightRadius:30,
          alignSelf:'center',bottom:0,borderRadius:5}}>
        <View style={[styles.InputContainer,
          {marginTop:30,flexDirection:'row',alignItems:"center"}]}>
          <TextInput
          style={{width:'70%'}}
            value={date}
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
        date={date} 
        style={{alignSelf:'center',}}
        onDateChange={txt=>console.log(txt)} />
<TouchableOpacity onPress={()=>setmodalVisible(false)}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,marginTop:20}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Save</Text>
</TouchableOpacity>

        </View>
        </View>
      </Modal>
      <Image source={botom} resizeMode='contain' style={{height:136,width:136,position:'absolute',bottom:-5,alignSelf:'flex-end'}} />
    </View>
  );
};

export default EditProfile;