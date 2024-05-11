import { useState } from "react";

const WorkspaceTitle = () => {

    const [workspaceTitle, setWorkspaceTitle] = useState('Black Belt Developers');

    return (
        <div className="workspace-title">
            <h1>{workspaceTitle}</h1>
        </div>
    );
}
 
export default WorkspaceTitle;