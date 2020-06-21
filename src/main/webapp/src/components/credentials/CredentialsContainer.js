import React, { Component } from 'react';
import { setUser } from './../store/LoginReducer';
import { switchIsFetching } from './../store/UsersReducer';
import LoginService from './../service/LoginService';
import { withRouter} from 'react-router-dom';
import Credentials from './Credentials';
import Preloader from './../preloader/Preloader';
import { connect } from 'react-redux';

class CredentialsContainer extends Component {  
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.switchIsFetching({isFetching : true});  
        LoginService.logout(this.props.user).then(response => {
            if ((response.status === 200)) {
                this.props.setUser({user : {id : '', firstName : '', password : '' }});
                this.props.history.push(`/`); 
            } else {
                alert("Logout failed")
            }
        this.props.switchIsFetching({isFetching : false});
    });
}

    render() {
        return(
            <div>{this.props.isFetching ? <Preloader/> : null}
                <Credentials logout = {this.logout}
                             user = {this.props.user}/> 
            </div>
        )
    }
}

let WithRouteCredentialsContainer = withRouter(CredentialsContainer);

let mapStateToProps = (state) => {
    return {      
        user: state.loginPage.user
    }
}

export default connect(mapStateToProps, {
    setUser, switchIsFetching
    })(WithRouteCredentialsContainer);