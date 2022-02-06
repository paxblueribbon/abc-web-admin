import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import PrisonersList from './components/prisoners/prisoners-list.component';
import Prisoner from './components/prisoners/prisoner.component';
import PrisonsList from './components/prisons/prison-list.component';
import Prison from './components/prisons/prison.component';
import ErrorBoundary from './components/errorboundary.component';
import Home from './components/home/home.component';
import { connect } from 'react-redux';
import NavBar from './components/navbar/navbar.component'
import UserList from './components/users/user-list';
import User from './components/users/user';
import Message from './components/messages/message'
import Messages from './components/messages/message-page';

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <ErrorBoundary>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/prisoners'} component={PrisonersList} />
            <Route path="/prisoner/:uuid" component={Prisoner} />
            <Route path='/users' component={UserList} />
            <Route path='/user/:uuid' component={User} />
            <Route exact path="/prisons" component={PrisonsList} />
            <Route path="/prison/:uuid" component={Prison} />
            <Route exact path='/messages' component={Messages}/>
            <Route path='/message/:userID/:prisonerID/:messageID' component={Message}/>
          </Switch>
        </ErrorBoundary>
      </Container>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(App);