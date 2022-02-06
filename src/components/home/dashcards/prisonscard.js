import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import { retrievePrisons } from '../../../actions/prisons'

class PrisonsCard extends React.Component {
  constructor (props) {
    super(props);

    this.fetchServerData = this.fetchServerData.bind(this);
    this.renderPrisons = this.renderPrisons.bind(this);
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

  fetchServerData(){
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken;
      this.props.retrievePrisons(token);
    }
  }

  renderPrisons() {
    let fivePrisons = this.props.prisons.slice(0, 5);
    console.log(fivePrisons);
    return fivePrisons.map((prison, index) => {
      console.log(prison.dateAdded);
      let dateAdded = new Date(prison.dateAdded).toUTCString();
      console.log(dateAdded);
      return (<div key={index}><Link to={`/prison/${prison.uuid}`}>{prison.prisonName}</Link> <span>- Added: {dateAdded}</span><br/></div>)
    })
  }

  render() {
    return (
        <Card xs={3} className='h-100'>
          <CardBody>
            <CardTitle>New Prisons</CardTitle>
              {this.renderPrisons()}
          </CardBody>
          <Link to='/prisons'><Button block='true' className="align-self-end btn-block mt-auto input-block-level">See More</Button></Link>
        </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prisons: state.prisons,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { retrievePrisons })(PrisonsCard);