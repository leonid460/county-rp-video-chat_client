import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { CallPage } from 'pages/CallPage';
import { useAuthCheck } from './useAuthCheck';

const App = () => {
  useAuthCheck();

  return (
    <div className="global-container">
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/">
          <MainPage />
        </Route>

        <Route exact path="/call">
          <CallPage />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
