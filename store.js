import { createStore, applyMiddleware } from 'redux'
import {LOGIN, LOGOUT, GET_COURSES} from './actions'



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

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducer, composedEnhancer)
export default store
