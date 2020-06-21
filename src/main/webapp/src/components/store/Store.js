import LoginReducer from './LoginReducer';
import UsersReducer from './UsersReducer';
import {createStore, combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import {loadState, saveState} from './LocalStorage';

let reducers = combineReducers({
   usersPage: UsersReducer,
   loginPage : LoginReducer,
   form : formReducer
});

const persistedState = loadState();

let store = createStore(reducers, persistedState);

store.subscribe(() => {
  saveState({
    loginPage: store.getState().loginPage
  });
});

export default store;