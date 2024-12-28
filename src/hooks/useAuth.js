import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/FirebaseSetup';
import { setCurrentUser } from '../features/currentUser';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
    
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

    const getProvider = () => {
        return provider;
    }

    return { logIn, logOut, getProvider };
};