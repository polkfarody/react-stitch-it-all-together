import * as ActionTypes from "./ActionTypes";

const defaultState = {
  errMsg: null,
  feedback: []
};

export const Feedback = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
      return {...state, feedback: state.feedback.concat(action.payload)}

    case ActionTypes.FEEDBACK_FAILED:
      return {...state, errMsg: action.payload, feedback: []};

    default:
      return state;
  }
};