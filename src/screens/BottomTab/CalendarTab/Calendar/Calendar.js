import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,FlatList,TouchableOpacity,Modal, Dimensions
} from 'react-native';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import {ellipse,notes,play,line,triangle,circle,db} from '../../../../assets';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import {Picker} from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from '../../HomeTab/Home/styles';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
const Calendars = props => {
const[Relationship,setRelationship]=useState([]);
const isFocused = useIsFocused();
const[items_count,setitems_count]=useState('');
const[uid,setuid]=useState('');
const [cal,setcal]=useState([]);
const[cycle,setcycle]=useState('');
const [modalVisible, setmodalVisible] = useState(false);
const[lastday,setlastday]=useState();
const[startday,setstartday]=useState();
const[fert,setfert]=useState();
const [markedDays, setmarkedDays] = useState([]);
const[name,setname]=useState('');
useEffect(()=>{
  setRelationship([]);
  setuid('');
  setcal([]);
  getTrakee();
},[isFocused])
async function getTrakee(){
  setRelationship([]);
  const data =database().ref('trakees/'+auth().currentUser.uid+'/');
  let arr=[];
  data.on('value',childern=>{
  childern.forEach((item)=>{
      const dat=item?.val();
      arr.push({
        id:item.key,
        uid:item.key,
        relationship:dat?.items_count==1? 'Wife':dat?.items_count==2?
        'Girlfriend':dat?.items_count==3?'Daughter':dat?.items_count==4?'Family':dat?.items_count==5?'Friend':'Other',
        cycle:dat.cycle,
        name:dat?.Name,
        dp:dat?.dp,
        lastDate: new Date(dat?.lastDate).getFullYear()<new Date().getFullYear()?
        moment(dat?.lastDate).add({month: new Date().getMonth()-new Date(dat?.lastDate).getMonth(),
          year:  new Date().getFullYear()>
          new Date(dat?.lastDate).getFullYear()?
          new Date().getFullYear()-new Date(dat?.lastDate).getFullYear():
          new Date().getFullYear()<new Date(dat?.lastDate).getFullYear()?
          new Date(dat?.lastDate).getFullYear()-new Date().getFullYear():0
        })
        // .add(
        //   new Date().getFullYear()>
        // new Date(dat?.lastDate).getFullYear()?
        // new Date().getFullYear()-new Date(dat?.lastDate).getFullYear():
        // new Date().getFullYear()<new Date(dat?.lastDate).getFullYear()?
        // new Date(dat?.lastDate).getFullYear()-new Date().getFullYear():0
        // ,'year'):
        :
        new Date(dat?.lastDate).getFullYear()>new Date().getFullYear()?
        moment(dat?.lastDate).add(new Date(dat?.lastDate).getMonth()-new Date().getMonth(),'month').add(new Date().getFullYear()>
        new Date(dat?.lastDate).getFullYear()?
        new Date().getFullYear()-new Date(dat?.lastDate).getFullYear():
        new Date().getFullYear()<new Date(dat?.lastDate).getFullYear()?
        new Date(dat?.lastDate).getFullYear()-new Date().getFullYear():0,'year'):
        dat?.lastDate,
      })
    });
    setRelationship(arr);
    console.log('here',arr.length);
    let markedDay = {};
    if(arr.length>0){
      const sd=(moment(arr[0].lastDate).add(7,'day'));
      const ft=(moment(arr[0].lastDate).add(13,'day'));
      // 2022-01-01
      setTimeout(() => {
        setname(arr[0].name);
        setstartday(moment(arr[0].lastDate).format('yyy-MM-DD'));
        setlastday(moment(sd).format('yyy-MM-DD'));
        setfert(moment(ft).format('yyy-MM-DD'));
        setuid(arr[0]?.uid);
        selectDayes(arr[0]?.uid);
        setcycle(arr[0].cycle);
      }, 300);
     
      console.log('last day==>',moment(sd).format('yyy-MM-DD'));
      
      for(let i=1;i<8;i++) {
      
        let pDate= moment(arr[0].lastDate).add(i,'day');
        markedDay[moment(pDate).format('YYYY-MM-DD')] = {selected: true, selectedColor: 'blue',}
        
    }
    }
   setmarkedDays(markedDay);
  });
  // setTimeout(() => {
  
    // }, 400);
    // console.log('data====>',new Date( arr[0].lastDate).toDateString());
  
}
async function selectDayes(id){
const dta= database().ref('Calendar/'+id+'/');
let arr=[];
dta.on('value',chids=>{
  chids.forEach(items=>
    {
      const va=items.val();
      arr.push({
        id:items.key,
        note:items.val()?.note
      })
  })
  setcal(arr);
})

}
const renderArrow = (direction) => {
  if(direction === 'left') {
      return <AntDesign name='left' size={18} color={'#C62252'}/>
  } else {
      return  <AntDesign name='right' size={18} color={'#C62252'}/>
  }
}
function seletedval(value){
  console.log(value);
  let markedDay = {};
  Relationship.map(items=>{
    if(items.uid===value){
      console.log('name',items.name);
      setuid(items?.uid);
      selectDayes(items?.uid);
      setitems_count(items.id);
      setname(items.name);
      const sd=(moment(items?.lastDate).add(7,'day'));
      for(let i=1;i<8;i++) {
        
        let pDate= moment(items.lastDate).add(i,'day');
        let chk= new Date().getMonth();
        let phk= new Date().getFullYear();
        markedDay[moment(pDate).format('YYYY-MM-DD')] = {selected: true, selectedColor: 'blue',}
    }
    setmarkedDays(markedDay);
    setlastday(moment(sd).format('yyy-MM-DD'));
    }
  })
}
function navis(ids,dates){
let add=true;
cal.find(item=>{
  if(item.id===dates){
    console.log('dates',item.note);
    add=false;
    console.log('dates',add);
    add=false;
    props.navigation.push('ShowNote',{uid:ids,day:dates,note:item.note});
  } 
})
if(add){
  console.log('hi',add);
  props.navigation.navigate('Note',{uid:ids,day:dates});
}
}
const trakeelist=(({item, index})=>(
  <TouchableOpacity
  onPress={()=>(
    setmodalVisible(false),seletedval(item.uid),setcycle(Relationship[index]?.cycle),setlastday(Relationship[index]?.lastDate)
   )}
  style={styles.Trakeeliststyle}>
    <View style={{flexDirection:'row',alignItems:'center',width:'90%',paddingHorizontal:5,}}>
    <Image source={item.dp?{uri:item.dp}:db} style={{height:33,width:33,borderRadius:16}}/>
   <Text numberOfLines={1} style={{fontWeight:'400',fontFamily:Fonts.Poppins,fontSize:13,marginLeft:15,
   color:'#383838'}}>{item.name}
   </Text>
   </View>
  </TouchableOpacity>
    ));
    const p=Object.keys(markedDays)
    const nt=p[p.length-1];
  return (

  <View style={{flex: 1, backgroundColor: 'white'}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Calendar'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
         <View style={{flex:0.04}}></View>
         <TouchableOpacity onPress={() => setmodalVisible(!modalVisible)}  style={{borderWidth:1,width:'90%',alignSelf:'center',
         borderColor:'#C62252', borderRadius: 10,padding:6}}>
         <Picker
         selectedValue={items_count}
         placeholder="Selecte No of Stores"
        style={{
              fontSize: 12,
              fontWeight: '600',
              paddingVertical: 10,
              borderWidth: 10,
              width: '100%',
              borderRadius: 10,
              backgroundColor:'white',
              color: 'black',alignSelf:'center',
            }}
            enabled={false}
            mode='dropdown'
            itemStyle={{
              height: 40,
              fontSize: 14,width:'10%',borderWidth:1
            }}
            dropdownIconColor='black'
            onValueChange={(itemValue, itemIndex) =>
             { seletedval(itemValue), setcycle(Relationship[itemValue]?.cycle);
            }
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
                        style={{fontFamily:Fonts.Poppins,fontSize:15,fontWeight:'300',}}
                        backgroundColor={'black'}
                      />
                    );
                  default:
                    return (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.id}
                        backgroundColor={'black'}
                      />
                    );
                }
              })}
          </Picker>
          </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
       
          <TouchableOpacity activeOpacity={0.8}  onPress={() => setmodalVisible(!modalVisible)} 
          style={{height: '100%',backgroundColor: 'rgba(64, 77, 97, 0.5)',}}>
            <Text   style={{marginTop:20}}></Text>
          <View style={{flex:0.3,backgroundColor:'white',width:'70%',alignSelf:'center',top:Dimensions.get('window').height/8.8,borderRadius:5,left:20}}>
          <FlatList
          style={{marginTop:10,width:'90%',alignSelf:'center',}}
          showsVerticalScrollIndicator={false}
          data={Relationship}
          renderItem={trakeelist}
          />
          </View>
          </TouchableOpacity>
        </Modal>
          <View style={{marginTop:10}}>
            <Calendar
            markingType='period'
            marking={true}
             markedDates={markedDays}
            renderArrow={renderArrow}
              theme={{
                textMonthFontSize: 30,
                textMonthFontFamily: Fonts.Poppins,
                textDayHeaderFontWeight: "bold",
                calendarBackground: "transparent",
                selectedDayTextColor: "#ffffff",
                todayTextColor: theme.colors.primary,
                dayTextColor: "#2d4150",
                monthTextColor: "#383838",
                textMonthFontFamily: Fonts.Poppins,
                textMonthFontWeight: '400',
              }}
            style={[ {height:330}]}
            dayComponent={({date, state,marking }) => {
              return (
              <View style={{flexDirection:'row',alignItems:'center'}}>
                 {Number (cycle)=== date?.day?
                   <Image source={play} resizeMode='contain' style={{height:10.37,width:10.91,
                   tintColor:  state === 'disabled' ? 'transparent':theme.colors.primary}} />:null}
                   {date.dateString===nt?
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={ellipse} resizeMode='contain' style={{height:10.37,width:10.91}} />
                   </View>:null}
                   {date.dateString===fert?
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={triangle} resizeMode='contain' style={{height:10.37,width:10.91}} />
                   </View>:null}
                {cal?.map( item=>
               (date.dateString===item.id? 
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={notes} resizeMode='contain' style={{height:10.37,width:10.91}} />
                   </View>:null
                   
                  ))
                  }
                   <TouchableOpacity
                   disabled={Relationship?.length>0?false:true}
                  onPress={()=>navis(uid,date.dateString)}
                   >
                  <Text style={{textAlign: 'center', color: state === 'disabled' ? 'transparent':marking?'tomato': '#383838',
                  fontFamily:Fonts.Poppins,fontSize:17,fontWeight:'400',
                  marginRight:date?.day===Number (cycle)?10:0,
                  }}>
                    {date.day}
                  </Text>
                  </TouchableOpacity>
                  
                </View>
    );
}}
/>
</View>
<Text style={{borderTopWidth:0.4,borderColor:'#DBD8D8',marginTop:10}}></Text>
    <View style={{flexDirection:'row',width:'90%',alignSelf:'center',justifyContent:"space-between",}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={circle} resizeMode='contain' style={{height:12,width:12}} />
      <Text style={{fontWeight:'400',fontSize:10,fontFamily:Fonts.Poppins,color:'black',marginLeft:5}}>{name}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={play} resizeMode='contain' style={{height:12,width:12}} />
      <Text style={{fontWeight:'400',fontSize:10,fontFamily:Fonts.Poppins,color:'black',marginLeft:5}}>Cycle</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={ellipse} resizeMode='contain' style={{height:12,width:7.47}} />
      <Text style={{fontWeight:'400',fontSize:10,fontFamily:Fonts.Poppins,color:'black',marginLeft:5}}>Ovulation</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={triangle} resizeMode='contain' style={{height:12,width:12}} />
      <Text style={{fontWeight:'400',fontSize:10,fontFamily:Fonts.Poppins,color:'black',marginLeft:5}}>Fertility</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={line} resizeMode='contain' style={{height:1,width:13}} />
      <Text style={{fontWeight:'400',fontSize:10,fontFamily:Fonts.Poppins,color:'black',marginLeft:5}}>Period</Text>
      </View>
    </View>
    </View>
  );
};

export default Calendars;