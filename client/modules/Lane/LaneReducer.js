// Import Actions
import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, DELETE_LANE, EDIT_LANE, CREATE_NOTES, MOVE_BETWEEN_LANES, MOVE_WITHIN_BOARD } from './LaneActions';
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

    case DELETE_NOTE: {
      console.log(action);
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
      console.log(action.noteId);
      console.log(action.targetLaneId);
      console.log(action.sourceLaneId)
      const targetLane = { ...state[action.targetLaneId] };
      targetLane.notes = [ ...targetLane.notes, action.noteId ];

      const sourceLane = { ...state[action.sourceLaneId] };
      sourceLane.notes = sourceLane.notes.filter(noteId => noteId !== action.noteId);

      return { ...state, [action.targetLaneId]: targetLane, [action.sourceLaneId]: sourceLane};
    }

    case MOVE_WITHIN_BOARD: {
      const laneTargetId = action.laneTargetId;
      const laneSourceId = action.laneSourceId;
      const sourceLane = { ...state[laneSourceId] };
      const targetLane = { ...state[laneTargetId] };

      const newSourceLane = { ...state[laneSourceId], order: targetLane.order };
      const newTargetLane = { ...state[laneTargetId], order: targetLane.order - 1 };

      return { ...state, [action.laneSourceId]: newSourceLane, [action.laneTargetId]: newTargetLane };



      // console.log(state);
      // const lanesCopy = Object.keys(state).filter(laneId => laneId !== sourceId).map(laneId => {
      //   // lanesCopy.async = false;
      //   if (laneId === targetId) {
      //     console.log('target: ' + targetId);
      //     const sourceLanesCopy = {...lanesCopy, ...targetLane };
      //     return { ...sourceLanesCopy, ...sourceLane };
      //     // return Object.assign({}, lanesCopy, ...targetLane, ...sourceLane);
      //   } else {
      //     console.log('rest');
      //     return { ...lanesCopy, ...state[laneId] };
      //   }
      // });


      // let newLanesOrder = {};
      // console.log('start');

      //   for (let i = 0; i < Object.keys(state).length; i++) {
      //     console.log('iterating');
      //     if (Object.keys(state).id == targetId) {
      //       const targetLanes = { ...newLanesOrder, ...targetLane };
      //       newLanesOrder = { ...targetLanes, ...sourceLane };
      //     }
      //     else if (Object.keys(state)[i].id == sourceId) {
      //       console.log('Here is the moved lane');
      //     }
      //     else {
      //       newLanesOrder = { ...newLanesOrder, ...state[i] };
      //     }
      //   };
      console.log(lanesCopy);

      // console.log('source lane: ' + sourceLane);
      // console.log('target lane: ' + targetLane);
      // return state = lanesCopy;


      // return { ...state, [action.lane.id]: action.lane };
    }

    default:
      return state;
  }
};
