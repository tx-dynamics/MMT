import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Header} from 'react-native-elements';
import theme from '../../theme';
import {Fonts} from '../../utils/Fonts';
import LottieView from 'lottie-react-native';
const Setup = props => {
  const [loading, setLoading] = useState(false);
  
  const navigation = props.navigation;

  return (
    <View style={{flex: 1, backgroundColor:theme.colors.p1}}>
        
   
        {/* <LottieView
        source={require('../../utils/confetti.json')}
        style={{
          backgroundColor:theme.colors.p1,
          alignSelf: 'center',
          flex: 1,
        }}
        autoPlay
        loop
      /> */}
      <View style={{width: '100%',marginTop:Dimensions.get('window').height/3}}>
      <Text
          style={[
            {
              width: '90%',
              alignSelf: 'center',
              textAlign: 'center',
              color: 'yellow',fontSize:20,fontFamily:Fonts.Poppins,fontWeight:'500'
            },
          ]}>
         Congratulations
        </Text>
        <Text
          style={[
            {
              width: '90%',
              alignSelf: 'center',
              textAlign: 'center',
              color: 'white',fontSize:20,fontFamily:Fonts.Poppins,fontWeight:'500'
            },
          ]}>
         {'Your profile is set up now \n let’s enter your first trackee'}
        </Text>
      </View>

      <View
        style={[
        
          { alignSelf: 'center',
            width: '90%',
            position: 'absolute',
            bottom:40,
          },
        ]}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TrakeeName')}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>GO</Text>
</TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
      {/* }
      /> */}
    </View>
  );
};
export default Setup;
