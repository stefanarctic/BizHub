import { useDispatch, useSelector } from "react-redux";
// import { getUsers, setUsers } from "../features/users";
import { useEffect, useRef, useState } from "react";
import { auth, workspacesCollection } from "../firebase/FirebaseSetup";
import { setCurrentUser } from "../features/currentUser";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { setJoinedWorkspaces } from "../features/joinedWorkspaces";
import { setCurrentWorkspace } from "../features/currentWorkspace";
import WorkspaceSection from "./chat/workspacesection/WorkspaceSection";
import Messages from "./chat/messages/Messages";
import { onAuthStateChanged } from "firebase/auth";
import Utils from "./Util/Utils";

const Chat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const users = useSelector(state => state.users.value);
    const currentUser = useSelector(state => state.currentUser.value);
    const joinedWorkspaces = useSelector(state => state.joinedWorkspaces.value);
    const currentWorkspace = useSelector(state => state.currentWorkspace.value);

    const [loggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasInitialized, setHasInitialized] = useState(false);

    const unsubscribes = useRef([]);
    // const [initiatedData, setInitiatedData] = useState(false);
    // const [userFound, setUserFound] = useState(false);

    const { logOut, getUserFromDatabase } = useAuth();

    // Local functions
    // const updateUsers = async () => {
    //     const users = await getUsers();
    //     dispatch(setUsers(users));
    // }

    const setLoggedInUser = async () => {
        // console.log('Logged in user');
        const userDocument = await getUserFromDatabase(auth?.currentUser?.uid);
        dispatch(setCurrentUser(userDocument.data()));
    }

    const isLoggedIn = () => {
        return Object.keys(currentUser).length !== 0;
    }

    const updateJoinedWorkspaces = async () => {
        const joinedWorkspaces = [];

        for (const workspaceId of currentUser.joinedWorkspaces) {
            const workspaceRef = doc(workspacesCollection, workspaceId);
            const workspaceDocument = await getDoc(workspaceRef);

            if (workspaceDocument.exists()) {
                const workspaceData = workspaceDocument.data();

                for (const channel of workspaceData.channels) {
                    channel.createdAt = channel.createdAt.seconds;

                    for (const message of channel.messages) {
                        message.createdAt = message.createdAt.seconds;
                    }
                }

                joinedWorkspaces.push(workspaceData);
            }
        }

        dispatch(setJoinedWorkspaces(joinedWorkspaces));
    }

    const updateJoinedWOrkspacesWithData = async newWorkspace => {

    }

    /* --- Global functions --- */
    // getUsersGlobal = () => {
    //     return users;
    // }

    getCurrentUserGlobal = () => {
        return currentUser;
    }

    getCurrentWorkspaceGlobal = () => {
        return currentWorkspace;
    }

    /* ------------------------- */

    // useEffect(() => {
    //     updateUsers();
    // }, []);

    // useEffect(() => {
    //     if(users.length !== 0)
    //         console.log('Updated users: ', users);
    // }, [users]);

    useEffect(() => {
        if (isLoggedIn()) {
            // console.log('Current user: ', currentUser);
            setIsLoggedIn(true);
        }
        else
            setIsLoggedIn(false);
    }, [currentUser]);

    // useEffect(() => {

    //     onAuthStateChanged(auth, user => {
    //         // console.log('Current user changed', user);
    //         if (user)
    //             setLoggedInUser();
    //         else
    //             console.log('Current user null');
    //     })


    // }, [auth]);

    useEffect(() => {

        if (isLoggedIn()) {
            (async () => {
                // console.log(currentUser);
                await updateJoinedWorkspaces();
            })();
        }

    }, [currentUser]);

    useEffect(() => {
        if (joinedWorkspaces.length > 0) {
            // console.log('Joined workspaces: ', joinedWorkspaces);
            dispatch(setCurrentWorkspace(joinedWorkspaces[0])); // Change in the future with localStorage
        }
    }, [joinedWorkspaces]);

    useEffect(() => {
        if (Object.keys(currentWorkspace).length !== 0) {
            // console.log('Current workspace: ', currentWorkspace);
        }
    }, [currentWorkspace]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user)
                await setLoggedInUser();
            else
                console.log('Current user null');

            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if(isLoggedIn() && Object.keys(joinedWorkspaces).length !== 0 && Object.keys(currentWorkspace).length !== 0)
        {
            setHasInitialized(true);
        }
    }, [currentUser, joinedWorkspaces, currentWorkspace]);

    useEffect(() => {
        if (hasInitialized)
        {
            // Auto refreshing joinedWorkspaces and users whenever it changed in the database
            // Unsubscribe when closing tab or logging out
            // Each workspace needs to have the same Firestore id as it's property id
            console.log('Not loading anymore');
            joinedWorkspaces.map(workspace => {
                const workspaceRef = doc(workspacesCollection, workspace.id);

                const unsubscribe = onSnapshot(workspaceRef, workspaceSnapshot => {
                    if(!workspaceSnapshot.exists())
                    {
                        console.error(`Workspace with id ${workspace.id} doesn't exist in the database`);
                        return;
                    }

                    updateJoinedWorkspaces();
                });
                console.log('Setup listener for workspace ', workspace.id);

                unsubscribes.current.push(unsubscribe);
            });

            window.addEventListener('beforeunload', e => {
                for(const unsubscribe of unsubscribes.current)
                {
                    unsubscribe();
                }
                unsubscribes.current = [];
                console.log('Unsubscribed');
            });
        }
    }, [hasInitialized]);

    useEffect(() => {
        return () => {
            for(const unsubscribe of unsubscribes.current)
            {
                unsubscribe();
            }
            unsubscribes.current = [];
        }
    }, []); // Make sure it gets unsubscribed when component unmounts

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            (async () => await logOut())();
        }
    });

    return (
        <>
            <nav>
                <div id="logo-container"><span><a href="/">BizHub</a></span></div>
            </nav>
            <main>
                <div className="chat">
                    {isLoading ? (
                        <div className="loading"></div>
                    ) : (
                        loggedIn ? (
                            <>
                                <WorkspaceSection />
                                <Messages />
                            </>
                        ) : (
                            <div className="logged-out">
                                <p>Click here to sign in:</p>
                                <button onClick={() => navigate('/login')}>Sign In</button>
                            </div>
                        )
                    )}
                </div>
            </main>
        </>
    );
}

export default Chat;