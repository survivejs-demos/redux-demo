import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.renderNote = this.renderNote.bind(this);
  }
  render() {
    // XXX
    const notes = this.props.items || [];

    return <ul className='notes'>{notes.map(this.renderNote)}</ul>;
  }
  renderNote(note) {
    // XXX: LaneActions.move
    return (
      <Note className='note' onMove={() => {}}
        id={note.id} key={`note${note.id}`}>
        <Editable
          value={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)} />
      </Note>
    );
  }
}
