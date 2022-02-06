//https://www.bezkoder.com/react-redux-crud-example/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser } from '../../actions/users';
import UserDataService from '../../services/user';
import { Button, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Address from '../../utilities/address';

class User extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.getUser = this.getUser.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeUser = this.removeUser.bind(this);

    this.state = {
      currentUser: {
        uuid: null,
        penName: ' ',
        userName: '',
        email: ' ',
        address: {
          city: ' ',
          country: ' ',
          state: ' ',
          street: ' ',
          zip: ' '
        },
      },
      message: ' '
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
        this.getUser(this.props.match && this.props.match.params.uuid);
      }
    }
  }

  handleChange = (e) => {
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          [e.target.id]: e.target.value
        }
      }
    })
  }

  handleAddressChange = (e) => {
    console.log(e);
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        address: {
          ...this.state.currentUser.address,
          [e.target.id] : e.target.value
        }
      }
    }, () => { console.log(this.state.currentUser) });
  }

  getUser(uuid) {
    const token = this.props.auth.stsTokenManager.accessToken;

    UserDataService.get(uuid, token)
      .then((response) => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    const token = this.props.auth.stsTokenManager.accessToken;
    this.props
      .updateUser(this.state.currentUser, token)
      .then((response) => {
        console.log(response);
        this.setState({ message: 'The user was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeUser() {
    this.props
      .deleteUser(this.state.currentUser.uuid)
      .then(() => {
        this.props.history.push('/users');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentUser, address } = this.state;
    if (this.props.auth.isLoaded && this.props.auth.isEmpty) return <Redirect to='/'/>

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <Form>      
              <Row>        
              <FormGroup className='col-6'>
                <Label for="penName">Pen Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="penName"
                  value={currentUser.penName}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup className='col-6'>
                <Label for="userName">User Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="userName"
                  value={currentUser.userName}
                  onChange={this.handleChange}
                />
              </FormGroup>
              </Row>
              <Address address={address} handler={this.handleAddressChange}/>
              {}
              <FormGroup>
                <Label for="rules">Rules</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="rules"
                  value={currentUser.rules}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
            <Button className="m-3" type="submit" color="primary" onClick={this.updateContent}>
              Update
            </Button>
            <Button className="m-3" color="danger" onClick={this.deleteUser}>
              Delete
            </Button>
            <Link to={'/users'}>
              <Button className="m-3">Cancel</Button>
            </Link>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { updateUser, deleteUser })(User);