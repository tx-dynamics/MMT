import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import theme from '../../../../theme';
import {db} from '../../../../assets';
import {Fonts} from '../../../../utils/Fonts';
import {colors, Header} from 'react-native-elements';
import styles from './styles';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import PushNotification from 'react-native-push-notification';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';
import {color, set} from 'react-native-reanimated';
const Home = props => {
  const [trakeeList, settrakeeList] = useState([]);
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const [length, setlength] = useState(1);
  const [modalVisible, setmodalVisible] = useState(false);
  const [onPeriod, setonPeriod] = useState(false);
  const [itemes, setitemes] = useState();
  const [Name, setName] = useState();
  const [loading, setloading] = useState(false);
  const [trakeeloader, settrakeeloader] = useState(true);
  const [currentWeek, setCurrentWeek] = useState([]);
  const generateCurrentWeek = () => {
    const currentDate = moment();
    const weekStart = currentDate.clone().startOf('week');
    const weekEnd = currentDate.clone().endOf('week');

    const days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format('DD/MM/YYYY'));
    }
    // console.log('=>>', days);
    setCurrentWeek(days);
  };
  useEffect(() => {
    settrakeeloader(true);
    generateCurrentWeek();
    settrakeeList([]);
    getTrakee().then(() => {
      settrakeeloader(false);
    });

    handleNotification();
  }, [isFocused]);

  const handleNotification = () => {
    // PushNotification.cancelAllLocalNotifications();

    // PushNotification.localNotification({
    //     channelId: "mmt",
    //     title: "You clicked on " + item,
    //     message: 'item.city',
    //     bigText:' item.city' + " is one of the largest and most beatiful cities in " + item,
    //     color: "red",
    //     id: index
    // });

    const ndate = new Date().toJSON();
    trakeeList.map(items => {
      // console.log(moment(items.lastDate));
      if (moment(items.lastDate).format('yy/MM/DD') === new Date(Date.now())) {
        // console.log('hwew', items.lastDate);
        PushNotification.localNotificationSchedule({
          channelId: 'mmt',
          title: 'Period Notification',
          message: 'Your trakee ' + items.name + ' period starts',
          date: new Date(items.lastDate),
          allowWhileIdle: true,
        });
      } else {
        console.log('not');
      }
    });
    // PushNotification.localNotificationSchedule({
    //     channelId: "mmt",
    //     title: "Period Notification",
    //     message: "Your trakee "+item.name+" period starts",
    //     date: new Date(item.lastDate),
    //     allowWhileIdle: true,
    // });
  };
  async function getTrakee() {
    console.log('getTrakee', auth().currentUser.uid);
    settrakeeList([]);
    const data = database().ref('trakees/' + auth().currentUser.uid + '/');
    const userdataNAme = database().ref('users/' + auth().currentUser.uid);
    userdataNAme.on('value', userdata => {
      if (userdata.val()?.fName && userdata.val()?.lName) {
        setName(userdata.val().fName + ' ' + userdata.val().lName);
      }
    });
    var arr = [];
    data.on('value', childern => {
      childern.forEach((item, index) => {
        const dat = item?.val();
        arr.push({
          id: item.key,
          name: dat?.Name,
          cycle: dat?.cycle,
          dp: dat?.dp,
          item_count: dat?.items_count,
          lastDate:
            new Date(dat?.lastDate).getMonth() < new Date().getMonth()
              ? moment(dat?.lastDate).add(30, 'days')
              : dat?.lastDate,
          endDate:
            new Date(dat?.lastDate).getMonth() < new Date().getMonth()
              ? moment(moment(dat?.lastDate).add(30, 'days')).add(7, 'days')
              : moment(dat?.lastDate).add(7, 'days'),
          ismute: dat?.ismute ? true : false,
          date: dat?.lastDate,
        });
        settrakeeList(arr);
        setlength(arr?.length);
      });
    });

    // handleNotification();
  }
  const ontrakeeShow = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setitemes(item), setonPeriod(!onPeriod);
      }}
      style={styles.flatliststyle}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFF2F6',
          borderRadius: 11,
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          paddingVertical: 13,
        }}>
        <View style={{width: '30%'}}>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: Fonts.Poppins,
              fontSize: 13,
              marginLeft: 15,
              color: '#383838',
            }}>
            {item.name}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', width: '70%', alignItems: 'center'}}>
          <Text style={{fontWeight: '700', color: 'black'}}>Start: </Text>
          <Text style={{fontWeight: '400', color: '#898989', fontSize: 12}}>
            {moment(item.lastDate).format('DD/MM/yy')}
          </Text>
          <Text style={{marginLeft: 10, fontWeight: '700', color: 'black'}}>
            End:{' '}
          </Text>
          <Text style={{fontWeight: '400', color: '#898989', fontSize: 12}}>
            {moment(item.endDate).format('DD/MM/yy')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const trakeelist = ({item, index}) => (
    <TouchableOpacity
      onPress={() => (
        setmodalVisible(false),
        navigation.navigate('Trakee', {
          screen: 'TrakeeProfile',
          params: {data: item},
        })
      )}
      style={styles.Trakeeliststyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          paddingHorizontal: 5,
        }}>
        <Image
          source={item.dp ? {uri: item.dp} : db}
          style={{height: 33, width: 33, borderRadius: 16}}
        />
        <Text
          numberOfLines={1}
          style={{
            fontWeight: '400',
            fontFamily: Fonts.Poppins,
            fontSize: 13,
            marginLeft: 15,
            color: '#383838',
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  function updateTrakee() {
    const uid = auth()?.currentUser?.uid;
    const date = new Date(moment(itemes?.lastDate).add(7, 'days')).toJSON();
    // console.log(itemes);
    // return
    const data = database().ref(
      'trakees/' + auth().currentUser.uid + '/' + itemes?.id + '/',
    );
    const dat = {
      name: itemes?.Name,
      cycle: itemes?.cycle,
      dp: itemes?.dp,
      item_count: itemes?.items_count,
      lastDate: date,
    };
    data.update(dat);
    setloading(false);
    setonPeriod(!onPeriod);
    settrakeeloader(false);
    getTrakee();
  }
  async function upTrakee() {
    const uid = auth()?.currentUser?.uid;
    // console.log(itemes);
    // return
    const data = database().ref(
      'trakees/' + auth().currentUser.uid + '/' + itemes?.id + '/',
    );
    const dat = {
      name: itemes?.Name,
      cycle: itemes?.cycle,
      dp: itemes?.dp,
      item_count: itemes?.items_count,
      ismute: !itemes?.ismute,
    };
    data.update(dat);
    setonPeriod(!onPeriod);
    settrakeeList([]);
    getTrakee();
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomWidth: 0,
        }}
        centerComponent={<HeaderCenterComponent name="MMT" />}
        rightComponent={
          <TouchableOpacity
            onPress={() => setmodalVisible(true)}
            style={{flexDirection: 'row', top: 10, alignItems: 'center'}}>
            {trakeeList.length > 0 ? (
              <>
                <Image
                  source={trakeeList[0]?.dp ? {uri: trakeeList[0]?.dp} : db}
                  style={{width: 22, height: 22, borderRadius: 11}}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    fontFamily: Fonts.Roboto,
                    color: 'white',
                    marginLeft: 2,
                  }}>{`+${length}`}</Text>
              </>
            ) : null}
          </TouchableOpacity>
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setmodalVisible(!modalVisible)}
          style={{height: '100%', backgroundColor: 'rgba(64, 77, 97, 0.5)'}}>
          <Text style={{marginTop: 20}}></Text>
          <View
            style={{
              flex: 0.3,
              backgroundColor: 'white',
              width: '50%',
              alignSelf: 'center',
              top: 20,
              borderRadius: 5,
            }}>
            <FlatList
              style={{marginTop: 10, width: '90%', alignSelf: 'center'}}
              showsVerticalScrollIndicator={false}
              data={trakeeList}
              renderItem={trakeelist}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={onPeriod}
        onRequestClose={() => {
          setonPeriod(!onPeriod);
        }}>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            // backgroundColor:'lightgrey',
            opacity: 1,
          }}>
          <View
            style={{
              backgroundColor: 'lightgrey',
              alignItems: 'center',
              width: '80%',
              borderRadius: 30,
              alignSelf: 'center',
              height: Dimensions.get('window').height / 5,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'flex-end',
                width: '95%',
                alignSelf: 'center',
              }}
              onPress={() => {
                setonPeriod(!onPeriod);
              }}>
              <Entypo name="cross" size={30} color={'black'} />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: 'white',
                height: '80.5%',
                width: '98%',
                borderRadius: 30,
              }}>
              <View style={{marginTop: 10, alignSelf: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>{`Is Your Trakee ${itemes?.name} Period Stars?`}</Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    upTrakee(), settrakeeloader(true), settrakeeList([]);
                  }}
                  style={{
                    marginTop: 10,
                    alignSelf: 'center',
                    width: '40%',
                    backgroundColor: theme.colors.primary,
                    paddingVertical: 10,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    updateTrakee(), settrakeeList([]), settrakeeloader(true);
                  }}
                  style={{
                    marginTop: 10,
                    alignSelf: 'center',
                    width: '40%',
                    backgroundColor: theme.colors.primary,
                    paddingVertical: 10,
                    borderRadius: 20,
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
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      No
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{marginTop: 20, width: '90%', alignSelf: 'center'}}>
        <Text
          style={{
            fontWeight: '700',
            fontFamily: Fonts.Poppins,
            fontSize: 17,
            color: theme.colors.primary,
          }}>{`Hi ${Name ? Name : 'Loading..'},`}</Text>
        <Text
          style={{
            fontWeight: '400',
            fontFamily: Fonts.Poppins,
            fontSize: 13,
            color: '#383838',
          }}>
          Here is your trackee’s cycle
        </Text>
      </View>

      <View style={{flex: 0.9}}>
        {trakeeloader ? (
          <ActivityIndicator
            animating
            size={50}
            color={theme.colors.primary}
            style={{
              color: theme.colors.primary,
              position: 'absolute',
              bottom: Dimensions.get('window').height / 3,
              alignSelf: 'center',
            }}
          />
        ) : (
          // <FlatList
          //   style={{
          //     marginTop: 20,
          //     width: '90%',
          //     alignSelf: 'center',
          //     marginBottom: 10,
          //     flex: 1,
          //   }}
          //   showsVerticalScrollIndicator={false}
          //   data={trakeeList}
          //   renderItem={ontrakeeShow}
          // />
          // calendarIcon
          <View style={_styles.containerMiddle}>
            {/* Date */}
            <View style={_styles.Date}>
              <Image
                source={require('../../../../assets/images/calendarIcon.png')}
                resizeMode={'contain'}
                style={{width: '4%', height: '100%'}}
              />
              <Text style={_styles.todayText}>Today</Text>
            </View>
            <Text style={_styles.momentDate}>{`${moment(new Date()).format(
              'DD, MMM YYYY',
            )}`}</Text>
            {trakeeList.map((item, index) => {
              const cDate = moment(item.date).format('DD/MM/YYYY');
              const Today = moment(new Date()).format('DD/MM/YYYY');
              const _thisItemDate = currentWeek.indexOf(cDate);
              // console.log(__Da);

              if (_thisItemDate == -1) return;

              // console.log(item.date);
              // console.log(
              //   'trakeeList.map',
              //   index,
              //   currentWeek,
              //   moment(item.date).format('DD/MM/YYYY'),
              // );
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '5%',
                  }}>
                  <Text style={_styles.userText}>
                    {item.name.substring(0, 8)}
                  </Text>
                  <View style={_styles.line}>
                    <Image
                      source={require('../../../../assets/images/play.png')}
                      resizeMode={'contain'}
                      style={{
                        width: 14,
                        height: 14,
                        position: 'absolute',
                        top: Dimensions.get('window').height * -0.011,
                        left:
                          Dimensions.get('window').width * 0.04 +
                          Dimensions.get('window').width *
                            0.113 *
                            _thisItemDate,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: theme.colors.primary,
                        width: Dimensions.get('window').width * 0.111 * 5,
                        height: 5,
                        top: Dimensions.get('window').height * -0.004,
                        left:
                          Dimensions.get('window').width * 0.08 +
                          Dimensions.get('window').width *
                            0.113 *
                            _thisItemDate,

                        borderRadius: 10,
                      }}></View>

                    {cDate == Today ? (
                      <View
                        style={{
                          borderColor: theme.colors.p1,
                          width: 0.1,
                          borderWidth: 1,
                          height: Dimensions.get('window').height * 0.05,
                          borderStyle: 'dashed',
                          marginLeft:
                            Dimensions.get('window').width * 0.055 +
                            Dimensions.get('window').width *
                              0.113 *
                              _thisItemDate,
                        }}
                      />
                    ) : null}
                  </View>
                </View>
              );
            })}

            {/* bottomDates */}
            {trakeeList.length != 0 ? (
              <View style={_styles.bottomDates}>
                {currentWeek.map((item, index) => (
                  <View
                    style={[
                      _styles.dateCircle,
                      {
                        backgroundColor:
                          item == moment(new Date()).format('DD/MM/YYYY')
                            ? theme.colors.primary
                            : '#B1B1B1',
                      },
                    ]}>
                    <Text style={_styles.dateCircleText}>
                      {item.substring(0, 2)}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            {/* No Trakee Added*/}
            {trakeeList.length == 0 ? (
              <Image
                source={require('../../../../assets/images/AddUser.png')}
                style={{
                  width: '100%',
                  height: Dimensions.get('window').height * 0.35,
                }}
                resizeMode={'contain'}
              />
            ) : null}
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Trakee', {screen: 'TrakeeName'})}
        style={{
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          position: 'absolute',
          bottom: 10,
          backgroundColor: theme.colors.p1,
          paddingVertical: 15,
        }}>
        <Text
          style={{
            fontSize: 17,
            fontFamily: Fonts.Poppins,
            fontWeight: '500',
            textAlign: 'center',
            color: 'white',
          }}>
          Add Trackee
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const _styles = StyleSheet.create({
  Date: {
    marginLeft: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayText: {
    fontSize: 16,
    fontFamily: Fonts.Poppins,
    fontWeight: '700',
    color: '#000000',
    marginLeft: '2%',
  },
  containerMiddle: {
    backgroundColor: '#fff0f4',
    // height: '50%',
    marginTop: '5%',
    paddingVertical: 10,
  },
  momentDate: {
    fontSize: 10,
    fontFamily: Fonts.Poppins,
    fontWeight: '400',
    color: '#000000',
    marginLeft: '10%',
    marginBottom: '5%',
  },
  line: {
    backgroundColor: theme.colors.s2,
    height: 3,
    width: '100%',
  },
  userText: {
    fontSize: 12,
    fontFamily: Fonts.Poppins,
    fontWeight: '400',
    color: '#000000',
    // marginLeft: '10%',
    width: '15%',
    marginLeft: '5%',
  },
  bottomDates: {
    // backgroundColor: 'red',
    // height: 100,
    flexDirection: 'row',
    marginLeft: '20%',
    justifyContent: 'space-around',
  },
  dateCircle: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  dateCircleText: {
    fontSize: 12,
    fontFamily: Fonts.Poppins,
    fontWeight: '400',
    color: 'white',
  },
});
