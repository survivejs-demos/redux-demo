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

    if(!targetProps.notes.length) {
      targetProps.attachToLane(
        targetProps.id,
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
  constructor(props) {
    super(props);

    const id = props.id;

    this.addNote = this.addNote.bind(this, id);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }
  render() {
    const {connectDropTarget, id, name, allNotes, notes, ...props} = this.props;
    const laneNotes = notes.map((id) => allNotes[
      allNotes.findIndex((note) => note.id === id)
    ]);

    // XXX: {...props} isn't ideal here as we pass
    // action creators through them now...
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
          items={laneNotes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
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
    this.props.updateNote(id, task);
  }
  deleteNote(laneId, noteId) {
    this.props.deleteNote(noteId);
  }
  editName(id, name) {
    if(name) {
      this.props.updateLane(id, name);
    }
    else {
      this.props.deleteLane(id);
    }
  }
}
