import React, { Component } from 'react'
import { StyleSheet, ToastAndroid } from 'react-native'
import { Item, Button, Container, Content, Form, Label, Input, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    daftar = async() => {
        try {
            const postDaftar = async (objDaftar) => await axios.post(
                `https://abc-todo.herokuapp.com/api/user`, objDaftar, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            postDaftar({
                name: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
                .then(response => {
                    console.log(response)
                    ToastAndroid.show('Anda berhasil daftar!', ToastAndroid.SHORT)
                    this.setState({
                        name: '',
                        email: '',
                        password: ''
                    })
                    this.props.navigation.pop()
                })
                .catch(e => {
                    console.log(e.response.data)
                    ToastAndroid.show('Anda gagal daftar', ToastAndroid.SHORT)
                })
        }
        catch (err) {
            console.log(err)
            ToastAndroid.show('Gagal daftar galau?', ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form style={{ margin: '10%' }}>
                        <Item floatingLabel>
                            <Label>Nama</Label>
                            <Input value={this.state.name} onChangeText={(text) => this.setState({ name: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input value={this.state.email} onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Kata sandi</Label>
                            <Input value={this.state.password} onChangeText={(text) => this.setState({ password: text })} />
                        </Item>
                    </Form>
                    <Button style={style.btn} onPress={() => this.daftar()}>
                        <Text>Daftar</Text>
                    </Button>
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

export default withNavigation(Register)