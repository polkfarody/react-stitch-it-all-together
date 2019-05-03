import * as ActionTypes from "./ActionTypes";

const defaultState = {
  errMsg: null,
  comments: []
};

export const Comments = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      let comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      return {...state, comments: state.comments.concat(comment)}
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMsg: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMsg: action.payload, comments: []};

    default:
      return state;
  }
};