import 'purecss/build/pure.css';
import '../pages/styles/app.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const isLoggedin = !!currentUser;

  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  let res;

  try {
    res = await buildClient(ctx).get('/api/users/currentuser');
  } catch (err) {
    res = { data: { currentUser: null } };
  } finally {
    return {
      pageProps: {
        ...(Component.getInitialProps ?
          await Component.getInitialProps(ctx) :
          {}),
      },
      ...res.data
    };
  }
};

export default AppComponent;