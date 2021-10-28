/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../theme';
const {width, height} = Dimensions.get('window');
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  title: {
   fontSize:24,fontFamily:Fonts.Poppins,fontWeight:'500',width:'90%',alignSelf:'center',color:'white'
  },
  smalltitle: {
    fontSize:14,fontFamily:Fonts.Poppins,fontWeight:'400',width:'90%',alignSelf:'center',color:'white'
   },
   InputContainer:{
width:'90%',alignSelf:'center',borderWidth:1.4,borderColor:'#ED6877',borderRadius:10,
paddingHorizontal:13,
fontWeight:'300',
fontFamily:Fonts.Poppins,fontSize:15
   },
  
});
export default styles;
