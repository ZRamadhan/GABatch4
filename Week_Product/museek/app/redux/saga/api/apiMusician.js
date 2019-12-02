import axios from 'axios'

export const apiGetAllMusician = data => {
    // console.log('ini isi data', data)
    let headers = {
        'Content-Type': 'application-json'
    }
    return axios.get(`https://museek.herokuapp.com/api/user?role=musician`, {headers: headers})
    .then(function(response) {
        return response.data
    });
}