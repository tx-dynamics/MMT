import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../../../theme';
import {Fonts} from '../../../../utils/Fonts';
const styles = StyleSheet.create({
  title: {
   fontSize:17,fontFamily:Fonts.Poppins,fontWeight:'500',width:'90%',alignSelf:'center',color:theme.colors.primary
  },
  smalltitle: {
    fontSize:13,fontFamily:Fonts.Poppins,fontWeight:'400',width:'90%',alignSelf:'center',color:'#383838'
   },
   flatliststyle:{backgroundColor:'#FFF2F6',flex:1,flexDirection:'row',alignItems:'center',borderRadius:11,
   marginTop:7,paddingVertical:13},
   Trakeeliststyle:{flex:1,flexDirection:'row',alignItems:'center',width:'100%',
   marginTop:5,paddingVertical:10,borderBottomWidth:0.4,borderColor:'#DBD8D8'},

});
export default styles;
