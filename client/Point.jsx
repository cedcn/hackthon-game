import React, { Component } from 'react';
import _ from 'lodash';

class Point extends Component {
  render() {
    const { x, y, isSelf } = this.props;
    return (
      <div
        className={`move-point ${isSelf ? 'self': ''}`}
        id={`move-x${x}y${y}`}
        style={{ top: 60 * x, left: 60 * y }}/>
    )
  }
}

Point.defaultProps = {
  x: 0,
  y: 0,
  isSelf: false
}

export default Point;
