import './components/style/index.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Context } from './components/context/Context';
import Albums from './components/Albums';
import Tracks from './components/Tracks';
  

export const App = () => {
  
  return (
    <Context.Provider>
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
