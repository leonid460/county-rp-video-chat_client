import './index.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useVideoChatContext } from 'modules/Context';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';
import { Url } from 'constants/socket';
import {Colors} from "../../constants/ui";

const useStyles = makeStyles((theme) => ({
  error: {
    marginBottom: '16px',
    ...theme.typography.body1,
    fontWeight: 'bold',
    color: Colors.error
  }
}));

export const RegisterPage = () => {
  const [username, _setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();
  const history = useHistory();
  const { setUsername: setUsernameInContext } = useVideoChatContext();
  const buttonIsDisabled = !(username && password && repeatPassword === password);

  const registerUser = async () => {
    const response = await fetch(`${Url}/register`, {
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
        case 409:
          return setError(`Пользователь ${username} уже существует`);
        default:
          return setError(`Ошибка`);
      }
    }

    setError('');
    setUsernameInContext(username);
    history.push('/');
  }

  return (
    <div className="register-page__page-container">
      <div className="register-page__window">
        <Typography className="register-page__title" variant="h1">
          County RP VideoChat
        </Typography>
        <Input
          className="register-page__input"
          placeholder="Имя пользователя"
          value={username}
          onChange={event => _setUsername(event.currentTarget.value)}
        />
        <Input
          className="register-page__input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
        />
        <Input
          className="register-page__input"
          placeholder="Повторить пароль"
          type="password"
          isInvalid={!!(password && repeatPassword) && password !== repeatPassword}
          value={repeatPassword}
          onChange={event => setRepeatPassword(event.currentTarget.value)}
        />
        {!!error && <div className={classes.error}>{error}</div>}
        <PrimaryButton disabled={buttonIsDisabled} onClick={registerUser}>
          Зарегистрироваться
        </PrimaryButton>
      </div>
    </div>
  )
}
