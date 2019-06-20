// Import Actions
import { CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE, CREATE_NOTES, EDIT_NOTE } from './NoteActions';

import omit from 'lodash/omit';

// Initial State
const initialState = [];

export default function notes(state = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
    case UPDATE_NOTE:
      return { ...state, [action.note.id]: action.note };

    case EDIT_NOTE: {
      const note = { ...state[action.note], editing: true };
      return { ...state, [action.note]: note };
    }

    case DELETE_NOTE:
      console.log(action);
      return omit(state, action.noteId);

    case CREATE_NOTES:
      return { ...action.notes };

    default:
      return state;
  }
};
