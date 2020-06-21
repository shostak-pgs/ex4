import React from 'react';
import { Checkbox } from '../../utils/CustomTags';

let RenderTableData = (props) => {

    let handleChange =(e) => {
       props.checkUser(e);
    }

        let checkAll =() => {
        props.checkAll();
        }

    let header = () => {
        return (
            <thead>
                <tr>
                    <th class='col-1'><Checkbox checked={props.flag} onChange={checkAll} />
                    Select all / Deselect</th>
                    <th class='col-2'>ID</th>
                    <th class='col-3'>Name</th>
                    <th >Email</th>
                    <th class='col-3'>Registration Date</th>
                    <th class='col-3'>Last Login Date</th>
                    <th class='col-3'>Status</th>
                </tr>
            </thead>
        )
    };

    let body = (props) => {
        return (
            props.users.map(
                user =>
                    <tbody>
                        <tr key={user.id}>
                            <td><Checkbox name={user.id}
                                          checked={props.checkedItems.get(user.id)} onChange={handleChange} /></td>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.registrationDate}</td>
                            <td>{user.loginDate}</td>
                            <td>{user.state}</td>
                        </tr>
                    </tbody>
            )
        )
    }

    return (
         <table class="table">
            {header()}
            {body(props)}
        </table>
    )
}

export default RenderTableData;