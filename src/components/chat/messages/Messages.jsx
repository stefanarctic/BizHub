import { useDispatch, useSelector } from "react-redux";
import Utils from "../../Util/Utils";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { setCurrentMessages } from "../../../features/currentMessages";
import Message from "./Message";
import { getCurrentMembers, setCurrentMembers } from "../../../features/currentMembers";

const Messages = () => {

    const dispatch = useDispatch();

    const currentWorkspace = useSelector(state => state.currentWorkspace.value);
    const currentMembers = useSelector(state => state.currentMembers.value);
    const currentChannel = useSelector(state => state.currentChannel.value);
    const currentMessages = useSelector(state => state.currentMessages.value);

    const [initiatedData, setInitiatedData] = useState(false);

    const messagesDiv = useRef(null);

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
        // console.log('Current members length changed', currentMembers);
        if(initiatedData)
            return () => {};
        if(Object.keys(currentWorkspace).length !== 0 && currentMembers.length === 0)
        {
            // console.log('--------');
            // console.log('Current workspace ', currentWorkspace);
            // console.log('--------');
            (async () => {
                const cm = await getCurrentMembers(currentWorkspace.memberIds);
                dispatch(setCurrentMembers(cm));
            })();
            // dispatch(setCurrentMembers(getCurrentMembers(currentWorkspace.memberIds)));
        }
    });

    useEffect(() => {
        // console.log('Refreshed every frame', currentWorkspace, currentMembers)
        if(Object.keys(currentWorkspace).length !== 0 && currentMembers.length !== 0)
        {
            setInitiatedData(true);
            scrollToBottom();
            // console.log('Initiated data');
        }
    });

    window.onresize = () => {
        scrollToBottom();
    }

    const scrollToBottom = () => {
        messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }

    // useEffect(() => {
    //     if(Object.keys(currentWorkspace) !== 0 && currentMembers.length !== 0)
    //     {
    //         setWorkspaceUsers(currentMembers);
    //     }
    // }, [currentMembers]);

    // const createMessageProfilePicture = async senderId => {
    //     const profilePicturePath = await getProfilePicturePath(senderId);
    //     return (
    //         <img src={profilePicturePath} referrerPolicy="no-referrer" />
    //     );
    // }

    // const createMessageSender = async senderId => {
    //     const senderName = await getName(senderId);
    //     return (
    //         <h1>{ senderName }</h1>
    //     );
    // }

    // Testing
    // useEffect(() => {
    //     const uid = 'nnA782BdY3a4bb9wgtRRt9yjdNh1';

    //     // const name = (async () => {
    //     //     const result = await getName(uid);
    //     //     return result;
    //     // })();

    //     let name = '';

    //     getName(uid).then(tempName => {
    //         name = tempName;
    //         console.log('Name: ', name);
    //     });

    // }, []);

    const getSender = senderId => {
        const sender = currentMembers.find(member => member.uid === senderId);
        return sender;
    }

    const getProfilePicturePath = senderId => {
        const sender = getSender(senderId);
        if(!sender)
        {
            console.error(`User ${senderId} not found in the current workspace members`);
            return defaultPhotoURL;
        }
        return sender.photoURL;
    }

    const getName = senderId => {
        const sender = getSender(senderId);
        return sender.name;
    }

    const formatMessageDate = date => {
        const sentDate = new Date(date); // Convert miliseconds to date object
        const formattedDate = `
                ${sentDate.getHours() < 10 ? '0' + sentDate.getHours() : sentDate.getHours()}:${sentDate.getMinutes() < 10 ? '0' + sentDate.getMinutes() : sentDate.getMinutes()}
        `;

        // Format HH:SS
        return formattedDate;
    }

    return (
        <div className="messages">
            <div className="channel-title">
                <h1># { currentChannel >= 0 && currentWorkspace.channels[currentChannel].name }</h1>
            </div>
            <div className="messages-section" ref={messagesDiv}>
                { currentMessages?.map(msg => (
                    <div className="message" key={Utils.generateRandomId()}>
                        <img src={initiatedData ? getProfilePicturePath(msg.senderId) : defaultPhotoURL} referrerPolicy="no-referrer" />
                        <div className="texts">
                            <h1>{ initiatedData && getName(msg.senderId) }</h1>
                            <p>{ msg.text }</p>
                        </div>
                        <span>{ initiatedData && formatMessageDate(msg.createdAt) }</span>
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
                    <input autoComplete="off" type="text" placeholder="Type a message..." id="message-input" />
                </div>
                <img src="/images/icons/white/send.png" className="send-btn" />
            </div>
        </div>
    );
}
 
export default Messages;