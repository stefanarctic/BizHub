import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseSetup";
import { useNavigate } from "react-router-dom";

// export const logOut = (callback, error) => {
//     signOut(auth).then(callback).catch(error);
// }

const Auth = () => {

    // useEffect(() => {
    //     const navLinks = document.querySelectorAll("#nav-list li a");
    //     navLinks.forEach(link => link.classList.remove("selected"));
    //     const logInLink = document.querySelector('#nav-list li a[href="/login"');
    //     logInLink.classList.add("selected");
    // }, []);

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = 'https://apis.google.com/js/platform.js?onload=renderButton';
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);
    //     console.log('Created script');
    // }, []);

    // const onSuccess = googleUser => {
    //     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    // }

    // const onFailure = error => {
    //     console.error(error);
    // }

    // const [refreshButtonState, setRefreshButtonState] = useState(0);
    // const [ran, setRan] = useState(false);
    // const [showLoginButton, setShowLoginButton] = useState(false);

    const navigate = useNavigate();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(e => {
                console.log(`Signed in with Google as ${e.user.displayName}`);
                navigate('/app');
                // setShowButtonF(false);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        signOutFunction = () => {
            signOut(auth).then(e => console.log(`Logged out`)).catch(error => console.error(error));
        }
        printAccountDetails = () => {
            console.log(auth.currentUser);
        }
        console.log('Entered login page');
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