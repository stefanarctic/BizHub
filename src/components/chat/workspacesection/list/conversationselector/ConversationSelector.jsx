import { useEffect, useRef, useState } from "react";
import * as Utils from '../../../../Util/Utils';
import { getInputRef, getMessagesSectionRef, onCurrentChannelUpdate, scrollToLastMessage, setCurrentChannelGlobal } from "../../../messages/Messages";

export let getSelectedChannel = () => {}
export let refreshSelectedChannel = () => {}
export let getChannelsParent = () => {}

export let setOnChannelUpdate = callback => {}

const ConversationSelector = ({ user, currentWorkspace }) => {

    const [channels, setChannels] = useState([]); // Objects { domElement, selected }
    const channelsParentRef = useRef(null);
    // const selectedChannel = useRef(-1);
    // const [currentChannel, setCurrentChannel] = getCurrentChannel();
    const [selectedChannel, setSelectedChannel] = useState(-1);

    const [refreshComponentV, setRefreshComponentV] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setSelectedChannel(0);
            refreshComponent();
        }, 1000);
    }, []);

    useEffect(() => {
        console.log(`Current workspace conversation selector: `, currentWorkspace);
    }, [currentWorkspace]);

    useEffect(() => {
        console.log(`Channels parent ref: `, channelsParentRef.current.children);
    }, [channelsParentRef]);

    const refreshComponent = () => {
        console.log(`Refreshed conversation selector component`);
        setRefreshComponentV(refreshComponentV + 1);
    }

    onCurrentChannelUpdate(currentChannel => {
        setSelectedChannel(currentChannel);
    });

    let onChannelUpdate = callback => {}

    useEffect(() => {
        setOnChannelUpdate = callback => {
            onChannelUpdate = callback;
        }
        getSelectedChannel = () => {
            return selectedChannel;
        }
        getChannelsParent = () => {
            return channelsParentRef;
        }
        refreshSelectedChannel = () => {
            console.log(`Channels refresh selected:`, channels);
            // setTimeout(() => {
            //     const channelsParentRef = getChannelsParent();
            //     channelsParentRef.current.children.item(selectedChannel).className = 'channel selected';
            //     console.log(`CPR: `, channelsParentRef.current.children.item(0).className);
            //     // channelsParentRef.current.children.item(0).class;
            // }, 5000);
            if(channelsParentRef.current)
            {
                // console.log(`Channels parent ref refresh: `, channelsParentRef.current.children);
                // const children = Array.prototype.slice.call(channelsParentRef.current.children);
                console.log(`Channels parent ref first children: `, channelsParentRef.current.children);
                // children[0].props.className = 'channel selected';

                // channelsParentRef.current.children.forEach(element => {
                //     element.props.className = 'channel selected';
                // });
            }
            else
            {
                console.log(`Channel parent ref null`);
            }
            // if(channels.length === 0)
            //     return;
            // // Re-select current channel
            // const channelsCopy = [...channels];
            // // channelsCopy[selectedChannel].selected = true;
            // const oldComponent = {...channelsCopy[selectedChannel].domElement};
            // const newComponent = <div className="channel selected" key={oldComponent.key} onClick={oldComponent.props.onClick}>{oldComponent.props.children}</div>
            // channelsCopy[selectedChannel].domElement = newComponent;
            // console.log(`Set channels: `, channelsCopy);
            // setChannels(channelsCopy);
            // refreshComponent();
            // channels[selectedChannel]
            // const sc = selectedChannel;
            // setSelectedChannel(sc);
            // setSelectedChannel(sc + 1);
        }
        // setSelectedChannel(1);

        // refreshSelectedChannel();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const messagesSectionRef = getMessagesSectionRef();
            if(messagesSectionRef && messagesSectionRef.current)
            {
                // scrollToLastMessage();
                const messagesLocal = messagesSectionRef.current.children;
                if(messagesLocal && messagesLocal.item(messagesLocal.length - 1))
                {
                    messagesLocal.item(messagesLocal.length - 1).scrollIntoView({ behavior: 'instant' });
                    // console.log(messagesLocal.item(messagesLocal.length - 1));
                    console.log(`Scrolled into view`);
                }
                console.log(`Scrolled to last message useEffect selectedChannel`);
    
            }
        }, 5);
    }, [selectedChannel]);

    useEffect(() => {
        setCurrentChannelGlobal(selectedChannel);
        console.log(`Current selected channel: `, selectedChannel);
        // Focus on input
        const inputRef = getInputRef();
        if(inputRef)
        {
            inputRef.current.focus();
        }
        // Scroll to the last message
        // scrollToLastMessageGlobal();
        refreshSelectedChannel();
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
    }, [channels]);

    useEffect(() => {
        if(channelsParentRef.current && channelsParentRef.current.children && channelsParentRef.current.children.length > 0 && selectedChannel !== -1)
        {
            // Set current channel selected
            const channelsParentRef = getChannelsParent();
            channelsParentRef.current.children.item(selectedChannel).className = 'channel selected';
            console.log(`CPR: `, channelsParentRef.current.children.item(selectedChannel).className);
            onChannelUpdate();
        }
    });

    return (
        <div className="conversation-selector">
            <div className="channels" ref={channelsParentRef}>
                {/* <div className="channel"># general</div>
                <div className="channel"># announcements</div> */}
                { channels && channels.map(ch => ch.domElement) }
            </div>
        </div>
    );
}

export default ConversationSelector;