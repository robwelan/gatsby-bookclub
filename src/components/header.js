import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { FirebaseContext } from './firebase';
import styled from 'styled-components';

const AdminLink = styled.span`
  a {
    color: white;
  }
`;

const Divider = styled.span`
  background: #ddd;
  margin: 0 8px;
  padding-right: 1px;
`;

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const HeaderContent = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;

  >h1 {
    margin: 0;
    flex-grow: 1;

    >a {
      color: white;
      text-decoration: none;
    }
  }

    >div {
      margin: auto 0;
    }
  }
`;

const LoginLink = styled.div`
  margin: auto 0;

  a {
    color: white;
    margin: auto 0;
    text-decoration: none;
  }
`;

const LogoutLink = styled.span`
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  color: white;
  text-align: right;
`;

const Header = ({ siteTitle }) => {
  const { firebase, user } = useContext(FirebaseContext);
  console.log('user', user)
  const handleLogoutClick = () => {
    firebase
    .logout()
    .then(() => navigate('/login'));
  };

  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link
            to="/"
          >
            {siteTitle}
          </Link>
        </h1>
        <div>
          {!!user && !!user.email && (
            <UserInfo>
              Hello, {user.username || user.email}
              <div>
                {!!user.admin && (
                  <>
                    <AdminLink>
                      <Link to="/add-author">
                        Add author
                      </Link>
                    </AdminLink>
                    <Divider />
                    <AdminLink>
                      <Link to="/add-book">
                        Add book
                      </Link>
                    </AdminLink>
                    <Divider />
                  </>
                )}
                <LogoutLink onClick={handleLogoutClick}>
                  Logout
                </LogoutLink>
              </div>
            </UserInfo>
          )}
          {(!user || !user.email) && (
            <LoginLink>
              <Link to="/login">
                Login
              </Link>
              <Divider />
              <Link to="/register">
                Register
              </Link>
            </LoginLink>
          )}
        </div>
      </HeaderContent>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
