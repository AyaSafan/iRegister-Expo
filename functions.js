import firebase from 'firebase/app'

// QRCcreate.js
export function formatDate(date){
    var dd = date.getDay();
    var mm = date.getMonth(); 
    var yyyy = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    dd = dd < 10 ? "0" + dd : dd;
    mm = mm < 10 ? "0" + mm : mm;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    var date = dd + '.'+ mm + '.'+ yyyy
    var time = h + ":" + m;
    //var dateTime = date + " " + time;
    return({date: date, time: time});
}

export function havePermission(code, courses){
    /*
    courses.map(course =>{
        if(code == course.code){
            return true;
        }
        return false;
    });*/

    for(let i = 0; i < courses.length; i++ ){
      if(code == courses[i].code){
        return true;
      }
    }
      return false;
}
//Course.js
export async function getStatistics(code, currentUser){
    //getDates
    const db = firebase.firestore(); 
    const snapshot = await db.collection("attendance").doc(code).collection("Dates").get()
    const dates = []
    snapshot.docs.map(doc => dates.push(doc.data()));

    //getStatistics
    let total = 0;
    let attended = 0;
    for (let i = 0; i < dates.length; i++) {
        total +=1
        if(dates[i].students.includes(currentUser.uid)){
            attended +=1;
        }       
    }
    return({dates: dates, attended: attended, total:total })


};

//CourseTeacher.js
export async function getDates(code){
    const db = firebase.firestore(); 
    const snapshot = await db.collection("attendance").doc(code).collection("Dates").get()
    let dates = []
    snapshot.docs.map(doc => dates.push(doc.data()));
    return (dates);
}

//AttendanceList.js

export async function getName(uid){
    const db = firebase.firestore(); 
    const doc = await db.collection("users").doc(uid).get()
    return({"uid": uid, "displayname": doc.data().displayname})
};
export async function getRegistration(code){
    const db = firebase.firestore(); 
    const doc = await db.collection("registration").doc(code).get()
    const studentUIDs =  doc.data().students;
    //const students= []
    const students = await Promise.all(studentUIDs.map(uid => {
        return getName(uid).then((student)=> student )
    }))
    /*
    studentUIDs.forEach(uid => {getName(uid).then((displayname)=>{ 
        
        var student = {"uid": uid, "displayname": displayname}
        students.push(student);
        console.log(student)
        //console.log(students)
        
    })})*/
    /*
    for(let i = 0; i < studentUIDs.length; i++ ){
        console.log(studentUIDs[i])
        getName(studentUIDs[i]).then((displayname)=> console.log(displayname))     
    } */
    console.log(students)
    return (students);
}

