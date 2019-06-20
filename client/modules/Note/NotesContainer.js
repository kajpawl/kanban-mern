import { connect } from 'react-redux';
import Notes from './Notes';
import { createNoteRequest, createNote, updateNoteRequest, updateNote, deleteNoteRequest, deleteNote, editNote, createNotes } from './NoteActions';

const mapDispatchToProps = {
  createNote: createNoteRequest,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
  createNotes,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);