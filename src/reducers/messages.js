import * as ActionTypes from '../actions/types';
import conversations from '../components/users/conversations';

const initialState = { conversations: [], messages: [], unsent: [] };

function messageReducer(messageBody = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.CREATE_CONVERSATION:
      return { ...messageBody, conversations: [ ...messageBody.conversations, payload ] };
    case ActionTypes.CREATE_MESSAGE:
      return { ...messageBody, messages: [ ...messageBody.messages, payload ] };
    case ActionTypes.RETREIVE_CONVERSATIONS:
      return { ...messageBody, conversations: payload };
    case ActionTypes.RETREIVE_MESSAGES:
      return { ...messageBody, messages: payload };
    case ActionTypes.RETREIVE_UNSENT:
      return {...messageBody, unsent: payload};
    case ActionTypes.UPDATE_CONVERSATION:
      return messageBody.conversations.map((conversation, index) => {
        if (conversations.uuid === payload.uuid) {
          return {
            ...messageBody,
            conversations: { ...messageBody.conversations, payload }
          };
        } else {
          return conversation;
        }
      });
    case ActionTypes.DELETE_CONVERSATION:
      return messageBody.conversations.filter(({ uuid }) => uuid !== payload.uuid);
    case ActionTypes.DELETE_MESSAGE:
      return messageBody.messages.filter(({ uuid }) => uuid !== payload.uuid);
    default:
      return messageBody;
  }
}

export default messageReducer;