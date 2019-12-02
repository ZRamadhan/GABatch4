import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import {
  Root,
  View,
  Text,
  Container,
  Header,
  Footer,
  Item,
  Card,
  CardItem,
  Button,
  Input,
  Label,
  Body,
  Title,
  Left,
  Right,
  Toast
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux'
import { getUser } from '../redux/action/UserAction';
import { loginUser } from '../function/function'

export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eyeIcon: 'eye-slash',
      eyeStatus: true,

      user: {
        email: '',
        password: '',
      },
    };
  }

  handleEye = () => {
    this.setState(prevState => ({
      eyeIcon: prevState.eyeIcon === 'eye-slash' ? 'eye' : 'eye-slash',
      eyeStatus: !prevState.eyeStatus,
    }));
  };

  handleLogin = async () => {
    const loginDetail = await loginUser(this.state.user)

    if(loginDetail.user) {
      this.props.SendUserData(loginDetail.user)
      this.props.navigation.navigate('Profile')
    }
    else {
      if(!loginDetail.error.message){
        Toast.show({text: 'Unable to Login'})
      }
      else{
        Toast.show({text: loginDetail.error.message})
      }
    }
  }


  render() {
    const {eyeIcon, eyeStatus} = this.state;

    return (
      <Container>
        <Header
          androidStatusBarColor="#1a1a1d"
          style={{backgroundColor: '#1a1a1d',}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon
                type="FontAwesome5"
                name="angle-left"
                size={20}
                color={'#fff'}
              />
            </Button>
          </Left>

          <Body>
            <Title>Sign In</Title>
          </Body>

          <Right/>
        </Header>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1a1a1d',
          }}>
          <Card style={styles.login} transparent>
            <CardItem style={styles.transparentbg}>
              <Image
                style={{width: 200, height: 50}}
                source={require('../asset/logo.png')}
              />
            </CardItem>

            <CardItem style={[styles.transparentbg]}>
              <Item
                style={{borderBottomColor: '#fffff', width: '100%'}}
                stackedLabel>
                <Label style={[styles.thirdColor, {width: '100%'}]}>
                  E-mail
                </Label>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Input
                    autoCapitalize='none'
                    style={styles.thirdColor}
                    onChangeText={txt => {
                      this.setState( prevState => ({
                        user: {
                          ...prevState.user,
                          email: txt,
                          role: txt,
                        }
                      }));
                    }}
                  />
                </View>
              </Item>
            </CardItem>

            <CardItem style={[styles.transparentbg, {paddingBottom: 5}]}>
              <Item
                style={{borderBottomColor: '#fff', width: '100%'}}
                stackedLabel>
                <Label style={styles.thirdColor}>Password</Label>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Input
                    style={styles.thirdColor}
                    secureTextEntry={eyeStatus}
                    onChangeText={txt => {
                      this.setState( prevState => ({
                        user: {
                          ...prevState.user,
                          password: txt,
                        }
                      }));
                    }}
                  />
                  <Icon
                    type="FontAwesome5"
                    name={eyeIcon}
                    size={15}
                    color={'#fff'}
                    onPress={() => {
                      this.handleEye();
                    }}
                  />
                </View>
              </Item>
            </CardItem>

            <CardItem style={[styles.forgotPassword, styles.transparentbg]}>
              <Item
                style={{borderBottomColor: '#fff'}}
                onPress={() => {
                  this.props.navigation.navigate('');
                }}>
                <Text style={[{fontSize: 10}, styles.thirdColor]}>
                  Forgot Password?
                </Text>
              </Item>
            </CardItem>

            <CardItem style={[styles.transparentbg, {paddingTop: 25}]}>
              <Button
                style={[
                  styles.secondbgColor,
                  {
                    width: Dimensions.get('window').width * 0.5,
                    justifyContent: 'center',
                    borderRadius: 50,
                  },
                ]}
                onPress={() => this.handleLogin()}
              >
                <Text style={styles.mainColor}>Log in</Text>
              </Button>
            </CardItem>
          </Card>
        </View>

        <Footer style={{backgroundColor: '#1a1a1d'}}>
          <View style={styles.footerLogin} padder>
            <Text style={styles.footerText}>Don't have an account? </Text>

            <Item
              style={styles.itemBorder}
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}>
              <Text style={styles.footerLink}> Sign Up</Text>
            </Item>
          </View>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    SendUserData: user => dispatch(getUser(user)),
  };
};

export default connect(mapStateToProps ,mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
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
  login: {
    width: '75%',
    alignItems: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingTop: 0,
    paddingBottom: 0,
  },
  footerLogin: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
  },
  footerLink: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffee54',
  },
});