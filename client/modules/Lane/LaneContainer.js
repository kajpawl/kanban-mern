import { connect } from 'react-redux';
import Lane from './Lane';
import { createLaneRequest, fetchLanes } from './LaneActions';
import * as laneActions from './LaneActions';
import { createNote, createNoteRequest, deleteNote, deleteNoteRequest, updateNote, updateNoteRequest } from '../Note/NoteActions';

import { deleteLane, deleteLaneRequest, updateLane, updateLaneRequest, editLane } from './LaneActions';

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = dispatch => ({
  ...laneActions,
  addNote: createNote,
  createLane: createLaneRequest,
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  deleteNote: deleteNoteRequest,
  updateNote: updateNoteRequest,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
