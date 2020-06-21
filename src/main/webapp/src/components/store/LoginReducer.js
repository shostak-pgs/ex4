const SET_USER = 'SET_USER';

let initialUser = {
    user: {
        id : '',
        firstName : '',
        password : '',
    }
} 

const LoginReducer = (state = initialUser, action) => {
    switch(action.type) {
        case 'SET_USER':  {
            return {
                ...state,
                user : action.user,
            }
        }
        default : return state;
    }
}

export const setUser = (props) => ({
    type: SET_USER,
    user : props.user })
    
export default LoginReducer;