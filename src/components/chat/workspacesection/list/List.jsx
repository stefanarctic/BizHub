
import { useState } from "react";
import ConversationSelector from "./conversationselector/ConversationSelector";
import SectionSelector from "./sectionselector/SectionSelector";
import DMs from "./dms/DMs";
import Settings from "./settings/Settings";

const List = () => {

    const [currentSelection, setCurrentSelection] = useState(1);

    return (
        <div className="list">
            <SectionSelector currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} />
            {currentSelection === 1 ? <ConversationSelector /> : (currentSelection === 2 ? <DMs /> : <Settings />)}
        </div>
    );
}
 
export default List;