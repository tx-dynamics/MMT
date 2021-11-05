import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,FlatList,TouchableOpacity,Modal
} from 'react-native';
import theme from '../../../../theme';
import {db,line} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import styles from './styles';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const Home = props => {
  const[trakee,settrakee]=useState([{id: 1, name: 'Wife'},
  {id: 2, name: 'Girlfriend'},
  {id: 3, name: 'Daughter'},
  {id: 4, name: 'Family'},{id: 5, name: 'Friend'},
  {id: 6, name: 'Other'}]);
  const[trakeeList,settrakeeList]=useState([
  //   {id: 1, name: 'Lopez Robertson'},
  // {id: 2, name: 'Katty Swan'},
  // {id: 3, name: 'Angela Diaz'},
  // {id: 4, name: 'Alice Perry'}
]);
  const navigation=props.navigation;
  const isFocused = useIsFocused();
  const[length,setlength]=useState(1);
  const [modalVisible, setmodalVisible] = useState(false);
  useEffect(()=>{
    getTrakee();
  },[isFocused])
  async function getTrakee(){
    const data =database().ref('trakees/'+auth().currentUser.uid+'/');
    let arr=[];
    data.on('value',childern=>{
      childern.forEach(item=>{
        const dat=item?.val();
        arr.push({
          id:item.key,
          name:dat?.Name,
          cycle:dat?.cycle,
          dp:dat?.dp,
          item_count: dat?.items_count,
          lastDate:dat?.lastDate
        })
      })
      settrakeeList(arr);
      setlength(arr.length)
      console.log('data===>',arr);
    });
    
  }
  const ontrakeeShow=(({item, index})=>(
<View style={styles.flatliststyle}>
{item.item_count===1 &&
<View style={{flexDirection:'row',backgroundColor:'#FFF2F6',borderRadius:11,
  alignItems:'center',width:'100%',justifyContent:'space-between',paddingVertical:13}}>
 <Text style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,
 marginLeft:15,color:'#383838'}}>Wife</Text>
 <Image source={line} 
 style={{width:207,height:5,borderRadius:10,alignItems:'flex-end',color:'#383838',right:10}}/>
 </View>}
 {item.item_count===2 &&
<View style={{flexDirection:'row',backgroundColor:'#FFF2F6',borderRadius:11,
  alignItems:'center',width:'100%',justifyContent:'space-between',paddingVertical:13}}>
 <Text style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,
 marginLeft:15,color:'#383838'}}>Girlfriend</Text>
 <Image source={line} 
 style={{width:207,height:5,borderRadius:10,alignItems:'flex-end',color:'#383838',right:10}}/>
 </View>}
 {item.item_count===3 &&
<View style={{flexDirection:'row',backgroundColor:'#FFF2F6',borderRadius:11,
  alignItems:'center',width:'100%',justifyContent:'space-between',paddingVertical:13}}>
 <Text style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,
 marginLeft:15,color:'#383838'}}>Daughter</Text>
 <Image source={line} 
 style={{width:207,height:5,borderRadius:10,alignItems:'flex-end',color:'#383838',right:10}}/>
 </View>}
 {item.item_count===4 &&
<View style={{flexDirection:'row',backgroundColor:'#FFF2F6',borderRadius:11,
  alignItems:'center',width:'100%',justifyContent:'space-between',paddingVertical:13}}>
 <Text style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,
 marginLeft:15,color:'#383838'}}>Family</Text>
 <Image source={line} 
 style={{width:207,height:5,borderRadius:10,alignItems:'flex-end',color:'#383838',right:10}}/>
 </View>}
 {item.item_count===5 &&
<View style={{flexDirection:'row',backgroundColor:'#FFF2F6',borderRadius:11,
  alignItems:'center',width:'100%',justifyContent:'space-between',paddingVertical:13}}>
 <Text style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,
 marginLeft:15,color:'#383838'}}>Friend</Text>
 <Image source={line} 
 style={{width:207,height:5,borderRadius:10,alignItems:'flex-end',color:'#383838',right:10}}/>
 </View>}
 {item.item_count===6 &&
<View style={{flexDirection:'row',backgroundColor:'#FFF2F6',borderRadius:11,
  alignItems:'center',width:'100%',justifyContent:'space-between',paddingVertical:13}}>
 <Text style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,
 marginLeft:15,color:'#383838'}}>Other</Text>
 <Image source={line} 
 style={{width:207,height:5,borderRadius:10,alignItems:'flex-end',color:'#383838',right:10}}/>
 </View>}
</View>
  ))
  const trakeelist=(({item, index})=>(
    <TouchableOpacity
    onPress={()=>(
      setmodalVisible(false),
      navigation.navigate('Trakee',
      {screen:'TrakeeProfile',
    params:{data:item}}))}
    style={styles.Trakeeliststyle}>
      <View style={{flexDirection:'row',alignItems:'center',width:'90%',paddingHorizontal:5,}}>
      <Image source={item.dp?{uri:item.dp}:db} style={{height:33,width:33,borderRadius:16}}/>
     <Text numberOfLines={1} style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,marginLeft:15,
     color:'#383838'}}>{item.name}
     </Text>
     </View>
    </TouchableOpacity>
      ))
  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='MMT'/>}
        rightComponent={
          <TouchableOpacity onPress={()=>setmodalVisible(true)}
          style={{flexDirection:'row',top:10,alignItems:'center',}}>
           {trakeeList.length>0?
           <>
           <Image source={ trakeeList[0]?.dp?{uri: trakeeList[0]?.dp}:db} style={{width:22,height:22,borderRadius:11}} />
            <Text style={{fontSize:10,fontWeight:'400',
            fontFamily:Fonts.Roboto,color:'white',marginLeft:2}}>{`+${length}`}</Text>
            </>:
            null}
          </TouchableOpacity>
        }
        />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
          <View style={{height: '100%',backgroundColor: 'rgba(64, 77, 97, 0.5)',}}>
            <Text   style={{marginTop:20}}></Text>
          <View style={{flex:0.3,backgroundColor:'white',width:'50%',alignSelf:'center',top:20,borderRadius:5}}>
          <FlatList
          style={{marginTop:10,width:'90%',alignSelf:'center',}}
          showsVerticalScrollIndicator={false}
          data={trakeeList}
          renderItem={trakeelist}
          />
          </View>
          </View>
        </Modal>
        <View style={{marginTop:15}}>
       
        </View>
        <View style={{flex:0.9}}>
        <FlatList
          style={{marginTop:20,width:'90%',alignSelf:'center',}}
          showsVerticalScrollIndicator={false}
          data={trakeeList}
          renderItem={ontrakeeShow}
          />
          </View>
          <TouchableOpacity
          onPress={()=>navigation.navigate('Trakee',{screen:'TrakeeName'})}
          style={{width:'90%',alignSelf:'center',borderRadius:10,position:'absolute',bottom:10,
          backgroundColor:theme.colors.p1,paddingVertical:15}}>
            <Text style={{fontSize:17,fontFamily:Fonts.Poppins,
              fontWeight:'500',textAlign:'center',color:'white'}}>Add Trackee</Text>
          </TouchableOpacity>
    </View>
  );
};

export default Home;