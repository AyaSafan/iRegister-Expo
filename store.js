import { createStore } from 'redux'
import {LOGIN, LOGOUT} from './actions'


const initialState = {
    currentUser: null,
    info: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
      case LOGIN:{ 
        return Object.assign({}, state, {
          ...state,
          currentUser:  action.currentUser,
          info:  action.info
        })
      }
      case LOGOUT:{ 
        return Object.assign({}, state, {
          ...state,
          currentUser:  action.currentUser
        })
      }
      
     default: return state;
}
}

const store = createStore(reducer)

export default store
