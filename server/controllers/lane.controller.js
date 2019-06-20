import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];
  newLane.id = uuid();

  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.notes.map(note => {
      return Note.findOneAndRemove({ id: note.id }, function(err) {
        if (err) throw err;
        console.log('Note deleted!');
      });
    });

    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function updateLane(req, res) {
  // Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
  //   if (err) {
  //     res.status(500).send(err);
  //   }

  //   const newName = req.body.name;
  //   lane.name = newName;
  // })
  Lane.update({ id: req.params.laneId }, req.body).exec((err, lane) => {
        if (err) {
      res.status(500).send(err);
    }
    res.json(lane);
  });
}
