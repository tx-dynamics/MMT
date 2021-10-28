import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,KeyboardAvoidingView,Platform,
} from 'react-native';
import theme from '../../../theme';
import {upload,heart} from '../../../assets';
import styles from '../../PhoneNumber/styles';
import {Picker} from '@react-native-picker/picker';
// import CountryCodeList from 'react-native-country-code-list'
import { Fonts } from '../../../utils/Fonts';
const TrakeeRelationship = props => {
const[items_count,setitems_count]=useState('');
const[loading,setloading]=useState(false);
const [uri,seturi]=useState('');
const[Relationship,setRelationship]=useState([{id: 1, name: 'Wife'},
{id: 2, name: 'Girlfriend'},
{id: 3, name: 'Daughter'},
{id: 4, name: 'Family'},{id: 5, name: 'Friend'},
{id: 6, name: 'Other'},])
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
            <Text style={[styles.title]}>Enter Trackee Relationship</Text>
            <Text style={[styles.smalltitle]}>Enter your trackee relationship </Text>
            <View style={{flex:0.06}}></View>
            <Picker
            selectedValue={items_count}
            placeholder="Selecte No of Stores"
            style={{
              fontSize: 12,
              fontWeight: '600',
             
              paddingVertical: 10,
              borderWidth: 10,
              width: '90%',
              borderRadius: 10,
              backgroundColor:'white',
              //color:'white'
              color: theme.colors.primary,alignSelf:'center',
            }}
            mode='dropdown'
            itemStyle={{
              height: 40,
              fontSize: 14,width:'10%'
            }}
            dropdownIconColor='#FFB5CC'
            onValueChange={(itemValue, itemIndex) =>
              setitems_count(itemValue)
            }>
            {Relationship &&
             Relationship.map((item, index) => {
                switch (item.id) {
                  case 1:
                    return (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.id}
                        style={{fontFamily:Fonts.Poppins,fontSize:15,fontWeight:'300'}}
                        backgroundColor={'#FFB5CC'}
                      />
                    );
                  default:
                    return (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.id}
                        backgroundColor={'#FFB5CC'}
                      />
                    );
                }
              })}
          </Picker>
<View style={{flex:0.1}}></View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('TrakeeDate')}
        style={{borderColor:'#FFB5CC',borderWidth:1,backgroundColor:theme.colors.primary,
        width:'30%',alignSelf:'center',alignItems:'center',padding:13,borderRadius:10,}}>
  <Text style={{color:'white',fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17}}>Done</Text>
</TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default TrakeeRelationship;