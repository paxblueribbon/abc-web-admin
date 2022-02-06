import * as ActionTypes from '../actions/types';

const initialState = [];

function PrisonReducer(prisons = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_PRISON:
      return [...prisons, payload];
    case ActionTypes.RETRIEVE_PRISONS:
      return payload;
    case ActionTypes.UPDATE_PRISON:
      return prisons.map((prison) => {
        if (prison.uuid === payload.uuid) {
          return {
            ...prison,
            ...payload
          };
        } else {
          return prison;
        }
      });
    case ActionTypes.DELETE_PRISON:
      return prisons.filter(({ uuid }) => uuid !== payload);
    case ActionTypes.DELETE_ALL_PRISONERS:
      return [];
    default:
      return prisons;
  }
}

export default PrisonReducer;