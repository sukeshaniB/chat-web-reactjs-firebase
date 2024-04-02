import React, { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {auth,storage,db} from "../firebase"
import { doc, setDoc} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';


function Register() {
    const [err,setErr]=useState(false)
const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const displayName=e.target[0].value;
        const email=e.target[1].value;
        const password=e.target[2].value;
       

try{
const res = await createUserWithEmailAndPassword(auth, email, password)

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef);

uploadTask.on(
  'state_changed',
  (error) => {
    setErr(true);
  }, 
  () => {
     
    getDownloadURL(uploadTask.snapshot.ref).then(async() => {
      await updateProfile(res.user, {
        displayName,
        
      });
      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        
      });
await setDoc(doc(db,"userChats",res.user.uid),{})
navigate("/")

    });
  });
} catch(err){
 setErr(true);
}
    };
    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className="logo">Chat web</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />

                    <button>Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You do have an account? Login</p>
            </div>

        </div>
    )
}

export default Register