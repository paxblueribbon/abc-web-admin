//https://www.bezkoder.com/react-redux-crud-example/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePrisoner, deletePrisoner } from '../../actions/prisoners';
import PrisonerDataService from '../../services/prisoner.service';
import { retrievePrisons } from '../../actions/prisons';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';


class Prisoner extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.fetchServerData = this.fetchServerData.bind(this);
    this.getPrisoner = this.getPrisoner.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removePrisoner = this.removePrisoner.bind(this);

    this.state = {
      currentPrisoner: {
        uuid: '',
        birthName: '',
        preferredName: '',
        prison: {
          prisonName: '',
          uuid: ''
        },
        inmateId: '',
        bio: '',
        releaseDate: '',
        icon: ''
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

  fetchServerData(){
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken;
      this.getPrisoner(this.props.match && this.props.match.params.uuid, token);
      this.props.retrievePrisons(token);
    }
  }

  handleChange = (e) => {
    this.setState(function (prevState) {
      return {
        currentPrisoner: {
          ...prevState.currentPrisoner,
          [e.target.id]: e.target.value
        }
      }
    })
  }

  getPrisoner(uuid, token) {
    PrisonerDataService.get(uuid, token)
      .then((response) => {
        this.setState({
          currentPrisoner: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus() {
    var data = {
      uuid: this.state.currentPrisoner.uuid,
      preferredName: this.state.currentPrisoner.preferredName,
      birthName: this.state.currentPrisoner.birthName,
      bio: this.state.currentPrisoner.bio,
      prison: this.state.currentPrisoner.prison,
      inmateId: this.state.currentPrisoner.inmateId,
      releaseDate: this.state.currentPrisoner.releaseDate,
      icon: this.state.currentPrisoner.icon
    };
    const token = this.props.auth.stsTokenManager.accessToken

    this.props
      .updatePrisoner(this.state.currentPrisoner.uuid, data, token)
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
    this.props
      .updatePrisoner(this.state.currentPrisoner.uuid, this.state.currentPrisoner)
      .then((response) => {
        console.log(response);
        this.setState({ message: 'The prisoner was updated successfully!' });
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

  render() {
    const { currentPrisoner } = this.state;
    const { prisons, auth } = this.props;
    let prisonsOptions =
      prisons.length > 0 &&
      prisons.map(function (prison, idx) {
        return { value: prison, label: prison.prisonName}
      });

    if (auth.isLoaded && auth.isEmpty) return <Redirect to='/'/>
    return (
      <div>
        {currentPrisoner ? (
          <div className="edit-form">
            <h4>Prisoner</h4>
            <Form>
              <FormGroup>
                <Label for="preferredName">Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="preferredName"
                  value={currentPrisoner.preferredName}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bio">Bio</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="bio"
                  value={currentPrisoner.bio}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>

              <Select options={prisonsOptions} onChange={this.handlePrisonChange} defaultValue={currentPrisoner.prison} />
            </FormGroup>
              <FormGroup>
                <Label for="inmateID">Inmate ID</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="inmateID"
                  value={currentPrisoner.inmateId}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="releaseDate">Release Date</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="releaseDate"
                  value={currentPrisoner.releaseDate}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="birthName">Birth Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="birthName"
                  value={currentPrisoner.birthName}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
            <Button color="danger" onClick={this.removePrisoner}>
              Delete
            </Button>
            <Button type="submit" color="primary" onClick={this.updateContent}>
              Update
            </Button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Prisoner...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prisons: state.prisons,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { updatePrisoner, deletePrisoner, retrievePrisons })(Prisoner);
