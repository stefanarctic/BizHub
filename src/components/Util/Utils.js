import { Timestamp } from "firebase/firestore";

export const generateRandomId = () => {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return randomString.replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters
}


export const convertToLocalTime = utcDate => {
    const userTimezoneOffset = new Date().getTimezoneOffset() / 60; // Get user's timezone offset in hours
  
    const utcHours = utcDate.getUTCHours();
    const utcMinutes = utcDate.getUTCMinutes();
  
    const localHours = utcHours + userTimezoneOffset;
    const localMinutes = utcMinutes;
  
    // Adjust for negative or overflowing hours
    const adjustedHours = (localHours + 24) % 24;
  
    return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate(), adjustedHours, localMinutes, 0, 0); // Create a new Date object with adjusted time
}


export const convertToUtcTime = localDate => {
    const userTimezoneOffset = new Date().getTimezoneOffset() / 60; // Get user's timezone offset in hours (negative for ahead of UTC)
  
    const localHours = localDate.getHours();
    const localMinutes = localDate.getMinutes();
  
    const utcHours = localHours - userTimezoneOffset;
    const utcMinutes = localMinutes;
  
    // Adjust for negative or overflowing hours (might be negative due to timezone offset)
    const adjustedHours = (utcHours + 24) % 24;
  
    return new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), adjustedHours, utcMinutes, 0, 0); // Create a new Date object with adjusted time
}

export const asyncify = callback => { (async () => await callback())() }

export const asyncifyWithReturn = callback => {
    const returnValue = ((async () => await callback())());
    return returnValue;
}

export const convertTimestampToSeconds = workspace => {
    const workspaceCopy = JSON.parse(JSON.stringify(workspace));
    console.log('Looking to convert workspace dates');
    console.log(workspaceCopy);

    for (const channel of workspaceCopy.channels) {
        channel.createdAt = channel.createdAt.seconds;

        for (const message of channel.messages) {
            message.createdAt = message.createdAt.seconds;
        }
    }

    return workspaceCopy;
}

export const convertSecondsToTimestamp = workspace => {
    const workspaceCopy = JSON.parse(JSON.stringify(workspace));
    console.log('Looking to convert workspace dates');
    console.log(workspaceCopy);

    for(const channel of workspaceCopy.channels) {
        channel.createdAt = Timestamp.fromMillis(channel.createdAt * 1000);

        for(const message of channel.messages) {
            message.createdAt = Timestamp.fromMillis(message.createdAt * 1000);
        }
    }

    return workspaceCopy;
}

export const deepCopy = object => {
    return JSON.parse(JSON.stringify(currentWorkspace));
}

const Utils = {
    generateRandomId: generateRandomId,
    convertToLocalTime: convertToLocalTime,
    convertToUtcTime: convertToUtcTime,
    asyncify: asyncify,
    asyncifyWithReturn: asyncifyWithReturn,
    convertTimestampToSeconds: convertTimestampToSeconds,
    convertSecondsToTimestamp: convertSecondsToTimestamp,
    deepCopy: deepCopy,
};

export default Utils;