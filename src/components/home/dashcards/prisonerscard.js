import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { retrievePrisoners } from '../../../actions/prisoners'

class PrisonersCard extends React.Component {
  constructor (props) {
    super(props);

    this.fetchServerData = this.fetchServerData.bind(this);
    this.renderPrisoners = this.renderPrisoners.bind(this);
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
      this.props.retrievePrisoners(token);
    }
  }

  renderPrisoners() {
    let fivePrisoners = this.props.prisoners.slice(0, 5);
    console.log(fivePrisoners);
    return fivePrisoners.map((prisoner, index) => {
      return (<div key={index}><Link to={`/prisoner/${prisoner.uuid}`}>{prisoner.preferredName}</Link> - Added: {new Date(prisoner.dateAdded).toUTCString()}<br /></div>)
    })
  }

  render() {
    return (
      <Card xs={3} className="h-100">
        <CardBody>
          <CardTitle>New Prisoners</CardTitle>
          <CardSubtitle></CardSubtitle>
          {this.renderPrisoners()}
        </CardBody>
        <Link to='/prisoners'><Button block='true' className="align-self-end btn-block mt-auto input-block-level">See More</Button></Link>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prisoners: state.prisoners,
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps, { retrievePrisoners })(PrisonersCard);