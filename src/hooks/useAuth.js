import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, usersCollection, workspacesCollection } from '../firebase/FirebaseSetup';
import { setCurrentUser } from '../features/currentUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDocs, query, where } from 'firebase/firestore';

const useAuth = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const provider = new GoogleAuthProvider();

    const logIn = async () => {
        await signInWithPopup(auth, provider);
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            dispatch(setCurrentUser({}));
            navigate('/login');
            console.log('logged out successfully', auth.currentUser);
        } catch (error) {
            console.error('Error in logging out', error);
        }
    }

    const getUserFromDatabase = async uid => {
        try {
            const q = query(usersCollection, where('uid', '==', uid));
            const querySnapshot = await getDocs(q);
    
            if(!querySnapshot.empty)
                return querySnapshot.docs[0];
            else
                return null;
        } catch(error) {
            console.error("Error checking if user exists: ", error);
            return null;
        }
    }

    const getProvider = () => {
        return provider;
    }

    return { logIn, logOut, getUserFromDatabase, getProvider };
};

export default useAuth;