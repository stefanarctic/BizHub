import { useEffect, useRef, useState } from "react";
import { app, auth, db } from "../firebase/FirebaseSetup";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { Messages } from "./chat/messages/Messages";
import WorkspaceSection from "./chat/workspacesection/WorkspaceSection";
import { getChannelsParent } from "./chat/workspacesection/list/conversationselector/ConversationSelector";
import { DataManager } from "./chat/DataManager";
import { onUpdateCurrentWorkspace, onUpdateJoinedWorkspaces } from "./chat/workspacesection/list/workspacetitle/WorkspaceTitle";

export let navigateToLogin = () => {}

export let callOnLogin = () => {}

export const getUserFromDatabase = (userId, onFinish, onError) => {
    let user = null;
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('uid', '==', userId));
    getDocs(q)
        .then(querySnapshot => {
            if(querySnapshot.empty)
            {
                // User not found in database
                onFinish(null);
            }
            else
            {
                // If user is in the database, that means q contains a single document, which is the current user
                const currentUserDocumentSnapshot = querySnapshot.docs[0];
                onFinish(currentUserDocumentSnapshot.data());
            }
        })
        .catch(err => onError(err));
        // console.error(`Error in retrieving document for user ${auth.currentUser.displayName}`, err);
}

export const getWorkspace = (workspaceId, onFinish /* docData => {} */, onError) => { // Get workspace data by document id
    const workspaceRef = doc(db, 'workspaces', workspaceId);
    getDoc(workspaceRef)
        .then(doc => {
            if(!doc.exists())
            {
                onError(`Workspace ${workspaceId} doesn't exist in database`);
                return;
            }
            // onFinish(doc.data());
            const docData = doc.data();
            const newData = {
                ...docData,
                id: doc.id
            };
            onFinish(newData);
        })
        .catch(err => {
            onError(err);
        });
}

export const getUser = (userId, onFinish, onError) => { // Get user data by uid
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('uid', '==', userId));
    getDocs(q)
        .then(querySnapshot => {
            if(!querySnapshot.empty())
            {
                onFinish(querySnapshot.docs[0].data());
            }
            else
            {
                onError(`Didn't find user ${userId} in database`);
            }
        })
        .catch(err => {
            onError(err);
        });
}

// const trace = s => {
//     const orig = Error.prepareStackTrace;
//     Error.prepareStackTrace = (_, stack) => stack;
//     const err = new Error();
//     Error.captureStackTrace(err, arguments.callee);
//     Error.prepareStackTrace = orig;
//     const callee = err.stack[0];
//     return (`${path.relative(process.cwd(), callee.getFileName())}:${callee.getLineNumber()}: ${s}\n`);
// }

const Chat = () => {

    // Set global functions (REMOVE)
    // useEffect(() => {
    //     printGoogleAccountDetails = () => {
    //         console.log(auth.currentUser);
    //     }
    //     getUsers = () => {
    //         console.log(users);
    //     }
    //     getWorkspaces = () => {
    //         console.log(workspaces);
    //     }
    // }, []);

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
        callOnLogin = () => {
            onLogin();
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
                // addCurrentUser();
                console.log('Logged in');
                onLogin();
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
                setLoggedIn(false);
                setUser(null);
                navigateToLogin();
            })
            .catch(err => console.error(err));
    }

    /* --- Fetch Data from the database --- */
                    
    // const [users, setUsers] = useState([]);

    // Variables for storing the data on the frontend
    const users = useRef([]);
    const workspaces = useRef([]);

    const [loggedIn, setLoggedIn] = useState(false); // Strictly for rendering the UI or not
    const [user, setUser] = useState(null); // User data
    const [currentWorkspace, setCurrentWorkspace] = useState(null) // Workspace data
    const [joinedWorkspaces, setJoinedWorkspaces] = useState([]); // Workspace data
    const currentWorkspaceId = useRef(''); // Current workspace id
    // const [joinedWorkspaces, setJoinedWorkspaces] = useState([]);
    // const [currentWorkspace, setCurrentWorkspace] = useState(null);

    // Test
    useEffect(() => {
        setTimeout(() => {
            console.log('Joined workspaces (test, test): ', joinedWorkspaces);
            onUpdateJoinedWorkspaces(joinedWorkspaces);
        }, 50);
    }, [joinedWorkspaces]);

    useEffect(() => {
        onUpdateCurrentWorkspace(currentWorkspace);
        // console.log(`Current workspace Chat.jsx: `, currentWorkspace);
    }, [currentWorkspace]);

    useEffect(() => {
        console.log(`On joined workspaces update custom: `, joinedWorkspaces);
    }, [joinedWorkspaces]);

    const onLogin = () => {
        addCurrentUserIfNotFoundInDatabase(userData => {
            console.log('On add current user');
            userData.currentWorkspace = userData.joinedWorkspaces.length === 0 ? null : userData.joinedWorkspaces[0] // If user has joined any workspaces, set the current one to be the first one in the array
            const localStorageCurrentWorkspaceId = localStorage.currentWorkspaceId;
            if(!localStorageCurrentWorkspaceId)
            {
                localStorage.currentWorkspaceId = userData.currentWorkspace;
            }

            userData.currentWorkspace = localStorage.currentWorkspaceId;

            // console.log(`After finishing joined workspaces: `, userData.joinedWorkspaces);
            // Get joined workspaces data
            // console.log(`Joined workspaces:`);
            // userData.joinedWorkspaces.map(joinedWorkspace => console.log(joinedWorkspace));
            // let jw = [];
            // console.log(`On login joined workspaces: `, joinedWorkspaces);
            let jw = [];
            userData.joinedWorkspaces.map(workspaceId => {
                getWorkspace(workspaceId, workspaceData => {
                    jw.push(workspaceData);
                }, err => {
                    console.error(err);
                });
            }, err => {
                console.error(err);
            });
            setJoinedWorkspaces(jw);

            console.log(`State joined workspaces: `, jw);

            // Get current workspace data
            // const currentWorkspaceId = userData.currentWorkspace;
            currentWorkspaceId.current = userData.currentWorkspace;
            console.log(`Userdata current workspace id: `, userData.currentWorkspace);
            // setCurrentWorkspace(getWorkspace(userData))
            getWorkspace(userData.currentWorkspace, workspaceData => {
                setCurrentWorkspace(workspaceData);
            }, err => console.error(err));
            // refreshComponent();
            // console.log('jw: ', jw);
            // console.log('Typeof jw: ', typeof(jw));
            // console.log('First workspace id:', jw.id);
            // console.log('To JSON: ', JSON.stringify(jw));
            // console.log('First workspace: ', jw.join('<>'));
            // jw.map(workspace => console.log(workspace));
            // const cw = jw.find(workspace => workspace.id === currentWorkspaceId);
            // let cw = null;
            // for(let i = 0; i < jw.length; i++)
            // {
            //     if(jw[i].id === currentWorkspaceId)
            //     {
            //         cw = jw[i];
            //         break;
            //     }
            // }
            // if(!cw)
                // console.log('cw null')
            // setCurrentWorkspace(cw);
            // const workspaceCollection
            // userData.joinedWorkspaces.map(workspace => {

            // })
            // setJoinedWorkspaces(userData.joinedWorkspaces.map(workspace => {

            // }));
            // setCurrentWorkspace(userData.currentWorkspace);
            // Get current workspace from the database
            
            // console.log(`Current workspace: ${userData.currentWorkspace}`);
            setUser(userData);
            retrieveDataFromDatabase();
            setupChangesDetection();
            // setJoinedWorkspaces(userData.joinedWorkspaces);
            // setCurrentWorkspace(userData.joinedWorkspaces.length === 0 ? null : userData.joinedWorkspaces[0]); // If user has joined any workspaces, set the current one to be the first one in the array
        }, err => {
            console.error(err);
        });
    }

    useEffect(() => {
        console.log(`Use effect joined workspaces:`, joinedWorkspaces);
        console.log(`Use effect first joined workspace: `, joinedWorkspaces[0]);
        setCurrentWorkspace(joinedWorkspaces.find(workspace => workspace.id === currentWorkspaceId.current));
        // console.log(`Current workspace: `, joinedWorkspaces.find(workspace => workspace.id === currentWorkspaceId.current));
        // console.log(`Current user: `, user);
        // currentWorkspace
    }, [joinedWorkspaces]);

    const retrieveDataFromDatabase = () => {
        // Get users
        const usersCollection = collection(db, 'users');
        const usersQuery = query(usersCollection);
        getDocs(usersQuery).then(docs => {
            users.current = [];
            users.current = docs.docs.map(d => d.data());
            console.log(users.current);
            // usersId.current = users.current.map(user => user.uid);
            // docs.docs.forEach(d => {
            //     users.current.push(d.data());
            // });
        }).catch(err => {
            console.log(err);
        });

        // Get workspaces
        const workspacesCollection = collection(db, 'workspaces');
        const workspacesQuery = query(workspacesCollection);
        getDocs(workspacesQuery).then(docs => {
            // workspaces.current = docs.docs;
            workspaces.current = docs.docs.map(d => ({
                ...d.data(),
                id: d.id
            }));

            console.log('Workspaces:', workspaces.current);
            // workspacesId.current = workspaces.current.map(workspace => workspace.)
        }).catch(err => {
            console.error(err);
        });
    }

    // When user changes
    useEffect(() => {
        if(user)
        {
            setLoggedIn(true); // For UI
            // console.log(user);
        }
    }, [user]);

    const unsubscribesUsers = useRef([]);
    const unsubscribesWorkspaces = useRef([]);

    const setupChangesDetection = () => {
        // For users
        const usersCollection = collection(db, 'users');
        getDocs(usersCollection)
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const unsubscribeUser = onSnapshot(doc.ref, docSnapshot => {
                        // When user data changes, update data
                        const data = docSnapshot.data();

                        // Find user by uid
                        let index = -1;
                        for(let i = 0; i < users.current.length; i++)
                        {
                            if(users.current[i].uid === data.uid)
                            {
                                index = i;
                                break;
                            }
                        }
                        // const index = users.current.indexOf(data);
                        // console.log(`Index: ${index}`);
                        users.current[index] = data;
                        // users.current = [];
                    });
                    unsubscribesUsers.current.push(unsubscribeUser);
                })
            })
            .catch(err => {
                console.error(err);
            });
        
        // For workspaces
        const workspacesCollection = collection(db, 'workspaces');
        getDocs(workspacesCollection)
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const unsubscribeWorkspace = onSnapshot(doc.ref, docSnapshot => {
                        // When workspace data changes, update data
                        const data = docSnapshot.data();

                        // Find workspace by id
                        let index = -1;
                        for(let i = 0; i < workspaces.current.length; i++)
                        {
                            if(workspaces.current[i].uid === data.uid)
                            {
                                index = i;
                                break;
                            }
                        }
                        // console.log(`Index: ${index}`);
                        workspaces.current[index] = data;
                    });
                    unsubscribesWorkspaces.current.push(unsubscribeWorkspace);
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    // Users
    useEffect(() => {
        unsubscribesUsers.current = [];

        return () => {
            unsubscribesUsers.current.forEach(s => s());
            unsubscribesUsers.current = [];
        }
    }, []);

    // Workspaces
    useEffect(() => {
        unsubscribesWorkspaces.current = [];

        return () => {
            unsubscribesWorkspaces.current.forEach(s => s());
            unsubscribesWorkspaces.current = [];
        }
    }, []);

    // // When joinedWorkspaces changes
    // useEffect(() => {
    //     if(joinedWorkspaces)
    //     {
    //         // console.log(`Joined workspaces: ${joinedWorkspaces}`);
    //     }
    // }, [joinedWorkspaces]);

    // // When currentWorkspace changes
    // useEffect(() => {
    //     if(currentWorkspace)
    //     {
    //         // console.log(`Current workspace: ${currentWorkspace}`); // Should be the first joined workspace
    //     }
    // }, [currentWorkspace]);

    // When user properties change
    // useEffect(() => {
    //     if(!auth.currentUser)
    //     {
    //         setLoggedIn(false);
    //     }
    // }, [user]);

    // Database references for retrieving data
    const usersCollectionRef = collection(db, 'users');
    const workspacesCollectionRef = collection(db, 'workspaces');

    // When component loads, load frontend data with firebase data (scrapped)
    useEffect(() => {
        return () => {};
        // Get users
        const usersQuery = query(usersCollectionRef);
        getDocs(usersQuery).then(docs => {
            users.current = [];
            users.current = docs.docs.map(d => d.data());
            // usersId.current = users.current.map(user => user.uid);
            // docs.docs.forEach(d => {
            //     users.current.push(d.data());
            // });
        }).catch(err => {
            console.log(err);
        });

        // Get workspaces
        const workspacesQuery = query(workspacesCollectionRef);
        getDocs(workspacesQuery).then(docs => {
            // workspaces.current = docs.docs;
            workspaces.current = docs.docs.map(d => ({
                ...d.data(),
                id: d.id
            }));
            // workspacesId.current = workspaces.current.map(workspace => workspace.)
        }).catch(err => {
            console.error(err);
        });

        // Update users when collection changes
        // const unsubscribe = onSnapshot(usersCollectionRef, newUsers => {
        //     // Check if user already exists in the database by UID
        //     // If not, add them to the collection
        //     newUsers.docs.forEach(user => {
        //         const data = user.data();
        //         const found = users.current.some(usr => usr.uid === data.id);
        //         // if(!found)
        //     });
        // })

        // Update workspace when collection changes
        // const unsubscribeWorkspaces = onSnapshot(workspacesCollectionRef, newWorkspaces => {
        //     // const currentWorkspace
        //     const currentWorkspaceId = 'test-id';
        //     const currentWorkspaceRef = doc(workspacesCollectionRef, currentWorkspaceId);
        // })
    }, []);

    /* --- Data management system --- */

    // Get test data
    let testWorkspace = null;

    const getTestWorkspace = () => {
        const docId = 'Jeyah3SEEovgRk29EyvD';
        getDoc(doc(workspacesCollectionRef, docId))
        .then(doc => {
            testWorkspace = doc.data();
            console.log(testWorkspace);
        })
        .catch(err => {
            console.error(err);
        });
    }

    // useEffect(() => {
    //     if(testWorkspace)
    //     {

    //     }
    // }, [testWorkspace]);

    // Retrieve users if collection got updated
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(usersCollectionRef, querySnapshot => {
    //         const fetchedUsers = [];
    //         querySnapshot.forEach(doc => {
    //             fetchedUsers.push({
    //                 ...doc.data(),
    //                 id: doc.id
    //             });
    //         });
    //         setUsers(fetchedUsers);
    //     });

    //     return () => unsubscribe();
    // }, []);

    const addCurrentUserIfNotFoundInDatabase = (onFinish /* (d: DocumentData) => {} */, onError) => {
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
                    // If user isn't in database, add them to it
                    addDoc(usersCollectionRef, {
                        email: auth.currentUser.email,
                        name: auth.currentUser.displayName,
                        photoURL: auth.currentUser.photoURL,
                        uid: auth.currentUser.uid,
                        joinedWorkspaces: []
                    })
                    .then(d => {
                        getDoc(d).then(doc => {
                            onFinish(doc.data());
                            // const docData = doc.data();
                            // const newDoc = {
                            //     ...docData,
                            //     id: doc.id
                            // };
                            // onFinish(newDoc);
                        }).catch(err => {
                            console.error(err);
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
                }
                else
                {
                    // If user is already in the database, that means q contains a single document, which is the current user
                    const currentUserDocumentSnapshot = querySnapshot.docs[0];
                    console.log(`Got current user: `, currentUserDocumentSnapshot.data());
                    console.log(`Before finishing joined workspaces: `, currentUserDocumentSnapshot.data().joinedWorkspaces);
                    onFinish(currentUserDocumentSnapshot.data());
                }
            })
            .catch(err => {
                console.error(`Error in retrieving document for user ${auth.currentUser.displayName}`, err);
            });
    }

    const joinWorkspaceById = workspaceId => {
        const workspaceRef = doc(db, 'workspaces', workspaceId);
        getDoc(workspaceRef)
            .then(docSnapshot => {
                if(docSnapshot.exists())
                {
                    const usersCollection = collection(db, 'users');
                    const currentUserId = auth.currentUser.uid;
                    getDocs(usersCollection)
                        .then(querySnapshot => {
                            // console.log('Users:', querySnapshot.docs);
                            querySnapshot.docs.map(doc => {
                                console.log(doc.data());
                            })
                            console.log(querySnapshot.docs.length);
                            // const userData = querySnapshot.docs.find(user => user.data().uid === currentUserId);

                            // Find user by uid
                            let index = -1;
                            for(let i = 0; i < querySnapshot.docs.length; i++)
                            {
                                if(querySnapshot.docs[i].data().uid === currentUserId)
                                {
                                    index = i;
                                    break;
                                }
                            }

                            if(index !== -1)
                            {
                                const userRef = querySnapshot.docs[index].ref;
                                // update(userRef, {
                                //     joinedWorkspaces: [
                                //         workspaceId
                                //     ]
                                // })
                                //     .then(() => {
                                //         console.log('Successfully joined workspace', workspaceId);
                                //     })
                                //     .catch(err => {
                                //         console.error(`Couldn't update document ${userRef.id}`);
                                //         console.error(err);
                                //     });
                                const userData = querySnapshot.docs[index].data();
                                // const joinedWorkspacesOld = querySnapshot.docs[i].data().joinedWorkspaces;
                                const newUser = {
                                    ...userData
                                };
                                newUser.joinedWorkspaces.push(workspaceId);
                                // console.log(newUser);
                                updateDoc(userRef, newUser)
                                    .then(() => {
                                        console.log('Successfully joined workspace', workspaceId);
                                    })
                                    .catch(err => {
                                        console.error(`Couldn't update document ${userRef.id}`);
                                        console.error(err);
                                    });
                            }
                            else
                            {
                                console.error(`User with uid ${currentUserId} not found in the database`);
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        })
                    // const userRef = 
                }
                else
                {
                    console.error(`Workspace with id ${workspaceId} doesn't exist`);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const joinTestWorkspace = () => {
        const testWorkspaceId = 'Jeyah3SEEovgRk29EyvD';
        joinWorkspaceById(testWorkspaceId);
        // const testDataId = 'EiHlGI1GXJy2G9sZVLP0';
        // const testCollection = collection(db, 'testcollection');
        // const docRef = doc(db, 'testcollection', testDataId);

        // const newData = {
        //     test: 'yes1'
        // };

        // updateDoc(docRef, newData)
        //     .then(() => {
        //         console.log('Sucessfully modified document');
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    }

    // Test images:
    // https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8
    // /test/profile-pic1.png

    // user={user} - Read Only
    // user={user} setUser={setUser} - Read and Write

    // useEffect(() => {
    //     console.log(`Current workspace: ${currentWorkspace}`);
    // });

    useEffect(() => {
        // Set button as selected
        // document.getElementsByClassName('channels')[0].children[0].className = 'channel selected';
        setTimeout(() => {
            const channelsParentRef = getChannelsParent();
            // console.log(`Channels parent ref select channel: `, channelsParentRef.current.children);
            console.log(`Joined workspaces channelsParentRef: `, joinedWorkspaces);
            channelsParentRef.current.children.item(0).className = 'channel selected';
            console.log(`CPR: `, channelsParentRef.current.children.item(0).className);
        }, 1000);
    }, []);

    return (
        <>
            <nav>
                <div id="logo-container"><span><a href="/">BizHub</a></span></div>
            </nav>
            <main>
                <div className="chat">
                    <DataManager loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} currentWorkspace={currentWorkspace} setCurrentWorkspace={setCurrentWorkspace} joinedWorkspaces={joinedWorkspaces} setJoinedWorkspaces={setJoinedWorkspaces} currentWorkspaceId={currentWorkspaceId} />
                    { loggedIn && (
                        <>
                            <WorkspaceSection user={user} setUser={setUser} currentWorkspace={currentWorkspace} joinedWorkspaces={joinedWorkspaces} setCurrentWorkspace={setCurrentWorkspace} currentWorkspaceId={currentWorkspaceId} />
                            <Messages user={user} setUser={setUser} loggedIn={loggedIn} currentWorkspace={currentWorkspace} setCurrentWorkspace={setCurrentWorkspace} />
                        </>
                    )}
                    {/* <button onClick={joinTestWorkspace}>Join Test Workspace</button> */}
                    {/* <button onClick={getTestWorkspace}>Test</button> */}
                </div>
            </main>
        </>
    );
}

export default Chat;