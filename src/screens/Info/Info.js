import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,ScrollView, Dimensions,TouchableOpacity
} from 'react-native';
import {info,rect} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import theme from '../../theme';
const Info = props => {
  return (
    <View
      style={{flex: 1, backgroundColor: '#E6B3C4',width:'100%'}}>
        <View>
          <Image source={info} resizeMode='contain' style={{width:'100%',height:Dimensions.get('window').height/2}}/>
        </View>
  <View  style={{height:Dimensions.get('window').height/2, backgroundColor:theme.colors.p1,borderTopLeftRadius:45,borderTopRightRadius:45}}>
<View style={{width:'85%',alignSelf:'center',marginTop:20}}>
<Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:24}}>Menstruation or period</Text>
<Text style={{color:'#FFC2D5',fontWeight:'300',fontFamily:Fonts.Poppins,fontSize:17,textAlign:'left'}}>It is normal vaginal bleeding that occurs as part of a woman's monthly cycle. Every month, your body prepares for pregnancy. If no pregnancy occurs, the uterus, or womb, sheds its lining. The menstrual blood is partly blood and partly tissue from inside the uterus.</Text>
</View>
<TouchableOpacity onPress={()=>props.navigation.navigate('Signin')}
style={{marginTop:20,borderColor:'#FFB5CC',
borderWidth:1,backgroundColor:theme.colors.primary,width:'30%',
alignSelf:'center',alignItems:'center',padding:13,borderRadius:10}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Start</Text>
</TouchableOpacity>
  </View>
    </View>
  );
};

export default Info;