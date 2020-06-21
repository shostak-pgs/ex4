const SET_USERS = 'SET_USERS';
const SWITCH_IS_FETCHING = 'SWITCH_IS_FETCHING';
const CHECK_USER = 'CHECK_USER';
const CHECK_ALL = 'CHECK_ALL';
const SET_FLAG = 'SET_FLAG';

let users = {
    users: [],
    checkedUsers : new Map(),
    isFetching : false,
    flag : false
}

const UsersReducer = (state = users, action) => {
switch(action.type) {
    case 'CHECK_USER' : {
        const id = action.obj.id;
        const isChecked = action.obj.isChecked;
        let newMap = new Map(state.checkedUsers);
        newMap.set(Number.parseInt(id), isChecked);
        return {
           ...state,
           checkedUsers : newMap
        }
    }
    case 'SET_USERS':  {
        return {
            ...state,
            users : action.users,
        }
    }
    case 'CHECK_ALL': {
        return {
            ...state,
            checkedUsers : action.checkedUsers
        }
    }
    case 'SWITCH_IS_FETCHING':  {
        return {
            ...state,
            isFetching : action.isFetching,
        }
    }
    case 'SET_FLAG':  {
        return {
            ...state,
            flag : action.flag,
        }
    }
    default :
        return state;
    }
}

   export const checkAll = (props) => ({
        type: CHECK_ALL,
        checkedUsers: props.checkedUsers })

    export const checkUser = (props) => ({
        type : CHECK_USER,
        obj : props })

    export const setUsers = (props) => ({
        type: SET_USERS,
        users: props.users })

    export const switchIsFetching = (props) => ({
        type: SWITCH_IS_FETCHING,
        isFetching: props.isFetching })

    export const setFlag = (props) => ({
        type: SET_FLAG,
        flag : props.flag })

export default UsersReducer;