import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input, Container } from 'reactstrap';
import { createPrisoner } from '../../actions/prisoners';
import { retrievePrisons } from '../../actions/prisons';
import Select from 'react-select';

class AddPrisoner extends Component {
  constructor (props) {
    super(props);
    this.savePrisoner = this.savePrisoner.bind(this);
    this.newPrisoner = this.newPrisoner.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.makeId = this.makeId.bind(this);
    this.setDummyData = this.setDummyData.bind(this);

    this.state = {
      uuid: null,
      birthName: '',
      preferredName: '',
      prison: {
        prisonName: '',
        uuid: '',
      },
      inmateId: '',
      bio: '',
      releaseDate: '',
      icon: '',
      prisons: [],
    };
  }

  componentDidMount() {
    this.fetchFromServer()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      this.fetchFromServer()
    }
  }

  fetchFromServer() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken
      this.props.retrievePrisons(token);
    }
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handlePrisonChange = (e) => {
    console.log(e);
    this.setState({
      ...this.state,
      prison: {
        prisonName: e.value.prisonName,
        uuid: e.value.uuid
      }
    })
  }

  savePrisoner() {
    const { uuid, birthName, preferredName, prison, inmateId, bio, releaseDate, icon } = this.state;
    const token = this.props.auth.stsTokenManager.accessToken
    console.log(token)
    this.props
      .createPrisoner(uuid, birthName, preferredName, prison, inmateId, bio, releaseDate, icon, token)
      .then((data) => {
        this.setState({
          uuid: data.uuid,
          birthName: data.birthName,
          preferredName: data.preferredName,
          prison: data.prison,
          inmateId: data.inmateId,
          bio: data.bio,
          releaseDate: data.releaseDate,
          icon: data.icon
        });
        console.log(data);
        this.newPrisoner()
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newPrisoner() {
    this.setState({
      uuid: '',
      birthName: '',
      preferredName: '',
      prison: {
        prisonName: '',
        uuid: '',
      },
      inmateId: '',
      bio: '',
      releaseDate: '',
      icon: '',
    });
  }

  setDummyData() {
    var prison = this.props.prisons[Math.floor(Math.random() * (this.props.prisons.length - 1))];

    this.setState({
      uuid: null,
      birthName: `${this.makeId(5)} ${this.makeId(8, false)}`,
      preferredName: `${this.makeId(5)} ${this.makeId(8, false)}`,

      prison: {
        prisonName: prison.prisonName,
        uuid: prison.uuid,
        indexInInmateList: prison.inmates.length
      },
      inmateId: this.makeId(8, false),
      bio: this.makeId(20, false),
      releaseDate: '1986-08-16',
      icon: null,
    }, () => {
      this.savePrisoner();
    });

  }

  makeId(length, numbers) {
    var result = '';
    var characters = ''
    if (numbers) { characters = '0123456789' }
    else { characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; }
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  render() {
    const { prisons, auth } = this.props;
    let prisonsOptions =
      prisons.length > 0 &&
      prisons.map(function (prison, idx) {
        return { value: prison, label: prison.prisonName }
      });
    return (

      <Container>
        <div className="submit-form">
          {console.log(auth)}
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Button color="success" onClick={this.newPrisoner}>
                Add
              </Button>
            </div>
          ) : (
            <div>
              <FormGroup>
                <Label htmlFor="preferredName">Preferred Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="preferredName"
                  required
                  value={this.state.preferredName}
                  onChange={this.handleChange}
                  name="preferredName"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="bio"
                  required
                  value={this.state.bio}
                  onChange={this.handleChange}
                  name="bio"
                />
              </FormGroup>
              <FormGroup>
                <Select options={prisonsOptions} placeholder="-- Select A Prison --" onChange={this.handlePrisonChange} />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="inmateId">Inmate ID</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="inmateId"
                  required
                  value={this.state.inmateId}
                  onChange={this.handleChange}
                  name="inmateId"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="releaseDate">Release Date</Label>
                <Input
                  type="date"
                  className="form-control"
                  id="releaseDate"
                  required
                  value={this.state.releaseDate}
                  onChange={this.handleChange}
                  name="releaseDate"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="birthName">Birth Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="birthName"
                  required
                  value={this.state.birthName}
                  onChange={this.handleChange}
                  name="birthName"
                />
              </FormGroup>

              <Button onClick={this.savePrisoner} color="success">
                Submit
              </Button>
              <Button onClick={this.setDummyData}>Add Dummy Data</Button>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    prisons: state.prisons,
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, { createPrisoner, retrievePrisons })(AddPrisoner);
