import { useEffect, useState } from "react";

const WorkspaceTitle = ({ user, currentWorkspace, joinedWorkspaces }) => {

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
        <div className="workspace-title">
            <h1>{currentWorkspace?.name}</h1>
            {/* To add joined workspaces selector */}
        </div>
    );
}
 
export default WorkspaceTitle;