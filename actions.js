//import firebase from 'firebase/app'
//import "firebase/auth"

export const LOGIN='login'
export const LOGOUT='logout'




export function login(currentUser, info){
    //const currentUser  = firebase.auth().currentUser; 
    return {
    type:LOGIN,
    currentUser: currentUser,
    info: info
    }
}

export function logout(){
    return {
    type:LOGOUT,
    currentUser: null,
    }
}