import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';
import styles from './Notes.css';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLane }) => {

  return (
    <div className={styles.NotesContainer}>
      <ul className={styles.Notes}>{notes.map(note =>
        <Note 
          id={note.id}
          key={note.id}
          moveWithinLane={moveWithinLane}
          laneId={laneId}
        >
          <Edit
            editing={note.editing}
            value={note.task}
            onValueClick={() => editNote(note.id)}
            onUpdate={(task) => updateNote({
              ...note,
              task,
              editing: false,
            })}
            onDelete={() => deleteNote(note.id, laneId)}
            className={styles.NoteName}
          />
          <Edit
            editing={note.editing}
            value={note.description || "-- optional description --"}
            onValueClick={() => editNote(note.id)}
            onUpdate={(description) => updateNote({
              ...note,
              description,
              editing: false,
            })}
            className={styles.NoteDescription}
          />
        </Note>
      )}</ul>
    </div>
  );
};

Notes.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
};

export default Notes;