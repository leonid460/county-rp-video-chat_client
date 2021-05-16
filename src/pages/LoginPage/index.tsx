import './index.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useVideoChatContext } from 'modules/Context';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';

export const LoginPage = () => {
  const [_username, _setUsername] = useState('');
  const history = useHistory();
  const { setUsername } = useVideoChatContext();

  const submit = () => {
    setUsername(_username);
    history.push('/');
  }

  return (
    <div className="login-page__page-container">
      <div className="login-page__window">
        <Typography className="login-page__title" variant="h1">County RP VideoChat</Typography>
        <Input
          className="login-page__input"
          placeholder="Имя пользователя"
          value={_username}
          onChange={event => _setUsername(event.currentTarget.value)}
        />
        <Input className="login-page__input" placeholder="Пароль" disabled />
        <PrimaryButton onClick={submit}>Войти</PrimaryButton>
      </div>
    </div>
  )
}
