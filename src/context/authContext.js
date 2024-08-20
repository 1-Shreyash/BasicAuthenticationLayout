"use client"

import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    //Gmail
    const [user, setuser] = useState({})
    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    const logOut = () =>{
        signOut(auth);
    }
    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth, (currentUser)=>{
            setuser(currentUser);
            // console.log('USER', user);  
        })
        return ()=>{
            unsuscribe()
        }
    }, [])

    //Email and Password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
      };
    const signIn = (email, password) =>  {
        return signInWithEmailAndPassword(auth, email, password)
    }
    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, signIn, createUser}}>
            {children}
        </AuthContext.Provider>
    )
}
export const UserAuth = () =>{
    return useContext(AuthContext);
}