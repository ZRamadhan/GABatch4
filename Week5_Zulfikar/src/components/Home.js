import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Container, Content, Text, List, Body, ListItem, H1, Button } from 'native-base'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { withNavigation } from 'react-navigation'

const url = 'https://abc-todo.herokuapp.com/api/todo'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            id: [],
            title: '',
            body: '',
            isDone: false
        }
    }

    getData = async () => {
        const token = await AsyncStorage.getItem('@token')
        try {
            const getDatas = async () => await axios.get(
                url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
            getDatas()
                .then(res => {
                    this.setState({ todos: res.data.result })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    getDataById = () => {
        return this.state.todos.map((value, _id) => (
            key={_id},
            this.setState({Id: value._id}),
            this.props.navigation.navigate('Edit')
        ))
    }

    showData = () => {
        return this.state.todos.map((value, i) => (
            <Content key={i}>
                <List>
                    <ListItem>
                        <Body>
                            <TouchableOpacity onPress={this.getDataById} DataId={value._id}>
                                <Text>
                                    {value.title}
                                </Text>
                                <Text note>
                                    {value.body}
                                </Text>
                            </TouchableOpacity>
                        </Body>
                    </ListItem>
                </List>
            </Content>
        ))
    }

    componentDidMount() {
        this.getData()
        setInterval(this.getData, 1000)
    }

    render() {
        return (
            <Container>
                <Content>
                    <H1 style={[{ marginBottom: '10%', marginTop: '10%' }, style.alignment]}>Todo</H1>
                    <Button info style={style.btn} onPress={() => this.props.navigation.navigate('Add')}>
                        <Text>+</Text>
                    </Button>
                    <View>
                        {this.showData()}
                    </View>
                </Content>
            </Container>
        )
    }
}

const style = StyleSheet.create({
    alignment: {
        display: 'flex',
        textAlign: 'center',
        textAlignVertical: 'bottom'
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        width: '10%',
        marginLeft: '75%',
    }
})

export default withNavigation(Home);