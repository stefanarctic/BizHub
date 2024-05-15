import { useEffect, useRef } from "react";

const Messages = () => {

    const uploadSelect = useRef(null);
    const uploadButton = useRef(null);
    const messageInput = useRef(null);

    const toggleUploadSection = () => {
        uploadSelect.current.classList.toggle('show');
        uploadButton.current.classList.toggle('show');
    }

    // const onClickOutside = e => {
    //     console.log('clicked');
    //     if(!uploadSelect.current.classList.contains('show') && !uploadSelect.current.contains(e.target))
    //     {
    //         uploadSelect.current.classList.remove('show');
    //         uploadButton.current.classList.remove('show');
    //         console.log('Clicked outside');
    //     }
    //     else
    //         console.log('Clicked on the button');
    // }

    // useEffect(() => {
    //     document.addEventListener('mousedown', onClickOutside);

    //     return () => document.removeEventListener('mousedown', onClickOutside);
    // }, []);

    // Check if user pressed Ctrl + P, prevent print and focus on the message input
    let ctrlPressed = false, pPressed = false;
    const checkIfPressed = e => {
        if(e.metaKey || e.ctrlKey)
            ctrlPressed = true;
        if(e.key === 'p')
            pPressed = true;

        if(ctrlPressed && pPressed)
        {
            e.preventDefault();
            messageInput.current.focus();
        }
    }

    const resetKeys = e => {
        ctrlPressed = false;
        pPressed = false;
    }

    useEffect(() => {
        document.addEventListener('keydown', checkIfPressed);

        document.addEventListener('keyup', resetKeys);

        return () => (document.removeEventListener('keydown', checkIfPressed), document.removeEventListener('keyup', resetKeys));
    }, []);

    return (
        <div className="messages">
            <div className="channel-title">
                <h1># general</h1>
            </div>
            <div className="messages-section">
                <div className="message">
                    {/* <img src="https://as2.ftcdn.net/v2/jpg/02/46/21/45/1000_F_246214515_c8auPPZMclTCqFxt88sX4ZP5GsUJXWXz.jpg" width={20} height={20} /> */}
                    <img src="/test/profile-pic1.png" />
                    <div className="texts">
                        <h1>Hannah</h1>
                        <p>Sup G?</p>
                    </div>
                    <span>10:30</span>
                </div>
                <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div>
                {/* <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div>                <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div>                <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div>                <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div>                <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div>                <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div>                <div className="message">
                    <img src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" />
                    <div className="texts">
                        <h1>Jane</h1>
                        <p>All good G</p>
                    </div>
                    <span>10:32</span>
                </div> */}
            </div>
            <div className="message-compose-section">
                <div className="send-msg">
                    <div className="upload">
                        <img src="/images/icons/white/plus.png" className="upload-btn" ref={uploadButton} onClick={toggleUploadSection} />
                        <div className="upload-select" ref={uploadSelect}>
                            <span>Select 1</span>
                            <span>Select 2</span>
                            <span>Select 3</span>
                        </div>
                    </div>
                    <input type="text" placeholder="Type a message..." id="message-input" ref={messageInput} />
                </div>
                <img src="/images/icons/white/send.png" className="send-btn" />
            </div>
        </div>
    );
}
 
export default Messages;