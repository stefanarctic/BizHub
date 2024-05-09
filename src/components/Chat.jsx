import { useEffect, useState } from "react";
import { auth, db } from "../firebase/FirebaseSetup";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";

export let navigateToLogin = () => { }

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
            if (!user) {
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
            else {
                refreshComponent();
                addCurrentUser();
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




    
    // useEffect(() => {
        //     // Get firestore data
        //     getDocs(usersCollectionRef)
        //         .then(data => {
            //             // console.log(data);
            //             const usersData = data.docs.map((doc) => ({
                //                 ...doc.data(),
                //                 id: doc.id
                //             }));
                //             setUsers(usersData);
                //             // setUsers(data.docs)
                //         })
                //         .catch(err => {
                    //             console.error(err);
                    //         });
                    // }, []);
                    
    const [users, setUsers] = useState([]);

    const usersCollectionRef = collection(db, 'users');
    const workspacesCollectionRef = collection(db, 'workspaces');

    const testF = () => {
        // Add a test workspace
        const workspace2 = {
            name: "Workspace2",
            id: "workspace2-id",
            channels: [
                {
                    name: "General",
                    id: "General-id",
                    isDM: false
                },
                {
                    name: "Announcements",
                    id: "Announcements-id",
                    isDM: false
                },
                {
                    name: "DM Joe - Steve",
                    id: "joe-steve-dm-id",
                    isDM: true
                }
            ]
        };

        addDoc(workspacesCollectionRef, workspace2)
            .then(e => {
                console.log('Added workspace2');
            })
            .catch(err => {
                console.error(err);
            });
    }

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

        
        // If user is logged in, check if the current user already exists in the database
        // firebase.firestore()
        //     .collection('users')
        //         .where('uid', '==', auth.currentUser.uid)
        //             .get()
        //                 .then(selectedDoc => {
        //                     if(selectedDoc.empty)
        //                     {
        //                         console.log(`Didn't find user ${auth.currentUser.displayName} in the database`);
        //                     }
        //                     else
        //                     {
        //                         console.log(`Found user ${auth.currentUser.displayName} in the database`);
        //                     }
        //                 })
        //                 .catch(err => {
        //                     console.error(`Error in retrieving document for user ${auth.currentUser.displayName}`, err);
        //                 });

        // const q = query('users', where('uid', '==', auth.currentUser.uid));
        // getDocs(q, db)
        //     .then(querySnapshot => {
        //         if(querySnapshot.empty)
        //         {
        //             addDoc(usersCollectionRef, {
        //                 email: auth.currentUser.email,
        //                 name: auth.currentUser.displayName,
        //                 photoURL: auth.currentUser.photoURL,
        //                 uid: auth.currentUser.uid
        //             }).then(e => {
        //                 console.log(`Added doc of user ${auth.currentUser.displayName} with the id ${e.id}`);
        //             }).catch(err => {
        //                 console.error(err);
        //             });
        //         }
        //         else
        //         {
        //             console.error(`User ${auth.currentUser.displayName} already exists in the database`);
        //         }
        //     })
        //     .catch(err => {
        //         console.error('Error checking for user: ', err);
        //     });
    }

    useEffect(() => {
        if(users.length === 0)
            return;

        console.log(users);
    }, [users]);

    // doc(db, 'users',)

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
                    {/* <button onClick={testF}>Test</button> */}
                </div>
            </main>
        </>
    );
}

export default Chat;