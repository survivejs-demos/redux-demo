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
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }
  render() {
    const {connectDropTarget, id, name, notes, ...props} = this.props;

    // XXX: pass items to Notes
    // items: () => NoteStore.get(notes)
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
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }
  addNote(laneId) {
    // XXX
    /*
    NoteActions.create({task: 'New task'});
    LaneActions.attachToLane({laneId});
    */
  }
  editNote(id, task) {
    // XXX
    //NoteActions.update({id, task});
  }
  deleteNote(laneId, noteId) {
    // XXX
    /*
    NoteActions.delete(noteId);
    LaneActions.detachFromLane({laneId, noteId});
    */
  }
  editName(id, name) {
    // XXX
    /*
    if(name) {
      LaneActions.update({id, name});
    }
    else {
      LaneActions.delete(id);
    }
    */
  }
}
