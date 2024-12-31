import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, usersCollection } from "../firebase/FirebaseSetup";
import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import initScrollAnimation from "./Util/ScrollAnimation";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/currentUser";
import useAuth from "../hooks/useAuth";


export let navigateGlobal = () => {
    console.log('navigate doesnt work');
}

getAuthGlobal = () => {
    return auth;
}

const Auth = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { logIn, getUserFromDatabase } = useAuth();

    const signInWithGoogle = async () => {

        await logIn();
        console.log(`Signed in with Google as ${auth.currentUser.displayName}`);

        // If user doesn't exist in the database, add them (log in or register the account)
        let userDocument = await getUserFromDatabase(auth.currentUser.uid);
        if(!userDocument)
        {
            try {
                const documentRef = await addDoc(usersCollection, {
                    uid: auth.currentUser.uid,
                    name: auth.currentUser.displayName,
                    email: auth.currentUser.email,
                    photoURL: auth.currentUser.photoURL,
                    joinedWorkspaces: []
                });
                userDocument = await getDoc(documentRef);
                dispatch(setCurrentUser(userDocument.data()));
                console.log(`User ${userDocument.data().name} added to Firestore`);    
            } catch (firestoreError) {
                console.error("Error adding user to Firestore:", firestoreError);
            }
        }
        else
        {
            console.log('dispatched')
            // dispatch(setCurrentUser(userDocument.data()));
        }

        navigate('/app');
    }

    useEffect(() => {
        initScrollAnimation();

        navigateGlobal = navigate;
    }, []);

    return (
        <>
            <nav>
                <div id="logo-container"><span><a href="/">BizHub</a></span></div>
            </nav>
            <main>
                <div className="auth-section hidden">
                    <div className="login-with-google-button" onClick={signInWithGoogle}>Sign in with Google</div>
                </div>
            </main>

        </>
    );
}

export default Auth;