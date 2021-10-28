import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneNumber from '../screens/PhoneNumber';
import DOB from '../screens/DOB/DOB';
import Setup from '../screens/Setup/Setup';
import TrakeeName from '../screens/Trakees/TrakeeName/TrakeeName';
import TrakeePic from '../screens/Trakees/TrakeePic/TrakeePic';
import TrakeeRelationship from '../screens/Trakees/TrakeeRelationship/TrakeeRelationship';
import TrakeeDate from '../screens/Trakees/TrakeeDate/TrakeeDate';
import TrakeePeriodCycle from '../screens/Trakees/TrakeePeriodCycle/TrakeePeriodCycle';
import Profile from '../screens/Trakees/Profile/Profile';
import Relationship from '../screens/Trakees/Relationship/Relationship';
import PeriodCycle from '../screens/Trakees/PeriodCycle/PeriodCycle';

const Stack = createStackNavigator();

const Trakee = () => {
  return (
    <Stack.Navigator
      initialRouteName="Phone"
      screenOptions={{
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}>
      <Stack.Screen component={PhoneNumber} name="Phone" />
      <Stack.Screen component={DOB} name="DOB" />
      <Stack.Screen component={Setup} name="Setup" />
      <Stack.Screen component={TrakeeName} name="TrakeeName" />
      <Stack.Screen component={TrakeePic} name="TrakeePic" />
      <Stack.Screen component={TrakeeRelationship} name="TrakeeRelationship" />
      <Stack.Screen component={TrakeeDate} name="TrakeeDate" />
      <Stack.Screen component={TrakeePeriodCycle} name="TrakeeCycle" />
      <Stack.Screen component={Profile} name="TrakeeProfile" />
      <Stack.Screen component={Relationship} name="Relationship" />
      <Stack.Screen component={PeriodCycle} name="PeriodCycle" />
    </Stack.Navigator>
  );
};

export default Trakee;