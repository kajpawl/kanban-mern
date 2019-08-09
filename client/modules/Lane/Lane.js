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
    console.log('Happening ' + props.id);
    return {
      id: props.id,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
  endDrag(props, monitor) {
    // console.log(props);
    // document.getElementById(props.id).style.opacity = 1;
  }
};

const laneTarget = {
  hover(targetProps, monitor) {
    // console.log(targetProps);
    // const sourceProps = monitor.getItem();
    // if (targetProps.id !== sourceProps.id) {
    //   targetProps.moveWithinBoard(targetProps.id, sourceProps.id);
    // };
  },
  drop(targetProps, monitor) {
    console.log(targetProps);
    const sourceProps = monitor.getItem();
    if (targetProps.id !== sourceProps.id) {
      targetProps.moveWithinBoard(targetProps.id, sourceProps.id);
    };
  }
};

export default compose(
  DragSource(ItemTypes.LANE, laneSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.LANE, laneTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);