import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input, Form, Container } from 'reactstrap';
import { createPrison } from '../../actions/prisons';
import Address from '../../utilities/address';
import { retrieveRules } from '../../actions/rules';
import Select from 'react-select';

class AddPrison extends Component {
  constructor(props) {
    super(props);
    this.savePrison = this.savePrison.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.renderRuleOptions = this.renderRuleOptions.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.pullFromServer = this.pullFromServer.bind(this);
    this.makeId = this.makeId.bind(this);
    this.setDummyData = this.setDummyData.bind(this);

    this.state = {
      uuid: null,
      address: {
        city: '',
        country: '',
        state: '',
        street: '',
        zip: ''
      },
      inmates: [],
      prisonName: '',
      prisonRules: []
    };
  }

  componentDidMount() {
    if (this.props.rules.isEmpty && this.props.auth.isLoaded && !this.props.auth.isEmpty) {
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
    this.props.retrieveRules(token);
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAddressChange = (e) => {
    console.log(e);
    this.setState({
      ...this.state,
      address: {
        ...this.state.address,
        [e.target.id]: e.target.value
      }
    })
  }

  savePrison() {
    const { prisonName, address, prisonRules, inmates } = this.state;
    console.log(`Name ${prisonName}, Address: ${address.street}, Rules: ${prisonRules}`);
    const token = this.props.auth.stsTokenManager.accessToken;
    this.props
      .createPrison(prisonName, address, prisonRules, inmates, token)
      .then((data) => {
        console.log(data)
        // this.clearForm()
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  checkboxChange = (id) => {
    let rules = this.state.rules
    let fullRuleList = this.props.rules
    let find = rules.findIndex(rule => rule.uuid === id)
    if (find > -1) {
      rules.splice(find, 1)
    } else {
      rules.push(fullRuleList.find(rule => rule.uuid === id))
    }
    this.setState({ rules })
    console.log(rules);
  }

  renderRuleOptions(rules) {
    return rules.map( (rule, idx) => {
        console.log(rule)  
        return (
            {value: rule, label: rule.title}
        )
        })
  }

  handleRuleChange = (e) => {
    console.log(e);
    let selectedRules = e.map( (rule, index) => {
     return rule.value
    })
    console.log(selectedRules)
    this.setState({ prisonRules: selectedRules })
  }


  clearForm() {
    this.setState ({
      uuid: null,
      address: {
        city: '',
        country: '',
        state: '',
        street: '',
        zip: ''
      },
      inmates: [],
      prisonName: '',
    });
  }

  setDummyData() {
    this.setState({
      uuid: null,
      address: {
        city: this.makeId(6, false),
        country: 'USA',
        state: 'Georgia',
        street: `123 ${this.makeId(5, false)} Street`,
        zip: '12345'
      },
      inmates: [],
      prisonName: `${this.makeId(8, false)}`
    }, () => {
      this.savePrison()
    });
    
  }

  makeId(length, numbers) {
    var result = '';
    var characters = ''
    if (numbers) {characters = '0123456789'}
    else { characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; }
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  render() {
    const {rules} = this.props 
    console.log(`Rules: ${rules}`)
    
    return (
      <Container>
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Button color="success" onClick={this.newPrison}>
              Add
            </Button>
          </div>
        ) : (
          <div>
            <Form>
            <FormGroup>
              <div className='row'>
              <div className='  col s12'>
              <Label for="prisonName">Prison Name</Label>

              <Input
                type="text"
                className="form-control"
                id="prisonName"
                required
                value={this.state.prisonName}
                onChange={this.handleChange}
                name="prisonName"
              />
              </div>
              </div>
            </FormGroup>
            <Address address={this.state.address} handler={this.handleAddressChange}/>
            <Label for="rules">Prison Rules</Label>
            <Select id="rules" options={this.renderRuleOptions(rules)} isMulti onChange={this.handleRuleChange} />
            <Button onClick={this.savePrison} color="success">
              Submit
            </Button>
            <Button onClick={this.setDummyData}>Set Dummy Data</Button>
            </Form>
          </div>
        )}
      </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    rules: state.rules
  };
};
export default connect(mapStateToProps, { createPrison, retrieveRules })(AddPrison);