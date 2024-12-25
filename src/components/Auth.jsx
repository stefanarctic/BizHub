import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { useNavigate } from "react-router-dom";

const Auth = () => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        // Try to sign in
        let userCredential = null;
        try {
            userCredential = await signInWithPopup(auth, provider);
        } catch(error) {
            console.error('--- Error in logging in with Google --- \n', error);
        }

        console.log(`Signed in with Google as ${userCredential.user.displayName}`);
        navigate('/app');
    }

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