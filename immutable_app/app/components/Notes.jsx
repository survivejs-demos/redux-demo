import React from 'react';
import {connect} from 'react-redux';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import {move} from '../actions/lanes';

class Notes extends React.Component {
  render() {
    const {notes, move, onValueClick, onEdit, onDelete} = this.props;

    return (<ul className="notes">{notes.map((note) =>
      <Note className="note" id={note.get('id')} key={note.get('id')}
        editing={note.get('editing')} onMove={move}>
        <Editable
          editing={note.get('editing')}
          value={note.get('task')}
          onValueClick={onValueClick.bind(null, note.get('id'))}
          onEdit={onEdit.bind(null, note.get('id'))}
          onDelete={onDelete.bind(null, note.get('id'))} />
      </Note>
    )}</ul>);
  }
}

export default connect(() => ({}), {
  move
})(Notes);
