import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUsers } from "../features/users";
import { useEffect, useState } from "react";
import { checkIfUserExists } from "./Auth";
import { auth } from "../firebase/FirebaseSetup";
import { setCurrentUser } from "../features/currentUser";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Chat = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const users = useSelector(state => state.users.value);
    const currentUser = useSelector(state => state.currentUser.value);

    const [loggedIn, setIsLoggedIn] = useState(false);

    const { logOut } = useAuth();

    // Local functions
    const updateUsers = async () => {
        const users = await getUsers();
        dispatch(setUsers(users));
    }

    const setLoggedInUser = async () => {
        const userDocument = await checkIfUserExists(auth?.currentUser?.uid);
        dispatch(setCurrentUser(userDocument.data()));
    }

    const isLoggedIn = () => {
        return Object.keys(currentUser).length !== 0;
    }

    /* --- Global functions --- */
    getUsersGlobal = () => {
        return users;
    }

    getCurrentUserGlobal = () => {
        return currentUser;
    }

    /* ------------------------- */

    useEffect(() => {
        updateUsers();
    }, []);

    useEffect(() => {
        if(users.length !== 0)
            console.log('Updated users: ', users);
    }, [users]);

    useEffect(() => {
        if(isLoggedIn())
        {
            console.log('Current user: ', currentUser);
            setIsLoggedIn(true);
        }
        else
            setIsLoggedIn(false);
    }, [currentUser]);

    useEffect(() => {
        if(auth.currentUser)
            setLoggedInUser();
    }, [auth.currentUser]);

    document.onkeydown = e => {
        if(e.key === 'Escape')
        {
            (async () => await logOut())();
        }
    }

    return (
        // <div className="test">
        //     { users && users.map(user => (
        //         <p key={Utils.generateRandomId()}>{user.email}</p>
        //     )) }
        //     <br />
        //     <p>{ currentUser.name }</p>
        // </div>
        <>
            <nav>
                <div id="logo-container"><span><a href="/">BizHub</a></span></div>
            </nav>
            <main>
                <div className="chat">
                    {/* <h1>Chat</h1> */}
                    { loggedIn ? 
                        <div className="logged-in">
                            <p>You're logged in</p>
                            <button onClick={async () => await logOut()}>Sign Out</button>
                        </div> :
                        <div className="logged-out">
                            <p>Click here to sign in:</p>
                            <button onClick={() => navigate('/login')}>Sign In</button>
                        </div>
                    }
                </div>
            </main>
        </>
    );
}

export default Chat;