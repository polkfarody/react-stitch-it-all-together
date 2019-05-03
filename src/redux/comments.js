import * as ActionTypes from "./ActionTypes";

const defaultState = {
  errMsg: null,
  comments: []
};

export const Comments = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      return {...state, comments: state.comments.concat(action.payload)}

    case ActionTypes.ADD_COMMENTS:
      return {...state, errMsg: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMsg: action.payload, comments: []};

    default:
      return state;
  }
};