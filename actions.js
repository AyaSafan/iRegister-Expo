export const LOGIN = "login";
export const LOGOUT = "logout";
export const GET_COURSES = "get_courses";

import firebase from "firebase/app";

export async function login(dispatch, getState) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  //Get user extra info
  const doc = await db.collection("users").doc(currentUser.uid).get();
  const info = doc.data();
  const user = {
    uid: currentUser.uid,
    email: currentUser.email,
    displayname: info.displayname,
    id: info.id,
    role: info.role,
  };

  return new Promise((resolve, reject) => {
    dispatch({ type: LOGIN, currentUser: user });
    resolve();
  });
}
export async function logout(dispatch, getState) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("logout");
      return new Promise((resolve, reject) => {
        dispatch({ type: LOGOUT });
        resolve();
      });
    })
    .catch((error) => {
      console.log(error);
      return new Promise();
    });
}

export async function getCourses(dispatch, getState) {
  const stateBefore = getState();
  const db = firebase.firestore();
  if (stateBefore.currentUser.role == "teacher") {
    const snapshot = await db
      .collection("courses")
      .where("teacherID", "==", stateBefore.currentUser.uid)
      .get();
    const courses = snapshot.docs.map((doc) => doc.data());
    dispatch({ type: GET_COURSES, courses: courses });
  } else {
    //Get Courses Code a student is registered in
    let codes = [];
    const registrationData = await db
      .collection("registration")
      .where("students", "array-contains", stateBefore.currentUser.uid)
      .get();
    registrationData.docs.map((doc) => codes.push(doc.id));

    // Get Course info for each course code
    // if codes[] is not empty
    let courses = [];
    if (codes.length != 0) {
      const snapshot = await db
        .collection("courses")
        .where("code", "in", codes)
        .get();
      courses = snapshot.docs.map((doc) => doc.data());
    }
    dispatch({ type: GET_COURSES, courses: courses });
  }
}
