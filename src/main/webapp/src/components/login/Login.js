import React from 'react';
import './Login.css';
import {TextArea} from '../utils/CustomTags';
import { required } from './../validator/CrUpdValidator';
import {Field, reduxForm } from 'redux-form';

let Login = (props) => {

    const onCreatePage = () => {
        if (props.history.location.pathname === '/create') {
            return true;
        } return false;
    }

    const handleSubmit = (formData) => {
        onCreatePage() === true ? props.createUser(formData) : props.getUser(formData);
    }

    const create = () => {
        props.history.push(`create`);
    }

    const getNameFields = () => {
        if(onCreatePage() === true) {
            return (<div>
                <div><Field placeholder = {'First name'} name = {'firstName'} component = {TextArea}
                            validate = {required} className = {'loginInput'} /></div>
                <div><Field placeholder = {'Last name'} name = {'lastName'} component = {TextArea}
                            validate = {required} className = {'loginInput'} /></div></div>);
        }
    }

    return(
        <div>
            <h3>{(onCreatePage() === true) ? `Create user` : `Login`}</h3>
            <LoginReduxForm getNameFields = {getNameFields} onCreatePage = {onCreatePage} onSubmit = {handleSubmit} create = {create}/>
        </div>
    )
}

const LoginForm = (props) => {
    return(
        <form>
            {props.getNameFields()}
            <div><Field placeholder = {'Email'} name = {'email'} component = {TextArea}
                        validate = {required} className = {'loginInput'} /></div>
            <div><Field placeholder = {'Password'} type = 'password' name = {'password'} component = {TextArea}
                        validate = {required} className = {'loginInput'} /></div>
            <div><button type = 'submit' disabled = {props.onCreatePage() === true ? true : false} onClick = {props.handleSubmit} id = 'Login' className = {'loginButton'}>Login</button>
                 <button type = 'button' onClick = {props.onCreatePage() === true ? props.handleSubmit : props.create}  id = 'Create' className = {'loginButton'} >Create User</button></div>
        </form>
    )
}

const LoginReduxForm = reduxForm( { form : 'login' } ) (LoginForm)

export default Login;