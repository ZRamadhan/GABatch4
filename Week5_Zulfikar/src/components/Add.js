import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Text, Form, Item, Input, Label, Button, Footer, FooterTab, Textarea } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { withNavigation } from 'react-navigation'
import Axios from 'axios'

const url = 'https://abc-todo.herokuapp.com/api/todo'

class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            isDone: false
        }
    }

    addData = async () => {
        const token = await AsyncStorage.getItem('@token')
        console.log(token)
        try{
            const postData = async postParam => await Axios.post(
                url, postParam, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                postData({
                    title: this.state.title,
                    body: this.state.body
                })
                .then(response => {
                    console.log(response)
                    this.setState({
                        title: '',
                        body: ''
                    })
                    this.props.navigation.navigate('Home')
                    console.log(`Berhasil tembah data`)
                })
                .catch(err => {
                    console.log(`Gagal tambah data ${err}`)
                })
        }
        catch(err) {
            console.log(`Gagal tambah data ke API ${err}`)
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel style={style.alignment}>
                            <Label>Judul</Label>
                            <Input value={this.state.title} onChangeText={(text) => this.setState({title:text})}/>
                        </Item>
                        <Textarea style={style.alignment} value={this.state.body} onChangeText={(text) => this.setState({body:text})} rowSpan={5} bordered placeholder="Keterangan"/>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.navigation.navigate('Home')}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button onPress={this.addData}>
                            <Text>Save</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    alignment: {
        marginLeft: '5%',
        marginRight: '5%'
    }
})

export default withNavigation(Add)