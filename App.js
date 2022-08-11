import React, {useEffect} from 'react';
import AppNav from './src/navigation/AppNav';
import {View, YellowBox, SafeAreaView} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import PushNotification from 'react-native-push-notification';

YellowBox.ignoreWarnings(['']);
const App = () => {
  Orientation.lockToPortrait();

  useEffect(() => {
    console.log('App');
    PushNotification.cancelAllLocalNotifications();
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppNav />
    </SafeAreaView>
  );
};
export default App;
