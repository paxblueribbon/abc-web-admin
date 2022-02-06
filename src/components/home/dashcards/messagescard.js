import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Card, CardImg, CardBody,
  CardTitle, Button, Col
} from 'reactstrap';
import { retrieveUnsent } from '../../../actions/messages';

class MessagesCard extends React.Component {
  constructor (props) {
    super(props);

    this.fetchServerData = this.fetchServerData.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.getUNIXTime = this.getUNIXTime.bind(this);
  }

  componentDidMount() {
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
      console.log(token);
      this.props.retrieveUnsent(token);
    }
  }

  getUNIXTime(dt) {
    let unix = new Date(dt * 1000);
    return unix.toUTCString().slice(5);
  }

  renderMessages() {
    console.log(this.props.messages.unsent);
    let fiveUnread = this.props.messages.unsent.slice(0, 5);
    return fiveUnread.map((unread, index) => {
      return (<div key={index}><Link to={`/message/${unread.userId}/${unread.prisonerId}/${unread.uuid}`}><span>{this.getUNIXTime(unread.timestamp._seconds)}</span><br /></Link></div>)
    })
  }

  render() {
    return (
      <Card xs={3} className='h-100 d-flex'>
        <CardImg />
        <CardBody className='d-flex flex-column'>
          <CardTitle><span>{`Unsent Messages (${this.props.messages.unsent.length})`}</span></CardTitle>
          {this.renderMessages()}
          <Col xs={10}>
          </Col>
        </CardBody>
        <Link to='/messages'><Button block={true} className='align-self-end btn-block mt-auto input-block-level'>See More</Button></Link>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { retrieveUnsent })(MessagesCard);