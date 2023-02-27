import React, { useContext, useEffect, useState } from 'react'
import {auth} from '../firebase';

const AuthContext = React.createContext(AuthProvider);
export const useAuth = ()=> useContext(AuthContext);
export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const value = {
        currentUser,
        signup,
        login,
        logout
    }
     function signup(email, password) {
       return auth.createUserWithEmailAndPassword(email, password)
    }
     function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }
     function logout(){
        return auth.signOut();
     }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
