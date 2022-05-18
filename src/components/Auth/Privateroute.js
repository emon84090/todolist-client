import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from './firebaseconfig';


import Spinner from '../Spinner';


const Privateroute = ({ children }) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);


    if (loading) {
        return <Spinner></Spinner>
    }

    if (!user) {
        signOut(auth)
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
};

export default Privateroute;