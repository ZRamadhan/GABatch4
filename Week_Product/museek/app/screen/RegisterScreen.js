import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions, ToastAndroid} from 'react-native';
import {
  View,
  Text,
  Container,
  Header,
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
  List,
  ListItem,
  Radio,
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { registerUser } from '../function/function'

export class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
        radioClient : true,
        radioMusician : false,

        role: 'customer',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
  }

  radioClient = () => {
    this.setState({radioClient:true, radioMusician:false, role:'customer'})
  }
  radioMusician = () => {
    this.setState({radioClient:false, radioMusician:true, role:'musician'})
  }

  handleRegister = async () => {
    const {role, name, email, password, confirmPassword} = this.state

    if(password !== confirmPassword) {
        ToastAndroid.show('Password tidak sama', ToastAndroid.SHORT)
    }
    else {
        const status = await registerUser(role, name, email, password)

        if(status) {
          ToastAndroid.show(status.response.message, ToastAndroid.SHORT);
          this.props.navigation.navigate('Login')
        }
        else {
          ToastAndroid.show('Currently can not register a new account', ToastAndroid.SHORT);
        }
    }
  }


  render() {
    return (
      <Container>
        <Header noShadow
          androidStatusBarColor="#1a1a1d"
          style={styles.mainbgColor}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Login')}>
              <Icon
                type="FontAwesome5"
                name="angle-left"
                size={20}
                color={'#fff'}
              />
            </Button>
          </Left>

          <Body>
            <Title>Sign Up</Title>
          </Body>

          <Right/>
        </Header>

        <View
          style={styles.contentContainer}>
          <Card style={styles.register} transparent>
            <CardItem style={styles.transparentbg}>
              <Image
                style={{width: 200, height: 50}}
                source={require('../asset/logo.png')}
              />
            </CardItem>

            <CardItem style={[styles.transparentbg,{ width:'100%', justifyContent:'space-evenly', alignItems:'center', paddingBottom:0}]}>
              <Text style={[styles.thirdColor, {fontSize:14}]}>I am a</Text>

              <List style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <ListItem style={{borderBottomColor:'#1a1a1d'}}>
                  <Radio 
                    selected={this.state.radioClient} 
                    onPress={()=> { this.radioClient() }}
                    color={"#fff"}
                    selectedColor={"#ffee54"}
                  />
                  <Text style={[styles.thirdColor, {fontSize:14}]}> Client</Text>
                </ListItem>

                <ListItem style={[styles.radioButton, {marginLeft:0, paddingRight:0,borderBottomColor:'#1a1a1d'}]}>
                  <Radio 
                    selected={this.state.radioMusician}  
                    onPress={ () => { this.radioMusician() }}
                    color={"#fff"}
                    selectedColor={"#ffee54"}
                  />
                  <Text style={[styles.thirdColor, {fontSize:14}]}> Musician</Text>
                </ListItem>
              </List>

            </CardItem>

            <CardItem style={[styles.transparentbg]}>
              <Item
                style={{borderBottomColor: '#fffff', width: '100%'}}
                stackedLabel>
                <Label style={[styles.thirdColor, {width: '100%'}]}>
                    Name
                </Label>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Input
                    style={styles.thirdColor}
                    onChangeText={txt => {
                      this.setState({name: txt});
                    }}
                  />
                </View>
              </Item>
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
                    style={styles.thirdColor}
                    onChangeText={txt => {
                      this.setState({email: txt});
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
                    secureTextEntry={true}
                    onChangeText={txt => {
                      this.setState({password: txt});
                    }}
                  />
                </View>
              </Item>
            </CardItem>

            <CardItem style={[styles.transparentbg, {paddingBottom: 5}]}>
              <Item
                style={{borderBottomColor: '#fff', width: '100%'}}
                stackedLabel>
                <Label style={styles.thirdColor}>Confirm Password</Label>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Input
                    style={  styles.thirdColor}
                    secureTextEntry={true}
                    onChangeText={txt => {
                      this.setState({confirmPassword: txt});
                    }}
                  />
                </View>
              </Item>
            </CardItem>

            <CardItem style={[styles.transparentbg, {paddingTop: 50}]}>
              <Button
                style={[
                  styles.secondbgColor,
                  {
                    width: Dimensions.get('window').width * 0.5,
                    justifyContent: 'center',
                    borderRadius: 50,
                  },
                ]}
                onPress={() => this.handleRegister()}
              >
                <Text style={styles.mainColor}>Register</Text>
              </Button>
            </CardItem>
          </Card>
        </View>
      </Container>
    );
  }
}

export default RegisterScreen;

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
  register: {
    width: '75%',
    alignItems: 'center',
  },
});