import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { CREATE_NOTES, createNotes } from '../Note/NoteActions';
import { normalize } from 'normalizr';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const REMOVE_NOTE_FROM_LANE = 'REMOVE_NOTE_FROM_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';
export const MOVE_WITHIN_BOARD = 'MOVE_WITHIN_BOARD';

// Export Actions

export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      notes: [],
      ...lane,
    },
  };
}

export function createLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function editLane(lane) {
  return {
    type: EDIT_LANE,
    lane,
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes/' + [lane.id], 'put', { id: lane.id, name: lane.name }).then(res => {
      dispatch(updateLane(lane));
    });
  };
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId,
  };
}

export function removeNoteFromLane(noteId, laneId) {
  return {
    type: REMOVE_NOTE_FROM_LANE,
    noteId,
    laneId,
  };
}

export function deleteLaneRequest(laneId) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}`, 'delete').then(() => {
      dispatch(deleteLane(laneId));
    });
  };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities;
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    });
  };
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  moveBetweenLanesRequest(targetLaneId, noteId, sourceLaneId);
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}

export function moveBetweenLanesRequest(targetLaneId, noteId, sourceLaneId) {
  return callApi('movenote', 'put', { targetLaneId, noteId, sourceLaneId });
}

export function moveWithinBoard(laneTargetId, laneSourceId) {
  moveWithinBoardRequest(laneTargetId, laneSourceId);
  return {
    type: MOVE_WITHIN_BOARD,
    laneTargetId,
    laneSourceId,
  };
}

export function moveWithinBoardRequest(laneTargetId, laneSourceId) {
  return callApi('movelane', 'put', { laneTargetId, laneSourceId });
}

