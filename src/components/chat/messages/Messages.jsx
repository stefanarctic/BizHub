import { useEffect, useRef, useState } from "react";
import { getUserFromDatabase } from "../../Chat";
import { Timestamp, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import * as Utils from '../../Util/Utils';
import { db } from "../../../firebase/FirebaseSetup";
import { update } from "firebase/database";
import { getChannelsParent, refreshSelectedChannel, setOnChannelUpdate } from "../workspacesection/list/conversationselector/ConversationSelector";

export let onCurrentChannelUpdate = callback /* (currentChannel) => {} */ => {};
export let setCurrentChannelGlobal = index => {}

export let getMessagesSectionRef = () => {}
export let getInputRef = () => {}

export let scrollToLastMessage = () => {}

// export let scrollToLastMessageGlobal = () => {}

export const Messages = ( { user, setUser, loggedIn, currentWorkspace, setCurrentWorkspace }) => {

    const uploadSelect = useRef(null);
    const uploadButton = useRef(null);
    const messageInput = useRef(null);

    const messagesSectionRef = useRef(null);

    // const [currentWorkspaceState, setCurrentWorkspaceState] = useState(null); // Exclusively for current channel selection
    // const [currentChannel, setCurrentChannel] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(-1);
    // const [messages, setMessages] = useState([]);
    const [workspaceUsers, setWorkspaceUsers] = useState([]);
    const tempWorkspaceUsers = useRef([]);

    const onCurrentChannelUpdateFunction = useRef(currentChannel => {});

    // let testTimeStamp = new Timestamp(1232, 12321);
    // let utcDate = testTimeStamp.toDate();
    // let localDate = Utils.convertToLocalTime(utcDate);
    // testTimeStamp.toDate().getUTCHours()

    const channelSet = useRef(false);
    // console.log('asds');

    useEffect(() => {
        // onCurrentChannelUpdateFunction(currentChannel);
        onCurrentChannelUpdateFunction.current(currentChannel);
        console.log(`Current channel from Messages.jsx: `, currentChannel);
    }, [currentChannel]);

    useEffect(() => {
        // getCurrentChannel = () => {
        //     return [currentChannel, setCurrentChannel];
        // }
        // onCurrentChannelUpdate = onCurrentChannelUpdateFunction
        // scrollToLastMessageGlobal = () => {
        //     scrollToLastMessage();
        // }
        getInputRef = () => {
            return messageInput;
        }
        getMessagesSectionRef = () => {
            return messagesSectionRef;
        }
        setCurrentChannelGlobal = index => {
            setCurrentChannel(index);
        }
        onCurrentChannelUpdate = callback => {
            onCurrentChannelUpdateFunction.current = callback;
        }
    }, []);

    useEffect(() => {
        console.log(`Current workspace users useEffect: `);
        workspaceUsers.map(user => console.log(user));
    }, [workspaceUsers]);

    useEffect(() => {
        if(!channelSet.current)
        {
            if(user)
            {
                if(currentWorkspace)
                {
                    console.log('Channel not set, user found and current workspace active');
                    channelSet.current = true;
                    // setCurrentWorkspaceState(currentWorkspace);
                    // setCurrentChannel(user.currentWorkspace?.channels?.length === 0 ? null : user.currentWorkspace?.channels[0]);
                    if(currentWorkspace && currentWorkspace.channels)
                    {
                        if(currentWorkspace.channels.length === 0)
                            setCurrentChannel(-1);
                        else
                            setCurrentChannel(0);
                    }
                    console.log('Current workspace: ', currentWorkspace);
                    // const currentWorkspaceTemp = {
                    //     ...user.currentWorkspace,
                    //     currentChannel: 
                    // }
                }
            }
        }
    });


    useEffect(() => {
        if(currentWorkspace?.memberIds)
        {
            setWorkspaceUsers([]);
            console.log(`Current workspace members:`);
            // currentWorkspace.memberIds.map(memberId => console.log(memberId));
            currentWorkspace.memberIds.map(uid => {
                getUserFromDatabase(uid, userData => {
                    if(userData)
                    {
                        // User found
                        // console.log(`User found ${uid}`);
                        // Add current user data to workspaceUsers
                        tempWorkspaceUsers.current.push(userData);
                        setWorkspaceUsers([...tempWorkspaceUsers.current]);
                    }
                    else
                    {
                        console.error(`User with id ${uid} not found in the database`);
                    }
                }, err => {
                    console.error(err);
                    // console.error(`Error in retrieving document for user ${auth.currentUser.displayName}`, err);
                })
            })
        }
    }, [currentWorkspace?.memberIds]);

    // useEffect(() => {
    //     if(currentChannel)
    //     {
    //         setMessages(currentChannel.messages);
    //     }
    // }, [currentChannel]);

    const toggleUploadSection = () => {
        uploadSelect.current.classList.toggle('show');
        uploadButton.current.classList.toggle('show');
    }

    /* --- Keyboard Section --- */

    // Check if user pressed Ctrl + P or Tab, prevent print and focus on the message input
    let ctrlPressed = false, pPressed = false;
    const checkIfPressed = e => {
        if(e.metaKey || e.ctrlKey)
            ctrlPressed = true;
        if(e.key === 'p')
            pPressed = true;

        if((ctrlPressed && pPressed) || e.key === 'Tab')
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

    const [currentMessage, setCurrentMessage] = useState('');

    // useEffect(() => {
    //     console.log(`Current message: `, currentMessage);
    // }, [currentMessage]);

    const trimText = text => {
        return text.trim();
    }

    const onTrySendMessage = e => {
        const text = trimText(currentMessage);
        // e.target.value = '';
        if(text.length > 0)
        {
            // Send message to the database, and wait for the code to detect it on the frontend
            sendMessage(text);
            // Clear input
            setCurrentMessage('');
            getInputRef().current.focus();
            // Scroll to the last message

            // const messagesLocal = currentWorkspace?.channels[currentChannel]?.messages;
            // messagesLocal[messagesLocal.length - 1].scrollIntoView({ behavior: 'smooth' });
            // console.log(`Messages local last`, messagesLocal[messagesLocal.length - 1]);
        }
        else
        {
            console.log(`Message empty`);
        }
    }

    const checkForEnter = e => {
        if(e.key === 'Enter')
        {
            // const text = e.target.value.trim();
            onTrySendMessage(e);
        }
    }

    const sendMessage = text => {
        console.log(`Looking to send message`, text);
        // user - user
        // imageURL - user.photoURL
        // text - text
        // createdAt - generated by Firebase
        const messageObject = {
            createdAt: Timestamp.now(),
            type: 'text',
            text: text,
            imageURL: '',
            senderId: user.uid
        };

        console.log(`Message object: `, messageObject);
        currentWorkspace.channels[currentChannel].messages.push(messageObject);
        console.log(`Messages: `, currentWorkspace.channels[currentChannel].messages);
        // console.log(`Current workspace: `, currentWorkspace);
        // currentWorkspace.channels.messages = [...currentWorkspace.channels.messages, messageObject];
        // const updatedWorkspace = {
        //     ...currentWorkspace
        // };
        
        // const workspacesCollection = collection(db, 'workspaces');
        const workspaceId = currentWorkspace.id;
        const workspaceRef = doc(db, 'workspaces', workspaceId);

        updateDoc(workspaceRef, currentWorkspace)
            .then(() => {
                console.log('Updated workspace successfully');
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        scrollToLastMessage();
    }, [messagesSectionRef]);

    scrollToLastMessage = () => {
        const messagesLocal = messagesSectionRef.current.children;
        if(messagesLocal && messagesLocal.item(messagesLocal.length - 1))
        {
            messagesLocal.item(messagesLocal.length - 1).scrollIntoView({ behavior: 'instant' });
            // console.log(messagesLocal.item(messagesLocal.length - 1));
            console.log(`Scrolled into view`);
        }
    }

    // const updateWorkspace = (newWorkspace) => {
    //     // setCurrentWorkspaceState(newWorkspace);
    //     // setCurrentChannel(user.currentWorkspace?.channels?.length === 0 ? null : user.currentWorkspace?.channels[0]);
    // }

    const refreshWorkspace = snapshot => {
        const snapshotData = snapshot.data();
        setCurrentWorkspace(snapshotData);
        refreshSelectedChannel();
        // Scroll to the last message
        scrollToLastMessage();
        // const messagesLocal = getMessagesSectionRef().current.children;
        // messagesLocal.item(messagesLocal.length - 1).scrollIntoView({ behavior: 'smooth' });
        // console.log(`Scrolled into ${messagesLocal.item(messagesLocal.length - 1)}`);
        // messageInput.current.scrollIntoView({ behavior: 'smooth' });
        // setTimeout(() => refreshSelectedChannel(), 5000);
        // setCurrentWorkspace(snapshot.data());
        // console.log(`Refreshed workspace, snapshot: `, snapshot);
        // updateWorkspace(snapshot.data());
    }

    // Update content when workspace changes
    useEffect(() => {
        let unsubscribe = () => {}
        if(currentWorkspace)
        {
            const workspacesCollection = collection(db, 'workspaces');
            const workspaceId = currentWorkspace?.id;
            const workspaceRef = doc(workspacesCollection, workspaceId);

            // When database changes, update frontend data
            unsubscribe = onSnapshot(workspaceRef, snapshot => {
                refreshWorkspace(snapshot);
            });
        }

        return () => unsubscribe();
    }, [currentWorkspace?.id]);

    const localOnChannelUpdate = () => { // No parameters needed here
        // const messagesLocal = currentWorkspace?.channels[currentChannel]?.messages;
        if(messagesLocal)
        {
                // Scroll to the last message
                // messagesLocal.scrollIntoView({ behavior: 'smooth' });
                // scrollToLastMessage();
            // messagesLocal[messagesLocal.length - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        setOnChannelUpdate(localOnChannelUpdate);
    }, []);

    return (
        <div className="messages">
        {loggedIn  ? (
        <>
            <div className="channel-title">
                <h1># { currentWorkspace && currentWorkspace.channels && currentWorkspace.channels.length > 0 && currentChannel > -1 && currentWorkspace.channels[currentChannel].name }</h1>
            </div>
            <div className="messages-section" ref={messagesSectionRef}>
                {/* <div className="message">
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
                </div> */}
                { currentWorkspace?.channels[currentChannel]?.messages && currentWorkspace.channels[currentChannel].messages.length > 0 && currentWorkspace.channels[currentChannel].messages.map(
                    msg => (
                        <div className="message" key={Utils.generateRandomId()}>
                            <img src={(() => {
                                // getUserFromDatabase(msg.senderId, )
                                // let user = null;
                                let imagePath = '/images/icons/misc/black_image.png';
                                if(workspaceUsers.length > 0)
                                {
                                    const userTemp = workspaceUsers.find(user => user.uid === msg.senderId);
                                    if(userTemp)
                                    {
                                        imagePath = userTemp.photoURL;
                                    }
                                }

                                return imagePath;
                            })()} />
                            <div className="texts">
                                <h1>{(() => {
                                    let userName = '';
                                    if(workspaceUsers.length > 0)
                                    {
                                        const userTemp = workspaceUsers.find(user => user.uid === msg.senderId);
                                        if(userTemp)
                                        {
                                            // imagePath = userTemp.photoURL;
                                            userName = userTemp.name;
                                        }
                                    }

                                    return userName;
                                })()}</h1>
                                <p>{msg.text}</p>
                            </div>
                            <span>{(() => {
                                if(!msg.createdAt)
                                    return 'Invalid creation date!';
                                const sentTimestamp = msg.createdAt;
                                // const sentDateUTC = sentTimestamp.toDate();
                                // const sentDateLocal = Utils.convertToLocalTime(sentDateUTC);
                                const sentDate = sentTimestamp.toDate();
                                const formattedDate = `${sentDate.getHours() < 10 ? '0' + sentDate.getHours() : sentDate.getHours()}:${sentDate.getMinutes() < 10 ? '0' + sentDate.getMinutes() : sentDate.getMinutes()}`;
                                return formattedDate;
                            })()}</span>
                        </div>
                    )
                ) }
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
                    <input autoComplete="off" type="text" placeholder="Type a message..." id="message-input" ref={messageInput} onKeyDown={checkForEnter} value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} />
                </div>
                <img src="/images/icons/white/send.png" className="send-btn" onClick={onTrySendMessage} />
            </div>
        </> ) : 
            (
                <div className="no-workspace">
                    <h1>Create or join a workspace to get started.</h1>
                </div>
            )
        }
        </div>
    );
}