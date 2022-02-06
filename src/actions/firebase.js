import * as ActionTypes from "./types";
import firebase from "../services/firebase";

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: ActionTypes.SIGNIN_SUCCESS });
    }).catch((err) => {
      dispatch({ type: ActionTypes.SIGNIN_ERROR, err });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    firebase.auth().signOut()
    .then(() => {
      dispatch({type: ActionTypes.SIGNOUT_SUCCESS})
    })
  }
}

export const refreshAccessToken = () => {
  firebase.auth.refreshAccessToken();
}

export const signUp = (credentials) => {
  return (dispatch, getState) => {
    firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({ type: ActionTypes.SIGNUP_SUCCESS });
    }).catch((err) => {
      dispatch({ type: ActionTypes.SIGNUP_ERROR, err})
    })
  }
}