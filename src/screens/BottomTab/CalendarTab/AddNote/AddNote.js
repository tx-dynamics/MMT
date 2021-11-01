import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,FlatList,TouchableOpacity, TextInput
} from 'react-native';
import {db,line} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import {heart} from '../../../../assets';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import HeaderRight from '../../../../components/HeaderRight';
const AddNote = props => {
    const[note,setnote]=useState('');
  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Add Note'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
        
         <View style={{
            flex:0.5,marginTop:20,width:'90%',
            alignSelf:'center',borderColor:'lightgray',borderWidth:1,
            borderRadius:12}}>
         <TextInput
         multiline={true}
         style={{width:'100%',alignSelf:'center',
         fontSize:13,
              fontWeight:'300',fontFamily:Fonts.Roboto,
              color:'black',
              height:'100%',textAlignVertical:'top',
              paddingHorizontal:10}}
              secureTextEntry={true}
              placeholder="Write your quick note here"
              onChangeText={text => setnote( text)}
              value={note}
              placeholderTextColor={'#BEBEBE'}
              underlineColorAndroid="transparent"
            />
        </View>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position:'absolute',bottom:10,width:'90%',
        alignSelf:'center',padding:12,
        backgroundColor:'#C62252',
        alignItems:'center',borderRadius:10
        }}>
        <Text style={{
                fontFamily:Fonts.Poppins,
                fontWeight:'500',color:'white',fontSize:17}} >Save</Text>
        </TouchableOpacity> 
    </View>
  );
};

export default AddNote;