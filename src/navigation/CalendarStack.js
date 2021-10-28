import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Calendar from '../screens/BottomTab/CalendarTab/Calendar/Calendar';

const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}>
      <Stack.Screen component={Calendar} name="Calendar" />
     
    </Stack.Navigator>
  );
};

export default CalendarStack;