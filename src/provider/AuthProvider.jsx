import { createContext, useEffect, useState } from "react";
import {signInWithPopup, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import useAxiosPublic from "../Hook/useAxiosPublic";

export const AuthContext =createContext(null);
const auth = getAuth(app);
const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const googleProvider= new GoogleAuthProvider();
    const axiosPublic =useAxiosPublic();
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
      //sign in with google
      const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
      }
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
            setUser(currentUser);
            if(currentUser){
                const userInfo={
                  email:currentUser.email,
                }
                axiosPublic.post('jwt',userInfo)
                .then(res=>{
                  if(res.data.token){
                    localStorage.setItem('access-token', res.data.token);
                       setLoading(false);
                  }
                })
            }else{
                localStorage.removeItem('access-token');
                   setLoading(false);
            }
         
        });
        return unSubscribe;
    },[axiosPublic]) 
     
        const authInfo={
             user,
             setUser,
             createUser,
             loading,
             logOut,
             signIn,
             updateUserProfile,
             googleSignIn
        } 
    return (
        <AuthContext.Provider value={authInfo}> 
            {children}
        </AuthContext.Provider>
            
    );
};

export default AuthProvider;