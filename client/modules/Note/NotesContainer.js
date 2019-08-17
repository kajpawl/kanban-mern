import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNoteRequest, updateNote, deleteNoteRequest, deleteNote, editNote, createNotes, moveWithinLane, moveWithinLaneRequest } from './NoteActions';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
  createNotes,
  moveWithinLane,
  moveWithinLaneRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);