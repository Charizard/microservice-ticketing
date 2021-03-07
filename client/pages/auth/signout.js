import { useEffect } from 'react';
import useRequest from '../../hooks/use-request';

const signOut = () => {
  const [doRequest] = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return null;
};

export default signOut;