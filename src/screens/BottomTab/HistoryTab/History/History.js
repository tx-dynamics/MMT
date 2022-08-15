import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {db, online} from '../../../../assets';
import {Fonts} from '../../../../utils/Fonts';
import {Header} from 'react-native-elements';
import HeaderCenterComponent from '../../../../components/HeaderCenterComponent';
import theme from '../../../../theme';
import {heart} from '../../../../assets';
import HeaderLeftComponent from '../../../../components/HeaderLeftComponent';
import HeaderRight from '../../../../components/HeaderRight';
//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
const History = props => {
  const isFocused = useIsFocused();
  const [trakee, settrakee] = useState([]);
  const [stats, setstats] = useState([]);
  const [show, setshow] = useState(false);
  const [cl, setcl] = useState('');
  const [povl, setov] = useState('');
  const [preuid, setpreuid] = useState('');
  const [nexuid, setnextuid] = useState('');
  useEffect(() => {
    settrakee([]);
    getTrakee();
  }, [isFocused]);
  async function getTrakee() {
    const data = database().ref('trakees/' + auth().currentUser.uid + '/');
    let arr = [];
    data.on('value', childern => {
      childern.forEach((item, index) => {
        const dat = item?.val();
        arr.push({
          id: dat?.items_count,
          uid: item.key,
          name: dat?.Name,
          cycleLength: dat.cycle,
          visible: index === 0 ? true : false,
          periodLength: '05',
          lastDate: moment(dat?.lastDate).add('days', dat.cycle),
          date: dat?.lastDate,
          enddate: moment(dat?.lastDate).add('days', 5),
        });
      });
      settrakee(arr);
      // console.log(arr);
      let st = [];
      if (arr.length > 0) {
        st.push({
          id: arr[0]?.id,
          uid: arr[0]?.uid,
          name: arr[0]?.name,
          cycleLength: arr[0]?.cycleLength,
          periodLength: '05',
          lastDate: arr[0]?.lastDate,
          date: arr[0]?.date,
          enddate: arr[0]?.enddate,
        });
        console.log(st);
        setcl(arr[0]?.cycleLength);
        setpreuid(arr[0]?.uid);
        setstats(st);
      }
    });
  }
  const trakeelist = ({item, index}) => (
    <TouchableOpacity
      onPress={() => handleSelect(item, index)}
      style={{marginLeft: 15, flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#EBFFFE',
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}>
        <Text
          style={{
            fontWeight: '400',
            fontFamily: Fonts.Poppins,
            fontSize: 11,
            color: '#00978F',
            alignSelf: 'center',
          }}>
          {item.name}
        </Text>
      </View>
      {item.visible && (
        <Image
          source={online}
          style={{
            height: 10,
            width: 10,
            color: '#00FF29',
            borderRadius: 5,
            right: 10,
          }}
        />
      )}
    </TouchableOpacity>
  );
  const statics = ({item, index}) => (
    <View
      key={index}
      style={{width: '90%', alignSelf: 'center', marginTop: 15}}>
      <Text
        style={{
          fontFamily: Fonts.Poppins,
          fontsize: 17,
          fontWeight: '500',
          color: '#ED6877',
          marginTop: 5,
        }}>{`${moment(item.date).format('D MMM')} - ${moment(
        item.enddate,
      ).format('D MMM')}`}</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '30%',
            borderRightWidth: 0.5,
            borderColor: '#DBD8D8',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins,
              fontsize: 13,
              fontWeight: '400',
              color: 'black',
            }}>
            Period Starts
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontsize: 11,
                fontWeight: '400',
                color: '#BEBEBE',
                textAlign: 'center',
              }}>
              {moment(item.date).format('D MMM')}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '30%',
            alignItems: 'center',
            borderRightWidth: 0.5,
            borderColor: '#DBD8D8',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins,
              fontsize: 13,
              fontWeight: '400',
              color: 'black',
            }}>
            Ovulation
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontsize: 11,
                fontWeight: '400',
                color: '#BEBEBE',
                textAlign: 'center',
              }}>
              {moment(item.lastDate).format('D MMM')}
            </Text>
          </View>
        </View>
        <View style={{width: '30%', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: Fonts.Poppins,
              fontsize: 13,
              fontWeight: '400',
              color: 'black',
            }}>
            Period Length
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontsize: 11,
                fontWeight: '400',
                color: '#BEBEBE',
                textAlign: 'center',
              }}>
              5 days
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
  const handleSelect = (item, index) => {
    console.log('items', item, '\n', preuid, '\n', index);

    let newArr = trakee.map(elem => {
      if (elem.uid === preuid) {
        return {...elem, visible: false};
      } else if (elem.uid === item.uid) {
        let arr = [];
        arr.push({
          id: trakee[index]?.id,
          uid: trakee[index]?.uid,
          name: trakee[index]?.name,
          cycleLength: trakee[index]?.cycleLength,
          periodLength: '05',
          lastDate: trakee[index]?.lastDate,
          date: trakee[index]?.date,
          enddate: trakee[index]?.enddate,
        });
        console.log('here', arr);
        setcl(trakee[index]?.cycleLength);
        setstats(arr);
        setpreuid(item.uid);
        return {...elem, visible: true};
      } else {
        return {...elem, visible: false};
      }
    });
    console.log('newArr', newArr);
    settrakee(newArr);
    // this.setState({items: newArr});
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor={theme.colors.p1}
        containerStyle={{
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomWidth: 0,
        }}
        centerComponent={<HeaderCenterComponent name="History" />}
        leftComponent={<HeaderLeftComponent navigation={props.navigation} />}
        // rightComponent={<HeaderRight txt={show?'':'Delete'} onPress={()=>setshow(true)} />}
      />
      {trakee.length > 0 ? (
        <>
          <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
            <Text
              style={{
                fontFamily: Fonts.Poppins,
                fontsize: 17,
                fontWeight: '700',
                color: '#C62252',
              }}>
              Trackee Name
            </Text>
            <FlatList
              horizontal={true}
              style={{marginTop: 10, width: '100%', alignSelf: 'center'}}
              showsHorizontalScrollIndicator={false}
              data={trakee}
              renderItem={trakeelist}
            />
          </View>
          <Text
            style={{
              fontFamily: Fonts.Poppins,
              fontsize: 17,
              fontWeight: '700',
              color: '#C62252',
              marginTop: 25,
              width: '90%',
              alignSelf: 'center',
            }}>
            Average
          </Text>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                padding: 15,
                elevation: 5,
                borderRadius: 6,
                shadowColor: '#000',
                backgroundColor: '#fff',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins,
                  fontsize: 13,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Period Length
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins,
                    fontsize: 15,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  05
                </Text>
                <Text
                  style={{
                    fontsize: 9,
                    fontWeight: '400',
                    color: '#BEBEBE',
                    marginLeft: 5,
                    top: 1,
                  }}>
                  Days
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                elevation: 5,
                borderRadius: 6,
                shadowColor: '#000',
                backgroundColor: '#fff',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                marginLeft: 5,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins,
                  fontsize: 13,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Ovulation
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins,
                    fontsize: 15,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  06
                </Text>
                <Text
                  style={{
                    fontsize: 9,
                    fontWeight: '400',
                    color: '#BEBEBE',
                    marginLeft: 5,
                    top: 1,
                  }}>
                  Days
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 15,
                elevation: 5,
                borderRadius: 6,
                shadowColor: '#000',
                backgroundColor: '#fff',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                marginLeft: 5,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins,
                  fontsize: 13,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Cycle Length
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins,
                    fontsize: 15,
                    fontWeight: '700',
                    color: 'black',
                  }}>
                  {cl}
                </Text>
                <Text
                  style={{
                    fontsize: 9,
                    fontWeight: '400',
                    color: '#BEBEBE',
                    marginLeft: 5,
                    top: 1,
                  }}>
                  Days
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              borderTopWidth: 0.4,
              marginTop: 30,
              borderColor: '#DBD8D8',
            }}></Text>
          <Text
            style={{
              fontFamily: Fonts.Poppins,
              fontsize: 17,
              fontWeight: '700',
              color: '#C62252',
              marginTop: 15,
              width: '90%',
              alignSelf: 'center',
            }}>
            Statistics
          </Text>
          <View style={{flex: 1}}>
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
              }}
              keyExtractor={item => item._id}
              style={{width: '95%', alignSelf: 'center'}}
              showsVerticalScrollIndicator={false}
              data={stats}
              renderItem={statics}
            />
          </View>
        </>
      ) : (
        <View style={{justifyContent: 'center', flex: 1, alignSelf: 'center'}}>
          <Text
            style={{
              fontWeight: '500',
              fontFamily: Fonts.Poppins,
              fontSize: 17,
              color: '#BEBEBE',
            }}>
            You have no history available
          </Text>
        </View>
      )}
    </View>
  );
};

export default History;
