import React from "react";
import { Col, Container, Row } from 'reactstrap';
import Login from "../login/login.component";
import SignUp from "../login/signup.component";


class LoggedOutHud extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Login />
            </Col>
            <Col>
              <SignUp />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default LoggedOutHud;