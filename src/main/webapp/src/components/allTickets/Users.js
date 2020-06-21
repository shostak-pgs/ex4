import React from 'react';
import Content from './content/Content.js';
import Header from './header/Header.js';
import { Route } from 'react-router-dom';

let Users = (props) => {
    let updateUsers = props.updateUsers;
    let users = props.users;
    let deleteUsers = props.deleteUsers;
    let user = props.user;
    let flag = props.flag;
    let checkAll = props.checkAll;
    let checkedItems = props.checkedItems;
    let checkUser = props.checkUser;
    return (
        <div>
            <div>
                <Route render = {(props)=> <div><Header {...props} updateUsers = {updateUsers}
                                                                   deleteUsers = {deleteUsers} user = {user}/></div>} />
            </div>
            <div>
                <Route exact path='/myTickets'  render = {(props)=> <div><Content {...props} flag = {flag}
                                    checkedItems = {checkedItems} checkAll = {checkAll} checkUser = {checkUser} users = {users}/></div>} />
                <Route path='/' render = {(props)=> <div><Content {...props} users = {users} flag = {flag}
                                    checkedItems = {checkedItems} checkAll = {checkAll} checkUser = {checkUser}/></div>} />
            </div>
        </div>
    )
}

export default Users;