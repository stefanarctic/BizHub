import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/users.js'
import currentUserReducer from './features/currentUser.js';
import joinedWorkspacesReducer from './features/joinedWorkspaces.js';
import currentWorkspaceReducer from './features/currentWorkspace.js';
import currentSectionReducer from './features/currentSection.js';
import currentChannelReducer from './features/currentChannel.js';
import currentMessagesReducer from './features/currentMessages.js';
import currentMembersReducer from './features/currentMembers.js';
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
    joinedWorkspaces: joinedWorkspacesReducer,
    currentWorkspace: currentWorkspaceReducer,
    currentSection: currentSectionReducer,
    currentChannel: currentChannelReducer,
    currentMessages: currentMessagesReducer,
    currentMembers: currentMembersReducer,
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  // </React.StrictMode>,
)