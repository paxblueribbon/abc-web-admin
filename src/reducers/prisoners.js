import * as ActionTypes from '../actions/types';

const initialState = [];

function prisonerReducer(prisoners = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_PRISONER:
      return [...prisoners, payload];
    case ActionTypes.RETRIEVE_PRISONERS:
      return payload;
    case ActionTypes.UPDATE_PRISONER:
      return prisoners.map((prisoner) => {
        if (prisoner.uuid === payload.uuid) {
          return {
            ...prisoner,
            ...payload
          };
        } else {
          return prisoner;
        }
      });
    case ActionTypes.DELETE_PRISONER:
      return prisoners.filter(({ uuid }) => uuid !== payload);
    case ActionTypes.DELETE_ALL_PRISONERS:
      return [];
    default:
      return prisoners;
  }
}

export default prisonerReducer;
