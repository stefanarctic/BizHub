import { useEffect, useRef, useState } from "react";
import { joinedWorkspacesGlobal } from "../../../DataManager";
import * as Utils from '../../../../Util/Utils';
import { callOnLogin } from "../../../../Chat";

export let onUpdateJoinedWorkspaces = _joinedWorkspaces => {}
export let onUpdateCurrentWorkspace = _currentWorkspace => {}

export const WorkspaceTitle = ({ user, setCurrentWorkspace, currentWorkspaceId }) => {

    // const currentWorkspace = useRef(null);
    // const joinedWorkspaces = useRef(null);
    const [currentWorkspace, setCurrentWorkspaceInternal] = useState(null);
    const [joinedWorkspaces, setJoinedWorkspaces] = useState([]);
    const joinedWorkspacesListRef = useRef(null);

    const [refreshComponentV, setRefreshComponentV] = useState(0);

    const refreshComponent = () => {
        setRefreshComponentV(refreshComponentV + 1);
    }

    const toggleJoinedWorkspacesList = () => {
        joinedWorkspacesListRef.current.classList.toggle('show');
    }

    useEffect(() => {
        console.log(`In refreshComponentV joined workspaces: `, joinedWorkspaces);
    }, [refreshComponentV]);

    useEffect(() => {
        onUpdateJoinedWorkspaces = _joinedWorkspaces => {
            console.log(`On update joined workspaces`, _joinedWorkspaces);
            setJoinedWorkspaces(_joinedWorkspaces);
        }
        onUpdateCurrentWorkspace = _currentWorkspace => {
            setCurrentWorkspaceInternal(_currentWorkspace);
        }
        setTimeout(() => {
            refreshComponent();
        }, 1000);
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
            // localStorage.setItem('currentWorkspaceId', currentWorkspace.id);
        }
    }, [currentWorkspace]);

    // useEffect(() => {
    //     joinedWorkspaces.current = joinedWorkspacesGlobal;
    //     console.log(`Joined workspaces: `, joinedWorkspacesGlobal);
    // });

    // useEffect(() => {
    //     if(user)
    //     {
    //         setCurrentWorkspaceInternal(currentWorkspace);
    //         setJoinedWorkspaces(joinedWorkspaces);
    //         // console.log('Current workspace: ', user.currentWorkspace);
    //         // setJoinedWorkspaces(user.joinedWorkspaces);
    //         // setCurrentWorkspaceInternal(user.currentWorkspace);
    //     }
    // });

    const switchWorkspace = e => {
        const newSelectedWorkspaceId = e.target.id;
        const newWorkspace = joinedWorkspaces.find(workspace => workspace.id === newSelectedWorkspaceId);
        // console.log(`Switched to `, newWorkspace);
        newWorkspace.id = newSelectedWorkspaceId;
        currentWorkspaceId.current = newWorkspace.id;
        setCurrentWorkspaceInternal(newWorkspace);
        setCurrentWorkspace(newWorkspace);
        setTimeout(() => {
            callOnLogin();
        }, 50);
        localStorage.currentWorkspaceId = newWorkspace.id;
        // localStorage.setItem('currentWorkspaceId', newSelectedWorkspaceId);
        // console.log(`Switched to:`);
        // console.dir(e.target.id);
    }

    return (
        <div className="workspace-title" onClick={toggleJoinedWorkspacesList}>
            <div className="text-and-arrow">
                <h1>{currentWorkspace?.name}</h1>
                <img src="images/icons/white/arrow-down.png" />
            </div>
            <div className="joined-workspaces-select" ref={joinedWorkspacesListRef}>
                { joinedWorkspaces.map(workspace => (
                    <span key={workspace.id} onClick={switchWorkspace} id={workspace.id}>{workspace.name}</span>
                )) }
            </div>
        </div>
    );
}