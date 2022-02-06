//https://www.bezkoder.com/react-redux-crud-example/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMessage, deleteMessage } from '../../actions/messages';
import MessageDataService from '../../services/messages';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

class Message extends Component {
  constructor (props) {

    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.fetchServerData = this.fetchServerData.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeMessage = this.removeMessage.bind(this);
    this.getUNIXTime = this.getUNIXTime.bind(this);

    this.state = {
      showAllMessages: false,
      currentMessage: {
        body: '',
        messageStatus: '',
        prisonerId: '',
        sender: '',
        timestamp: '',
        userId: '',
        uuid: '',
      },
      message: ''
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.fetchServerData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      this.fetchServerData()
    }
  }

  fetchServerData() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken;
      this.getMessage(this.props.match && this.props.match.params.userID, this.props.match.params.prisonerID, this.props.match.params.messageID, token);
    }
  }

  handleChange = (e) => {
    this.setState(function (prevState) {
      return {
        currentMessage: {
          ...prevState.currentMessage,
          [e.target.id]: e.target.value
        }
      }
    })
  }

  getMessage(userID, prisonerID, messageID, token) {
    MessageDataService.getMessage(userID, prisonerID, messageID, token)
      .then((response) => {
        this.setState({
          currentMessage: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus() {
    var data = {
      body: this.state.currentMessage.body,
      messageStatus: this.state.currentMessage.messageStatus,
      prisonerId: this.state.currentMessage.prisonerId,
      sender: this.state.currentMessage.sender,
      timestamp: this.state.currentMessage.timestamp,
      userId: this.state.currentMessage.userId,
      uuid: this.state.currentMessage.uuid
    };
    const token = this.props.auth.stsTokenManager.accessToken

    this.props
      .updateMessage(this.state.currentMessage.uuid, data, token)
      .then((response) => {
        this.setState((prevState) => ({
          currentPrisoner: {
            ...prevState.currentPrisoner
          }
        }));

        this.setState({ message: 'The status was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken;
      this.props
        .updateMessage(this.state.currentMessage, token)
        .then((response) => {
          console.log(response);
          this.setState({ message: 'The message was updated successfully!' });
        })
        .catch((e) => {
          console.log(e);
        });
    }

  }

  removeMessage() {
    const token = this.props.auth.stsTokenManager.accessToken
    this.props
      .deleteMessage
      .deleteMessage(this.state.currentMessage.userId, this.state.currentMessage.prisonerId, this.state.currentMessage.uuid, token)
      .catch((e) => {
        console.log(e);
      });
  }

  getUNIXTime(dt) {
    let unix = new Date(dt * 1000);
    return unix.toUTCString().slice(5);
  }

  render() {
    const { currentMessage } = this.state;
    const { auth } = this.props;
    const sentSelectOptions = [{ value: 'unsent', label: 'Unsent' }, { value: 'sent', label: 'Sent' }];
    const senderOptions = [{ value: 'user', label: 'User' }, { value: 'prisoner', label: 'Prisoner' }];
    if (auth.isLoaded && auth.isEmpty) return <Redirect to='/' />
    return (
      <div>
        <Container>
          {currentMessage ? (
            <div className="edit-form">
              <h4>Message</h4>
              <Form>
                <Row>
                  <FormGroup className='col-4'>
                    <Label for='prisonerID'>Prisoner ID</Label>
                    <Input type='text' id='prisonerID' disabled={true} defaultValue={currentMessage.prisonerId}></Input>
                  </FormGroup>
                  <FormGroup className='col-4'>
                    <Label for='userID'>User ID</Label>
                    <Input type='text' id='userID' disabled={true} defaultValue={currentMessage.userId}></Input>
                  </FormGroup>
                  <FormGroup className='col-4'>
                    <Label for='messageID'>Message ID</Label>
                    <Input type='text' id='messageID' disabled={true} defaultValue={currentMessage.uuid}></Input>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup className='col-4'>
                    <Label for='statusSelect'>Message Status</Label>
                    <Select id='statusSelect' options={sentSelectOptions} value={sentSelectOptions.filter(option =>
                      option.value === currentMessage.messageStatus
                    )} />
                  </FormGroup>
                  <FormGroup className='col-4'>
                    {/* TODO Turn This Into DateTime Picker */}
                    <span><strong>Time Stamp: </strong> {this.getUNIXTime(currentMessage.timestamp._seconds)}</span>
                  </FormGroup>
                  <FormGroup className='col-4'>
                    <Label for='senderSelect'>Message Sender</Label>
                    <Select id='senderSelect' options={senderOptions} value={senderOptions.filter(option =>
                      option.value === currentMessage.sender
                    )} />
                  </FormGroup>
                </Row>
                <Row><Col><textarea defaultValue={currentMessage.body}></textarea></Col></Row>
                <Button disabled={true} color="danger" onClick={this.removeMessage}>
                  Delete
                </Button>
                <Button disabled={true} type="submit" color="primary" onClick={this.updateContent}>
                  Update
                </Button>
              </Form>
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>No Message Found</p>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { updateMessage, deleteMessage })(Message);
