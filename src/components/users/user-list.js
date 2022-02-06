import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Col, Input, InputGroup, Label, List, ListGroup } from 'reactstrap';
import { retrieveUsers, findUserByName, deleteAllUsers } from '../../actions/users';
import AddUser from './add-user';
import { Redirect } from 'react-router-dom';
import Conversations from './conversations';
import UserDataService from '../../services/user';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.optionalAddress = this.optionalAddress.bind(this);
    this.fetchServer = this.fetchServer.bind(this);
    this.promoteUser = this.promoteUser.bind(this);

    this.state = {
      currentUser: null,
      currentIndex: -1,
      searchName: ' '
    };
  }

  componentDidMount() {
    this.fetchServer();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      this.fetchServer();
    }
  }

  fetchServer() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken
      this.props.retrieveUsers(token);
        }
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  refreshData() {
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    console.log(user);
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    const token = this.props.auth.stsTokenManager.accessToken
    this.props
      .deleteAllUsers(token)
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByName() {
    this.refreshData();
    this.props.findUserByName(this.state.searchName);
  }

  optionalAddress(address) {
    if (address) {
      return (
        <>
        <Label><strong>Street:</strong></Label>
        {address.street}
        </>
      )
    }
    else {
      return(
        <>
        <strong>No Address For This User</strong>
        </>
      )
    }
  }

  promoteUser(uuid) {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      let token = this.props.auth.stsTokenManager.accessToken;
      UserDataService.promoteUser(uuid, token);
    }
  }

  render() {
    const { searchName, currentUser, currentIndex } = this.state;
    const { users } = this.props;

    if (this.props.auth.isLoaded && this.props.auth.isEmpty) return <Redirect to='/'/>

    return (
      <>
      <List className="row">
        <Col md="8">
          <InputGroup className="mb-3">
            <Input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <Button outline color="secondary" onClick={this.findByTitle}>
                Search
              </Button>
            </div>
          </InputGroup>
        </Col>
        <div className="col-md-6">
          <h4>User List</h4>

          <ListGroup>
            {users &&
              users.map((currentUser, index) => (
                <li
                  className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                  onClick={() => this.setActiveUser(currentUser, index)}
                  key={index}>
                  {currentUser.penName}
                </li>
              ))}
          </ListGroup>

          <Button color="danger" className="m-3" onClick={this.removeAllUsers}>
            Remove All
          </Button>
        </div>
        <Col md={6}>
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <Label>
                  <strong>Pen Name:</strong>
                </Label>{' '}
                {currentUser.penName}
              </div>
              <div>
                <Label>
                  <strong>Email:</strong>
                </Label>{' '}
                {currentUser.email}
              </div>
              <div>
                {this.optionalAddress(currentUser.address)}
              </div>
              <Link to={'/user/' + currentUser.uuid}><Badge className='text-white' color='primary'>Edit</Badge></Link>
              <Button onClick={() => this.promoteUser(currentUser.uuid)} size='sm' color='secondary' className='text-white'>Promote To Admin</Button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </Col>
      </List>
      <h1>Add User</h1>
        <AddUser />
        <Conversations/>
      </>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, { retrieveUsers, findUserByName, deleteAllUsers })(
  UsersList
);
