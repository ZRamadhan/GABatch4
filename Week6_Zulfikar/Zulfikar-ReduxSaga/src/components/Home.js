import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { getUser } from '../redux/action/user'

class Home extends Component {
    constructor(props) {
        super(props)
        // this.state = {

        // }
    }

    componentDidMount() {
        // this refer to mapStateToProps function
        this.props.getUser(this.props.auth.token)
    }

    render() {
        // refer to mapStateToProps function
        console.log(this.props.user)
        console.log(this.props.user.data.name)
        console.log(this.props.user.data.email)

        return (
            <View>
                <Text>Left</Text>
                <Text>Right</Text>
                <Text>Berhasil login</Text>
                <Text>{this.props.user.data.name}</Text>
                <Text>{this.props.user.data.email}</Text>
            </View>
        )
    }
}

// redux read data
const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
});

// redux store here
const mapDispatchToProps = dispatch => {
    return {
        getUser: token => dispatch(getUser(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)