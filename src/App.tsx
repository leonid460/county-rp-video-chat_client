import './App.scss';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { MainPage } from 'pages/MainPage';
import { useSocketContext } from 'modules/Context';
import {useEffect} from "react";

function useAuthCheck() {
  const { name } = useSocketContext();
  const history = useHistory();

  useEffect(() => {
    if (!name) {
      history.push('/login');
    }
  }, [history, name]);
}

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

        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
