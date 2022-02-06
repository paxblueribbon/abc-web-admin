import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveUnsent } from '../../actions/messages'

class Unsent extends Component {
  constructor(props) {
    super(props);
  
    this.fetchServerData = this.fetchServerData.bind(this);
    this.renderUnsents = this.renderUnsents.bind(this);
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

  renderUnsents() {
    console.log(this.props.messages.unsent);
    return this.props.messages.unsent.map((unread, index) => {
      return (<div key={index}>From: <Link to={`/user/${unread.userId}`}><span>{unread.userId}</span></Link> | To: <Link to={`/prisoner/${unread.prisonerId}`}>{unread.prisonerId}</Link> | <Link to={`/message/${unread.userId}/${unread.prisonerId}/${unread.uuid}`}><span>{this.getUNIXTime(unread.timestamp._seconds)}</span><br /></Link></div>)
    })
  }

  render() {
    return (
      <>
      <h2 className="align-text-center">Unsent Messages</h2>
      {this.renderUnsents()}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { retrieveUnsent })(Unsent);