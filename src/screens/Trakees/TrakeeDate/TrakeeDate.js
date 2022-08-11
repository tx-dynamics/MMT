import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import theme from '../../../theme';
import {heart} from '../../../assets';
import styles from '../../PhoneNumber/styles';
import DatePicker from 'react-native-date-picker';
import {Fonts} from '../../../utils/Fonts';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const TrakeeDate = props => {
  const [date, setDate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const [pdate, setpDate] = useState(new Date());

  useEffect(() => {
    console.log('TrakeeDate useEffect', props.route.params.Cycle);
  }, []);

  async function startDate() {
    const {key, Cycle} = props.route.params;

    console.log('=>', date, key);

    const data = database().ref(
      'trakees/' + auth().currentUser?.uid + '/' + key + '/',
    );
    data.update({
      lastDate: moment(date).add(Cycle, 'days').toJSON(),
    });
    setTimeout(() => {
      setloading(false);
      props.navigation.navigate('Root', {screen: 'Home'});
      Snackbar.show({
        text: 'Trakee Date Added',
        backgroundColor: theme.colors.primary,
        duration: Snackbar.LENGTH_LONG,
      });
    }, 1000);
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={Platform.OS === 'ios' ? true : false}
      keyboardVerticalOffset={-60}
      style={{flex: 1, backgroundColor: theme.colors.p1}}>
      <Image
        source={heart}
        style={{
          height: Dimensions.get('window').height / 3.5,
          width: 171,
          alignSelf: 'center',
          marginTop: 10,
        }}
      />
      <Text style={[styles.title]}>{'Enter Trackee Last Start \nDate'}</Text>
      <Text style={[styles.smalltitle]}>
        Enter your trackee last start date
      </Text>
      <View>
        <TouchableOpacity
          style={[
            styles.InputContainer,
            {marginTop: 30, flexDirection: 'row', alignItems: 'center'},
          ]}>
          <TextInput
            style={{width: '70%'}}
            value={moment(date).format('DD MMM, YYYY')}
            placeholderTextColor={theme.colors.s2}
            underlineColorAndroid="transparent"
            editable={false}
            placeholder="09 May 1998"
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.05}}></View>
      <DatePicker
        mode="date"
        textColor="white"
        fadeToColor="white"
        androidVariant="nativeAndroid"
        date={pdate}
        maximumDate={new Date()}
        minimumDate={moment(new Date()).subtract(
          props.route.params.Cycle,
          'days',
        )}
        style={{alignSelf: 'center'}}
        onDateChange={txt => {
          setDate(txt), setpDate(txt);
        }}
      />
      <View style={{flex: 0.1}}></View>
      <TouchableOpacity
        onPress={() => {
          startDate(), setloading(true);
        }}
        style={{
          borderColor: '#FFB5CC',
          borderWidth: 1,
          backgroundColor: theme.colors.primary,
          marginTop: 10,
          width: '30%',
          alignSelf: 'center',
          alignItems: 'center',
          padding: 13,
          borderRadius: 10,
        }}>
        {loading ? (
          <ActivityIndicator
            animating
            color={'white'}
            style={{
              color: 'white',
              textAlign: 'center',
            }}
          />
        ) : (
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: Fonts.Poppins,
              fontSize: 17,
            }}>
            Done
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default TrakeeDate;
