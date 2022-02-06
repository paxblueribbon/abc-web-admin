import * as ActionTypes from './types'
import PrisonDataService  from '../services/prison.service'

export const createPrison = (prisonName, address, rules, inmates, token) => async (dispatch) => {
    try {
        const res = await PrisonDataService.create({ prisonName, address, rules, inmates }, token)
        console.log(token)
        console.log(res)
        dispatch({
            type: ActionTypes.CREATE_PRISON,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err)
    }
};

export const retrievePrisons = (token) => async (dispatch) => {
    try {
        const res = await PrisonDataService.getAll(token);
        dispatch({
            type: ActionTypes.RETRIEVE_PRISONS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
};

export const updatePrison = (id, data, token) => async (dispatch) => {
    try {
      const res = await PrisonDataService.update(id, data, token);
  
      dispatch({
        type: ActionTypes.UPDATE_PRISON,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deletePrison = (id, token) => async (dispatch) => {
    try {
      await PrisonDataService.delete(id, token);
  
      dispatch({
        type: ActionTypes.DELETE_PRISON,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllPrisons = (token) => async (dispatch) => {
    try {
      const res = await PrisonDataService.deleteAll(token);
  
      dispatch({
        type: ActionTypes.DELETE_ALL_PRISONS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findPrisonByName = (name, token) => async (dispatch) => {
    try {
      const res = await PrisonDataService.findByName(name, token);
  
      dispatch({
        type: ActionTypes.RETRIEVE_PRISONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };