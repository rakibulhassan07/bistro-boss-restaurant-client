import { createContext, useEffect, useState } from "react";
import {signInWithPopup, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';

export const AuthContext =createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    //create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
      };

      //update user profile
    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      };
        
      const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
      const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }

      useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth,currentUser=>{

            //console.log('user in auth ',currentUser)
            setUser(currentUser);
            setLoading(false);
        });
        return unSubscribe;
    },[]) 
     
        const authInfo={
             user,
             setUser,
             createUser,
             loading,
             logOut,
             signIn,
             updateUserProfile
        } 
    return (
        <AuthContext.Provider value={authInfo}> 
            {children}
        </AuthContext.Provider>
            
    );
};

export default AuthProvider;