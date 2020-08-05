import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import Bcrypt from 'bcrypt-nodejs';


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
    var flag=0
    snap.forEach(async doc => {
            const data = doc.data()
         if (data.admissionNo === admsnNo) {
                if(Bcrypt.compareSync(password,data.password)){
                    studentObject=data
                }
                else{
                    flag=1
                    alert("Wrong Password")
                    window.location.href = '/'
                    return true       
                }
         }
         
    })
    if(Object.keys(studentObject).length===0&&flag===0){
        window.location.href = '/'
        alert("User doesn't exist")

    }
    return studentObject
}

export const getTeacher = async (email,password) => {
    var teacherObject={}
    var flag=0
    const snap = await firestore.collection('teachers').get()
    snap.forEach(doc => {
            const data = doc.data()
         if (data.email === email) {
                if(Bcrypt.compareSync(password,data.password)){
                    teacherObject=data
                }
                else{
                    flag=1
                    alert("Wrong Password")
                    window.location.href = '/'
                    return true
                }
         }
         
    })
    if(Object.keys(teacherObject).length===0&flag===0){
        window.location.href = '/'
        alert("User doesn't exist")
    }
    return teacherObject
}

export const getAdmin = async (email,password) => {
    var adminObject={}
    var flag=0
    const snap = await firestore.collection('admin').get()
    snap.forEach(doc => {
            const data = doc.data()
         if (data.email === email) {
                if(Bcrypt.compareSync(password,data.password)){
                    adminObject=data
                }
                else{
                    flag=1
                    alert("Wrong Password")
                    window.location.href = '/'
                    return true
                }
         }
         
    })
    if(Object.keys(adminObject).length===0&&flag===0){
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

export const getSTeacher = async (Class)=>{
    var teacher={} 
    const snap =await firestore.collection("teachers").get();
    snap.forEach(doc=>{
        if(doc.data().Class===Class){
            teacher=doc.data()
        }
    })
    return teacher
}

    
export const compare = (a,b) =>{
    var t = new Date(1970, 0, 1);
    t.setTime(a.createdAt.seconds*1000)
    var f = t
    t=new Date(1970, 0, 1);
    t.setTime(b.createdAt.seconds*1000)
    var s=t
    if(f.getDate()>s.getDate()){
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

export const pushNotificationLA = async(from,to,reason,name,Class)=>{
    await firestore.collection("notifications").add({
        from,
        to,
        reason,
        for:'teacher',
        Class,
        notification:`${name} has applied for a leave from 
        ${from.getDate()} ${month_name(from.getMonth())} to ${to.getDate()} ${month_name(to.getMonth())}`
    })
}

export const getNotificationsDd = async (status,Class)=>{
    const notifications=[]
    if(status==='teacher'){
        const snap1 =await firestore.collection('notifications').get()
        snap1.forEach(doc=>{
            const data=doc.data()
            if(data.Class===Class){
            if(data.for==='teacher'){
                if(!data.read){
                notifications.push(data.notification)
                }
            }
        }
        })
    }
    return notifications
}

export const readMsg = async () =>{
    const snap = await firestore.collection("notifications").get()
    snap.forEach(doc=>{
        doc.ref.update({
            read:true
        })
    })
}

export const changePasswordS = async (op,np,adNo)=>{
    var id;
    const snap = await firestore.collection("students").get()
    snap.forEach(doc=>{
        if(doc.data().admissionNo===adNo){
            id=doc.id
        }
    })
    const doc = await firestore.collection('students').doc(id).get();
    const hashedPassword = doc.data().password
    if(Bcrypt.compareSync(op,hashedPassword)){    
        await firestore.collection("students").doc(id).update({
            password:np
        })
}else{
    alert("old password is wrong")
}
}

export const changePasswordT = async (op,np,email)=>{
    var id;
    const snap = await firestore.collection("teachers").get()
    snap.forEach(doc=>{
        if(doc.data().email===email){
            id=doc.id
        }
    })
    const doc = await firestore.collection('teachers').doc(id).get();
    const hashedPassword = doc.data().password
    if(Bcrypt.compareSync(op,hashedPassword)){    
        await firestore.collection("teachers").doc(id).update({
            password:np
        })
}else{
    alert("old password is wrong")
}
}

export const changePasswordA = async (op,np,email)=>{
    var id;
    const snap = await firestore.collection("admin").get()
    snap.forEach(doc=>{
        if(doc.data().email===email){
            id=doc.id
        }
    })
    const doc = await firestore.collection('admin').doc(id).get();
    const hashedPassword = doc.data().password
    if(Bcrypt.compareSync(op,hashedPassword)){    
        await firestore.collection("admin").doc(id).update({
            password:np
        })
}else{
    alert("old password is wrong")
}
}

export const getNotifications = async (status,Class)=>{
    const notifications=[]
    if(status==='teacher'){
        const snap1 =await firestore.collection('notifications').get()
        snap1.forEach(doc=>{
            const data=doc.data()
            if(data.Class===Class){
            if(data.for==='teacher'){
                notifications.push(data)
             
            }
        }
        })
    }
    return notifications
}

export const addStudentF = async (displayName,parentEmail,parentPhNo,newPassword,parentName,Class,admissionNo,rollNo,photo) =>{
    var storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(photo.name);
    fileRef.put(photo).then(()=>{
        console.log("uploaded")
    })
    await firestore.collection("students").add({
        displayName,
        parentEmail,
        parentName,
        parentPhNo,
        photo:photo.name,
        Class,
        rollNo,
        admissionNo,
        password:newPassword,
        status:"student",
        totalDays:0,
        presentDays:0
    })
}

export const addTeacherF = async (displayName,email,newPassword,Class) =>{
    await firestore.collection("teachers").add({
        displayName,
        email,
        Class,
        password:newPassword,
        status:"teacher",
    })
}

export const setClassCode = async(Class,classCode)=>{
    var flag=0;
    const snap = await firestore.collection("Examination").get()
    snap.forEach( doc=>{
        console.log(Class,doc.data().Class)
        if(Class===doc.data().Class){
             firestore.collection("Examination").doc(doc.id).update({
                classCode
            })
            flag=1
        }
    })
    if(flag===0){
        await firestore.collection("Examination").add({
            Class,
            classCode
        })
    }
    
}

export const getClassCode = async (Class)=>{
    const snap = await firestore.collection("Examination").get()
    var str;
    snap.forEach( doc=>{
        if(Class===doc.data().Class){
             str = doc.data().classCode
        }
        })

        return str
}

export const setResult = async (exam, admissionNo, displayName, obj) =>{
    obj.forEach(async info=>{
        await firestore.collection(`${exam}`).add({
        admissionNo,
        displayName,
        info
    })})
    
}

export const getMarks1 = async (admissionNo) =>{
    var marks=[]
    const snap = await firestore.collection("WeeklyTest1").get()
    snap.forEach(doc=>{
        if(doc.data().admissionNo===admissionNo){
            marks.push(doc.data().info)
        }
    })
    return marks
}

export const getMarks2 = async(admissionNo)=>{
    var marks=[]
    const snap1 = await firestore.collection("WeeklyTest2").get()
    snap1.forEach(doc=>{
        if(doc.data().admissionNo===admissionNo){
            marks.push(doc.data().info)
        }
    })
    return marks
}

export const getMarks3 = async(admissionNo)=>{
    var marks=[]
    const snap2 = await firestore.collection("WeeklyTest3").get()
    snap2.forEach(doc=>{
        if(doc.data().admissionNo===admissionNo){
            marks.push(doc.data().info)
        }
    })
    return marks
}

export const getMarks4 = async(admissionNo)=>{
    var marks=[]
    const snap3 = await firestore.collection("WeeklyTest4").get()
    snap3.forEach(doc=>{
        if(doc.data().admissionNo===admissionNo){
            marks.push(doc.data().info)
        }
    })
    return marks
}

export const getMarksH = async(admissionNo)=>{
    var marks=[]
    const snap4 = await firestore.collection("HalfYearly").get()
    snap4.forEach(doc=>{
        if(doc.data().admissionNo===admissionNo){
            marks.push(doc.data().info)
        }
    })
    return marks
}

export const getMarksA = async(admissionNo)=>{
    var marks=[]
    const snap5 = await firestore.collection("AnnualExam").get()
    snap5.forEach(doc=>{
        if(doc.data().admissionNo===admissionNo){
            marks.push(doc.data().info)
        }
    })
    return marks
}

export const writeChat = async (to,from,msg) =>{
    await firestore.collection("chat").add({
        to,
        from,
        msg,
        dateTime : new Date()
    })
}

export const getChats = async (name) =>{
    var chats=[]
    const snap =await firestore.collection("chat").get()
    snap.forEach(doc=>{
        var data = doc.data()
        if(data.from===name || data.to===name){
            chats.push(data)
        }
    })
    return chats
}