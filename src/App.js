import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import PrivateRoute from './Route/PrivateRoute';
import { AuthProvider } from './Auth/AuthContext';
import CrudPage from './pages/CrudPage';
import DataPage from './pages/DataPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute component={Home} path='/home' />
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/crud' component={CrudPage}/>
          <Route exact path='/record' component={DataPage}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
