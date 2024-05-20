import { logOutGlobal } from "../../../../Chat";

const Settings = ({ user, setUser }) => {

    const localLogOut = () => {
        logOutGlobal();
    }

    return (
        <div className="settings">
            <button onClick={localLogOut}>Log Out</button>
        </div>
    );
}
 
export default Settings;