import React, {useContext, useState, useEffect} from 'react';
import {firebaseAuth} from '../util/firebase';
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const value = {
        currentUser
    };

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
            console.log(user);
            if (user && history.location.pathname === '/login') {
                history.push('/');
            } else if (user && history.location.pathname === '/sigup') {
                history.push('/');
            }
        });

        return unsubscribe;
    }, [])


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
