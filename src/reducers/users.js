import * as ActionTypes from '../actions/types';

const initialState = [];

function userReducer(users = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_USER:
      return [...users, payload];
    case ActionTypes.RETRIEVE_USERS:
      return payload;
    case ActionTypes.UPDATE_USER:
      return users.map((user) => {
        if (user.uuid === payload.uuid) {
          return {
            ...user,
            ...payload
          };
        } else {
          return user;
        }
      });
    case ActionTypes.DELETE_USER:
      return users.filter(({ uuid }) => uuid !== payload.uuid);
    case ActionTypes.DELETE_ALL_USERS:
      return [];
    default:
      return users;
  }
}

export default userReducer;