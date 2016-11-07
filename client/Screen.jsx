import React, { Component } from 'react';
import _ from 'lodash';

const generateMatix = points => {
  return points.map((item, index) => {
    const { x, y, v } = item;
    return (
      <div
        className={`col point ${v ? 'dashed': 'solid'}`}
        id={`point-x${x}y${y}`}
        style={{ top: 60 * x, left: 60 * y }}
      >{x}{y}</div>
    )
  });
}


class Screen extends Component {
  render() {
    const { points } = this.props;
    const matixContent = generateMatix(points);

    return (
      <div className="matix">
        {matixContent}
      </div>
    )
  }
}

export default Screen;
