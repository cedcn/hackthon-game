import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import _ from 'lodash';
import io from 'socket.io-client';

import Loading from './Loading';
import Screen from './Screen';
import Point from './Point';
import Control from './Control';

import './styles/index.scss';
const server = io();

class App extends Component {
  constructor() {
    super();

    this.state = {
      points: [],
      row: 0,
      col: 0,
      status: 'default',
      selfIndex: 0,
      userPattern: [],
      selfPoint: {}
    };

    this.onChange = ::this.onChange;
    this.addUser = ::this.addUser;
    this.direction = ::this.direction;

    server.on('start play', ({ userPattern }) => {
        this.setState({ userPattern, status: 'start' });
      }
    )

    server.on('finish game', () => {
        this.setState({ status: 'finish' });
      }
    )

    server.on('render screen', ({ points, row, col, selfPoint }) => {
      this.setState({ points, row, col, selfPoint });
    })

    server.on('other point change', ({ userPattern }) => {
      this.setState({ userPattern });
    })

    server.on('user left', ({ userPattern }) => {
      console.log(userPattern);

      this.setState({ userPattern })
    })
  }

  addUser() {
    // 1 验证用户是否存在
    // 2 加入游戏
    this.setState({ status: 'join' });
    server.emit('add user', this.state.name.trim());
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  direction(type) {
    const { selfPoint, row, col } = this.state;
    const { x, y } = selfPoint;

    const newPoint = { ...selfPoint };

    if (type === 'top' && x > 0) {
      newPoint.x = x - 1;
    }
    if (type === 'bottom' && x < row - 1) {
      newPoint.x = x + 1;
    }
    if (type === 'left' && y > 0) {
      newPoint.y = y - 1;
    }
    if (type === 'right' && y < col - 1) {
      newPoint.y = y + 1;
    }

    this.setState({ selfPoint: newPoint }, () => {
      server.emit('action', newPoint);
    })
  }

  render() {
    const { status, userPattern, selfPoint } = this.state;
    let content;
    if (status === 'connect') {
      content = <div>Loading Finish..</div>
    }


    if (status === 'start') {
      const userPatternContent = userPattern.map((item, index) => {
        return <Point x={item.x} y={item.y} key={index}/>
      })

      const selfPointContent = <Point x={selfPoint.x} y={selfPoint.y} isSelf />
      const control = <Control direction={this.direction}/>;

      content = (
        <div className={`interface`} >
          {control}
          <div
            className="screen"
            style={{
              width: 60 * this.state.col,
              height: 60 * this.state.row
            }}
          >
            <div className="matix user-pattern">
              {selfPointContent}
              {userPatternContent}
            </div>
            <Screen points={this.state.points} />
          </div>
        </div>
      );
    }

    if (status === 'join') {
      content = (
        <div>
          <Loading />
          <div>Waiting...等待其他玩家加入</div>
        </div>
      );
    }

    if (status === 'default') {
      content = (
        <div className="input-wrapper">
          <input type="text" value={this.state.name} onChange={this.onChange} placeholder="Nickname.."/>
          <button onClick={this.addUser}>Start Player</button>
        </div>
      );
    }

    if (status === 'finish') {
      content = (
        <div>
          恭喜过关
        </div>
      );
    }

    return (
      <div className="game">
        {content}
      </div>
    )
  }
}

render(<App />, document.getElementById('app'));
