import React from 'react';
import ActionBar from './ActionBar.css';

const Header = (props) => {

    let blockUsers = () => {
       props.updateUsers({action : 'BLOCK'});
    }

    let unblockUsers = () => {
        props.updateUsers({action : 'UNBLOCK'});
    }

    let deleteUsers = () => {
        props.deleteUsers();
    }

    return (    
        <div>
             <nav className='switchBar'>
                 <div>
                      <button onClick = {blockUsers} id = 'Button1' className ='button'>Block</button>
                      <button onClick = {unblockUsers} id = 'Button2' className ='button'>Unblock</button>
                      <button onClick = {deleteUsers} id = 'Button3' className ='button'>Delete</button>
                 </div>
             </nav>
          </div>
    )
}

export default Header;