export const LOGIN='login'
export const LOGOUT='logout'
export const GET_COURSES='get_courses'

import firebase from 'firebase/app'

export function login(currentUser, info){
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

export async function getCourses(dispatch, getState) {
    const stateBefore = getState() 
    const db = firebase.firestore(); 
    if(stateBefore.info.role == "teacher"){    
      const snapshot = await db.collection("courses").where("teacherID", "==", stateBefore.currentUser.uid).get()
      const courses = snapshot.docs.map(doc => doc.data());  
      dispatch({ type: GET_COURSES, courses: courses })
    } else{
      let codes = [];
      //const registrationData = await db.collection("registration").where("studentID", "==", stateBefore.currentUser.uid).get()
      //const registrations = registrationData.docs.map(doc => doc.data());
      const registrationData = await db.collection("registration").where("students", "array-contains", stateBefore.currentUser.uid).get()
      registrationData.docs.map(doc => codes.push(doc.id));      
      //var i;
      //for (i in registrations){ codes.push(registrations[i].courseCode)}
      const snapshot = await db.collection("courses").where("code", "in", codes).get()
      const courses = snapshot.docs.map(doc => doc.data()); 
      dispatch({ type: GET_COURSES, courses: courses })   
      }
  }