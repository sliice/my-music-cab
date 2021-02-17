import { createContext, useState } from 'react';

function noop () {};

export const Context = createContext({
    token: null,
    refreshToken: null,
    login: noop 
});