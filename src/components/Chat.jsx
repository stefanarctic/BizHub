import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUsers } from "../features/users";
import { useEffect } from "react";

const Chat = () => {

    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.value);

    const updateUsers = async () => {
        const users = await getUsers();

        console.log('Updated users: ', users);
        dispatch(setUsers(users));
    }

    useEffect(() => {

        (async () => {
            await updateUsers();
            console.log
        })();

    }, []);

    return (
        <></>
    );

}

export default Chat;