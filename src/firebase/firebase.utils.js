import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyChrS5ozV7d66pr250Of9-y5T8cWzpzGYo",
    authDomain: "erpsystempro-586da.firebaseapp.com",
    databaseURL: "https://erpsystempro-586da.firebaseio.com",
    projectId: "erpsystempro-586da",
    storageBucket: "erpsystempro-586da.appspot.com",
    messagingSenderId: "553280373601",
    appId: "1:553280373601:web:647ea72003d8615b5d7b20",
    measurementId: "G-K6K5MYSL6G"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getStudent = async (admsnNo,password) => {
    var studentObject={}
    const snap = await firestore.collection('students').get()
    snap.forEach(doc => {
            const data = doc.data()
         if (data.admissionNo === admsnNo) {
                if(data.password===password){
                    studentObject=data
                }
                else{
                    alert("Wrong Password")
                }
         }
         
    })
    if(Object.keys(studentObject).length===0){
        alert("User doesn't exist")
    }
    return studentObject
}

export const getTeacher = async (email,password) => {
    var teacherObject={}
    const snap = await firestore.collection('teachers').get()
    snap.forEach(doc => {
            const data = doc.data()
         if (data.email === email) {
                if(data.password===password){
                    teacherObject=data
                }
                else{
                    alert("Wrong Password")
                }
         }
         
    })
    if(Object.keys(teacherObject).length===0){
        alert("User doesn't exist")
    }
    return teacherObject
}

export const getAdmin = async (email,password) => {
    var adminObject={}
    const snap = await firestore.collection('admin').get()
    snap.forEach(doc => {
            const data = doc.data()
         if (data.email === email) {
                if(data.password===password){
                    adminObject=data
                }
                else{
                    alert("Wrong Password")
                }
         }
         
    })
    if(Object.keys(adminObject).length===0){
        alert("User doesn't exist")
    }
    return adminObject
}

// export const addData = () =>{
//     var i;
//     for(i=1;i<=30;i++){
//     firestore.collection('students').doc('iIbLFjaBCb9uPy0oYQzG').collection('Attendance').doc(`june${i}`).set({
//         admissionNo:'100143',
//         present:true,
//         createdAt:new Date(2020,5,i)
//     })}
// }

export const getAttendance = async (admissionNo,month) =>{
    const ref = firestore.collection(`students`).where("admissionNo","==",admissionNo)
    var detail = []
    const snap1 = await ref.get()
    snap1.forEach( doc => {
        detailList(doc,admissionNo,detail,month)
        })

     detail.sort(compare)
     return detail

}

const detailList = async (doc,admissionNo,detail,month) => {
    const snap2 = await firestore.collection('students').doc(doc.id).collection('Attendance').get()
    snap2.forEach(doc2 => {
        const data = doc2.data()
        if (data.admissionNo === admissionNo) {
            if(doc2.id.includes(month)){
                detail.push(data)
            }
        }
    })
}

    
const compare = (a,b) =>{
    var t = new Date(1970, 0, 1);
    t.setSeconds(a.createdAt.seconds)
    var f = t
    t=new Date(1970, 0, 1);
    t.setSeconds(b.createdAt.seconds)
    var s=t
    if(f.getDay()>s.getDay()){
        return 1
    }else{
        return -1
    }
}