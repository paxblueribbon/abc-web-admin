import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input, Row } from 'reactstrap';
import { createUser } from '../../actions/users';
import Address from '../../utilities/address';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeStreet = this.onChangeStreet.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeRules = this.onChangeRules.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      uuid: null,
      address: {
        city: ' ',
        country: ' ',
        state: ' ',
        street: ' ',
        zip: ' '
      },
      inmates: [' '],
      userName: ' ',
      rules: ' '
    };
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAddressChange = (e) => {
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        [e.target.id]: e.target.value
      }
    })
  }

  onChangeCity(e) {
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        city: e.target.value
      }
    });
  }

  onChangeCountry(e) {
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        country: e.target.value
      }
    });
  }

  onChangeState(e) {
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        state: e.target.value
      }
    });
  }

  onChangeStreet(e) {
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        street: e.target.value
      }
    });
  }

  onChangeZip(e) {
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        zip: e.target.value
      }
    });
  }

  onChangeRules(e) {
    console.log(e.target.value);
    this.setState({
      rules: e.target.value
    });
  }

  onChangeUserName(e) {
    console.log(e.target.value);
    this.setState({
      userName: e.target.value
    });
  }

  saveUser() {
    const { userName, address, penName, rules } = this.state;
    const token = this.props.auth.stsTokenManager.accessToken;
    console.log(address);
    console.log(this.state.userName);
    this.props
      .createUser(userName, penName, address, rules, token)
      .then((data) => {
        this.setState({
          uuid: null,
          userName: ' ',
          address: {
            city: ' ',
            country: ' ',
            state: ' ',
            street: ' ',
            zip: ' '
          },
          penName: ' ',
          permissions: 0,
          email: ' '
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      uuid: null,
      userName: ' ',
      address: {
        city: ' ',
        country: ' ',
        state: ' ',
        street: ' ',
        zip: ' '
      },
      penName: ' ',
      permissions: 0,
      email: ' '
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Button color='success' onClick={this.newUser}>
              Add
            </Button>
          </div>
        ) : (
          <div>
            <Row>

            <FormGroup className='col-6'>
              <Label htmlFor='userName'>User Name</Label>
              <Input
                type='text'
                className='form-control'
                id='userName'
                required
                value={this.state.userName}
                onChange={this.onChangeUserName}
                name='userName'
              />
            </FormGroup>
            <FormGroup className='col-6'>
              <Label htmlFor='penName'>Pen Name</Label>
              <Input
                type='text'
                className='form-control'
                id='userName'
                required
                value={this.state.penName}
                onChange={this.onChangeUserName}
                name='userName'
              />
            </FormGroup>
            </Row>
            <Address address={this.state.address} handler={this.handleAddressChange}/>
            <FormGroup>
              <Label htmlFor='rules'>Rules</Label>
              <Input
                type='text'
                className='form-control'
                id='rules'
                required
                value={this.state.rules}
                onChange={this.onChangeRules}
                name='rules'
              />
            </FormGroup>

            <Button onClick={this.saveUser} color='success'>
              Submit
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createUser })(AddUser);
