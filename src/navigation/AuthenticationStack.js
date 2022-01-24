import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import Signin from '../screens/Signin';
import Splash from '../screens/Splash';
import Info from '../screens/Info/Info';
import ForgetPass from '../screens/ForgetPass';
const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}>
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={Info} name="info" />
       <Stack.Screen component={Signin} name="Signin" /> 
      <Stack.Screen component={SignupScreen} name="Signup" />
      <Stack.Screen component={ForgetPass} name="Forget" />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
