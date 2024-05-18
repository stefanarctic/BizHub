import { useEffect, useState } from "react";
import * as Utils from '../../../../Util/Utils';
import { onCurrentChannelUpdate, setCurrentChannelGlobal } from "../../../messages/Messages";

export let getSelectedChannel = () => {}

const ConversationSelector = ({ user, currentWorkspace }) => {

    const [channels, setChannels] = useState([]); // Objects { domElement, selected }
    // const selectedChannel = useRef(-1);
    // const [currentChannel, setCurrentChannel] = getCurrentChannel();
    const [selectedChannel, setSelectedChannel] = useState(-1);

    onCurrentChannelUpdate(currentChannel => {
        setSelectedChannel(currentChannel);
    });

    useEffect(() => {
        getSelectedChannel = () => {
            return selectedChannel;
        }
        setSelectedChannel(1);
    }, []);

    useEffect(() => {
        setCurrentChannelGlobal(selectedChannel);
    }, [selectedChannel]);

    // const setCurrentChannelSelectedChannel = e => {

    // }

    // useEffect(() => {
    //     const newSelected = getCurrentChannel();
    //     if(selectedChannel !== newSelected)
    //     {
    //         setSelectedChannel(newSelected);
    //         // selectedChannel.current = newSelected;
    //     }
    // });

    const getChannel = index => {
        return channels[index];
    }

    useEffect(() => {
        console.log(`Channels: `, channels);
    }, [channels]);

    useEffect(() => {
        // const selectedChannel = getCurrentChannel();
        if(currentWorkspace)
        {
            // setChannels(currentWorkspace.channels);
            const channelsTemp = [];
            for(let i = 0; i < currentWorkspace.channels.length; i++)
            {
                // channelsTemp.push({
                //     selected: false,
                //     domElement: (
                //         <div className={`channel ${this.selected ? 'selected' : ''}`} key={Utils.generateRandomId()}># {currentWorkspace.channels[i]?.name}</div>
                //     )
                // });
                const channelSelected = false;
                const randomId = Utils.generateRandomId();
                const domElement = (
                    <div className={`channel ${channelSelected ? 'selected' : ''}`} key={randomId} onClick={() => (setSelectedChannel(i /* Because i is the index that this has in the workspace channels array */), console.log(`Selected channel ${i}.....`))}># {currentWorkspace.channels[i]?.name}</div>
                ); // Selected not needed but will leave it as it is for reference
                const channelObject = {
                    selected: channelSelected,
                    domElement: domElement
                };
                channelsTemp.push(channelObject);
            }
            setChannels(channelsTemp);
            // setChannels(currentWorkspace.channels.map(ch => {
            //     selected: false,
            //     domElement: (
            //         <div className="channel" key={Utils.generateRandomId()}># {ch?.name}</div>
            //     )
            // }));
        }
    }, [currentWorkspace]);

    // const reactElement = <div className="yes">Yes</div>;

    useEffect(() => {
        if(channels && channels.length > 0 && selectedChannel !== -1)
        {
            // const channelsCopy = [...channels];
            // console.log(`Channels classList:`);
            // channelsCopy.forEach(ch => {
            //     if(ch.classList.contains('selected'))
            //         ch.classList.remove('selected');
            // });
            // channelsCopy[selectedChannel].classList.add('selected');
            // setChannels(channelsCopy);

            // Ik I don't need the selected property anymore but leave it as it is

            const channelsCopy = [...channels];

            // Remove selected for all elements
            channelsCopy.map(ch => {
                // Remove selected
                ch.selected = false;
                // Refresh component
                const oldComponent = {...ch.domElement};
                const newComponent = <div className="channel" key={oldComponent.key} onClick={oldComponent.props.onClick}>{oldComponent.props.children}</div>
                ch.domElement = newComponent;
            });

            // Add selected for selectedChannel
            channelsCopy[selectedChannel].selected = true;
            const oldComponent = {...channelsCopy[selectedChannel].domElement};
            const newComponent = <div className="channel selected" key={oldComponent.key} onClick={oldComponent.props.onClick}>{oldComponent.props.children}</div>
            channelsCopy[selectedChannel].domElement = newComponent;


            // console.log(`Channels copy: `, channelsCopy);
            // channelsCopy[selectedChannel].selected = true;
            // Add selected
            // channelsCopy[selectedChannel].domElement.props.className = 'channel selected';
            setChannels(channelsCopy);
        }
        // console.log(`Selected channel: `, selectedChannel);
    }, [selectedChannel]);

    useEffect(() => {
        console.log(`Channels use effect: `, channels);
    }, [channels])

    return (
        <div className="conversation-selector">
            <div className="channels">
                {/* <div className="channel"># general</div>
                <div className="channel"># announcements</div> */}
                { channels && channels.map(ch => ch.domElement) }
            </div>
        </div>
    );
}

export default ConversationSelector;