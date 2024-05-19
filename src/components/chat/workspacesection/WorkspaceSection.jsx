import { List } from "./list/List";
import { WorkspaceTitle } from "./list/workspacetitle/WorkspaceTitle";

const WorkspaceSection = ({ user, setUser, currentWorkspace, joinedWorkspaces, setCurrentWorkspace, currentWorkspaceId }) => {
    return (
        <div className="workspace-section">
            <WorkspaceTitle user={user} setCurrentWorkspace={setCurrentWorkspace} currentWorkspaceId={currentWorkspaceId} />
            <List user={user} setUser={setUser} currentWorkspace={currentWorkspace} joinedWorkspaces={joinedWorkspaces} />
        </div>
    );
}
 
export default WorkspaceSection;