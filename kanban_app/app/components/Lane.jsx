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
    const laneId = lane.id;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header"
          onClick={() => props.updateLane({id: laneId, editing: true})}>
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, laneId)}>+</button>
          </div>
          <Editable className="lane-name" editing={lane.editing}
            value={lane.name}
            onEdit={name => props.updateLane({id: laneId, name, editing: false})} />
          <div className="lane-delete">
            <button onClick={this.deleteLane.bind(this, laneId)}>x</button>
          </div>
        </div>
        <Notes
          notes={laneNotes}
          onValueClick={id => props.updateNote({id, editing: true})}
          onEdit={(id, task) => props.updateNote({id, task, editing: false})}
          onDelete={id => this.deleteNote(laneId, id)} />
      </div>
    );
  }
  deleteLane(laneId, e) {
    e.stopPropagation();

    this.props.deleteLane(laneId);
  }
  addNote(laneId, e) {
    e.stopPropagation();

    const o = this.props.createNote({
      task: 'New task'
    });
    this.props.attachToLane(laneId, o.note.id);
  }
  deleteNote(laneId, noteId) {
    this.props.detachFromLane(laneId, noteId);
    this.props.deleteNote(noteId);
  }
}
