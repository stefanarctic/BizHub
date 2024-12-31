import { useState } from "react";
import Utils from "../../Util/Utils";

const Message = ({ msg }) => {

    const defaultPhotoURL = '/images/icons/misc/black_image.png';

    const [photoURL, setPhotoURL] = useState(defaultPhotoURL);
    const [senderName, setSenderName] = useState('John Doe');

    const getProfilePicturePath = async uid => {
        const sender = await getUserFromDatabase(uid);
        if (!sender.exists) {
            console.error('Error in getting user ', uid);
            return defaultPhotoURL;
        }
        return sender.data().photoURL;
    }

    const getName = async uid => {
        const sender = await getUserFromDatabase(uid);
        if (!sender.exists) {
            console.error('Error in getting user ', uid);
            return '';
        }
        return sender.data().name;
    }

    const formatMessageDate = date => {
        const sentDate = new Date(date);
        const formattedDate = `
                ${sentDate.getHours() < 10 ? '0' + sentDate.getHours() : sentDate.getHours()}
                :
                ${sentDate.getMinutes() < 10 ? '0' + sentDate.getMinutes() : sentDate.getMinutes()}`;

        return formattedDate;
    }

    return (
        <div className="message" key={Utils.generateRandomId()}>
        </div>
    );
}

export default Message;