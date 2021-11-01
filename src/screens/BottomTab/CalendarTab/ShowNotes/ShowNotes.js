import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,FlatList,TouchableOpacity, TextInput, Dimensions
} from 'react-native';
import {db,line} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import {heart} from '../../../../assets';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import HeaderRight from '../../../../components/HeaderRight';
import moment from 'moment';
const ShowNotes = props => {
    const[date,setdate]=useState(new Date())
    const[note,setnote]=useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={  <View style={{justifyContent:'center',alignItems:'center',alignSelf:'center',
        height:48,width:'100%',}}>
          <Text numberOfLines={1} style={{fontSize: 24,
    fontFamily: Fonts.Poppins,
    color: 'white',fontWeight:'600'}}>{`${moment(date).format('DD MMM, YYYY')}`}</Text>
        </View>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
        
         <View style={{
            marginTop:20,width:'90%',
            alignSelf:'center',backgroundColor:'#FFE7EE',
            borderRadius:7,}}>
        <Text style={{fontSize:15,fontWeight:'500',marginTop:10,marginLeft:10,
        fontFamily:Fonts.Poppins,color:"#C62252"}}>Quick Note</Text>
        <Text style={{fontSize:15,fontWeight:'500',marginTop:10,marginLeft:10,
        fontFamily:Fonts.Poppins,color:"#383838",textAlign:'left'}}>{note}</Text>
        
        </View>
        <View style={{flex:0.06}}></View>
        <View style={{flexDirection:'row',width:'90%',alignSelf:'center',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}
        style={{marginTop:25,borderColor:'#FFB5CC',borderWidth:1,backgroundColor:'white',
        width:'45%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
  <Text style={{color:theme.colors.primary,fontWeight:'500',
  fontFamily:Fonts.Poppins,fontSize:17}}>Delete</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>props.navigation.goBack()}
        style={{marginTop:25,borderColor:'#FFB5CC',borderWidth:1,backgroundColor:'#C62252',
        width:'45%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Save</Text>
</TouchableOpacity>
</View>
    </View>
  );
};

export default ShowNotes;