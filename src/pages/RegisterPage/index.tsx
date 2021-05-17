import './index.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useVideoChatContext } from 'modules/Context';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';

export const RegisterPage = () => {
  const [_username, _setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const history = useHistory();
  const { setUsername } = useVideoChatContext();

  const submit = () => {
    setUsername(_username);
    history.push('/');
  };

  return (
    <div className="register-page__page-container">
      <div className="register-page__window">
        <Typography className="register-page__title" variant="h1">County RP VideoChat</Typography>
        <Input
          className="register-page__input"
          placeholder="Имя пользователя"
          value={_username}
          onChange={event => _setUsername(event.currentTarget.value)}
        />
        <Input
          className="register-page__input"
          placeholder="Пароль"
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
        />
        <Input
          className="register-page__input"
          placeholder="Повторить пароль"
          value={repeatPassword}
          onChange={event => setRepeatPassword(event.currentTarget.value)}
        />
        <PrimaryButton onClick={submit}>Зарегистрироваться</PrimaryButton>
      </div>
    </div>
  )
}
