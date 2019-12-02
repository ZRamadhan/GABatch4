import axios from 'axios';

export const apiGetUser = token => {
    console.log('ini tokennya ', token)
    let headers = {
        Authorization: token
    }          
    return axios.get(`https://abc-todo.herokuapp.com/api/user`, { headers: headers })
    .then(function(response) {
        return response.data.result
    });
}