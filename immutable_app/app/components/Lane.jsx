import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import ItemTypes from '../constants/itemTypes';
import * as laneActions from '../actions/lanes';
import * as noteActions from '../actions/notes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.get('notes').count()) {
      targetProps.attachToLane(
        targetProps.lane.get('id'),
        sourceId
      );
    }
  }
};

class Lane extends React.Component {
  render() {
    const {connectDropTarget, lane, laneNotes, ...props} = this.props;
    const laneId = lane.get('id');

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header"
          onClick={() => props.updateLane({id: laneId, editing: true})}>
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, laneId)}>+</button>
          </div>
          <Editable className="lane-name" editing={lane.get('editing')}
            value={lane.get('name')}
            onEdit={name => props.updateLane({id: laneId, name, editing: false})} />
          <div className="lane-delete">
            <button onClick={this.deleteLane.bind(this, lane)}>x</button>
          </div>
        </div>
        <Notes
          notes={laneNotes}
          onValueClick={id => props.updateNote({id, editing: true})}
          onEdit={(id, task) => props.updateNote({id, task, editing: false})}
          onDelete={(id, e) => this.deleteNote(laneId, id, e)} />
      </div>
    );
  }
  deleteLane(lane, e) {
    e.stopPropagation();

    const laneId = lane.get('id');

    // Clean up notes
    lane.get('notes').forEach(noteId => {
      this.props.detachFromLane(laneId, noteId);
      this.props.deleteNote(noteId);
    });

    this.props.deleteLane(laneId);
  }
  addNote(laneId, e) {
    e.stopPropagation();

    const o = this.props.createNote({
      task: 'New task'
    });
    this.props.attachToLane(laneId, o.note.id);
  }
  deleteNote(laneId, noteId, e) {
    e.stopPropagation();

    this.props.detachFromLane(laneId, noteId);
    this.props.deleteNote(noteId);
  }
}

export default compose(
  // If you want to memoize this (more performant),
  // use https://www.npmjs.com/package/reselect
  connect((state, props) => ({
    laneNotes: props.lane.get('notes').map(
      id => state.notes.find(note => note.get('id') === id)
    )
  }), {
    ...laneActions,
    ...noteActions
  }),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);
