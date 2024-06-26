import { createContext } from 'react';

function noop () {};

export const AuthContext = createContext({
    token: null,
    refreshToken: null,
    login: noop,
    logout: noop 
});