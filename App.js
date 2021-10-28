import React from 'react';
import AppNav from './src/navigation/AppNav';
import {View, YellowBox,SafeAreaView} from 'react-native';
import Orientation from "react-native-orientation-locker";
YellowBox.ignoreWarnings(['']);
const App = () => {
  Orientation.lockToPortrait();
  return (
  <SafeAreaView style={{flex:1}}>
    <AppNav />
  </SafeAreaView>
  );
};
export default App;