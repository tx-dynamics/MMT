import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Calendar from '../screens/BottomTab/CalendarTab/Calendar/Calendar';
import AddNote from '../screens/BottomTab/CalendarTab/AddNote/AddNote';
import ShowNotes from '../screens/BottomTab/CalendarTab/ShowNotes/ShowNotes';

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
      <Stack.Screen component={AddNote} name="Note" />
      <Stack.Screen component={ShowNotes} name="ShowNote" />
    </Stack.Navigator>
  );
};

export default CalendarStack;