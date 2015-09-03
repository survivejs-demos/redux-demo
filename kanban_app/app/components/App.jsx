import React from 'react';
import Lanes from './Lanes.jsx';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  render() {
    // XXX: pass items to lanes
    // items: () => LaneStore.getState().lanes || []
    return (
      <div>
        <button className='add-lane' onClick={this.addItem}>+</button>
        <Lanes />
      </div>
    );
  }
  addItem() {
    // XXX
    //LaneActions.create({name: 'New lane'});
  }
}
