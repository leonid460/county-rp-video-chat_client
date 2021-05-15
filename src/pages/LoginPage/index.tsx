import { useState } from 'react';
import './index.scss';
import { useSocketContext } from 'modules/Context';
import { Typography } from '@material-ui/core';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';
import { useHistory } from 'react-router-dom';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const { setName } = useSocketContext();

  const submit = () => {
    setName(username);
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
        <Input className="login-page__input" placeholder="Пароль" disabled />
        <PrimaryButton onClick={submit}>Войти</PrimaryButton>
      </div>
    </div>
  )
}
