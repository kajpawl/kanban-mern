import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Add a new Lane
router.route('/lanes').post(LaneController.addLane);

// Get all Lanes
router.route('/lanes').get(LaneController.getLanes);

// Delete a Lane by laneId
router.route('/lanes/:laneId').delete(LaneController.deleteLane);

// Change Lane's name by laneId
router.route('/lanes/:laneId').put(LaneController.updateLane);

export default router;
