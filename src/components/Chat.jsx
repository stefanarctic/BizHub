import { useDispatch, useSelector } from "react-redux";
import { getUsers, setUsers } from "../features/users";
import { useEffect, useState } from "react";
import * as Utils from './Util/Utils';

const Chat = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.value);

    const updateUsers = async () => {
        const users = await getUsers();
        console.log('update', users);
        dispatch(setUsers(users));
    }
    
    getUsersGlobal = () => {
        return users;
    }

    useEffect(() => {
        updateUsers();
    }, []);

    return (
        <div className="test">
            { users && users.map(user => (
                <p key={Utils.generateRandomId()}>{user.email}</p>
            )) }
        </div>
    );
}

export default Chat;