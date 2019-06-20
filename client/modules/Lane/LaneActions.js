import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { CREATE_NOTES, createNotes } from '../Note/NoteActions';
import { normalize } from 'normalizr';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';

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

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId,
  };
}

export function editLane(lane) {
  return {
    type: EDIT_LANE,
    lane,
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

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function createLaneRequest(lane) {
  console.log('Before creating lane ' + lane);
  return (dispatch) => {
    console.log('After creating lane ' + lane);
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}

export function deleteLaneRequest(laneId) {
  console.log('Before deleting lane ' + laneId);
  return (dispatch) => {
  console.log('After deleting lane ' + laneId);
    return callApi(`lanes/${laneId}`, 'delete').then(() => {
      dispatch(deleteLane(laneId));
    });
  };
}

export function updateLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes' + [lane.id], 'put', lane).then(res => {
      dispatch(updateLane(lane));
    });
  };
}
