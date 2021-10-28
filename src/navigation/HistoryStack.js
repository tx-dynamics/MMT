import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import History from '../screens/BottomTab/HistoryTab/History/History';

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="History"
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}>
      <Stack.Screen component={History} name="History" />
     
    </Stack.Navigator>
  );
};

export default HistoryStack;