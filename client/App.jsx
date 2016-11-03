import React, { Component } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

import Loading from './Loading';

import './styles/index.scss';
const server = io();

console.log(server);
class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isStart: false
    };

    server.on('start play', bool => {
      this.setState({ isStart: bool });
    })

    this.onChange = ::this.onChange;
    this.addUser = ::this.addUser;
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  addUser() {
    if (localStorage.getItem('user')) {

    }
    server.emit('add user', { name: this.state.name.trim() });
  }

  render() {
    return (
      <div>
        <Loading />
        {!this.state.isStart ? <div>Waiting..</div> : <div>Game start!</div>}
        <input type="text" value={this.state.name} onChange={this.onChange}/>
        <button onClick={this.addUser}>Add User</button>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
