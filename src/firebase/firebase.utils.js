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
                    window.location.href = '/'
                    alert("Wrong Password")
                    

                }
         }
         
    })
    if(Object.keys(studentObject).length===0){
        window.location.href = '/'
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
                    window.location.href = '/'
                    alert("Wrong Password")
                }
         }
         
    })
    if(Object.keys(teacherObject).length===0){
        window.location.href = '/'
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
                    window.location.href = '/'
                    alert("Wrong Password")
                }
         }
         
    })
    if(Object.keys(adminObject).length===0){
        window.location.href = '/'
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
    t.setTime(a.createdAt.seconds*1000)
    var f = t
    t=new Date(1970, 0, 1);
    t.setTime(b.createdAt.seconds*1000)
    var s=t
    if(f.getDay()>s.getDay()){
        return 1
    }else{
        return -1
    }
}

export const getStudentByClass = async(Class) =>{
    var students=[]
    const ref = firestore.collection(`students`).where("Class","==",Class)
    const snap = await ref.get()
    snap.forEach(doc=>{
        var data = doc.data()
        students.push(data)
    })
    return students
}

export const writeAttendance = async(present,admissionNo,Class,email) =>{
    const snap = await firestore.collection(`students`).get()
    var id = []
    snap.forEach(async doc => {
        if (Class === doc.data().Class) {
            id.push(doc.id)
        }
    })
    id.forEach(async id => {
        const createdAt = new Date();
        const Ref =  firestore.collection('students').doc(id).collection('Attendance').doc(`${month_name(createdAt.getMonth())}${createdAt.getDate()}`)    
            try {
                await Ref.set({
                    present,
                    admissionNo,
                    createdAt,
                })
            }
            catch (error) {
                console.log("error in creating user", error.message)
            }
        
    })
    var idt;
    const snapt = await firestore.collection("teachers").get()
    snapt.forEach(doc=>{
        console.log(doc.data().email)
        if(email===doc.data().email){
            idt=doc.id
        }
    })
    firestore.collection("teachers").doc(idt).update({
        taken:new Date()
    })
}

var month_name = function(n){
    const mlist = [ "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];
      return mlist[n];
};


export const alreadyDone= async(email)=>{
    var today = new Date()
    const snap = await firestore.collection(`teachers`).get();
    var id;
    snap.forEach(async doc => {
        if (email === doc.data().email) {
            id=(doc.id)
        }
    })
    var doc= await firestore.collection('teachers').doc(id).get()
    if('taken' in doc.data()){
        var d = doc.data().taken
        var t = new Date(1970, 0, 1);
        t.setTime(d.seconds*1000)
        if(t.getDate()===today.getDate() && t.getMonth()===today.getMonth()){
            alert("Attendance already taken!!")
            return true
        }else{
            firestore.collection('teachers').doc(id).update({
                taken:today
            })
            return false
        }
    }
    else{
    firestore.collection('teachers').doc(id).update({
        taken:today,
    })
    return false
     } 
}

export const getAllStudents = async () =>{
    var students=[]
    const snap = await firestore.collection('students').get()
    snap.forEach(doc=>{
        const data=doc.data()
        students.push(data)
    })
    return students;
}

export const changeSAttendance = async (nameString) =>{
    var student;
    const snap = await firestore.collection('students').get()
    snap.forEach(doc=>{
        const data=doc.data()
        if(data.displayName===nameString){
            student=data
        }
    })
    return student;
}

export const writeSAttendance = async (present,dateStr,admissionNo)=>{
    const snap = await firestore.collection(`students`).get();
    var id;
    snap.forEach(async doc => {
        if (admissionNo === doc.data().admissionNo) {
            id=(doc.id)
        }
    })
    var createdAt = new Date(dateStr)
    const ref=firestore.collection('students').doc(id).collection('Attendance').doc(`${month_name(createdAt.getMonth()-1)}${createdAt.getDate()}`)
    try {
        await ref.update({
            present,
            createdAt
        })
    }
    catch (error) {
        console.log("error in creating user", error.message)
    }
}

export const leaveSApplication = async (present,dateStr,admissionNo)=>{
    const snap = await firestore.collection(`students`).get();
    var id;
    snap.forEach(async doc => {
        if (admissionNo === doc.data().admissionNo) {
            id=(doc.id)
        }
    })
    var docIddate =dateStr.getDate()
    var docIdmon=`${month_name(dateStr.getMonth())}`
    const ref=firestore.collection('students').doc(id).collection('Attendance').doc(docIdmon+docIddate)
    try {
        await ref.set({
            present,
            admissionNo,
            createdAt:dateStr,
        })
    }
    catch (error) {
        console.log("error in creating user", error.message)
    }
}

export const addFromAndTo = async (admissionNo,from,to) =>{
    const snap = await firestore.collection(`students`).get();
    var id;
    snap.forEach(async doc => {
        if (admissionNo === doc.data().admissionNo) {
            id=(doc.id)
        }
    })
    const snap1 = await firestore.collection("students").doc(id).update({
        from,
        to
    })
    console.log(snap1)
}

export const writeNotice =async  (file,email,heading,description)=>{
    var storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(()=>{
        console.log("uploaded")
    })
    const sno = await getSno()
    firestore.collection('notices').add({
        heading,
        description,
        craetedAt:new Date(),
        doc:file.name,
        email,
        sno:sno+1
    })
    await firestore.doc("noticesSno/hsno").update({
        sno:sno+1
    })
}

export const getNotices = async () =>{
    var notices=[]
    const snap = await firestore.collection('notices').get()
    snap.forEach(doc=>{
        var data = doc.data()
        notices.push(data)
    })
    return notices
}

export const updateDays = async (totalDays,presentDays,admissionNo) => {
    const snap = await firestore.collection(`students`).get()
    var id
    snap.forEach(async doc => {
        if (admissionNo === doc.data().admissionNo) {
            id=doc.id
        }
    })
        const Ref = firestore.collection('students').doc(id)

        const res = await Ref.update({ totalDays: totalDays, presentDays: presentDays });
        console.log(res)
}

const giveMonth = async (email) =>{
    var mon;
    const d = new Date();
    const snap = await firestore.collection(`teachers`).get()
    snap.forEach(async (doc,i) => {
        if(doc.data().email===email){
            var t = new Date(1970, 0, 1);
            t.setTime(doc.data().taken.seconds*1000)
            mon =  t.getMonth()
            var monc=d.getMonth()
            if(mon===monc){
                return true
            }else{
                return false
            }
        }
    })
}

export const emailDetails= async()=>{
    const details=[]
    const snap1= await firestore.collection('students').get()
    snap1.forEach(doc=>{
        var emailsD={}
        emailsD["email"]=doc.data().parentEmail
        emailsD["totalDays"]= doc.data().totalDays
        emailsD["presentDays"]= doc.data().presentDays
        if(!giveMonth("teacher2@gmail.com")){
            emailsD["fire"]=true
        }else{
            emailsD["fire"]=false
        }
        details.push(emailsD)
    })
    return details
}


export const checker = async (email) =>{
    var taken
    var createdAt=new Date()
    const snap =await firestore.collection("teachers").get()
    snap.forEach(doc=>{
        if(doc.data().email===email){
            taken=doc.data().taken
        }
    })
    var t = new Date(1970, 0, 1);
    t.setTime(taken.seconds*1000)
    console.log(t.getDate(),createdAt.getDate(),taken)
    if(t.getDate()!==createdAt.getDate()){
        return true
    }
    else{
        return false
    }
}

export const getStudentByClassFilter = async(Class) =>{
    var today = new Date()
    var tf = new Date(1970, 0, 1);
    var tt = new Date(1970, 0, 1);
    var students=[]
    const ref = firestore.collection(`students`).where("Class","==",Class)
    const snap = await ref.get()
    snap.forEach(doc=>{
        var data = doc.data()
        if('from' in data){
        tf.setTime(data.from.seconds*1000)
        tt.setTime(data.to.seconds*1000)
        if(today<tf || today>tt){
        students.push(data)
        }}else{
        students.push(data)
        }
    })
    return students
}

const getSno =async () =>{
    const doc = await firestore.doc("noticesSno/hsno").get()
    return doc.data().sno
}

export const deleteNotice = async (sno) =>{
    var id;
    const snap = await firestore.collection("notices").get()
    snap.forEach(doc=>{
        if(sno===doc.data().sno){
            id = doc.id
        }
    })
    await firestore.collection("notices").doc(id).delete()
}

export const getSNotice = async (sno) =>{
    var notice;
    const snap = await firestore.collection("notices").get()
    snap.forEach(doc=>{
        if(sno===doc.data().sno){
            notice = doc.data()
        }
    })
    return notice;
}