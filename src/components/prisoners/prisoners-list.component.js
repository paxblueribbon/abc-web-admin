import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardSubtitle, CardText, CardHeader, Col, Input, InputGroup, Label, List, ListGroup } from 'reactstrap';
import { retrievePrisoners, findPrisonerByName, deleteAllPrisoners, deletePrisoner } from '../../actions/prisoners';
import AddPrisoner from './add-prisoner.component';
import { Redirect } from 'react-router-dom'

class PrisonersList extends Component {
  constructor (props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActivePrisoner = this.setActivePrisoner.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllPrisoners = this.removeAllPrisoners.bind(this);
    this.fetchServerData = this.fetchServerData.bind(this);
    this.removePrisoner = this.removePrisoner.bind(this);

    this.state = {
      currentPrisoner: null,
      currentIndex: -1,
      searchName: ' '
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
      this.props.retrievePrisoners(token);
    }
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  refreshData() {
    this.setState({
      currentPrisoner: null,
      currentIndex: -1
    });
  }

  setActivePrisoner(prisoner, index) {
    console.log(prisoner);
    this.setState({
      currentPrisoner: prisoner,
      currentIndex: index
    });
  }

  removeAllPrisoners() {
    const token = this.props.auth.stsTokenManager.accessToken

    this.props
      .deleteAllPrisoners(token)
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePrisoner() {
    const token = this.props.auth.stsTokenManager.accessToken
    this.props
      .deletePrisoner(this.state.currentPrisoner.uuid, token)
      .then(() => {
        this.props.history.push('/prisoners');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByName() {
    this.refreshData();
    this.props.findPrisonerByName(this.state.searchName);
  }

  render() {
    const { searchName, currentPrisoner, currentIndex } = this.state;
    const { prisoners, auth } = this.props;

    if (auth.isLoaded && auth.isEmpty) return <Redirect to='/' />

    return (
      <List className="row">
        <Col md="8">
          <InputGroup className="mb-3">
            <Input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <Button outline color="secondary" onClick={this.findByTitle}>
                Search
              </Button>
            </div>
          </InputGroup>
        </Col>
        <div className="col-md-6">
          <h4>Prisoner List</h4>
          <ListGroup>
            {prisoners &&
              prisoners.map((prisoner, index) => (
                <li
                  className={'list-group-item ' + (index === currentIndex ? 'active' : '')}
                  onClick={() => this.setActivePrisoner(prisoner, index)}
                  key={index}>
                  {prisoner.preferredName}
                </li>
              ))}
          </ListGroup>

          <Button color="danger" className="m-3" onClick={this.removeAllPrisoners}>
            Remove All
          </Button>
        </div>
        <Col md={6}>
          {currentPrisoner ? (
            <div>
              <Card>
                <CardHeader>Prisoner</CardHeader>
                <CardSubtitle></CardSubtitle>
                <CardText>
                  <div>
                    <Label>
                      <strong>Preferred Name:</strong>
                    </Label>{' '}
                    {currentPrisoner.preferredName}
                  </div>
                  <div>
                    <Label>
                      <strong>Bio:</strong>
                    </Label>{' '}
                    {currentPrisoner.bio}
                  </div>
                  <div>
                    <Label>
                      <strong>UUID:</strong>
                    </Label>{' '}
                    {currentPrisoner.uuid}
                  </div>
                  <div>
                    <Label>
                      <strong>Prison:</strong>
                    </Label>{' '}
                    {console.log(currentPrisoner.prison)}
                    {currentPrisoner.prison ? (<Link to={'/prison/' + currentPrisoner.prison.uuid}>{currentPrisoner.prison.prisonName}</Link>) : "Null"}
                  </div>
                  <div>
                    <Label>
                      <strong>Inmate ID:</strong>
                    </Label>{' '}
                    {currentPrisoner.inmateId}
                  </div>
                  <div>
                    <Label>
                      <strong>Release Date:</strong>
                    </Label>{' '}
                    {currentPrisoner.releaseDate}
                  </div>
                  <div>
                    <Label>
                      <strong>Birth Name:</strong>
                    </Label>{' '}
                    {currentPrisoner.birthName}
                  </div>
                  <Link to={'/prisoner/' + currentPrisoner.uuid}><Button className='mx-2' size='sm' color='primary'>Edit</Button></Link>
                  <Button size='sm' color='danger' className='mx-2' onClick={this.removePrisoner}>Delete</Button>
                </CardText>
              </Card>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Prisoner...</p>
            </div>
          )}
        </Col>
        <h1>Add Prisoner</h1>
        <AddPrisoner />
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prisoners: state.prisoners,
    auth: state.firebase.auth
  };
};

export default
  connect(mapStateToProps, { retrievePrisoners, findPrisonerByName, deleteAllPrisoners, deletePrisoner })(PrisonersList);
