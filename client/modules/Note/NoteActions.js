import callApi from '../../util/apiCaller';

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';

// Export Actions
export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note,
  };
}

export function createNoteRequest(note, laneId) {
  console.log('Before creating note ' + note.task + ' & laneId is ' + laneId);
  return (dispatch) => {
  console.log('After creating note ' + note.task + ' & laneId is ' + laneId);
    return callApi('notes', 'post', { note, laneId }).then(noteResp => {
      dispatch(createNote(noteResp, laneId));
    });
  };
}

export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note,
  };
}

export function updateNoteRequest(note) {
  return (dispatch) => {
    return callApi('notes/' + [note.id], 'put', { note }).then(noteResp => {
      dispatch(updateNote(note));
    });
  };
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    noteId,
    laneId,
  };
}

export function deleteNoteRequest(noteId, laneId) {
  console.log('Before deleting note ' + noteId, laneId);
  return (dispatch) => {
  console.log('After deleting note ' + noteId, laneId);
    return callApi('notes/' + noteId, 'delete', { noteId, laneId }).then(() => {
      dispatch(deleteNote(noteId, laneId));
    });
  };
}

export function editNote(note) {
  return {
    type: EDIT_NOTE,
    note,
  };
}

export function createNotes(notesData) {
  return {
    type: CREATE_NOTES,
    notes: notesData,
  };
}
