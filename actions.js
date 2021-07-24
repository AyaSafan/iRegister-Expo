import firebase from 'firebase/app'
import "firebase/auth"
import {db} from './App';

export const LOGIN='login'
export const LOGOUT='logout'



export function login(){
    const currentUser  = firebase.auth().currentUser;
    /*
    const snapshot = db.collection("users").where("id", "==", currentUser.uid).get()
    const users = snapshot.docs.map(doc => doc.data());*/

    return {
    type:LOGIN,
    currentUser: currentUser,
    info: {displayname :"some"}
    }
}

export function logout(){
    return {
    type:LOGIN,
    currentUser: null,
    }
}