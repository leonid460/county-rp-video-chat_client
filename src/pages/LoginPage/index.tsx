import './index.scss';
import { Typography } from '@material-ui/core';
import { Input } from 'components/Input';
import { PrimaryButton } from 'components/Button';

export const LoginPage = () => {
  return (
    <div className="login-page__page-container">
      <div className="login-page__window">
        <Typography className="login-page__title" variant="h1">County RP VideoChat</Typography>
        <Input className="login-page__input" placeholder="Имя пользователя" />
        <Input className="login-page__input" placeholder="Пароль" />
        <PrimaryButton>Войти</PrimaryButton>
      </div>
    </div>
  )
}
