import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Lanes from '../components/Lanes.jsx';
import * as LaneActions from '../actions/lanes';
import * as NoteActions from '../actions/notes';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  render() {
    const {lanes, notes, dispatch} = this.props;
    const laneActions = bindActionCreators(LaneActions, dispatch);
    const noteActions = bindActionCreators(NoteActions, dispatch);

    return (
      <div>
        <button className='add-lane' onClick={laneActions.createLane.bind(null, {
          name: 'New lane'
        })}>+</button>
        <Lanes lanes={lanes} notes={notes}
          laneActions={laneActions} noteActions={noteActions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lanes: state.lanes,
    notes: state.notes
  };
}

export default connect(mapStateToProps)(App);
