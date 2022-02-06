import React from 'react';
import { Navbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, refreshAccessToken } from '../../actions/firebase';
import SignedInLinks from './signedinlinks';

const NavBar = (props) => {
  console.log(props);
  if (props.auth.stsTokenManager && (Date.now() > props.auth.stsTokenManager.expirationTime)) {
    this.props.refreshAccessToken();
  }
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : ""
  return (
    <Navbar className="navbar-expand navbar-dark bg-dark">
      <Link to={'/'} className="navbar-brand">
        Aye Bee See Admin Dashboard
      </Link>
      {links}
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    refreshAccessToken: refreshAccessToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
