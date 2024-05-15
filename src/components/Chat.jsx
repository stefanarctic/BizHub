import { useEffect, useState } from "react";
import { auth, db } from "../firebase/FirebaseSetup";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import Messages from "./chat/messages/Messages";
import WorkspaceSection from "./chat/workspacesection/WorkspaceSection";

export let navigateToLogin = () => { }

const Chat = () => {

    const navigate = useNavigate();

    const [refreshComponentV, setRefreshComponentV] = useState(0);

    const refreshComponent = () => {
        setRefreshComponentV(refreshComponentV + 1);
    }

    // Navigate to login
    useEffect(() => {
        navigateToLogin = () => {
            // navigate('/login');
            const linkToLogin = document.createElement('a');
            linkToLogin.href = '/login';
            document.body.appendChild(linkToLogin);
            linkToLogin.click();
        }
    }, []);

    // Check if user is logged in, else redirect to login page
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                if (!auth.currentUser) {
                    navigateToLogin();
                }
            }
            else {
                refreshComponent();
                addCurrentUser();
            }
        })

        return () => unsubscribe();
    }, []);

    // Log out when user presses Escape (REMOVE)
    useEffect(() => {
        document.addEventListener('keydown', e => {
            if(e.key === 'Escape')
            {
                logOut();
            }
        });
    }, []);

    const logOut = () => {
        signOut(auth)
            .then(e => {
                console.log('Logged out');
                navigateToLogin();
            })
            .catch(err => console.error(err));
    }

    /* --- Fetch Data from the database --- */
                    
    const [users, setUsers] = useState([]);

    const usersCollectionRef = collection(db, 'users');
    const workspacesCollectionRef = collection(db, 'workspaces');

    // Retrieve users if collection got updated
    useEffect(() => {
        const unsubscribe = onSnapshot(usersCollectionRef, querySnapshot => {
            const fetchedUsers = [];
            querySnapshot.forEach(doc => {
                fetchedUsers.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setUsers(fetchedUsers);
        });

        return () => unsubscribe();
    }, []);

    const addCurrentUser = () => {
        if(!auth.currentUser)
        {
            console.error('Not logged in');
            return;
        }

        const q = query(usersCollectionRef, where('uid', '==', auth.currentUser.uid));
        getDocs(q)
            .then(querySnapshot => {
                if(querySnapshot.empty)
                {
                    console.log(`Didn't find user ${auth.currentUser.displayName} in the database.`);
                    addDoc(usersCollectionRef, {
                        email: auth.currentUser.email,
                        name: auth.currentUser.displayName,
                        photoURL: auth.currentUser.photoURL,
                        uid: auth.currentUser.uid
                    })
                    .then(e => {
                        console.log(`Added doc of user ${auth.currentUser.displayName} with the document id ${e.id}`);
                    })
                    .catch(err => {
                        console.error(err);
                    });
                }
                else
                {
                    console.log(`Found user ${auth.currentUser.displayName} in the database.`);
                    // console.log(`Document ids: `)
                    // querySnapshot.forEach(doc => {
                    //     console.log(doc.id);
                    // });
                }
            })
            .catch(err => {
                console.error(`Error in retrieving document for user ${auth.currentUser.displayName}`, err);
            });
    }

    useEffect(() => {
        if(users.length === 0)
            return;

        console.log(users);
    }, [users]);


    return (
        <>
            <nav>
                <div id="logo-container"><span><a href="/">BizHub</a></span></div>
            </nav>
            <main>
                <div className="chat">
                    <WorkspaceSection />
                    <Messages />
                </div>
            </main>
        </>
    );
}

export default Chat;