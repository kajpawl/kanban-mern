import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNoteRequest, updateNote, deleteNoteRequest, deleteNote, editNote, createNotes } from './NoteActions';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
  createNotes,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);