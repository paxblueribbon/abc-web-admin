import React from "react";
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { State, Country } from 'country-state-city';
import Select from 'react-select';

class Address extends React.Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.getStates = this.getStates.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.handleCountryAddressChange = this.handleCountryAddressChange.bind(this);
    this.state = {
      statesList: [],
      countriesList: []
    }
  }

  componentDidMount(){
    this.getStates();
    this.getCountries();
  }

  getCountries() {
    const countries = Country.getAllCountries();
    const countriesOption = countries.map((country, index) => {
      return {value: country.name, label: country.name}
    })
    console.log(countries);
    this.setState({
      countriesList: countriesOption
    })
  }

  getStates() {
    const states = State.getStatesOfCountry('US');
    const statesOption = states.map((state, index) => {
      return {value: state.name, label: state.name}
    })
    console.log(states);
    this.setState({
      statesList: statesOption
    })
  }

  handleChange = (e) => {
    this.props.handler(e);
  };

  handleStateAddressChange = (f) => {
    console.log(f);
    const e = {target: {
      id: 'state',
      value: f.value
    }};
    this.props.handler(e);
    console.log(f);
  }

  handleCountryAddressChange = (f) => {
    console.log(f);
    const e = {target: {
      id: 'country',
      value: f.value
    }};
    this.props.handler(e);
    console.log(f);
  }
  
  render() {
    const { statesList, countriesList } = this.state;
    const { address } = this.props
    if (address) {
    return ( 
    <>
      <Row>
        <Col md="12" xl="6">
      <FormGroup>
        <Label for="street">Street</Label>
        <Input
          type='text'
          className='form-control'
          id='street'
          defaultValue={address.street}
          onChange={this.handleChange} />
      </FormGroup>
      </Col>
      <Col xs='12' md='8' xl='3'>
      <FormGroup>
        <Label for='city'>City</Label>
        <Input
          type='text'
          className='form-control'
          id='city'
          defaultValue={address.city}
          onChange={this.handleChange} />
      </FormGroup>
      </Col>
      <Col xs='12' md='4' xl='3'>
      <FormGroup>
        <Label htmlFor='state'>State</Label>
          <Select value={statesList.filter(option =>
            option.label === address.state)} options={statesList} onChange={this.handleStateAddressChange} id='state'/>
      </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col xl='6'>
      <FormGroup>
        <Label htmlFor='zip'>Zip</Label>
        <Input
          type='text'
          className='form-control'
          id='zip'
          defaultValue={address.zip}
          onChange={this.handleChange} />
      </FormGroup>
      </Col>
      <Col xl='6'>      
      <FormGroup>
        <Label htmlFor='country'>Country</Label>
          <Select value={{label: 'United States', value: 'United States' }} isDisabled={true} id='country' options={countriesList} onChange={this.handleCountryAddressChange}/>
      </FormGroup>
      </Col>
      </Row>
</>
    )}
    else { return (    <>
      <Row>
        <Col md='12' xl='6'>
      <FormGroup>
        <Label for='street'>Street</Label>
        <Input
          type='text'
          className='form-control'
          id='street'
          onChange={this.handleChange} />
      </FormGroup>
      </Col>
      <Col xs='12' md='8' xl='3'>
      <FormGroup>
        <Label for='city'>City</Label>
        <Input
          type='text'
          className='form-control'
          id='city'
          onChange={this.handleChange} />
      </FormGroup>
      </Col>
      <Col xs='12' md='4' xl='3'>
      <FormGroup>
        <Label htmlFor="state">State</Label>
          <Select options={statesList} onChange={this.handleStateAddressChange} />
      </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col xl='6'>
      <FormGroup>
        <Label htmlFor='zip'>Zip</Label>
        <Input
          type='text'
          className='form-control'
          id='zip'
          onChange={this.handleChange} />
      </FormGroup>
      </Col>
      <Col xl='6'>      
      <FormGroup>
        <Label htmlFor='country'>Country</Label>
        <Input
          type='text'
          className='form-control'
          id='country'
          onChange={this.handleChange} />
      </FormGroup>
      </Col>
      </Row>
</>)}
    
  }
}

export default Address;