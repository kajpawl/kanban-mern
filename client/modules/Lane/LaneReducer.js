// Import Actions
import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, DELETE_LANE, EDIT_LANE, CREATE_NOTES, MOVE_BETWEEN_LANES, MOVE_WITHIN_BOARD, REMOVE_NOTE_FROM_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE, MOVE_WITHIN_LANE } from '../Note/NoteActions';
import omit from 'lodash/omit';

// Initial State
const initialState = {};

function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];
  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };

    case EDIT_LANE:
      const lane = { ...state[action.lane], editing: true };
      return { ...state, [action.lane]: lane };

    case CREATE_LANES:
      return { ...action.lanes };

    case REMOVE_NOTE_FROM_LANE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.laneId]: newLane };
    }

    case CREATE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.concat(action.note.id);
      return { ...state, [action.laneId]: newLane };
    }

    case DELETE_LANE: {
      return omit(state, action.laneId);
    }

    case MOVE_WITHIN_LANE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = moveNotes(newLane.notes, action.sourceId, action.targetId);
      return { ...state, [action.laneId]: newLane };
    }

    case MOVE_BETWEEN_LANES: {
      let targetLane = { ...state[action.targetLaneId] };
      targetLane.notes = [ ...targetLane.notes, action.noteId ];

      let sourceLane = { ...state[action.sourceLaneId] };
      sourceLane.notes = sourceLane.notes.filter(noteId => noteId !== action.noteId);

      return { ...state, [action.targetLaneId]: targetLane, [action.sourceLaneId]: sourceLane };
    }

    case MOVE_WITHIN_BOARD: {
      const laneTargetId = action.laneTargetId;
      const laneSourceId = action.laneSourceId;
      const sourceLane = { ...state[laneSourceId] };
      const targetLane = { ...state[laneTargetId] };
      let newSourceLane = null;
      let newTargetLane = null;

      if (sourceLane.order < targetLane.order) {
        newSourceLane = { ...state[laneSourceId], order: targetLane.order };
        newTargetLane = { ...state[laneTargetId], order: targetLane.order - 1 };
      }
      else {
        newSourceLane = { ...state[laneSourceId], order: targetLane.order - 1 };
        newTargetLane = { ...state[laneTargetId], order: targetLane.order };
      }

      return { ...state, [action.laneSourceId]: newSourceLane, [action.laneTargetId]: newTargetLane };
    }

    default:
      return state;
  }
};
