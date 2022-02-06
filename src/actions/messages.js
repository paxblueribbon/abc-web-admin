import * as ActionTypes from './types'
import MessageDataService from '../services/messages'

export const createConversation = (userId, prisonerId, prisonerName, token) => async (dispatch) => {
  console.log("Creating conversation")
    try {
        const res = await MessageDataService.createConversation({userId, prisonerId, prisonerName}, token) 
        dispatch({
            type: ActionTypes.CREATE_CONVERSATION,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err)
    }
};

export const createMessage = (sender, prisonerId, userId, body, token) => async (dispatch) => {
  try {
      const res = await MessageDataService.createMessage({sender, prisonerId, userId, body}, token);
      dispatch({
          type: ActionTypes.CREATE_MESSAGE,
          payload: res.data,
      });
      return Promise.resolve(res.data);
  } catch (err) {
      return Promise.reject(err)
  }
};

export const retrieveConversations = (userId, token) => async (dispatch) => {
    try {
        const res = await MessageDataService.getConversations(userId, token);

        dispatch({
            type: ActionTypes.RETREIVE_CONVERSATIONS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
};

export const retrieveMessages = (userId, prisonerId, token) => async (dispatch) => {
  try {
      const res = await MessageDataService.getMessages(userId, prisonerId, token);

      dispatch({
          type: ActionTypes.RETREIVE_MESSAGES,
          payload: res.data,
      });
  } catch (err) {
      console.log(err);
  }
};

export const retrieveUnsent = (token) => async (dispatch) => {
  try {
      const res = await MessageDataService.getUnread(token);

      dispatch({
          type: ActionTypes.RETREIVE_UNSENT,
          payload: res.data,
      });
  } catch (err) {
      console.log(err);
  }
};

export const updateConversation = (data, token) => async (dispatch) => {
    try {
      const res = await MessageDataService.updateConversation(data, token);
  
      dispatch({
        type: ActionTypes.UPDATE_CONVERSATION,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateMessage = (data, token) => async (dispatch) => {
    try {
      const res = await MessageDataService.updateMessage(data, token);
  
      dispatch({
        type: ActionTypes.UPDATE_MESSAGE,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteConversation = (userId, prisonerId, token) => async (dispatch) => {
    try {
      await MessageDataService.deleteConversation(userId, prisonerId, token);
  
      dispatch({
        type: ActionTypes.DELETE_CONVERSATION,
        payload: { prisonerId },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteMessage = (userId, prisonerId, messageId, token) => async (dispatch) => {
    try {
      const res = await MessageDataService.deleteMessage(userId, prisonerId, messageId, token);
  
      dispatch({
        type: ActionTypes.DELETE_MESSAGE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };