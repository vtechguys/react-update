import React from 'react';

const uuid = Math.floor(Math.random() * 10000000000);
export const userInitState = {
        email: '',
        username: '',
        isAuthenticated: false,
        uuid,
};
export const UserContext = React.createContext( {
    user: userInitState,
    setUser: () => {},  
 });
