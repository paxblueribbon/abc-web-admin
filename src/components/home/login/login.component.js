import { React, Component } from "react";
import { connect } from "react-redux";
import { Container, Form, Button, FormGroup, Label, Input } from "reactstrap";
import { signIn } from "../../../actions/firebase";

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }
  render() {
    const { authError } = this.props;
    return (
      <Container>
        <Form
          className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" id='email' className="form-control" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" id='password' className="form-control" onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Button className="btn pink lighten-1">Login</Button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : ""}
            </div>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)