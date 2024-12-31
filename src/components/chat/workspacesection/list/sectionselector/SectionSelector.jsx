import Home1 from '/images/icons/white/home1.png';
import Home2 from '/images/icons/white/home2.png';
import Chat2 from '/images/icons/white/chat2.png';
import Chat3 from '/images/icons/white/chat3.png';
import Settings1 from '/images/icons/white/settings1.png';
import Settings2 from '/images/icons/white/settings2.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentSection } from '../../../../../features/currentSection';

const SectionSelector = () => {

    const dispatch = useDispatch();

    const currentSection = useSelector(state => state.currentSection.value);
    const currentUser = useSelector(state => state.currentUser.value);

    const [isHoveringHome, setIsHoveringHome] = useState(false);
    const [isHoveringChat, setIsHoveringChat] = useState(false);
    const [isHoveringSettings, setIsHoveringSettings] = useState(false);

    const defaultPhotoURL = '/images/icons/misc/black_image.png';
    const [photoURL, setPhotoURL] = useState(defaultPhotoURL);


    useEffect(() => {
        // console.log(currentUser.photoURL);
    }, [currentSection]);

    useEffect(() => {
        if(currentUser)
        {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]);

    return (
        <div className="sidebar">
            <div className="section-selector">
                <img src={currentSection === 0 ? Home2 : (isHoveringHome ? Home2 : Home1)}
                    onMouseEnter={() => setIsHoveringHome(true)}
                    onMouseLeave={() => setIsHoveringHome(false)}
                    onClick={() => dispatch(setCurrentSection(0))}
                    alt="Home" />
                <img src={currentSection === 1 ? Chat3 : (isHoveringChat ? Chat3 : Chat2)}
                    onMouseEnter={() => setIsHoveringChat(true)}
                    onMouseLeave={() => setIsHoveringChat(false)}
                    onClick={() => dispatch(setCurrentSection(1))}
                    alt="Chat" />
                <img src={currentSection === 2 ? Settings2 : (isHoveringSettings ? Settings2 : Settings1)}
                    onMouseEnter={() => setIsHoveringSettings(true)}
                    onMouseLeave={() => setIsHoveringSettings(false)}
                    onClick={() => dispatch(setCurrentSection(2))}
                    alt="Settings" />
            </div>
            <img src={photoURL} className="profile-picture" />
        </div>
    );
}
 
export default SectionSelector;