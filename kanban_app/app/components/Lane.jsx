import React from 'react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../libs/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.notes.length) {
      // XXX
      /*LaneActions.attachToLane({
        laneId: targetProps.id,
        noteId: sourceId
      });*/
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
  constructor(props) {
    super(props);

    const id = props.id;

    this.addNote = this.addNote.bind(this, id);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }
  render() {
    const {connectDropTarget, id, name, allNotes, notes,
      laneActions, noteActions, ...props} = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className='lane-header'>
          <Editable className='lane-name' value={name}
            onEdit={this.editName} />
          <div className='lane-add-note'>
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <Notes
          items={allNotes.filter((note) => notes.indexOf(note.id) >= 0)}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }
  addNote(laneId) {
    const noteActions = this.props.noteActions;
    const laneActions = this.props.laneActions;

    const o = noteActions.createNote({
      task: 'New task'
    });
    laneActions.attachToLane(laneId, o.note.id);
  }
  editNote(id, task) {
    const noteActions = this.props.noteActions;

    noteActions.updateNote(id, task);
  }
  deleteNote(laneId, noteId) {
    const noteActions = this.props.noteActions;
    const laneActions = this.props.laneActions;

    noteActions.deleteNote(noteId);
  }
  editName(id, name) {
    const laneActions = this.props.laneActions;

    if(name) {
      laneActions.updateLane(id, name);
    }
    else {
      laneActions.deleteLane(id);
    }
  }
}
