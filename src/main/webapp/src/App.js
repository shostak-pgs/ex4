import React from 'react';
import logo from './logo.svg';
import LoginContainer from './components/login/LoginContainer';
import UsersContainer from './components/allTickets/UsersContainer';
import './App.css';
import  { Route } from 'react-router-dom';
import CredentialsContainer from './components/credentials/CredentialsContainer';

const App =() => {
  return (
    <div className="App">
      <header className="App-header">
        <div><CredentialsContainer/></div>
        <img src={logo} className="App-logo" alt="logo" />
        <Route exact path='/' render = { () => <LoginContainer />}/>
        <Route exact path='/create' render = { () => <LoginContainer />}/>
        <Route exact path='/tickets' render = { () => <UsersContainer />}/>
      </header>
    </div>
  );
}

export default App;
