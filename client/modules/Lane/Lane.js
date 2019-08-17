import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import ItemTypes from '../Kanban/itemTypes';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';

class Lane extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging, endDrag, editing, lane, laneNotes, updateLane, addNote, deleteLane, editLane, deleteNote } = this.props;
    const laneId = lane.id;
    const dragSource = editing ? a => a : connectDragSource;
    const insertNoteTask = () => {
      return window.prompt("Add new note", "New Note");
    };

    return dragSource(connectDropTarget(
      <div className={styles.Lane} style={{order: `${lane.order}`}}>
        <div className={styles.LaneHeader}>
          <div className={styles.LaneAddNote}>
            <span className={styles.NotesLength}>{laneNotes.length}</span>
            <button onClick={() => addNote({task: insertNoteTask()}, laneId)}>+</button>
          </div>
          <Edit
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onValueClick={() => editLane(lane.id)}
            onUpdate={name => updateLane({ ...lane, name, editing: false })}
          />
        </div>
        <NotesContainer
          notes={laneNotes}
          laneId={laneId}
        />
        <div className={styles.LaneFooter}>
          <div className={styles.LaneDelete}>
            <button onClick={() => deleteLane(laneId)}>&#x2718; Delete lane</button>
          </div>
        </div>
      </div>
    ));
  }
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  updateLane: PropTypes.func,
  addNote: PropTypes.func,
  deleteLane: PropTypes.func,
};

const laneSource = {
  beginDrag(props) {
    return {
      id: props.id,
      type: 'lane',
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
};

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    if (sourceProps.type === 'note') {
      if (!targetProps.lane.notes.includes(noteId)) {
        targetProps.moveBetweenLanes(
          targetProps.lane.id,
          noteId,
          sourceLaneId,
        );
      }
    }
    else 
    if (sourceProps.type === 'lane') {
      if (targetProps.id !== sourceProps.id) {
        targetProps.moveWithinBoard(targetProps.id, sourceProps.id);
      };
    }
  },
};

export default compose(
  DragSource(ItemTypes.NOTE, laneSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.NOTE, (noteTarget), (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);
