import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';

class Lane extends React.component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { connectDropTarget, lane, laneNotes, updateLane, addNote, deleteLane, editLane, deleteNote } = props;
    const laneId = lane.id;
    const insertNoteTask = () => {
      return window.prompt("Add new note", "New Note");
    };

    return connectDropTarget(
      <div className={styles.Lane}>
        <div className={styles.LaneHeader}>
          <div className={styles.LaneAddNote}>
            <button onClick={() => addNote({task: insertNoteTask()}, laneId)}>Add Note</button>
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
  }
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  updateLane: PropTypes.func,
  addNote: PropTypes.func,
  deleteLane: PropTypes.func,
};

export default Lane;
