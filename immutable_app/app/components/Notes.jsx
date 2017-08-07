import React from 'react';
import { connect } from 'react-redux';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import { move } from '../actions/lanes';

const Notes = ({
  notes, move, onValueClick, onEdit, onDelete
}) => (
  <ul className="notes">{notes.map((note) => {
    const noteId = note.get('id');

    return (
      <Note className="note" id={noteId} key={noteId}
        editing={note.editing} onMove={move}>
        <Editable
          editing={note.get('editing')}
          value={note.get('task')}
          onValueClick={onValueClick.bind(null, noteId)}
          onEdit={onEdit.bind(null, noteId)}
          onDelete={onDelete.bind(null, noteId)} />
      </Note>
    );
  })}</ul>
);

export default connect(() => ({}), {
  move
})(Notes);
