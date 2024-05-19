import { useEffect, useRef, useState } from "react";

export let loggedInGlobal = null;
export let setLoggedInGlobal = () => {}
export let userGlobal = null;
export let setUserGlobal = () => {}
export let currentWorkspaceGlobal = null;
export let setCurrentWorkspaceGlobal = () => {}
export let joinedWorkspacesGlobal = null;
export let setJoinedWorkspacesGlobal = () => {}
export let currentWorkspaceIdGlobal = null;

export const DataManager = ({ loggedIn, setLoggedIn, user, setUser, currentWorkspace, setCurrentWorkspace, joinedWorkspaces, setJoinedWorkspaces, currentWorkspaceId }) => {

    // Can use them in useEffect in every component
    useEffect(() => {
        loggedInGlobal = loggedIn;
        setLoggedInGlobal = setLoggedIn;
        userGlobal = user;
        setUserGlobal = setUser;
        currentWorkspaceGlobal = currentWorkspace;
        setCurrentWorkspaceGlobal = setCurrentWorkspace;
        joinedWorkspacesGlobal = joinedWorkspaces;
        setJoinedWorkspacesGlobal = setJoinedWorkspaces;
        currentWorkspaceIdGlobal = currentWorkspaceId;
    }, []);


    // useEffect(() => {
    //     console.log(`Current workspace modified DataManager.jsx `, currentWorkspace);
    // }, [currentWorkspace]);

    return (<></>);
}