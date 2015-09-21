import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lanes from '../components/Lanes.jsx';
import * as LaneActions from '../actions/lanes';
import * as NoteActions from '../actions/notes';

class Board extends React.Component {
  render() {
    const {routeName, lanes, notes, dispatch} = this.props;
    const laneActions = bindActionCreators(LaneActions, dispatch);
    const noteActions = bindActionCreators(NoteActions, dispatch);

    console.log('route', routeName);

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
    routeName: state.router.params.name,
    lanes: state.lanes,
    notes: state.notes
  };
}

export default connect(mapStateToProps)(Board);
