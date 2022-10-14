import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import PrivateRoute from './Route/PrivateRoute';
import { AuthProvider } from './Auth/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute component={Home} path='/home' />
          <Route exact path='/' component={LoginPage}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
