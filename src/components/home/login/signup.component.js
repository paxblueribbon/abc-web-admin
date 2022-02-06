import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { signUp } from '../../../actions/firebase';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      penName: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };

  render() {
    return (
      <Container>
         <Form> 
          <h5>Sign Up</h5>
          <FormGroup >
            <Label htmlFor="email">Email</Label>
            <Input type='email' id='email' onChange={this.handleChange}  />
          </FormGroup>
          <FormGroup>
            <Label for='name'>Pen Name</Label>
            <Input type="text" id="name" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input type='password' id='password' onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Button>
              Sign Up
            </Button>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);