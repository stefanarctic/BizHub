import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../../../../Util/Utils";
import useRunOnce from "../../../../../hooks/useRunOnce";
import { setCurrentChannel } from "../../../../../features/currentChannel";

const ConversationSelector = () => {

    const dispatch = useDispatch();

    const currentWorkspace = useSelector(state => state.currentWorkspace.value);

    const [channels, setChannels] = useState([]);
    const [initiatedChannels, setInitiatedChannels] = useState(false);

    useEffect(() => {
        if(Object.keys(currentWorkspace).length !== 0)
        {
            if(channels.length === 0)
            {
                setChannels(currentWorkspace.channels);
                // console.log('Initiated channels and dispatched currentChannel to 0');
            }
        }
    }, [currentWorkspace]);

    useEffect(() => {
        if(channels.length !== 0 && !initiatedChannels)
        {
            updateSelectedChannel(0);
            setInitiatedChannels(true);
        }
    }, [channels]);

    const updateSelectedChannel = index => {
        dispatch(setCurrentChannel(index));
        setSelectedChannel(index);
    }

    const setSelectedChannel = index => {
        const updatedChannels = channels.map(channel => ({ ...channel, selected: false }));
        updatedChannels[index].selected = true;
        setChannels(updatedChannels);
    }

    return (
        <div className="conversation-selector">
            <div className="channels">
                { channels.length !== 0 && channels.map((channel, index) => (
                    <div className={`channel ${channel.selected ? 'selected' : ''}`} key={Utils.generateRandomId()} onClick={() => updateSelectedChannel(index)}># {channel.name}</div>
                )) }
            </div>
        </div>
    );
}
 
export default ConversationSelector;