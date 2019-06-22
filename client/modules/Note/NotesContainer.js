import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNoteRequest, updateNote, deleteNoteRequest, deleteNote, editNote, createNotes, moveWithinLane } from './NoteActions';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
  createNotes,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);