import React, { Component } from 'react';

const Control = props => {
  const { direction } = props;

  return (
    <div className="control">
      <div className="button top-btn" onClick={() => direction('top')}>
        上
      </div>
      <div className="button bottom-btn" onClick={() => direction('bottom')}>
        下
      </div>
      <div className="button left-btn" onClick={() => direction('left')}>
        左
      </div>
      <div className="button right-btn" onClick={() => direction('right')}>
        右
      </div>
    </div>
  )
}


export default Control;
