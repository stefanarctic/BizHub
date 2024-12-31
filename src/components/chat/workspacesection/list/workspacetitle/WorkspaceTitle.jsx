import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace } from "../../../../../features/currentWorkspace";

const WorkspaceTitle = () => {

    const dispatch = useDispatch();

    const currentWorkspace = useSelector(state => state.currentWorkspace.value);
    const joinedWorkspaces = useSelector(state => state.joinedWorkspaces.value);

    const joinedWorkspacesListRef = useRef(null);

    const toggleJoinedWorkspacesList = () => {
        joinedWorkspacesListRef.current.classList.toggle('show');
    }

    const switchWorkspace = e => {
        const newSelectedWorkspaceId = e.target.id;
        const newWorkspace = joinedWorkspaces.find(workspace => workspace.id === newSelectedWorkspaceId);
        dispatch(setCurrentWorkspace(newWorkspace));
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
 
export default WorkspaceTitle;