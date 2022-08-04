import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import theme from '../../../theme';
import {Picker} from '@react-native-picker/picker';
import {Fonts} from '../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../components/HeaderCenterComponent';
import HeaderLeftComponent from '../../../components/HeaderLeftComponent';
import Snackbar from 'react-native-snackbar';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const Relationship = props => {
  const [items_count, setitems_count] = useState(1);
  const [loading, setloading] = useState(false);
  const [Relationship, setRelationship] = useState([
    {id: 1, name: 'Wife'},
    {id: 2, name: 'Girlfriend'},
    {id: 3, name: 'Daughter'},
    {id: 4, name: 'Family'},
    {id: 5, name: 'Friend'},
    {id: 6, name: 'Other'},
  ]);
  useEffect(() => {
    const item = props?.route?.params?.item_count;
    setitems_count(item);
  }, []);
  async function onRelation() {
    const id = props.route.params.key;
    const data = database().ref(
      'trakees/' + auth().currentUser?.uid + '/' + id + '',
    );
    data.update({
      items_count,
    });
    setTimeout(() => {
      setloading(false);
      props.navigation.navigate('Root', {screen: 'Home'});
      Snackbar.show({
        text: 'Trakee Relation Updated',
        backgroundColor: theme.colors.primary,
        duration: Snackbar.LENGTH_LONG,
      });
    }, 400);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={Platform.OS === 'ios' ? true : false}
      keyboardVerticalOffset={-60}
      style={{flex: 1, backgroundColor: theme.colors.p1}}>
      <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomWidth: 0,
        }}
        centerComponent={<HeaderCenterComponent name="Relationship" />}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
      />
      <View style={{flex: 0.05}}></View>
      <Text
        style={{
          fontFamily: Fonts.Roboto,
          fontSize: 15,
          width: '90%',
          alignSelf: 'center',
          fontWeight: '300',
          color: '#F3A3BC',
        }}>
        You can change your Trackee Relationship here
      </Text>
      <View style={{flex: 0.03}}></View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          borderWidth: 1,
          borderColor: '#ED6877',
        }}>
        <Picker
          selectedValue={items_count}
          placeholder="Selecte No of Stores"
          style={{
            fontSize: 12,
            fontWeight: '600',
            paddingVertical: 10,
            borderWidth: 10,
            width: '100%',
            borderRadius: 10,
            backgroundColor: theme.colors.p1,
            //color:'white'
            color: 'white',
            alignSelf: 'center',
          }}
          mode="dropdown"
          itemStyle={{
            height: 40,
            fontSize: 14,
            width: '10%',
          }}
          dropdownIconColor="#FFB5CC"
          onValueChange={(itemValue, itemIndex) => {
            setitems_count(itemValue), console.log(itemValue);
          }}>
          {Relationship &&
            Relationship.map((item, index) => {
              switch (item.id) {
                case 1:
                  return (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.id}
                      style={{
                        fontFamily: Fonts.Poppins,
                        fontSize: 15,
                        fontWeight: '300',
                      }}
                      backgroundColor={'white'}
                    />
                  );
                default:
                  return (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.id}
                      backgroundColor={'white'}
                    />
                  );
              }
            })}
        </Picker>
      </View>
      <View style={{flex: 0.1}}></View>
      <TouchableOpacity
        onPress={() => {
          onRelation(), setloading(true);
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
            Save
          </Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Relationship;
