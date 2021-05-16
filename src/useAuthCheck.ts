import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useVideoChatContext } from './modules/Context';

export function useAuthCheck() {
  const { username } = useVideoChatContext();
  const history = useHistory();

  useEffect(() => {
    if (!username) {
      history.push('/login');
    }
  }, [history, username]);
}
