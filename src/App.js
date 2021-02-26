import './components/style/index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth';
import { AuthContext } from './components/context/AuthContext';
import { useRoutes } from './components/Routes';

export const App = () => {

  const { token, refreshToken, login, logout } = useAuth();
  const routes = useRoutes();

  return (
    <AuthContext.Provider value={{ token, refreshToken, login, logout }}>
      <Router>        
        { routes }      
      </Router>
    </AuthContext.Provider>
  );
}

export default App;