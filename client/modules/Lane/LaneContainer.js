import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import Lane from './Lane';
import { moveBetweenLanes, moveBetweenLanesRequest, moveWithinBoard, createLane, fetchLanes, deleteLane, deleteLaneRequest, updateLane, updateLaneRequest, editLane } from './LaneActions';
import { createNote, createNoteRequest, deleteNote, deleteNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  moveBetweenLanes,
  moveBetweenLanesRequest,
  moveWithinBoard,
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Lane);
