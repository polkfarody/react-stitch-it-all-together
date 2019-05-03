import * as ActionTypes from "./ActionTypes";

const defaultState = {
  isLoading: true,
  errMsg: null,
  promotions: []
};

export const Promotions = (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {...state, isLoading: false, errMsg: null, promotions: action.payload};

    case ActionTypes.PROMOS_LOADING:
      return {...state, isLoading: true, errMsg: null, promotions: []};

    case ActionTypes.PROMOS_FAILED:
      return {...state, isLoading: false, errMsg: action.payload, promotions: []};

    default:
      return state;
  }
};