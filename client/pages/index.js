import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  const isLoggedin = !!currentUser;

  return (
    <div className="splash-container">
      <div className="splash">
        <h1 className="splash-head">{isLoggedin ? "You are logged in" : "Get lost you!"}</h1>
        <p className="splash-subhead">
          Blah Blah Blah!!!
        </p>
        <p>
          <a href="http://purecss.io" className="pure-button pure-button-primary">Get Started</a>
        </p>
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log("This is check index session!!!");
  let res;

  try {
    res = await buildClient(context).get('/api/users/currentuser');
  } catch (err) {
    return { currentUser: null };
  }

  return res.data; 
};

export default LandingPage;
