import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/BottomTab/HomeTab/Home/Home';
import EditProfile from '../screens/BottomTab/ProfileTab/EditProfile/EditProfile';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}>
      <Stack.Screen component={Home} name="Home" />
    </Stack.Navigator>
  );
};

export default HomeStack;