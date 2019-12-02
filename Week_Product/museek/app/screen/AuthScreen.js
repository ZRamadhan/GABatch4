import React, {Component} from 'react';
import { Image } from 'react-native'
import {
  Spinner,
  View,
  Thumbnail
} from 'native-base';


export class AuthScreen extends Component {
  componentDidMount() {
    setTimeout(()=>{
      this.props.navigation.navigate('Home')
  },1000)
  }

  render() {
      return (
        <View
          style={{
            backgroundColor: '#1a1a1d',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          
          <Image
            style={{width: 200, height: 50}}
            source={require('../asset/logo.png')}
          />

          <Spinner color="#ffee54" size="large" />

        </View>
      );  
  }
}

export default AuthScreen;