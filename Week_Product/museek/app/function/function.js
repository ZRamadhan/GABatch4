import axios from 'axios';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const registerUser = async (role, name, email, password) => {
  try {
    
    const response = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'https://museek.herokuapp.com/api/user/register',
      data: {
        name: name,
        email: email,
        role: role,
        password: password,
      },
    });

    return response.data;
  } 
  
  catch (error) {
    //ToastAndroid.show(error.response.data.error.message, ToastAndroid.SHORT);
    console.log(error)
  }
};

export const loginUser = async user => {
  try {
    const response = await axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'https://museek.herokuapp.com/api/user/login',
      data: {
        email: user.email,
        password: user.password,
      },
    });

    AsyncStorage.setItem('@token', `Bearer ${response.data.token}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserProfile = async token => {
    try {
        const response = await axios({
            method: 'get',
            headers: {
              'Authorization': token
            },
            url: 'https://museek.herokuapp.com/api/user/profile',
        })

        return response.data
    }
    catch(error) {
        return error.response.data
    }
}

export const updateUserProfile = async (token, user) => {
  try {
    delete user.profilePicture

    const response = await axios({
        method: 'put',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        url: 'https://museek.herokuapp.com/api/user/profile',
        data: user
    })

    return 'berhasil'
  }
  catch(error) {
    ToastAndroid.show('salah', ToastAndroid.SHORT);
  }
}

export const uploadPicture = async (imageUri, token) => {
    const formData = new FormData();

    formData.append('avatar', {
      uri: imageUri.uri,
      type: imageUri.type,
      name: imageUri.fileName
    });

    const result = await fetch('https://museek.herokuapp.com/api/user/upload-avatar', {
        method: 'put',
        headers: {
          Authorization: token.split(' ')[1],
        },
        body: formData
      })
      .then( response => {
        ToastAndroid.show('Profile picture updated', ToastAndroid.SHORT);
        return 'berhasil'
      })
      .catch(error => {
        ToastAndroid.show('Unable to upload profile picture', ToastAndroid.SHORT);
        return 'gagal'
      })

      return result
}


