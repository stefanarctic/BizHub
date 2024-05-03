import { useEffect, useState } from "react";
import { auth } from "../firebase/FirebaseSetup";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

export let navigateToLogin = () => {}

const Chat = () => {

    const navigate = useNavigate();
    
    const [refreshComponentV, setRefreshComponentV] = useState(0);

    const refreshComponent = () => {
        setRefreshComponentV(refreshComponentV + 1);
    }

    useEffect(() => {
        navigateToLogin = () => {
            // navigate('/login');
            const linkToLogin = document.createElement('a');
            linkToLogin.href = '/login';
            document.body.appendChild(linkToLogin);
            linkToLogin.click();
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(!user)
            {
                if (!auth.currentUser) {
                    navigateToLogin();
                    // navigate('/login');
                    // navigate('/');
                    // setShowButtonF(true);
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 5000);
                }
            }
            else
            {
                refreshComponent();
            }
        })

        return () => unsubscribe();
    }, []);

    const logOut = () => {
        signOut(auth)
            .then(e => {
                console.log('Logged out');
                // navigate('/');
                navigateToLogin();
            })
            .catch(err => console.error(err));
    }

    return (
        <>
            <nav>
                <div id="logo-container"><span><a href="/">BizHub</a></span></div>
            </nav>
            <main>
                <div className="chat">
                    <h1>Chat</h1>
                    <h3>Signed in as {auth.currentUser && auth.currentUser.displayName}</h3>
                    <button onClick={logOut}>Log Out</button>
                </div>
            </main>
        </>
    );
}

export default Chat;