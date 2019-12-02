import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import { Container, Content, Button, Text, Form, Item, Input, Label } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  async login() {
    try {
      const postLogin = async (objLogin) => await axios.post(
        `https://abc-todo.herokuapp.com/api/user/login`
        , objLogin, {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      postLogin({
        email: this.state.name,
        password: this.state.password
      })
        .then(response => {
          AsyncStorage.setItem('@token', response.data.result)
          ToastAndroid.show('Berhasil masuk', ToastAndroid.SHORT)
          this.setState({
            email: '',
            password: ''
          })
          this.props.navigation.navigate('Home')
        })
        .catch(err => {
          this.showErr(`Gagal masuk, email atau password salah! ${err}`)
        })
    }
    catch (err) {
      this.showErr(err)
    }
  }

  showErr = (ok) => {
    Alert.alert(
      'Login',
      `${ok}`,
      [
        { text: 'OK', onPress: () => console.log('Ok pressed') }
      ]
    )
  };

  render() {
    return (
      <Container>
        <Content>
          <Form style={{ margin: '10%' }}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
            </Item>
            <Item floatingLabel>
              <Label>Kata sandi</Label>
              <Input value={this.state.password} secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} />
            </Item>
          </Form>
          <Button rounded style={style.btn} onPress={() => this.login()}>
            <Text>Masuk</Text>
          </Button>
          <Text style={style.alignment}>Belum punya akun?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={[{ fontWeight: 'bold' }, style.alignment]}>Daftar</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  btn: {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    marginLeft: '25%',
    marginTop: 30,
    backgroundColor: 'teal',
  },
  alignment: {
    display: 'flex',
    textAlign: 'center',
    textAlignVertical: 'bottom'
  }
})

export default withNavigation(Login);