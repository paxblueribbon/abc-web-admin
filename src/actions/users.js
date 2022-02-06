import * as ActionTypes from './types'
import UserDataService  from '../services/user'

export const createUser = (userName, address, rules, token) => async (dispatch) => {
    try {
        const res = await UserDataService.create({ userName, address, rules, token })
        console.log(res)
        dispatch({
            type: ActionTypes.CREATE_USER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err)
    }
};

export const retrieveUsers = (token) => async (dispatch) => {
    try {
        const res = await UserDataService.getAll(token);
        dispatch({
            type: ActionTypes.RETRIEVE_USERS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
};

export const updateUser = (id, data, token) => async (dispatch) => {
    try {
      const res = await UserDataService.update(id, data, token);
  
      dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (id, token) => async (dispatch) => {
    try {
      await UserDataService.delete(id, token);
  
      dispatch({
        type: ActionTypes.DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllUsers = (token) => async (dispatch) => {
    try {
      const res = await UserDataService.deleteAll(token);
  
      dispatch({
        type: ActionTypes.DELETE_ALL_USERS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findUserByName = (name, token) => async (dispatch) => {
    try {
      const res = await UserDataService.findByName(name, token);
  
      dispatch({
        type: ActionTypes.RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };