import React, {Component} from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import {View, Text, Button, Header, Container, Title, Left, Body, Right, H2, Spinner} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import { getUserProfile } from '../function/function'


export class ProfileScreen extends Component {
  constructor(props) {
      super(props);

      this.state = {
          token: null,
          name: '',
          role: '',
          loading: true,
      }
  }

  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('@token')
    this.setState({ token:token })


    if(token !== null) {
      const profile = await getUserProfile(token)

      const {name, role} = profile

      this.setState({
        name:name,
        role:role
      })

      this.state.name ? this.setState({loading:false}) : this.setState({loading:true})
    }

    this.setState({loading: false})
  }

  render() {
    const {name, role} = this.state

    return (
      <Container>
        <Header
          androidStatusBarColor="#1a1a1d"
          style={{backgroundColor: '#1a1a1d',}}>
            
            <Left/>

            <Body>
              <Title>Profile</Title>
            </Body>

            <Right/>

        </Header>

        {this.state.loading === true ? 
        <View style={{backgroundColor: '#1a1a1d',  flex: 1,  alignItems: 'center',  justifyContent: 'center',}}>
          <Spinner color="#ffee54" size="large"/>
        </View>

          :

        <View
          style={{
            backgroundColor: '#1a1a1d',
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>

          {this.state.token !== null ?

          (
          <View style={{width:'99%'}}>
            <View padder>
              <H2 style={styles.thirdColor}>{name}</H2>
              <Text style={[styles.secondColor, {fontStyle:'italic'}]}>{role}</Text>
            </View>

            <View padder style={{width:'99%'}}>
              <Text style={[{fontWeight:'bold', paddingLeft:15}, styles.paddingY, styles.secondColor]}>ACCOUNT</Text>
              <TouchableOpacity style={[styles.touchableStyle, styles.paddingY]}
                onPress= { () => { role === 'customer' ? this.props.navigation.navigate('EditProfileClient') : this.props.navigation.navigate('EditProfileMusician') }}
              >
                <Text style={styles.thirdColor}>Edit Profile</Text>
                <Icon type='FontAwesome5' name='user' size={18} color={'#fff'}/>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.touchableStyle, styles.paddingY]} onPress={ () => { this.props.navigation.navigate('ChangePassword') }}>
                <Text style={styles.thirdColor}>Change Password</Text>
                <Icon type='FontAwesome5' name='lock' size={18} color={'#fff'}/>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.touchableStyle, styles.paddingY]} 
                onPress={ () =>  {
                  AsyncStorage.clear() 
                  this.setState({token:null})
                  }
                }>
                <Text style={styles.thirdColor}>Log Out</Text>
                <Icon type='FontAwesome5' name='sign-out-alt' size={19} color={'#fff'}/>
              </TouchableOpacity>
            </View>
          </View>
          )

          :

          (
          <View>
            <View style={{width:'100%', marginVertical:100 ,display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',}}>
              <Button
                style={[
                  styles.secondbgColor,
                  {
                    width: Dimensions.get('window').width * 0.4,
                    justifyContent: 'center',
                    borderRadius: 50,
                  },
                ]}
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text style={styles.mainColor}>Login</Text>
              </Button>
              <Button
                style={[
                  styles.mainbgColor,
                  {
                    width: Dimensions.get('window').width * 0.4,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#ffee54',
                    borderRadius: 50,
                  },
                ]}
                onPress={() => this.props.navigation.navigate('Register')}
              >
                <Text style={styles.secondColor}>Register</Text>
              </Button>
            </View>
          </View>
          )
          }

          <View padder style={{width:'99%'}}>
            <Text style={[{fontWeight:'bold', paddingLeft:15}, styles.paddingY, styles.secondColor]}>SUPPORT</Text>
            <TouchableOpacity style={[styles.touchableStyle, styles.paddingY]}>
              <Text style={styles.thirdColor}>Terms & Condition</Text>
              <Icon type='FontAwesome5' name='info-circle' size={18} color={'#fff'}/>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.touchableStyle, styles.paddingY]}>
              <Text style={styles.thirdColor}>Privacy Policy</Text>
              <Icon type='FontAwesome5' name='book' size={18} color={'#fff'}/>
            </TouchableOpacity>
          </View>

        </View>
        }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(mapStateToProps ,mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1a1a1d',
    },
    mainbgColor: {
      backgroundColor: '#1a1a1d',
    },
    mainColor: {
      color: '#1a1a1d',
    },
    secondbgColor: {
      backgroundColor: '#ffee54',
    },
    secondColor: {
      color: '#ffee54',
    },
    thirdbgColor: {
      backgroundColor: '#fff',
    },
    thirdColor: {
      color: '#fff',
    },
    itemBorder: {
      borderBottomColor: '#ffee54',
    },
    transparentbg: {
      backgroundColor: 'transparent',
    },
    touchableStyle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      borderBottomColor: '#fff',
    },
    paddingY: {
      paddingVertical: 15,
    },
  }
)