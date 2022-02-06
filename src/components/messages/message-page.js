import { Component } from 'react'
import Conversations from '../users/conversations'
import Unsent from './unsent-component'

class Messages extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      <Conversations/>
      <Unsent/>
      </>
    )
  }
}

export default Messages;