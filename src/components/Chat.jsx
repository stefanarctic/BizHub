import { useDispatch, useSelector } from "react-redux";
// import { getUsers, setUsers } from "../features/users";
import { useEffect, useState } from "react";
import { auth, workspacesCollection } from "../firebase/FirebaseSetup";
import { setCurrentUser } from "../features/currentUser";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, query } from "firebase/firestore";
import { setJoinedWorkspaces } from "../features/joinedWorkspaces";
import { setCurrentWorkspace } from "../features/currentWorkspace";
import WorkspaceSection from "./chat/workspacesection/WorkspaceSection";
import Messages from "./chat/messages/Messages";
import { onAuthStateChanged } from "firebase/auth";

const Chat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const users = useSelector(state => state.users.value);
    const currentUser = useSelector(state => state.currentUser.value);
    const joinedWorkspaces = useSelector(state => state.joinedWorkspaces.value);
    const currentWorkspace = useSelector(state => state.currentWorkspace.value);

    const [loggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
                    channel.createdAt = channel.createdAt.toDate().getTime();

                    for (const message of channel.messages) {
                        message.createdAt = message.createdAt.toDate().getTime();
                    }
                }

                joinedWorkspaces.push(workspaceData);
            }
        }

        dispatch(setJoinedWorkspaces(joinedWorkspaces));
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
            if(user)
                await setLoggedInUser();
            else
                console.log('Current user null');
            
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    document.onkeydown = e => {
        if (e.key === 'Escape') {
            (async () => await logOut())();
        }
    }

    return (
        <>
            <nav>
                <div id="logo-container"><span><a href="/">BizHub</a></span></div>
            </nav>
            <main>
                <div className="chat">
                    {isLoading ? ( // Display loading indicator while checking
                        <div className="loading"></div>
                    ) : (
                        loggedIn ? ( // Show content only if user is logged in
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