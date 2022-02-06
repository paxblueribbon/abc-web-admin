import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardText, Col, Input, InputGroup, Label, List, ListGroup } from 'reactstrap';
import { retrievePrisons, findPrisonByName, deleteAllPrisons, deletePrison } from '../../actions/prisons';
import AddPrison from './add-prison.component';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import PrisonRules from './prison-rules';

class PrisonsList extends Component {
  constructor (props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActivePrison = this.setActivePrison.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllPrisons = this.removeAllPrisons.bind(this);
    this.displayInmateLinks = this.displayInmateLinks.bind(this);
    this.pullFromServer = this.pullFromServer.bind(this);
    this.displayRules = this.displayRules.bind(this);
    this.deletePrison = this.deletePrison.bind(this);
    this.getPrisonerName = this.getPrisonerName.bind(this);

    this.state = {
      currentPrison: null,
      currentIndex: -1,
      searchName: ' '
    };
  }

  componentDidMount() {
    if (this.props.prisons.isEmpty && this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      this.pullFromServer()
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
        this.pullFromServer()
      }
    }
  }

  pullFromServer() {
    const token = this.props.auth.stsTokenManager.accessToken;
    this.props.retrievePrisons(token);

  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  deletePrison(){
    const token = this.props.auth.stsTokenManager.accessToken;
    this.props.deletePrison(this.state.currentPrison.uuid, token);
  }

  refreshData() {
    this.setState({
      currentPrison: null,
      currentIndex: -1
    });
  }

  setActivePrison(prison, index) {
    console.log(prison);
    this.setState({
      currentPrison: prison,
      currentIndex: index
    });
  }

  removeAllPrisons() {
    const token = this.props.auth.stsTokenManager.accessToken

    this.props
      .deleteAllPrisons(token)
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByName() {
    this.refreshData();
    const token = this.props.auth.stsTokenManager.accessToken;
    this.props.findPrisonByName(this.state.searchName, token);
  }

  displayInmateLinks(currentPrison) {
    const { inmates } = currentPrison;
    console.log(inmates);
    if (inmates) {
      return inmates.map((inmate, index) => {
        console.log(this.getPrisonerName(inmate))
       return ( <><Link to={'/prisoner/' + inmate}>{this.getPrisonerName(inmate) ? this.getPrisonerName(inmate).preferredName : inmate}</Link> <br/></>)
      })
    }
    else {
      return (<><p>No Inmates Found</p></>)
    }
  }

  getPrisonerName(inmateId) {
    return this.props.prisoners.filter((prisoner) => prisoner.uuid === inmateId)[0];
  }

  displayRules(rulesList) {
    return (
      <>
        <List>
          {rulesList.map((rule, idx) => {
            return (<div key={rule.ruleId}>
              <li>{rule.title}</li>
            </div>)
          })}
        </List>

      </>
    )
  }

  render() {
    const { searchName, currentPrison, currentIndex } = this.state;
    const { prisons, auth } = this.props;

    if (auth.isLoaded && auth.isEmpty) return <Redirect to='/' />

    return (
      <List className='row'>
        <Col md='8'>
          <InputGroup className='mb-3'>
            <Input
              type='text'
              className='form-control'
              placeholder='Search by name'
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className='input-group-append'>
              <Button outline color='secondary' onClick={this.findByName}>
                Search
              </Button>
            </div>
          </InputGroup>
        </Col>
        <div className='col-md-6'>
          <h4>Prison List</h4>
          <ListGroup>
            {prisons &&
              prisons.map((prison, index) => (
                <li
                  className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                  onClick={() => this.setActivePrison(prison, index)}
                  key={index}>
                  {prison.prisonName}
                </li>
              ))}
          </ListGroup>

          <Button color="danger" className="m-3" onClick={this.removeAllPrisons}>
            Remove All
          </Button>
        </div>
        <Col md={6}>
          {currentPrison ? (
            <Card>
              <CardHeader>{currentPrison.prisonName}</CardHeader>
              <CardText className='mx-3'>
                <div>
                  <Label>
                    <strong>Prison Name:</strong>
                  </Label>{' '}
                  {currentPrison.prisonName}
                </div>
                <div>
                  <Label>
                    <strong>Address:</strong>
                  </Label>{' '}
                  {currentPrison.address.street}
                </div>
                {console.log(currentPrison.address)}
                <div>
                  <Label>
                    <strong>UUID:</strong>
                  </Label>{' '}
                  {currentPrison.uuid}
                </div>
                <div>
                  <Label>
                    <strong>Inmates:</strong>
                  </Label>{' '}
                  {this.displayInmateLinks(currentPrison)}
                </div>
                <div>
                  {this.displayRules(currentPrison.rules)}
                </div>
                <Link to={'/prison/' + currentPrison.uuid}><Button color="primary" className='mx-3' size='sm'>Edit</Button></Link>
                <Button size='sm' color='danger' onClick={this.deletePrison}>Delete</Button>
              </CardText>
            </Card>
          ) : (
            <div>
              <br />
              <p>Please click on a Prison...</p>
            </div>
          )}
        </Col>
        <h1>Add Prison</h1>
        <AddPrison />

        <h2>Prison Rules</h2>
        <PrisonRules />
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prisons: state.prisons,
    auth: state.firebase.auth,
    prisoners: state.prisoners
  };
};

export default connect(mapStateToProps, { retrievePrisons, findPrisonByName, deleteAllPrisons, deletePrison })(PrisonsList);