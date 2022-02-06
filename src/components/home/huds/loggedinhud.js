import React from "react";
import { Col, Container, Row } from 'reactstrap';
import MessagesCard from '../dashcards/messagescard';
import PrisonersCard from "../dashcards/prisonerscard";
import PrisonsCard from "../dashcards/prisonscard";


class LoggedInHud extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Row className='pt-4'>
            <Col>
              <MessagesCard className={'h-100'} />
            </Col>
            <Col>
              <PrisonersCard className={'h-100'}/>
            </Col>
            <Col>
              <PrisonsCard className={'h-100'} />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default LoggedInHud;