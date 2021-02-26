import { useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useClient } from '../client/Client';
import Albums from './Albums';
import Tracks from './Tracks';
  

export const useRoutes = () => {
    
    const { token } = useContext(AuthContext);
    // const { fetchToken } = useClient();

    // wrong bc executes before returning routes
    // useEffect( () => {
    //   if (!token){
    //     fetchToken();      
    //   }
    // }, [token]);

    return (
        <Switch>
            <Route path='/playlists'>
                <Albums/>
            </Route>
            <Route path='/tracks'>
                <Tracks/>
            </Route>
            <Redirect to='/playlists'/>
        </Switch>
    );
}