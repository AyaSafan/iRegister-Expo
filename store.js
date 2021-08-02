//import { createStore } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import {LOGIN, LOGOUT, GET_COURSES} from './actions'


//import firebase from 'firebase/app'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'



const initialState = {
    currentUser: null,
    info: null,
    courses: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
      case LOGIN:{ 
        return Object.assign({}, state, {
          ...state,
          currentUser:  action.currentUser,
          info: action.info
        })
        
      }
      case LOGOUT:{ 
        return Object.assign({}, state, {
          ...state,
          currentUser:  action.currentUser
        })
      }
      case GET_COURSES:{ 
        return Object.assign({}, state, {
          ...state,
          courses:  action.courses
        })
      }
      
     default: return state;
}
}

/*
export async function getCourses(dispatch, getState) {
  const stateBefore = getState() 
  const db = firebase.firestore(); 
  if(stateBefore.info.role == "teacher"){    
    const snapshot = await db.collection("courses").where("teacherID", "==", stateBefore.currentUser.uid).get()
    const courses = snapshot.docs.map(doc => doc.data());  
    dispatch({ type: GET_COURSES, courses: courses })
  } else{
    const registrationData = await db.collection("registration").where("studentID", "==", stateBefore.currentUser.uid).get()
    const registrations = registrationData.docs.map(doc => doc.data());
    let codes = [];
    var i;
    for (i in registrations){ codes.push(registrations[i].courseCode)}
    const snapshot = await db.collection("courses").where("code", "in", codes).get()
    const courses = snapshot.docs.map(doc => doc.data()); 
    dispatch({ type: GET_COURSES, courses: courses })   
    }
}*/

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

//const store = createStore(reducer)
const store = createStore(reducer, composedEnhancer)
export default store
