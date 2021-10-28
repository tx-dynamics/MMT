/* eslint-disable prettier/prettier */
import React, {useEffect,} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthenticationStack from './AuthenticationStack';
import Trakee from './TrakeeStack';
import BottomTabNavigator from './BottomTab';
const Stack = createStackNavigator();
function AppNav({}) {
  let initial = 'Root';

  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial}>
        <Stack.Screen
          name="Auth"
          component={AuthenticationStack}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Trakee"
          component={Trakee}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="Root" options={{headerShown: false}} component={BottomTabNavigator}/>
          {/* {props => <BottomTabNavigator {...props} />} */}
        {/* </Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNav;
