import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import theme from '../theme';
import {createStackNavigator} from '@react-navigation/stack';
import {calender,calenderD,homeD,home,signal,signalD,profile,profileD} from '../assets';
import {Alert,Image} from 'react-native';
//Stack
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import CalendarStack from './CalendarStack';
import HistoryStack from './HistoryStack';
//
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

function BottomTabNavigator({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      activeColor={theme.colors.primary}
      inactiveColor={'#E1E1E1'}
      backBehavior="initialRoute"
      // labeled={false}
      tabBarOptions={{
        activeBackgroundColor:theme.colors.p1,borderTopLeftRadius: 25,borderTopRightRadius: 25,elevation: 10,
      }}
      barStyle={{backgroundColor: 'white',}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          // tabBarColor:'rgba(78, 115, 248, 0.08)',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image source ={home} resizeMode='contain' style={{width:23.98,height:26,tintColor:color}}  />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({color}) => (
            <Image source ={calender}resizeMode='contain' style={{width:23.98,height:26,tintColor:color}}  />

          ),
        }}
      />
      <Tab.Screen
        name="Hisotry"
        component={HistoryStack}
        options={{
          tabBarLabel: 'Hisotry',
          tabBarIcon: ({color}) => (
            <Image source ={signal} resizeMode='contain' style={{width:23.98,height:26,tintColor:color}}  />

          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <Image source ={profile} resizeMode='contain' style={{width:23.98,height:26,tintColor:color}}  />

          ),
        }}
      />
     
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
