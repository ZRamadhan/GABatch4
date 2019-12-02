import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store'
import Home from './src/components/Home';
import Register from './src/components/Register';
import Login from './src/components/Login';
import Add from './src/components/Add';
import Edit from './src/components/Edit';
import Delete from './src/components/Delete';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const store = configureStore()

const pageNavigation = createStackNavigator({
  Home: Home,
  Register: Register,
  Login: Login,
  Add: Add,
  Edit: Edit,
  Delete: Delete
},
{
  initialRouteName: 'Login',
  headerMode: 'none'
});

const TodoApps = createAppContainer(pageNavigation)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TodoApps />
      </Provider>
    )
  }
}