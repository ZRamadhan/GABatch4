import React, { Component } from 'react'
import axios from 'axios'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { auth } from '../redux/action/AuthAction'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    // passing props at lifecycle component
    // componentDidMount() {
    //     console.log('auth redux', this.props.auth)
    // }

    handleLogin = async () => {
        try{
            const postLogin = async(objLogin) => await axios.post(
                `https://abc-todo.herokuapp.com/api/user/login`,
                objLogin, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            postLogin({
                email: this.state.email,
                password: this.state.password
            })
            .then(response => {
                this.props.FetchToken(response.data.result)
                console.log(response.data)
                this.setState({
                    email: '',
                    password: ''
                })
                this.props.navigation.navigate('Home')
            })
            .catch(err => {
                console.log(`gagal login ${err}`)
            })
        }
        catch(err) {
            console.log(`masih salah`)
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input value={this.state.password} onChangeText={(text) => this.setState({password:text})}/>
                        </Item>
                    </Form>
                    <Form style={{alignContent:'center'}}>
                    <Button rounded info
                        onPress={() => this.handleLogin()}
                        style={{width:'50%', justifyContent:'center', marginLeft:'25%', marginTop:30}}>
                        <Text style={{textAlign:'center'}}>Login</Text>
                    </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

// redux store here
const mapDispatchToProps = dispatch => {
    return {
        FetchToken: token => dispatch(auth(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);