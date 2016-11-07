import React, { Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import io from 'socket.io-client';
import { config } from '../config.js';

import './styles/show.scss';

const server = io();
const { row, col } = config;

class Show extends Component {
  constructor() {
    super();

    this.state = {
      isMount: false,
      name: '',
      isStart: false,
      point: []
    };

    $.getJSON('http://localhost:1024/config').done(data => {
      this.setState({ isMount: true, point: data.data.pics }, () => {
        this.state.point.forEach(item => {
          const id = `#c${item.c}r${item.r}`;
          $(id).css({'background-color': item.color});
        })
      });
    })

    server.on('change', ({ point , bool}) => {
      const id = (`#c${point.c}r${point.r}`);
      bool ? $(id).addClass('light') : $(id).removeClass('light');
    });
  }

  render() {
    const rowarr = _.times(row);
    const colarr = _.times(col);

    const matix = colarr.map(r => {

      const rowList = rowarr.map(c => {
        return (
          <div className="point" id={`c${c}r${r}`}>{r}{c}</div>
        )
      });
      return (
        <div className="col">
          {rowList}
        </div>
      )
    });

    return (
      <div className="game">
        {matix}
      </div>
    )
  }
}

render(<Show />, document.getElementById('show'));
