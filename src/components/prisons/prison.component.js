//https://www.bezkoder.com/react-redux-crud-example/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePrison, deletePrison } from '../../actions/prisons';
import PrisonDataService from '../../services/prison.service';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Address from '../../utilities/address';
import Select from 'react-select';
import { retrieveRules } from '../../actions/rules';

class Prison extends Component {
  constructor(props) {
    super(props);
    this.onChangeRules = this.onChangeRules.bind(this);
    this.getPrison = this.getPrison.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removePrison = this.removePrison.bind(this);
    this.renderRuleOptions = this.renderRuleOptions.bind(this);
    this.renderCurrentRules = this.renderCurrentRules.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.fetchServer = this.fetchServer.bind(this);

    this.state = {
      currentPrison: {
        uuid: null,
        prisonName: '',
        address: {
          city: '',
          country: '',
          state: '',
          street: '',
          zip: ''
        },
        prisonRules: [],
        inmates: []
      },
      message: ''
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.fetchServer()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      this.fetchServer()
    }
  }

  fetchServer() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken;
      this.getPrison(this.props.match && this.props.match.params.uuid);
      retrieveRules(token);
    }
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAddressChange = (e) => {
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        [e.target.id]: e.target.value
      }
    })
  }

  onChangeRules(e) {
    const rules = e.target.value;

    this.setState((prevState) => ({
      currentPrison: {
        ...prevState.currentPrison,
        prisonRules: rules
      }
    }));
  }

  getPrison(uuid) {
    const token = this.props.auth.stsTokenManager.accessToken;
    console.log(token);
    PrisonDataService.get(uuid, token)
      .then((response) => {
        this.setState({
          currentPrison: response.data
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    const token = this.props.auth.stsTokenManager.accessToken

    this.props
      .updatePrison(this.state.currentPrison.uuid, this.state.currentPrison, token)
      .then((response) => {
        console.log(response);
        this.setState({ message: 'The prison was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removePrison() {
    const token = this.props.auth.stsTokenManager.accessToken

    this.props
      .deletePrison(this.state.currentPrison.uuid, token)
      .then(() => {
        this.props.history.push('/prisons');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  renderRuleOptions(rules) {
    return (rules && rules.map( (rule, index) => {
        console.log(rule)  
        return (
            {value: rule, label: rule.title}
        )
        }))
  }

  renderCurrentRules(rules) {
    return (rules && rules.map((rule, index) => {
      return (
        {value: rule, label: rule.title}
      )
    }))
  }

  render() {
    const { currentPrison } = this.state;
    const {rules} = this.props;

    if (this.props.auth.isLoaded && this.props.auth.isEmpty) return <Redirect to='/'/>

    return (
      <div>
        {currentPrison ? (
          <div className="edit-form">
            <h4>Prison</h4>
            <Form>
              <FormGroup>
                <Label htmlFor="prisonName">Prison Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="prisonName"
                  value={currentPrison.prisonName}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Address address={currentPrison.address} handler={this.handleAddressChange}/>
              <FormGroup>
                <Label for="rules">Rules</Label>
                <Select options={this.renderRuleOptions(rules)} value={this.renderCurrentRules(currentPrison.rules)} isMulti />
              </FormGroup>
            </Form>
            <Button className="m-3" type="submit" color="primary" onClick={this.updateContent}>
              Update
            </Button>
            <Button className="m-3" color="danger" onClick={this.removePrison}>
              Delete
            </Button>
            <Link to={'/prisons'}>
              <Button className="m-3">Cancel</Button>
            </Link>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Prison...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    rules: state.rules
  }
}

export default connect(mapStateToProps, { updatePrison, deletePrison })(Prison);
