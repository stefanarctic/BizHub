
import { useEffect, useState } from "react";
import ConversationSelector from "./conversationselector/ConversationSelector";
import SectionSelector from "./sectionselector/SectionSelector";
import DMs from "./dms/DMs";
import Settings from "./settings/Settings";

export const List = ({ user, setUser, currentWorkspace, joinedWorkspaces }) => {

    const [currentSelection, setCurrentSelection] = useState(1);

    return (
        <div className="list">
            <SectionSelector currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} user={user} />
            {currentSelection === 1 ? <ConversationSelector user={user} currentWorkspace={currentWorkspace} selectChannel={setCurrentSelection} /> : (currentSelection === 2 ? <DMs user={user} setUser={setUser} /> : <Settings user={user} setUser={setUser} />)}
        </div>
    );
}