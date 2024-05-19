import { useEffect, useRef, useState } from "react";
import { joinedWorkspacesGlobal } from "../../../DataManager";

export let onUpdateJoinedWorkspaces = _joinedWorkspaces => {}
export let onUpdateCurrentWorkspace = _currentWorkspace => {}

export const WorkspaceTitle = ({ user }) => {

    // const currentWorkspace = useRef(null);
    // const joinedWorkspaces = useRef(null);
    const [currentWorkspace, setCurrentWorkspace] = useState(null);
    const [joinedWorkspaces, setJoinedWorkspaces] = useState([]);
    const joinedWorkspacesListRef = useRef(null);

    const toggleJoinedWorkspacesList = () => {
        joinedWorkspacesListRef.current.classList.toggle('show');
    }

    useEffect(() => {
        onUpdateJoinedWorkspaces = _joinedWorkspaces => {
            setJoinedWorkspaces(_joinedWorkspaces);
        }
        onUpdateCurrentWorkspace = _currentWorkspace => {
            setCurrentWorkspace(_currentWorkspace);
        }
    }, []);

    useEffect(() => {
        if(joinedWorkspaces)
        {
            console.log(`Use effect joined workspaces WorkspaceTitle.jsx`, joinedWorkspaces);
        }
    }, [joinedWorkspaces]);

    useEffect(() => {
        if(currentWorkspace)
        {
            console.log(`Current workspace WorkspaceTitle.jsx `, currentWorkspace);
        }
    }, [currentWorkspace]);

    // useEffect(() => {
    //     joinedWorkspaces.current = joinedWorkspacesGlobal;
    //     console.log(`Joined workspaces: `, joinedWorkspacesGlobal);
    // });

    // useEffect(() => {
    //     if(user)
    //     {
    //         setCurrentWorkspace(currentWorkspace);
    //         setJoinedWorkspaces(joinedWorkspaces);
    //         // console.log('Current workspace: ', user.currentWorkspace);
    //         // setJoinedWorkspaces(user.joinedWorkspaces);
    //         // setCurrentWorkspace(user.currentWorkspace);
    //     }
    // });

    return (
        <div className="workspace-title" onClick={toggleJoinedWorkspacesList}>
            <div className="text-and-arrow">
                <h1>{currentWorkspace?.name}</h1>
                <img src="images/icons/white/arrow-down.png" />
            </div>
            <div className="joined-workspaces-select" ref={joinedWorkspacesListRef}>
                <span>Select 1</span>
                <span>Select 2</span>
                <span>Select 3</span>
            </div>
        </div>
    );
}