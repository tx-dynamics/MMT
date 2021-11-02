import React, {Component} from 'react';
import {View, StatusBar, ImageBackground, AsyncStorage} from 'react-native';
import {icon} from '../../assets';
import styles from './styles';
//firebase
import auth from '@react-native-firebase/auth';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.splashDone();
  };
  splashDone = () => {
    setTimeout(() => {
      auth()?.currentUser?  this.props.navigation.navigate('Root',{screen:'Home' }
      ): this.props.navigation.navigate('info');
    }, 1000);
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar hidden={true} />
        <ImageBackground
          source={icon}
          style={styles.splashStyle}
          resizeMode={'contain'}
        />
      </View>
    );
  }
}

export default Splash
