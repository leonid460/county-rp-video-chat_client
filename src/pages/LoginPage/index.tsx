import './index.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useVideoChatContext } from 'modules/Context';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'constants/ui';

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
  }
}));

export const LoginPage = () => {
  const classes = useStyles();
  const [_username, _setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { setUsername } = useVideoChatContext();

  const submit = () => {
    setUsername(_username);
    history.push('/');
  };

  const goToRegister = () => {
    history.push('/register');
  };

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
        <Input
          className="login-page__input"
          placeholder="Пароль"
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
        />
        <div className={classes.goToRegister} onClick={goToRegister}>
          Нет аккаунта?
        </div>
        <PrimaryButton onClick={submit}>Войти</PrimaryButton>
      </div>
    </div>
  )
}
