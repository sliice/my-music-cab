import './components/style/index.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Context } from './components/context/Context';
import Albums from './components/Albums';
import Tracks from './components/Tracks';
import { useAuth } from './hooks/auth';
import { useClient } from './client/Client';
  

export const App = () => {
  const { token, refreshToken, login } = useAuth();
  const { fetchToken } = useClient();

  // authorization
  useEffect( () => {
    if (!token){
      fetchToken();
    }
  }, [token]);

  return (
    <Context.Provider value={{ token, refreshToken, login }}>
      <Router> 
        <Switch>
          <Route path='/playlists'>
            <Albums/>
          </Route>
          <Route path='/tracks'>
            <Tracks/>
          </Route>
          <Redirect to='/playlists'/>
        </Switch>      
      </Router>
    </Context.Provider>
  );
}

export default App;
