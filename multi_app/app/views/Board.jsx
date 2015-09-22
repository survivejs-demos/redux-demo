import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Lanes from '../components/Lanes.jsx';
import * as LaneActions from '../actions/lanes';
import * as NoteActions from '../actions/notes';

class Board extends React.Component {
  constructor(props) {
    super(props);

    const dispatch = props.dispatch;

    this.laneActions = bindActionCreators(LaneActions, dispatch);
    this.noteActions = bindActionCreators(NoteActions, dispatch);
  }
  render() {
    const {routeName, lanes, notes, dispatch} = this.props;

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
    routeName: state.router.params.name,
    lanes: state.lanes,
    notes: state.notes
  };
}

export default connect(mapStateToProps)(Board);
