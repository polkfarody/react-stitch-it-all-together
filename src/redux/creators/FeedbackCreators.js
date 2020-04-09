import * as ActionTypes from '../ActionTypes'
import {baseUrl} from "../../shared/baseUrl";

// Feedback
export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
});

export const postFeedback = (feedback) => (dispatch) => {
  const newFeedback = {...feedback};

  newFeedback.date = new Date().toISOString();

  return fetch(baseUrl + 'feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFeedback),
    credentials: 'same-origin'
  })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      }, error => {
        let errMsg = new Error(error.message);
        throw errMsg;
      })
      .then(response => response.json())
      .then(response => dispatch(addFeedback(response)))
      .catch(error => {
        console.log('Post feedback', error.message);
        alert('Your feedback could not be posted\nError:' + error.message)
      })
};