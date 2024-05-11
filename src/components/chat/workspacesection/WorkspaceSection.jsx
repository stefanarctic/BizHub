import List from "./list/List";
import WorkspaceTitle from "./list/workspacetitle/WorkspaceTitle";

const WorkspaceSection = () => {
    return (
        <div className="workspace-section">
            <WorkspaceTitle />
            <List />
        </div>
    );
}
 
export default WorkspaceSection;