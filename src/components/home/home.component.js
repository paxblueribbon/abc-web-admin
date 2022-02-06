import React from 'react';
import { connect } from 'react-redux';
import LoggedInHud from './huds/loggedinhud';
import LoggedOutHud from './huds/loggedouthud';

class Home extends React.Component {
  render() {
    if (this.props.auth.uid){
      return(
        <LoggedInHud/>
      )
    }
    else {
    return (
      <LoggedOutHud/>
    );
  }
}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, {})(Home);
