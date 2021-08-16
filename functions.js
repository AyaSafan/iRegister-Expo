import firebase from "firebase/app";

// QRCcreate.js
export function formatDate(date) {
  var dd = date.getDay();
  var mm = date.getMonth();
  var yyyy = date.getFullYear();
  var h = date.getHours();
  var m = date.getMinutes();
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  var date = dd + "." + mm + "." + yyyy;
  var time = h + ":" + m;
  return { date: date, time: time };
}

export function havePermission(code, courses) {
  for (let i = 0; i < courses.length; i++) {
    if (code == courses[i].code) {
      return true;
    }
  }
  return false;
}

export async function getKey(code) {
  const db = firebase.firestore();
  const doc = await db.collection("courses").doc(code).get();
  const secretKey = doc.exists ? doc.data().secretKey : null;
  return secretKey;
}
//Course.js
export async function getStatistics(code, currentUser) {
  //getDates
  const db = firebase.firestore();
  const snapshot = await db
    .collection("attendance")
    .doc(code)
    .collection("Dates")
    .get();
  const dates = [];
  snapshot.docs.map((doc) => dates.push(doc.data()));

  //getStatistics
  let total = 0;
  let attended = 0;
  for (let i = 0; i < dates.length; i++) {
    total += 1;
    if (dates[i].students.includes(currentUser.uid)) {
      attended += 1;
    }
  }
  //let percentage = total == 0 ? total : attended / total
  return { dates: dates, attended: attended, total: total };
}

//CourseTeacher.js
export async function getDates(code) {
  const db = firebase.firestore();
  const snapshot = await db
    .collection("attendance")
    .doc(code)
    .collection("Dates")
    .get();
  let dates = [];
  snapshot.docs.map((doc) => dates.push(doc.data()));
  return dates;
}

//AttendanceList.js

export async function getName(uid) {
  const db = firebase.firestore();
  const doc = await db.collection("users").doc(uid).get();
  return { uid: uid, displayname: doc.data().displayname };
}
export async function getRegistration(code) {
  const db = firebase.firestore();
  const doc = await db.collection("registration").doc(code).get();
  const studentUIDs = doc.data().students;
  const students = await Promise.all(
    studentUIDs.map((uid) => {
      return getName(uid).then((student) => student);
    })
  );
  return students;
}

export async function addAttend(code, date, timeStamp, secretKey, uid) {
  const db = firebase.firestore();
  var done = {
    message: null,
    code: null,
    name: null,
  };

  //Check if QR Code Expired
  var now = new Date();
  var nowTimeStamp = now.getTime();
  if (nowTimeStamp > timeStamp) {
    done.message = `QR Code Expired.`;
    return done;
  }

  // Check if Secret Key is correct
  var doc = await db.collection("courses").doc(code).get();
  if (doc.data().secretKey != secretKey) {
    done.message = `QR scan failed.`;
    return done;
  }

  //Check if student is registered in course
  var doc2 = await db.collection("registration").doc(code).get();
  if (!doc2.data().students.includes(uid)) {
    done.message = `QR scan failed.`;
    return done;
  }

  //Add attendance
  var docRef = db
    .collection("attendance")
    .doc(code)
    .collection("Dates")
    .doc(date);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        //console.log("Document data:", doc.data());
        if (!doc.data().students.includes(uid)) {
          doc.update({
            students: firebase.firestore.FieldValue.arrayUnion(uid),
          });
          done.message = `${code} attendance added.`;
        } else {
          done.message = `${code} attendance exists.`;
        }
      } else {
        //console.log("No such document!");
        var data = {
          date: date,
          students: [uid],
        };
        db.collection("attendance")
          .doc(code)
          .collection("Dates")
          .doc(date)
          .set(data);
        done.message = `${code} attendance added.`;
      }
      //set code and name to navigate
      done.code = code;
      done.name = doc.data().name;
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      done.code = null;
      done.name = null;
      done.message = `QR scan failed. Try again later.`;
    });

  return done;
}
