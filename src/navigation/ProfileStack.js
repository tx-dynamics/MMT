import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../screens/BottomTab/ProfileTab/Profile/Profile';
import EditProfile from '../screens/BottomTab/ProfileTab/EditProfile/EditProfile';
import UserName from '../screens/BottomTab/ProfileTab/EditProfile/UserName';
import Phone from '../screens/BottomTab/ProfileTab/EditProfile/Phone';
import Setting from '../screens/BottomTab/ProfileTab/Setting/Setting';
import Password from '../screens/BottomTab/ProfileTab/Setting/Password';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}>
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Screen component={EditProfile} name="EditProfile" />
      <Stack.Screen component={UserName} name="UserName" />
      <Stack.Screen component={Phone} name="Phone" />
      <Stack.Screen component={Setting} name="Setting" />
      <Stack.Screen component={Password} name="Password" />
    </Stack.Navigator>
  );
};

export default ProfileStack;