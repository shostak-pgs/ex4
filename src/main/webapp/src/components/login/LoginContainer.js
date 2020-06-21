import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Preloader from '../preloader/Preloader';
import LoginService from '../service/LoginService';
import { setUser } from '../store/LoginReducer';
import { switchIsFetching } from '../store/UsersReducer';
import Login from './Login';

class LoginContainer extends Component {

    constructor(props){
        super(props);
        this.getUser = this.getUser.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    getUser(userData){
        this.props.switchIsFetching({isFetching : true});
            LoginService.login(userData).then(response => {
                if ((response.status === 200)) {
                    this.props.setUser({user : response.data});
                    this.props.history.push(`/tickets`); 
                } else {
                    this.props.setUser({user : {id : '', firstName : '', password : '' }})
                    this.props.history.push(`/`)
                }
        });
        this.props.switchIsFetching({isFetching : false});
    }

    createUser(userData){
         this.props.switchIsFetching({isFetching : true});
             LoginService.createUser({data : userData, user : this.props.user}).then(response => {
                 if ((response.status === 200)) {
                      this.props.setUser({user : response.data});
                      this.props.history.push(`/tickets`);
                 }
            });
         this.props.switchIsFetching({isFetching : false});
    }

    render() {
        return(<div> {this.props.isFetching ? <Preloader/> : null}
                    <Login getUser = {this.getUser}
                           isCreate = {this.props.match.params.create}
                           history = {this.props.history}
                           createUser = {this.createUser}
                           user = {this.props.user}/>
                </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isFetching : state.usersPage.isFetching,
        user: state.loginPage.user
    }
}

let WithRouteLoginContainer = withRouter(LoginContainer);
  
export default connect(mapStateToProps, {
    setUser, switchIsFetching
    })(WithRouteLoginContainer);
