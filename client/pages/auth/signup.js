import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const signUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const body = {
    email,
    password
  };

  const [doRequest, errors] = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: body,
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    
    doRequest();
  };

  return (
    <div className="pure-g signup-form-wrapper">
      <div className="pure-u-1-3"><p></p></div>
      <div className="pure-u-1-3">       
        <form className="pure-form pure-form-stacked signup-form" onSubmit={onSubmit}>
          <fieldset>
            <legend>Sign up for Ticketing</legend>
            <label htmlFor="stacked-email">Email</label>
            <input type="email" id="stacked-email"
              placeholder="Email"
              value={email}
              onChange={ e => setEmail(e.target.value)}
            />
            <span className="pure-form-message">{errors.find((e) => e['field'] == 'email' )?.message}</span>
            <label htmlFor="stacked-password">Password</label>
            <input type="password" id="stacked-password"
              placeholder="Password"
              value={password}
              min={4}
              max={20}
              onChange={ e => setPassword(e.target.value)}
            />
            <span className="pure-form-message">{errors.find((e) => e['field'] == 'password' )?.message}</span>
            {/* <label for="stacked-remember" className="pure-checkbox">
                <input type="checkbox" id="stacked-remember" /> Remember me</label> */}
            <button type="submit" className="pure-button pure-button-primary">Sign up</button>
          </fieldset>
        </form>
      </div>
      <div className="pure-u-1-3"><p></p></div>
    </div>
  );
}

export default signUp;