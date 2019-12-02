import React, { Component } from 'react'
import {StyleSheet, Image, Dimensions, ToastAndroid} from 'react-native';
import {
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
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { updateUserProfile } from '../function/function'


export class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          newPassword: '',
          confirmNewPassword: '',

          user: {
            password: '',
          }
        };
      }

    async handleChangePassword() {
        const { newPassword, confirmNewPassword } = this.state

        if(newPassword === '' && confirmNewPassword === '') {
          ToastAndroid.show(`Can't proceed if the form is empty`, ToastAndroid.SHORT);
        }
        else {
          if(newPassword !== confirmNewPassword) {
            ToastAndroid.show(`Password isn't match`, ToastAndroid.SHORT);
          }
          else {
            const token = await AsyncStorage.getItem('@token')
            
            this.setState( prevState => ({
              user: {
                ...prevState.user,
                password: this.state.newPassword,
              }
            }))

            const result = await updateUserProfile(token, this.state.user)

            if(result==='berhasil'){
              ToastAndroid.show('Password Successfully Changed', ToastAndroid.SHORT);
              this.props.navigation.navigate('Profile')
            }
          }
        }
      }
    
    render() {
        return (
            <Container >
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
                        <Title style={{width:200}}>Change Password</Title>
                    </Body>

                    <Right/>
                </Header>
                    
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#1a1a1d',
                }}>
                    <Card transparent style={styles.transparentbg}>
                        <View style={styles.paddingY}/>

                        <CardItem style={[styles.transparentbg, {paddingBottom: 5}]}>
                          <View>
                            <Text style={styles.thirdColor}>Make sure your new password isn't same with your current password.</Text>
                          </View>
                        </CardItem>
                        
                        <CardItem style={[styles.transparentbg, {paddingBottom: 5}]}>
                            <Item
                                style={{borderBottomColor: '#fff', width: '100%'}}
                                stackedLabel>
                                <Label style={styles.thirdColor}>New Password</Label>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Input
                                    style={styles.secondColor}
                                    secureTextEntry={true}
                                    onChangeText={txt => {
                                    this.setState({newPassword: txt});
                                    }}
                                />
                                </View>
                            </Item>
                        </CardItem>

                        <CardItem style={[styles.transparentbg, {paddingBottom: 5}]}>
                            <Item
                                style={{borderBottomColor: '#fff', width: '100%'}}
                                stackedLabel>
                                <Label style={styles.thirdColor}>Confirm New Password</Label>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Input
                                    style={  styles.secondColor}
                                    secureTextEntry={true}
                                    onChangeText={txt => {
                                    this.setState({confirmNewPassword: txt});
                                    }}
                                />
                                </View>
                            </Item>
                        </CardItem>

                        <CardItem style={[styles.transparentbg, {paddingTop: 50, justifyContent:'center'}]}>
                          <Button
                            style={[
                              styles.secondbgColor,
                              {
                                width: Dimensions.get('window').width * 0.4,
                                justifyContent: 'center',
                                borderRadius: 50,
                              },
                            ]}
                            onPress={() => this.handleChangePassword()}>
                            <Text style={styles.mainColor}>SAVE</Text>
                          </Button>
                        </CardItem>
                    </Card>
                </View>
            </Container>
        )
    }
}

export default ChangePasswordScreen

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
    paddingY: {
        paddingVertical: 50,
      },
  });