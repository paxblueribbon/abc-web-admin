import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { signOut } from '../../actions/firebase';

class SignedInLinks extends React.Component {
  render() {
    return (
      <Nav className="navbar-nav mr-auto">
        <NavItem>
          <Link to={'/prisoners'} className="nav-link">
            Prisoners
          </Link>
        </NavItem>
        <NavItem>
          <Link to={'/prisons'} className="nav-link">
            Prisons
          </Link>
        </NavItem>
        <NavItem>
          <Link to={'/users'} className='nav-link'>
            Users
          </Link>
        </NavItem>
        <NavItem>
          <Link to={'/messages'} className='nav-link'>
            Messages
          </Link>
        </NavItem>
        <NavItem>
          <Link onClick={this.props.signOut} to={'/'} className="nav-link">
            Log Out
          </Link>
        </NavItem>

      </Nav>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks)