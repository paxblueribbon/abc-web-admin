import React from "react";
import { connect } from "react-redux";
import { Button, Container, Input, Row } from "reactstrap";
import { retrieveRules, createRule } from '../../actions/rules'
import { Col, FormGroup, Form } from 'reactstrap'

class PrisonRules extends React.Component {
  constructor (props) {
    super(props)

    this.renderRow = this.renderRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.updateRule = this.updateRule.bind(this);
    this.fetchServer = this.fetchServer.bind(this);
    this.addNew = this.addNew.bind(this);

    this.state = {
      newRule: {
        title: ' ',
        description: ' ',
        type: 'prison'
      }
    }
  }

  componentDidMount() {
    this.fetchServer();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.auth.isLoaded !== this.props.auth.isLoaded) {
      this.fetchServer();
    }
  }

  fetchServer() {
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      const token = this.props.auth.stsTokenManager.accessToken;
      this.props.retrieveRules(token);
    }
  }

  handleChange(id, e) {
    const rule = this.props.rules.filter(({uuid}) => uuid === id)
    const newRule = {...rule, [e.id] : e.value}
    this.setState({
      ...this.state.rules,
      newRule
    })
  }

  handleNew = (e) => {
    this.setState({
      ...this.state,
      newRule: {
        ...this.state.newRule,
        [e.target.id] : e.target.value
      }
    })
  }

  addNew() {
    const token = this.props.auth.stsTokenManager.accessToken
    const {title, description, type} = this.state.newRule;
    this.props.createRule(title, description, type, token);
  }

  updateRule(ruleId, ) {

  }

  renderRow(rule, index) {
    console.log(rule)
    if (rule) {
      return (
      <Row key={index}>
        <Col>
          <FormGroup>
            <Input type='text' className='form-control' id='title' name='title' defaultValue={rule.title} />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input type='text' className='form-control' id='description' name='description' defaultValue={rule.description} />
          </FormGroup>
        </Col>
        <Col>
          <Button className="mx-3" color="primary">Update</Button>
          <Button className="mx-3" color="danger">Delete</Button>
        </Col>
      </Row>
      )
    }
    else {
      return (<>
        <Row key='z'>
          <Col>
            <FormGroup>
              <Input type='text' className='form-control' id='title' name='title' placeholder="Rule Title" onChange={this.handleNew} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input type='text' className='form-control' id='description' name='description' placeholder="Rule Description" onChange={this.handleNew}/>
            </FormGroup>
          </Col>
          <Col>
            <Button color="success" className="mx-3" onClick={this.addNew}>Add</Button>
          </Col>
        </Row>
      </>)
    }

  }

  render() {
    const { rules } = this.props;
    return (
      <>
        <Container>
          <Form>
          {rules &&
              rules.map((rule, index) => (
                this.renderRow(rule, index)
              ))}
            {this.renderRow()}
          </Form>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    rules: state.rules
  }
}

export default connect(mapStateToProps, { retrieveRules, createRule })(PrisonRules)