import { useEffect, useRef, useState } from "react";

import Home1 from '/images/icons/white/home1.png';
import Home2 from '/images/icons/white/home2.png';
import Chat2 from '/images/icons/white/chat2.png';
import Chat3 from '/images/icons/white/chat3.png';
import Settings1 from '/images/icons/white/settings1.png';
import Settings2 from '/images/icons/white/settings2.png';


const SectionSelector = ({currentSelection, setCurrentSelection}) => {

    const [isHoveringHome, setIsHoveringHome] = useState(false);
    const [isHoveringChat, setIsHoveringChat] = useState(false);
    const [isHoveringSettings, setIsHoveringSettings] = useState(false);

    // const [isHomeSelected, setIsHomeSelected] = useState(currentSelection === 1);
    // const [isChatSelected, setIsChatSelected] = useState(currentSelection === 2);
    // const [isSettingsSelected, setIsSettingsSelected] = useState(currentSelection === 3);

    return (
        <div className="section-selector">
            <img src={currentSelection === 1 ? Home2 : (isHoveringHome ? Home2 : Home1)}
                onMouseEnter={() => setIsHoveringHome(true)}
                onMouseLeave={() => setIsHoveringHome(false)}
                onClick={() => setCurrentSelection(1)}
                alt="Home" />
            <img src={currentSelection === 2 ? Chat3 : (isHoveringChat ? Chat3 : Chat2)}
                onMouseEnter={() => setIsHoveringChat(true)}
                onMouseLeave={() => setIsHoveringChat(false)}
                onClick={() => setCurrentSelection(2)}
                alt="Chat" />
            <img src={currentSelection === 3 ? Settings2 : (isHoveringSettings ? Settings2 : Settings1)}
                onMouseEnter={() => setIsHoveringSettings(true)}
                onMouseLeave={() => setIsHoveringSettings(false)}
                onClick={() => setCurrentSelection(3)}
                alt="Settings" />
        </div>
    );
}

export default SectionSelector;