import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,FlatList,TouchableOpacity,ScrollView
} from 'react-native';
import {db,online} from '../../../../assets';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import {heart} from '../../../../assets';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import HeaderRight from '../../../../components/HeaderRight';
const History = props => {
  const[trakee,settrakee]=useState([
    {id: 1,name: 'Wife',periodLength:'05',ovulation:'14',cycleLength:'28',visible:true},
  {id: 2, name: 'Girlfriend',periodLength:'05',ovulation:'14',cycleLength:'28',visible:false},
  {id: 3, name: 'Daughter',periodLength:'05',ovulation:'14',cycleLength:'28',visible:false},
  {id: 4, name: 'Family',periodLength:'05',ovulation:'14',cycleLength:'28',visible:false},
  {id: 5, name: 'Friend',periodLength:'05',ovulation:'14',cycleLength:'28',visible:false},
  {id: 6, name: 'Other',periodLength:'05',ovulation:'14',cycleLength:'28',visible:false}]);
  const[stats,setstats]=useState([
    {id: 1,name: 'Wife',periodLength:'05',ovulation:'14',cycleLength:'28',date:'Jun 23 - Jul 28'},
  {id: 2, name: 'Girlfriend',periodLength:'05',ovulation:'14',cycleLength:'28',date:'Jun 23 - Jul 28'},
  {id: 3, name: 'Daughter',periodLength:'05',ovulation:'14',cycleLength:'28',date:'Jun 23 - Jul 28'},
  {id: 4, name: 'Family',periodLength:'05',ovulation:'14',cycleLength:'28',date:'Jun 23 - Jul 28'},
  {id: 5, name: 'Friend',periodLength:'05',ovulation:'14',cycleLength:'28',date:'Jun 23 - Jul 28'},
  {id: 6, name: 'Other',periodLength:'05',ovulation:'14',cycleLength:'28',date:'Jun 23 - Jul 28'}]);
  const[show,setshow]=useState(false)
  const trakeelist=(({item, index})=>(
    <TouchableOpacity
    // onPress={()=>(setmodalVisible(false),navigation.navigate('Trakee',{screen:'TrakeeProfile'}))}
    style={{marginLeft:15,flex:1,flexDirection:'row'}}>
      <View style={{flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#EBFFFE',width:'100%',
      paddingVertical:10,paddingHorizontal:15}}>
     <Text  style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:11,
     color:'#00978F',alignSelf:'center'}}>{item.name}
     </Text>
     </View>
    {item.visible && <Image source={online} style={{height:10,width:10,color:'#00FF29',borderRadius:5,right:10}}/>}
    </TouchableOpacity>
      ));
const statics=(({item, index})=>(
<View 
key={index}
style={{width:'90%',alignSelf:'center',marginTop:15,}}>
          <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:17,fontWeight:'500',
            color:'#ED6877',marginTop:5,}}>{item.date}</Text>
            <View style={{flexDirection:"row",width:'100%',alignSelf:'center',justifyContent:"space-between"}}>
           <View style={{width:'30%',borderRightWidth:0.5,borderColor:'#DBD8D8',alignItems:"center"}}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:13,fontWeight:'400',color:'black'}}>Period Starts</Text>
            <View style={{flexDirection:'row'}}>
             <Text style={{
            fontsize:11,fontWeight:'400',color:'#BEBEBE',textAlign:'center'}}>23 Jun</Text>
            </View>
          </View>
          <View style={{width:'30%',alignItems:"center",borderRightWidth:0.5,borderColor:'#DBD8D8'}}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:13,fontWeight:'400',color:'black'}}>Ovulation</Text>
            <View style={{flexDirection:'row'}}>
             <Text style={{
            fontsize:11,fontWeight:'400',color:'#BEBEBE',textAlign:'center'}}>23 Jun</Text>
            </View>
          </View>
          <View style={{width:'30%',alignItems:"center",}}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:13,fontWeight:'400',color:'black'}}>Period Length</Text>
            <View style={{flexDirection:'row'}}>
             <Text style={{
            fontsize:11,fontWeight:'400',color:'#BEBEBE',textAlign:'center'}}>23 Jun</Text>
            </View>
          </View>
          </View>
         </View>
          ));
  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='History'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        rightComponent={<HeaderRight txt={show?'':'Delete'} onPress={()=>setshow(true)} />}
        />
{!show?
<>
        <View style={{width:'90%',alignSelf:'center',marginTop:20}}>
          <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:17,fontWeight:'700',color:'#C62252'}}>Trackee Name</Text>
          <FlatList
          horizontal={true}
          style={{marginTop:10,width:'100%',alignSelf:'center'}}
          showsVerticalScrollIndicator={false}
          data={trakee}
          renderItem={trakeelist}
          />
        </View>
        <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:17,fontWeight:'700',color:'#C62252',marginTop:25,
            width:'90%',alignSelf:'center'}}>Average</Text>
        <View style={{width:'90%',alignSelf:'center',marginTop:10,flexDirection:'row',
        justifyContent:'space-between'}}>
          <View style={{padding:15,elevation:5,borderRadius:6,
            shadowColor: '#000',backgroundColor: '#fff',
           shadowOffset: {
             width: 0,
             height: 2,
           },
           shadowOpacity: 0.25,
           shadowRadius: 3.84,
          }}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:13,fontWeight:'400',color:'black'}}>Period Length</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:15,fontWeight:'500',color:'black'}}>05</Text>
             <Text style={{
            fontsize:9,fontWeight:'400',color:'#BEBEBE',marginLeft:5,top:1}}>Days</Text>
            </View>
          </View>
          <View style={{padding:15,elevation:5,borderRadius:6,
           shadowColor: '#000',backgroundColor: '#fff',
           shadowOffset: {
             width: 0,
             height: 2,
           },
           shadowOpacity: 0.25,
           shadowRadius: 3.84,marginLeft:5
          }}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:13,fontWeight:'400',color:'black'}}>Ovulation</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:15,fontWeight:'500',color:'black'}}>05</Text>
             <Text style={{
            fontsize:9,fontWeight:'400',color:'#BEBEBE',marginLeft:5,top:1}}>Days</Text>
            </View>
          </View>
          <View style={{padding:15,elevation:5,borderRadius:6,shadowColor: '#000',backgroundColor: '#fff',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,marginLeft:5}}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:13,fontWeight:'400',color:'black'}}>Cycle Length</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:15,fontWeight:'500',color:'black'}}>05</Text>
             <Text style={{
            fontsize:9,fontWeight:'400',color:'#BEBEBE',marginLeft:5,top:1}}>Days</Text>
            </View>
            
          </View>
        </View>
        <Text style={{borderTopWidth:0.4,marginTop:30,borderColor:'#DBD8D8'}}></Text>
        <Text style={{
            fontFamily:Fonts.Poppins,
            fontsize:17,fontWeight:'700',
            color:'#C62252',marginTop:15,width:'90%',alignSelf:'center',}}>Statistics</Text>
        <View style={{flex:1}}>
        <FlatList
         contentContainerStyle={{
          flexGrow: 1,
          }}
          keyExtractor={item => item._id}
          style={{width:'95%',alignSelf:'center'}}
          showsVerticalScrollIndicator={false}
          data={stats}
          renderItem={statics}
          />
            </View>
      </>:
      <View style={{  justifyContent:'center',flex:1,alignSelf:'center'}}>
        <Text style={{fontWeight:'500',fontFamily:Fonts.Poppins,fontSize:17,color:'#BEBEBE',
    }}>You have no history available</Text>
      </View> } 
    </View>
  );
};

export default History;