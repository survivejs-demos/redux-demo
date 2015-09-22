import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Lanes from '../components/Lanes.jsx';
import * as LaneActions from '../actions/lanes';
import * as NoteActions from '../actions/notes';

@DragDropContext(HTML5Backend)
class App extends React.Component {
  constructor(props) {
    super(props);

    const dispatch = props.dispatch;

    this.laneActions = bindActionCreators(LaneActions, dispatch);
    this.noteActions = bindActionCreators(NoteActions, dispatch);
  }
  render() {
    const {lanes, notes, dispatch} = this.props;

    return (
      <div>
        <button className='add-lane' onClick={this.laneActions.createLane.bind(null, {
          name: 'New lane'
        })}>+</button>
        <Lanes lanes={lanes} notes={notes}
          laneActions={this.laneActions} noteActions={this.noteActions} />
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
