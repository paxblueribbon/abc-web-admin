import * as ActionTypes from '../actions/types';

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_ERROR:
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      };
    case ActionTypes.SIGNIN_SUCCESS:
      console.log('login success');
      return {
        ...state,
        authError: null
      };
    case ActionTypes.SIGNOUT_SUCCESS:
      console.log('signout success');
      return state;
    case ActionTypes.SIGNUP_SUCCESS:
      console.log('signup success');
      return state;
    case ActionTypes.SIGNUP_ERROR:
      console.log('signup error');
      return {
        ...state,
        authError: 'Signup Failed'
      };

    default:
      return state;
  }
};

export default authReducer;
