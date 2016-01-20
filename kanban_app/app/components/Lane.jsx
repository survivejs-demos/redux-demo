import React from 'react';
import {connect} from 'react-redux';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';
import * as laneActions from '../actions/lanes';
import * as noteActions from '../actions/notes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.notes.length) {
      targetProps.attachToLane(
        targetProps.lane.id,
        sourceId
      );
    }
  }
};

@connect((state) => ({
  allNotes: state.notes
}), {
  ...laneActions,
  ...noteActions
})
@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
  render() {
    const {connectDropTarget, lane, allNotes, ...props} = this.props;
    const laneNotes = lane.notes.map((id) => allNotes[
      allNotes.findIndex((note) => note.id === id)
    ]).filter((note) => note);
    const id = lane.id;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header">
          <Editable className="lane-name" editing={lane.editing}
            value={lane.name} onEdit={this.editName.bind(this, id)}
            onValueClick={this.activateLaneEdit.bind(this, id)} />
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, id)}>+</button>
          </div>
        </div>
        <Notes
          notes={laneNotes}
          onValueClick={this.activateNoteEdit.bind(this)}
          onEdit={this.editNote.bind(this)}
          onDelete={this.deleteNote.bind(this, id)} />
      </div>
    );
  }
  addNote(laneId) {
    const o = this.props.createNote({
      task: 'New task'
    });
    this.props.attachToLane(laneId, o.note.id);
  }
  editNote(id, task) {
    this.props.updateNote({id, task, editing: false});
  }
  deleteNote(laneId, noteId) {
    this.props.deleteNote(noteId);
  }
  editName(id, name) {
    if(name.trim()) {
      this.props.updateLane({id, name, editing: false});
    }
    else {
      this.props.deleteLane(id);
    }
  }
  activateLaneEdit(id) {
    this.props.updateLane({id, editing: true});
  }
  activateNoteEdit(id) {
    this.props.updateNote({id, editing: true});
  }
}
