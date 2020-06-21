import axios from 'axios'
import { Component } from 'react';

const USERS_API_URL = 'https://help-desk2020.herokuapp.com/app/users'

class UsersService extends Component {
    constructor(props) {
        super(props)
        this.retrieveAllUsers=this.retrieveAllUsers.bind(this);
        this.deleteUsers = this.deleteUsers.bind(this);
        this.updateUsers = this.updateUsers.bind(this);
        this.getConfig = this.getConfig.bind(this);
    }

    getConfig(props) {
        let data = props.idSet;
        return {
            withCredentials: true,
            headers: { "Authorization" : `Bearer ${props.jwt}`,
                       "Accept": "application/json",
                       "Content-Type": "application/json",
                       "Data":`${data}`
            }
        }
    }

    retrieveAllUsers(user) {
        return axios.get(`${USERS_API_URL}`, this.getConfig({jwt : user.jwt}))
            .then(response => {return response.data})
            .catch(error => {
                alert('Unable to load users')
                return Promise.reject(error)
            });
    }

    updateUsers(props) {
        return axios.put(`${USERS_API_URL}`, props.actionDto, this.getConfig({jwt : props.user.jwt}))
        .then(response => {return response})
        .catch(error => {
            if (error.response.status === 401) {
                return error.response
            }})
        .catch(error => {
             alert('Unable to load users')
             return Promise.reject(error)
        });
    }

    deleteUsers(props) {
        return axios.delete(`${USERS_API_URL}`, this.getConfig({jwt : props.user.jwt, idSet : props.idSet.idSet}))
        .then(response => {return response})
                .catch(error => {
                     if (error.response.status === 401) {
                        return error.response
                    }})
        .catch(error => {
            alert('Unable to do action')
            return Promise.reject(error)
       });
    }
}

export default new UsersService()