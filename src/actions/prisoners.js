import * as ActionTypes from './types'
import PrisonerDataService  from '../services/prisoner.service'

export const createPrisoner = (uuid, birthName, preferredName, prison, inmateId, bio, releaseDate, icon, token) => async (dispatch) => {
    try {
        const res = await PrisonerDataService.create({ uuid, birthName, preferredName, prison, inmateId, bio, releaseDate, icon }, token)
        console.log(prison)
        dispatch({
            type: ActionTypes.CREATE_PRISONER,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err)
    }
};

export const retrievePrisoners = (token) => async (dispatch) => {
    try {
        const res = await PrisonerDataService.getAll(token);

        dispatch({
            type: ActionTypes.RETRIEVE_PRISONERS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
};

export const updatePrisoner = (id, data, token) => async (dispatch) => {
    try {
      const res = await PrisonerDataService.update(id, data, token);
  
      dispatch({
        type: ActionTypes.UPDATE_PRISONER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deletePrisoner = (prisoner_id, token) => async (dispatch) => {
    try {
      await PrisonerDataService.delete(prisoner_id, token);
  
      dispatch({
        type: ActionTypes.DELETE_PRISONER,
        payload: prisoner_id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllPrisoners = (token) => async (dispatch) => {
    try {
      const res = await PrisonerDataService.deleteAll(token);
  
      dispatch({
        type: ActionTypes.DELETE_ALL_PRISONERS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findPrisonerByName = (name, token) => async (dispatch) => {
    try {
      const res = await PrisonerDataService.findByName(name, token);
  
      dispatch({
        type: ActionTypes.RETRIEVE_PRISONERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };