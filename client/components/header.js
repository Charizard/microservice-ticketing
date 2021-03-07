
const Header = ({ currentUser }) => {
  const isLoggedin = !!currentUser;

  const links = [
    !isLoggedin && { label: 'Sign up', href: '/auth/signup' },
    !isLoggedin && { label: 'Sign in', href: '/auth/signin' },
    isLoggedin && { label: currentUser.email, href: '/' },
    isLoggedin && { label: 'Sign out', href: '/auth/signout' },
  ]
  .filter(link => link)
  .map((link, index) => {
    return (
      <li key={index} className="pure-menu-item">
        <a className="pure-menu-link" href={link.href}>{link.label}</a>
      </li>
    );
  });

  return (
    <div className="header">
      <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
        <a className="pure-menu-heading" href="/">Ticketing</a>

        <ul className="pure-menu-list">
          {links}
        </ul>
      </div>
    </div>
  );
};

export default Header;
