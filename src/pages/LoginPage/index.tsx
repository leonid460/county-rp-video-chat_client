import './index.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useVideoChatContext } from 'modules/Context';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';
import { Colors } from 'constants/ui';
import { Url } from 'constants/socket';

const useStyles = makeStyles((theme) => ({
  goToRegister: {
    marginBottom: '16px',
    color: Colors.primary,
    ...theme.typography.body1,
    fontWeight: 'bold',
    cursor: 'pointer',

    '&:hover': {
      color: Colors.primaryVariant,
    }
  },
  error: {
    marginBottom: '16px',
    ...theme.typography.body1,
    fontWeight: 'bold',
    color: Colors.error
  }
}));

export const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [error, setError] = useState('');
  const { setUsername: setUsernameInContext } = useVideoChatContext();

  const goToRegister = () => {
    history.push('/register');
  };

  const login = async () => {
    const response = await fetch(`${Url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (!response.ok) {
      const { status } = response;

      switch (status) {
        case 400:
          return setError('Неправильный запрос');
        case 401:
          return setError('Неверный пароль');
        case 404:
          return setError(`Пользователь ${username} не найден`);
      }
    }

    setError('');
    setUsernameInContext(username);
    history.push('/');
  }

  return (
    <div className="login-page__page-container">
      <div className="login-page__window">
        <Typography className="login-page__title" variant="h1">County RP VideoChat</Typography>
        <Input
          className="login-page__input"
          placeholder="Имя пользователя"
          value={username}
          onChange={event => setUsername(event.currentTarget.value)}
        />
        <Input
          className="login-page__input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
        />
        <div className={classes.goToRegister} onClick={goToRegister}>
          Нет аккаунта?
        </div>
        {!!error && <div className={classes.error}>{error}</div>}
        <PrimaryButton onClick={login} disabled={!(username && password)}>Войти</PrimaryButton>
      </div>
    </div>
  )
}
