import React, {Component} from 'react';
import './content/Content.css';
import { withRouter } from 'react-router-dom';
import Preloader from '../preloader/Preloader';
import Users from './Users';
import {connect} from 'react-redux';
import { setUser } from './../store/LoginReducer';
import {switchIsFetching, checkAll, checkUser, setUsers, setFlag} from './../store/UsersReducer';
import UsersService from './../service/UsersService';

class UsersContainer extends Component {

    constructor(props){
        super(props);
        this.componentDidMount=this.componentDidMount.bind(this);
        this.updateUsers = this.updateUsers.bind(this);
        this.deleteUsers = this.deleteUsers.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.createCheckedMap = this.createCheckedMap.bind(this);
    }

    componentDidMount(){
        this.props.switchIsFetching({isFetching : true});
        UsersService.retrieveAllUsers(this.props.user).then(data => {
            this.props.setUsers({users : data});
            this.props.checkAll({checkedUsers: this.createCheckedMap(this.props.users, this.props.flag)});
        });
        this.props.switchIsFetching({isFetching : false});
    }

    createCheckedMap(data, flag) {
        let map = new Map();
        data.forEach(user => map.set(user.id, flag));
        return map;
    }

    checkAll() {
    this.props.setFlag({flag : !this.props.flag});
    this.props.checkAll({checkedUsers: this.createCheckedMap(this.props.users, !this.props.flag)});
    }

    checkUser(action) {
    this.props.checkUser({ id : action.target.name, isChecked : action.target.checked });
    }

    updateUsers(data) {
        this.props.switchIsFetching({isFetching : true});
        let pairs = this.props.checkedItems;
        pairs.forEach(function (value, key, mapObj) {
            if(value === false) {
                pairs.delete(key);
            };
        });
        let selected = Object.fromEntries(pairs.entries());
        UsersService.updateUsers({ actionDto : {selected : selected, action : data.action},
                                               user : this.props.user}).then(response => {
             if (response.status === 200) {
                  this.props.setUsers({users : response.data});
             } else if (response.status === 401) {
                 this.props.setUser({user : {id : '', firstName : '', password : '' }})
                 this.props.history.push(`/`)
             }
        })
        this.props.switchIsFetching({isFetching : false});
    }

    deleteUsers() {
        this.props.switchIsFetching({isFetching : true});
        let idSet = [];
        this.props.checkedItems.forEach(function (value, key, mapObj) {
             if(value === true) {
                 idSet.push(key);
             }
        });
        UsersService.deleteUsers({idSet : {idSet}, user : this.props.user}).then(response => {
              if (response.status === 200) {
                  this.props.setUsers({users : response.data});
              } else if (response.status === 401) {
                  this.props.setUser({user : {id : '', firstName : '', password : '' }})
                  this.props.history.push(`/`)
              }
        })
        this.props.switchIsFetching({isFetching : false});
    }

    render() {
        return( <div> {this.props.isFetching ? <Preloader/> : null}
            <Users checkedItems = {this.props.checkedItems}
                     checkUser = {this.checkUser}
                     checkAll = {this.checkAll}
                     flag = {this.props.flag}
                     user = {this.props.user}
                     deleteUsers = {this.deleteUsers}
                     updateUsers = {this.updateUsers}
                     users = {this.props.users}/>
               </div>      
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users : state.usersPage.users,
        checkedItems : state.usersPage.checkedUsers,
        user : state.loginPage.user,
        flag : state.usersPage.flag,
        isFetching : state.usersPage.isFetching,
    }
}

let WithRouteUsersContainer = withRouter(UsersContainer);

export default connect(mapStateToProps, {
    setUsers, switchIsFetching, checkAll, checkUser, setFlag, setUser
    })(WithRouteUsersContainer);
