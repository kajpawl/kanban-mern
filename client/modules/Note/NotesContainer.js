import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNoteRequest, updateNote, deleteNoteRequest, deleteNote, editNote, createNotes, moveWithLane } from './NoteActions';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
  createNotes,
  moveWithLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);