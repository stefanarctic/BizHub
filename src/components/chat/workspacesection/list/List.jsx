
import ConversationSelector from "./conversationselector/ConversationSelector";
import SectionSelector from "./sectionselector/SectionSelector";
import WorkspaceTitle from "./workspacetitle/WorkspaceTitle";

const List = () => {
    return (
        <div className="list">
            <SectionSelector />
            <ConversationSelector />
        </div>
    );
}
 
export default List;