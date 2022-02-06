import * as ActionTypes from '../actions/types'
import RulesDataService from '../services/rules'

export const retrieveRules = (token) => async (dispatch) => {
  try {
    console.log('Retrieving Rules')
    const res = await RulesDataService.getAll(token);
    dispatch({
      type: ActionTypes.RETRIEVE_RULES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const createRule = (title, description, type, token) => async (dispatch) => {
  try {
      const res = await RulesDataService.create({ title, description, type }, token)
      console.log(token)
      console.log(res)
      dispatch({
          type: ActionTypes.CREATE_RULE,
          payload: res.data,
      });
      return Promise.resolve(res.data);
  } catch (err) {
      return Promise.reject(err)
  }
};