import { connect } from 'react-redux';
import Lane from './Lane';
import { createLaneRequest, createLane, fetchLanes, deleteLane, deleteLaneRequest, updateLane, updateLaneRequest, editLane } from './LaneActions';
import { createNote, createNoteRequest, deleteNote, deleteNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = dispatch => ({
  createLane: createLaneRequest,
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
