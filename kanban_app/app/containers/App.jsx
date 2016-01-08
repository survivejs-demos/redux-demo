import React from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lanes from '../components/Lanes.jsx';
import {createLane} from '../actions/lanes';

@DragDropContext(HTML5Backend)
class App extends React.Component {
  render() {
    const {lanes, createLane} = this.props;

    return (
      <div>
        <button className='add-lane'
          onClick={createLane.bind(null, {
            name: 'New lane'
          })}>+</button>
        <Lanes lanes={lanes} />
      </div>
    );
  }
}

export default connect((state) => ({
  lanes: state.lanes
}), {
  createLane
})(App);
