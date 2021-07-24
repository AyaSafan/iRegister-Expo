import { createStore } from 'redux'
import {LOGIN, LOGOUT} from './actions'


const initialState = {
    currentUser: {email: "initial", uid: "initial"},
    info: {displayname: "initial",  role: "teacher"}
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
      
     default: return state;
}
}

const store = createStore(reducer)

export default store
