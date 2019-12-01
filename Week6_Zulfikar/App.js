import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import Login from './src/components/Login'
import Home from './src/components/Home'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const store = configureStore();

const pageNavigation = createStackNavigator({
  Login: Login,
  Home: Home
},
{
  initialRouteName: 'Login',
  headerMode: 'none'
});

const ReactRedux = createAppContainer(pageNavigation)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactRedux />
      </Provider>
    )
  }
}