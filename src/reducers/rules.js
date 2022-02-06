import * as ActionTypes from '../actions/types';

const initialState = [];

function RuleReducer(rules = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.RETRIEVE_RULES:
      return payload;
    case ActionTypes.CREATE_RULE:
      return [...rules, payload]
    case ActionTypes.UPDATE_RULE:
      return rules.map((rule) => {
        if (rule.uuid === payload.uuid) {
          return {
            ...rule, ...payload
          };
        } else {
          return rule;
        }
      })
    default: return rules
  }
}

export default RuleReducer