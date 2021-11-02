import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,FlatList,TouchableOpacity, Touchable
} from 'react-native';
import { Fonts } from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import {ellipse,notes,play,line,triangle,circle} from '../../../../assets';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import {Picker} from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign'
const Calendars = props => {
  const[Relationship,setRelationship]=useState([{id: 1, name: 'Wife'},
{id: 2, name: 'Girlfriend'},
{id: 3, name: 'Daughter'},
{id: 4, name: 'Family'},{id: 5, name: 'Friend'},
{id: 6, name: 'Other'},]);
const[items_count,setitems_count]=useState('');
const renderArrow = (direction) => {
  if(direction === 'left') {
      return <AntDesign name='left' size={18} color={'#C62252'}/>
  } else {
      return  <AntDesign name='right' size={18} color={'#C62252'}/>
  }
}
  return (
  <View style={{flex: 1, backgroundColor: 'white'}}>
    <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{borderBottomLeftRadius:15,borderBottomRightRadius:15,borderBottomWidth:0}}
        centerComponent={<HeaderCenterComponent name='Calendar'/>}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        />
         <View style={{flex:0.04}}></View>
         <View  style={{borderWidth:1,width:'90%',alignSelf:'center',
         borderColor:'#C62252', borderRadius: 10,padding:6}}>
         <Picker
         selectedValue={items_count}
            placeholder="Selecte No of Stores"
            style={{
              fontSize: 12,
              fontWeight: '600',paddingVertical: 10,
              borderWidth: 10,
              width: '100%',
              borderRadius: 10,
              backgroundColor:'white',
              color: 'black',alignSelf:'center',
            }}
            mode='dropdown'
            itemStyle={{
              height: 40,
              fontSize: 14,width:'10%',borderWidth:1
            }}
            dropdownIconColor='black'
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
          </View>
          <View style={{borderBottomWidth:0.4,borderColor:'#DBD8D8',marginTop:10}}>
            <Calendar
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
            dayComponent={({date, state}) => {
              return (
              <View >
                {
                   date.dateString==='2021-11-10'? 
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={ellipse} resizeMode='contain' style={{height:10.37,width:10.91}} />
                 <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : '#383838',
                 fontFamily:Fonts.Poppins,fontSize:17,fontWeight:'400'}}>
                   {date.day}
                   </Text>
                   </View>:
                   date.dateString==='2021-11-11'? 
                  <TouchableOpacity 
                  onPress={()=>props.navigation.navigate('ShowNote')}
                  style={{flexDirection:'row',alignItems:'center'}}>
                  <Image source={notes} resizeMode='contain' style={{height:10.37,width:10.91}} />
                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : '#383838',
                fontFamily:Fonts.Poppins,fontSize:17,fontWeight:'400'}}>
                  {date.day}
                  </Text>
                  </TouchableOpacity>:
                   date.dateString==='2021-11-15'? 
                   <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Image source={play} resizeMode='contain' style={{height:10.37,width:10.91}} />
                 <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : '#383838',
                 fontFamily:Fonts.Poppins,fontSize:17,fontWeight:'400'}}>
                   {date.day}
                   </Text>
                   </View>:
                  date.dateString==='2021-11-17'? 
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={line} resizeMode='contain' style={{height:25,width:10}} />
                  <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : '#383838',
                  fontFamily:Fonts.Poppins,fontSize:17,fontWeight:'400'}}>
                    {date.day}
                    </Text>
                    </View>:  date.dateString==='2021-11-22'? 
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={triangle} resizeMode='contain' style={{height:10.37,width:10.91}} />
                  <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : '#383838',
                  fontFamily:Fonts.Poppins,fontSize:17,fontWeight:'400'}}>
                    {date.day}
                    </Text>
                    </View>:
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Note')}>
                  <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : '#383838',
                  fontFamily:Fonts.Poppins,fontSize:17,fontWeight:'400'}}>
                    {date.day}
                  </Text>
                  </TouchableOpacity>
                  }
                </View>
    );
}}
/>
</View>
    <View style={{marginTop:25,flexDirection:'row',width:'90%',alignSelf:'center',justifyContent:"space-between"}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={circle} resizeMode='contain' style={{height:12,width:12}} />
      <Text style={{fontWeight:'400',fontSize:10,fontFamily:Fonts.Poppins,color:'black',marginLeft:5}}>Trackee 1</Text>
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