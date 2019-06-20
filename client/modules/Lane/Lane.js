import React from 'react';
import PropTypes from 'prop-types';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';

const Lane = props => {
  const { lane, laneNotes, updateLane, addNote, deleteLane, editLane, deleteNote } = props;
  const laneId = lane.id;

  return (
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNote({task: 'New Note'}, laneId)}>Add Note</button>
        </div>
        <Edit
          className={styles.LaneName}
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(lane.id)}
          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <div className={styles.LaneDelete}>
          <button onClick={() => deleteLane(laneId)}>Remove Lane</button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  updateLane: PropTypes.func,
  addNote: PropTypes.func,
  deleteLane: PropTypes.func,
};

export default Lane;
