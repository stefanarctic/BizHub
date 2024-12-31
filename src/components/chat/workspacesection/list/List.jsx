import SectionSelector from "./sectionselector/SectionSelector";
import ConversationSelector from "./conversationselector/ConversationSelector";
import DMs from "./dms/DMs";
import Settings from "./settings/Settings";
import { useSelector } from "react-redux";

const List = () => {

    const currentSection = useSelector(state => state.currentSection.value);

    const getCurrentSection = () => {
        switch(currentSection)
        {
            case 0:
                return <ConversationSelector />;
            case 1:
                return <DMs />;
            case 2:
                return <Settings />;
        }
    }

    return (
        <div className="list">
            <SectionSelector />
            { getCurrentSection() }
        </div>
    );
}
 
export default List;