import React from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import { AccordionBody, AccordionHeader, AccordionItem, Button, Col, Container, Row, UncontrolledAccordion } from "reactstrap";
import { retrieveConversations, retrieveMessages, createConversation, createMessage } from '../../actions/messages';
import { retrievePrisoners } from '../../actions/prisoners';
import { retrieveUsers } from '../../actions/users';

var randomWords = require('random-words')

class Conversations extends React.Component {
  constructor (props) {
    super(props);

    this.renderUsers = this.renderUsers.bind(this);
    this.renderConversations = this.renderConversations.bind(this);
    this.toggleAllPrisoners = this.toggleAllPrisoners.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
    this.fetchServerData = this.fetchServerData.bind(this);
    this.renderPrisoners = this.renderPrisoners.bind(this);
    this.getUNIXTime = this.getUNIXTime.bind(this);
    this.handleConversationSelectChange = this.handleConversationSelectChange.bind(this);
    this.createConversation = this.createConversation.bind(this);
    this.createDummyUserMessage = this.createDummyUserMessage.bind(this);
    this.createDummyPrisonerMessage = this.createDummyPrisonerMessage.bind(this);

    this.state = {
      allPrisoners: true,
      selectedUser: null,
      selectedPrisoner: null
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.fetchServerData();
    this.setState({
      selectedUser: null,
      selectedPrisoner: null
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      this.fetchServerData();
    }
  }

  fetchServerData() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken;
      this.props.retrievePrisoners(token);
      this.props.retrieveUsers(token);
    }
  }

  renderUsers() {
    console.log(this.props.users);
    return this.props.users.map((user) => {
      return { value: user.uuid, label: user.penName }
    })
  }

  doesConversationAlreadyExist() {
    const { conversations } = this.props.messages;
    const { selectedPrisoner } = this.state;
    console.log('running doesConversationAlreadyExist')
    if (conversations.length <= 0 || selectedPrisoner === null) {
      console.log(`conversations or selected prisoner is null.`)
      return false
    } else {
      console.log(`Selected Prisoner: ${selectedPrisoner}`)
      console.log(conversations)
      const filtered = conversations.filter(({ uuid }) => uuid === selectedPrisoner.uuid);
      return (filtered.length > 0);
    }
  }

  renderConversations() {
    console.log(this.props.messages.conversations);
    return this.props.messages.conversations.map((conversation, index) => {
      return { key: conversation.uuid, value: conversation.prisonerId, label: conversation.prisonerName || conversation.prisonerId }
    })
  }

  renderPrisoners() {
    return this.props.prisoners.map((prisoner, index) => {
      return { key: prisoner.uuid,  value: prisoner, label: `${prisoner.preferredName} (${prisoner.uuid})` }
    })
  }

  createConversation() {
    const token = this.props.auth.stsTokenManager.accessToken;
    const { selectedUser, selectedPrisoner } = this.state;
    console.log(`convo between ${selectedUser} and ${selectedPrisoner.uuid} with token ${token}`);

    this.props.createConversation(selectedUser, selectedPrisoner.uuid, selectedPrisoner.preferredName, token);
  }

  handleUserSelectChange = (e) => {
    const token = this.props.auth.stsTokenManager.accessToken;
    console.log(`User ID: ${e.value} | Token: ${token}`);
    this.setState({
      selectedUser: e.value
    }, () => {
      this.props.retrieveConversations(e.value, token)
    });
  }

  handleConversationSelectChange = (e) => {
    console.log(e);
    const token = this.props.auth.stsTokenManager.accessToken;
    this.setState({
      selectedPrisoner: e.value
    }, () => {
      console.log(this.state)
      this.props.retrieveMessages(this.state.selectedUser, e.value.uuid, token);
    });
  }

  toggleAllPrisoners() {
    this.setState(prevState => ({
      allPrisoners: !prevState.allPrisoners
    }));
  }

  createDummyUserMessage() {
    console.log('create dummy user message');
    const token = this.props.auth.stsTokenManager.accessToken;
    this.props.createMessage("user", this.state.selectedPrisoner.uuid, this.state.selectedUser, randomWords({ min: 5, max: 20 }).join(' '), token);
  }

  createDummyPrisonerMessage() {
    console.log('create dummy prisoner message');
    const token = this.props.auth.stsTokenManager.accessToken;
    this.props.createMessage("prisoner", this.state.selectedPrisoner.uuid, this.state.selectedUser, randomWords({ min: 5, max: 20 }).join(' '), token);
  }

  renderLinks() {
    return this.state.allPrisoners ? (<><h4 className="text-center">All Prisoners | <a href="#/" onClick={this.toggleAllPrisoners}>All Conversations</a></h4></>) : (<><h4 className="text-center"><a href="#/" onClick={this.toggleAllPrisoners}>All Prisoners</a> | All Conversations</h4></>)
  }

  renderSelect() {
    return this.state.allPrisoners ? (<><Select options={this.renderConversations()} onChange={this.handleConversationSelectChange} /></>) : ""
  }

  getUNIXTime(dt) {
    let unix = new Date(dt*1000);
    return unix.toUTCString().slice(5);
  }

  renderMessages() {
    console.log(this.props.messages.messages)
    if (this.props.messages.messages) {
      return this.props.messages.messages.map((message, index) => {
        return (
          <>
          <AccordionItem key={message.uuid}>
            <AccordionHeader targetId={message.uuid}>
            {`Timestamp: ${this.getUNIXTime(message.timestamp._seconds)} | ID: ${message.uuid} | Sender: ${message.sender}`}
            </AccordionHeader>
            <AccordionBody accordionId={message.uuid}>
            <strong>{message.body}</strong>
            </AccordionBody>
          </AccordionItem>
          </>
        )
      })
    }
    else {
      return (<><strong>No Messages Found</strong></>)
    }
  }

  render() {
    const users = this.renderUsers();
    const options = this.state.allPrisoners ? this.renderPrisoners() : this.renderConversations();
    const exists = this.doesConversationAlreadyExist();

    return (
      <>
        <Container>
          <Row>
            <h1 className="text-center"> Conversations </h1>
          </Row>
          <Row>
            <Col xs={6}>
              <h3 className="text-center">Users</h3>

            </Col>
            <Col xs={6}>
              {this.renderLinks()}
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Select options={users} onChange={this.handleUserSelectChange} />
            </Col>
            <Col xs={6}>
              {(options.length > 0) ? <Select options={options} onChange={this.handleConversationSelectChange} /> : "Please select a user"}
            </Col>
          </Row>
          <Row>
            <Button onClick={this.createConversation} className="btn col col-6 col-lg-4" disabled={exists}>Create Conversation</Button>
            <Button onClick={this.createDummyUserMessage} className="btn col col-6 col-lg-4" disabled={!exists}>Create Dummy Message From User</Button>
            <Button onClick={this.createDummyPrisonerMessage} className="btn col col-6 col-lg-4" disabled={!exists}>Create Dummy Message From Prisoner</Button>
          </Row>
          <UncontrolledAccordion>
            { this.renderMessages()}
          </UncontrolledAccordion>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    prisoners: state.prisoners,
    messages: state.messages,
    users: state.users
  };
};

export default connect(mapStateToProps, { retrieveConversations, retrieveMessages, retrievePrisoners, retrieveUsers, createConversation, createMessage })(Conversations)