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
import theme from '../../theme';
import {heart} from '../../assets';
import styles from '../PhoneNumber/styles';
import DatePicker from 'react-native-date-picker';
import {Fonts} from '../../utils/Fonts';
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';
const DOB = props => {
  const [date, setDate] = useState(new Date(moment().subtract(32, 'years')));
  const [loading, setloading] = useState(false);
  async function onDob() {
    console.log(date.toJSON());

    const data = {dob: date.toJSON()};
    const up = database().ref('users/' + auth().currentUser?.uid + '/');
    await up
      .update(data)
      .then(() => {
        setloading(false);
        props.navigation.navigate('Setup');
        Snackbar.show({
          text: 'Date of Birth Added',
          backgroundColor: theme.colors.primary,
          duration: Snackbar.LENGTH_LONG,
        });
      })
      .catch(err => {
        setloading(false);
        Snackbar.show({
          text: err.message,
          backgroundColor: theme.colors.s2,
        });
      });
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
          height: 240,
          width: 171,
          alignSelf: 'center',
          marginTop: 10,
        }}
      />
      <Text style={[styles.title]}>Add Your Date of Birth</Text>
      <Text style={[styles.smalltitle]}>Enter date of birth to continue</Text>
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
      <View style={{flex: 0.1}}></View>
      <DatePicker
        mode="date"
        textColor="white"
        fadeToColor="white"
        androidVariant="nativeAndroid"
        //minimumDate={moment().subtract(1, 'years')}
        maximumDate={moment().subtract(18, 'years').toDate()}
        date={date}
        style={{alignSelf: 'center'}}
        onDateChange={txt => {
          setDate(txt), console.log(txt);
        }}
      />
      <View style={{flex: 0.15}}></View>
      <TouchableOpacity
        // onPress={()=>props.navigation.navigate('Setup')}
        onPress={() => {
          onDob(), setloading(true);
        }}
        style={{
          borderColor: '#FFB5CC',
          borderWidth: 1,
          backgroundColor: theme.colors.primary,
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
            Next
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default DOB;
