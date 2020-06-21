import axios from 'axios';
import { Component } from 'react';

const LOGIN_API_URL = 'https://help-desk2020.herokuapp.com/app/login';
const LOGOUT_API_URL = 'https://help-desk2020.herokuapp.com/app/loggout';
const APPLICATION_API_URL = 'https://help-desk2020.herokuapp.com/app'

class LoginService  extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.createUser.bind(this);
    }

    login(data) {
        return axios.post(LOGIN_API_URL, { email: data.email, password: data.password})
          .then(response => {return response})
          .catch(error => {   
            alert('Please make sure you are using a valid email or password')
            return error
        });
    }

    logout(user) {
        return axios.post(LOGOUT_API_URL, { withCredentials: true, headers: { "Authorization" : `Bearer ${user.jwt}`,
                                                                              "Accept": "application/json",
                                                                              "Content-Type": "application/json" } })
            .then(response => {return response})
            .catch(error => {   
                alert('Unable to logout')
                return Promise.reject(error)
            });
    }

    createUser(props) {
        return axios.post(`${APPLICATION_API_URL}/users`, props.data)
        .then(response => {return response})
        .catch(error => {
            alert('Unable to create user. Make sure you are using valid email : ,,,@.,,, ')
            return Promise.reject(error)
        });
    }
}

export default new LoginService()