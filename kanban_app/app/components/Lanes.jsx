import React from 'react';
import Lane from './Lane.jsx';

export default class Lanes extends React.Component {
  render() {
    const {lanes, notes, laneActions, noteActions} = this.props;

    // XXX: pass notes and actions to lower in hierarchy
    return <div className='lanes'>{lanes.map(this.renderLane)}</div>;
  }
  renderLane(lane) {
    return <Lane className='lane' key={`lane${lane.id}`} {...lane} />;
  }
}
