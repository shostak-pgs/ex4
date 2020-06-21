import React from 'react';
import './Credentials.css';
import './../allTickets/header/ActionBar.css';

const Credentials = (props) => {
    let user = props.user;
    let credentData = () => {
        if(user !== undefined && user.firstName !== "") {
            return (<div>{`${user.lastName} ${user.firstName}`}</div>) 
        } else {
            return (<div>No user up to date</div>)
        }
    }

    return(
        <div className = 'credentbar'>
            <div >
                <div className ='credentData'>{credentData()}</div>
                <button onClick = {props.logout} className ='Button'>Logout</button>
            </div>
        </div>
    )
}

export default Credentials;