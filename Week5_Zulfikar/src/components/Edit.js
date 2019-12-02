import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'

class Edit extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        console.log(`props id from home screen ${this.props.DataId}`)
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

export default withNavigation(Edit)