import React from 'react';
import Lane from './Lane.jsx';

export default class Lanes extends React.Component {
  render() {
    const lanes = this.props.items || []; // XXX: drop checking for default?

    return <div className='lanes'>{lanes.map(this.renderLane)}</div>;
  }
  renderLane(lane) {
    return <Lane className='lane' key={`lane${lane.id}`} {...lane} />;
  }
}
