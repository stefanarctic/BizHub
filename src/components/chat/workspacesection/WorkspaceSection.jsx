import { List } from "./list/List";
import { WorkspaceTitle } from "./list/workspacetitle/WorkspaceTitle";

const WorkspaceSection = ({ user, setUser, currentWorkspace, joinedWorkspaces }) => {
    return (
        <div className="workspace-section">
            <WorkspaceTitle user={user} currentWorkspace={currentWorkspace} />
            <List user={user} setUser={setUser} currentWorkspace={currentWorkspace} joinedWorkspaces={joinedWorkspaces} />
        </div>
    );
}
 
export default WorkspaceSection;