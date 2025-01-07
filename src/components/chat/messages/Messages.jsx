import { useDispatch, useSelector } from "react-redux";
import Utils from "../../Util/Utils";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import { setCurrentMessages } from "../../../features/currentMessages";
import Message from "./Message";
import { getCurrentMembers, setCurrentMembers } from "../../../features/currentMembers";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { workspacesCollection } from "../../../firebase/FirebaseSetup";
import { setCurrentWorkspace } from "../../../features/currentWorkspace";

const Messages = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser.value);
    const currentWorkspace = useSelector(state => state.currentWorkspace.value);
    const currentMembers = useSelector(state => state.currentMembers.value);
    const currentChannel = useSelector(state => state.currentChannel.value);
    const currentMessages = useSelector(state => state.currentMessages.value);

    const [initiatedData, setInitiatedData] = useState(false);

    const messagesDiv = useRef(null);
    const inputRef = useRef(null);

    // const [workspaceUsers, setWorkspaceUsers] = useState([]);

    // const { getUserFromDatabase } = useAuth();

    const defaultPhotoURL = '/images/icons/misc/black_image.png';

    useEffect(() => {
        if(currentChannel >= 0 && Object.keys(currentWorkspace).length !== 0)
        {
            if(Object.keys(currentWorkspace).length === 0)
                return;

            dispatch(setCurrentMessages(currentWorkspace.channels[currentChannel].messages));
        }
    }, [currentChannel, currentWorkspace]);

    useEffect(() => {
        if(Object.keys(currentWorkspace).length !== 0)
        {
            (async () => {
                const cm = await getCurrentMembers(currentWorkspace.memberIds);
                dispatch(setCurrentMembers(cm));
            })();
        }
    });

    useEffect(() => {
        if(!initiatedData && Object.keys(currentWorkspace).length !== 0 && currentMembers.length !== 0)
        {
            setInitiatedData(true);
            console.log('Initiated data');
            scrollToBottom();
            inputRef.current.focus();
        }
    });

    useEffect(() => {
        focusInput();
        scrollToBottom();
    }, [currentChannel]);

    window.onresize = () => {
        scrollToBottom();
    }

    const scrollToBottom = () => {
        messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    const getSender = senderId => {
        const sender = currentMembers.find(member => member.uid === senderId);
        return sender;
    }

    // const getProfilePicturePath = senderId => {
    //     const sender = getSender(senderId);
    //     if(!sender)
    //     {
    //         console.error(`User ${senderId} not found in the current workspace members`);
    //         return defaultPhotoURL;
    //     }
    //     return sender.photoURL;
    // }

    // const getName = senderId => {
    //     const sender = getSender(senderId);
    //     return sender.name;
    // }

    const memoizedProfilePictures = useMemo(() => {
        const profilePictures = {};
        if (currentMembers) {
            currentMembers.forEach(member => {
                profilePictures[member.uid] = member.photoURL || defaultPhotoURL;
            });
        }
        return profilePictures;
    }, [currentMembers, defaultPhotoURL]);

    const memoizedNames = useMemo(() => {
        const names = {};
        if (currentMembers) {
            currentMembers.forEach(member => {
                names[member.uid] = member.name || "Unknown User";
            });
        }
        return names;
    }, [currentMembers]);

    const formatMessageDate = date => {
        // console.log('Looking to format message date: ', date);
        const sentDate = new Date(date * 1000);
        // const formattedDate = `
        //         ${sentDate.getHours() < 10 ? '0' + sentDate.getHours() : sentDate.getHours()}:${sentDate.getMinutes() < 10 ? '0' + sentDate.getMinutes() : sentDate.getMinutes()}
        // `;
        const formattedDate = `${sentDate.getHours().toString().padStart(2, '0')}:${sentDate.getMinutes().toString().padStart(2, '0')}`;

        // Format HH:SS
        return formattedDate;
    }

    const formatMessageText = text => {
        return text.trim();
    }

    const isTextValid = text => {
        return formatMessageText(text) !== '';
    }

    const sendMessage = async text => {
        console.log(`Looking to send message`, text);

        const messageObject = {
            createdAt: Timestamp.now().seconds,
            type: 'text',
            text: text,
            imageURL: '',
            senderId: currentUser.uid
        };

        console.log(`Message object: `, messageObject);

        if(Object.keys(currentWorkspace).length === 0)
        {
            console.log('Error in sending message: currentWorkspace is null');
            return;
        }

        if(currentChannel < 0)
        {
            console.log('Error in sending message: currentChannel is null');
            return;
        }


        const currentWorkspaceCopy = JSON.parse(JSON.stringify(currentWorkspace)); // deep copy
        // const currentWorkspaceCopy = {...currentWorkspace};
        currentWorkspaceCopy.channels[currentChannel].messages = [...currentWorkspaceCopy.channels[currentChannel].messages, messageObject];

        console.log('Current workspace: ', currentWorkspace);

        // Update on the frontend
        dispatch(setCurrentWorkspace(currentWorkspaceCopy));


        // Update on the backend
        const workspaceRef = doc(workspacesCollection, currentWorkspace.id);
        try {
            await updateDoc(workspaceRef, Utils.convertSecondsToTimestamp(currentWorkspaceCopy));
        } catch(error)
        {
            console.error(error);
        }

        console.log('Sent message ', text);

        scrollToBottom();
        // const newMessages = [...currentWorkspace.channels[currentChannel].messages, messageObject];
        // const workspaceSnapshot = await getDoc(workspaceRef);
        // const newChannel = { ...currentWorkspace.channels[currentChannel], messages: newMessages };

        // await updateDoc(workspaceRef, { channels: [...currentWorkspace.channels[currentChannel]] });
    }

    // Misc
    let isCtrlPressed = false;
    let isShiftPressed = false;
    document.addEventListener('keydown', e => {
        if(e.key === 'Control')
            isCtrlPressed = true;

        if(e.key === 'Shift')
            isShiftPressed = true;

        if((e.key === 'p' || e.key === 'f') && isCtrlPressed)
        {
            e.preventDefault();
            focusInput();
        }

        if(isCtrlPressed && isShiftPressed && e.code === 'KeyK')
            deleteAllMessages();
    });

    document.addEventListener('keyup', e => {
        if(e.key === 'Control')
            isCtrlPressed = false;
        
        if(e.key === 'Shift')
            isCtrlPressed = false;
    });

    const deleteAllMessages = async () => {
        console.log('Trying to delete all messages')
        const currentWorkspaceCopy = JSON.parse(JSON.stringify(currentWorkspace)); // deep copy
        currentWorkspaceCopy.channels[currentChannel].messages = [];

        const workspaceRef = doc(workspacesCollection, currentWorkspace.id);
        try {
            await updateDoc(workspaceRef, Utils.convertSecondsToTimestamp(currentWorkspaceCopy));
        } catch(error)
        {
            console.error(error);
        }
    }

    return (
        <div className="messages">
            <div className="channel-title">
                <h1># { currentChannel >= 0 && currentWorkspace.channels[currentChannel].name }</h1>
            </div>
            <div className="messages-section" ref={messagesDiv}>
                { currentMessages?.map(msg => (
                    <div className="message" key={Utils.generateRandomId()}>
                        <img src={ initiatedData ? memoizedProfilePictures[ msg.senderId ] : undefined } referrerPolicy="no-referrer" />
                        <div className="texts">
                            <h1>{ initiatedData ? memoizedNames[msg.senderId] : undefined }</h1>
                            <p>{ msg.text }</p>
                        </div>
                        <span>{ initiatedData ? formatMessageDate(msg.createdAt) : undefined }</span>
                    </div>
                )) }
            </div>
            <div className="message-compose-section">
                <div className="send-msg">
                    <div className="upload">
                        <img src="/images/icons/white/plus.png" className="upload-btn" />
                        <div className="upload-select">
                            <span>Select 1</span>
                            <span>Select 2</span>
                            <span>Select 3</span>
                        </div>
                    </div>
                    <input autoComplete="off" type="text" placeholder="Type a message..." id="message-input" ref={inputRef} onKeyDown={e => {
                        if(e.key === 'Enter' && isTextValid(inputRef.current.value))
                        {
                            sendMessage(inputRef.current.value);
                            inputRef.current.value = '';
                        }
                        // const message = 
                        // if(e.key === 'Enter' && ) sendMessage(e.target.value)
                    }} />
                </div>
                <img src="/images/icons/white/send.png" className="send-btn" onClick={e => {
                    if(isTextValid(inputRef.current.value))
                    {
                        sendMessage(inputRef.current.value);
                        inputRef.current.value = '';
                    }
                }} />
            </div>
        </div>
    );
}
 
export default Messages;