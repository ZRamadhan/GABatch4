import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Icon from 'react-native-vector-icons/FontAwesome5';

import AuthScreen from '../screen/AuthScreen'
import HomeScreen from '../screen/HomeScreen'
import DetailScreen from '../screen/DetailScreen'
import OrderScreen from '../screen/OrderScreen'
import ProfileScreen from '../screen/ProfileScreen'
import LoginScreen from '../screen/LoginScreen'
import RegisterScreen from '../screen/RegisterScreen'
import EditProfileClientScreen from '../screen/EditProfileClientScreen'
import EditProfileMusicianScreen from '../screen/EditProfileMusicianScreen'
import ChangePasswordScreen from '../screen/ChangePasswordScreen'

const homeRoot = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: () => ({
        header: null
      })
    }
  }
)

const ProfileRoot = createStackNavigator({
  Profile : {
    screen: ProfileScreen,
    navigationOptions: () => ({
      header: null,
    })
  },
  EditProfileClient : {
    screen: EditProfileClientScreen,
    navigationOptions: () => ({
      header: null,
    })
  },
  EditProfileMusician : {
    screen: EditProfileMusicianScreen,
    navigationOptions: () => ({
      header: null,
    })
  },
  ChangePassword : {
    screen: ChangePasswordScreen,
    navigationOptions: () => ({
      header: null,
    })
  },
  // TermsCondition : {
  //   screen: TermsConditionScreen,
  //   navigationOptions: () => ({
  //     header: null,
  //   })
  // },
  // PrivacyPolicy : {
  //   screen: PrivacyPolicyScreen,
  //   navigationOptions: () => ({
  //     header: null,
  //   })
  // },
},
{
  initialRouteName: 'Profile',
}
)

const HomeBottomNavigation = createMaterialBottomTabNavigator(
{
  Home : {
    screen: homeRoot,
    // screen: HomeScreen,
    navigationOptions: () => ({
      header: null,
      tabBarLabel: 'Feed',
      tabBarIcon: ({tintColor}) => <Icon type='FontAwesome5' name='home' size={20} color={tintColor}/>
    }),
  },
  Order : {
      screen : OrderScreen,
      navigationOptions: () => ({
        header: null,
        tabBarLabel: 'Order',
        tabBarIcon: ({tintColor}) => <Icon type='FontAwesome5' name="clipboard-list" size={20} color={tintColor}/>
    }),
  },
  ProfileRoot : {
      screen : ProfileRoot,
      navigationOptions: () => ({
        header: null,
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => <Icon type='FontAwesome5' name='user' size={20} color={tintColor}/>
    }),
  },
},
{
  activeColor: '#ffee54',
  inactiveColor: '#ffffff',
  barStyle: { backgroundColor: '#1a1a1d', },
}
)

const LoginStack = createStackNavigator({
    Login : {
        screen : LoginScreen,
        navigationOptions: () => ({
            header: null,
        })
    },
    Register : {
        screen : RegisterScreen,
        navigationOptions: () => ({
            header: null,
        })
    },
})

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthScreen,
    Login: LoginStack,
    Home: HomeBottomNavigation,
  },
  {
    initialRouteName: 'Auth',
  },
);

export const AppContainer = createAppContainer(SwitchNavigator)