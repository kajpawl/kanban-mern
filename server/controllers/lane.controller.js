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
  console.log('Lane updated');
  Lane.update({ id: req.params.laneId }, req.body).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(lane);
  });
}

export function moveNotesBetweenLanes(req, res) {
  console.log('moveNotesBetweenLanes');
  console.log(req.body);
  const { targetLaneId, noteId, sourceLaneId } = req.body;
  Note.findOne({ id: noteId }).exec((err, movedNote) => {
    Lane.findOne({ id: sourceLaneId }).exec((err, sourceLane) => {
      console.log(sourceLane);
      console.log(movedNote);
      sourceLane.notes.pull(movedNote);
      sourceLane.save();
    })
      .then(Lane.findOne({ id: targetLaneId }).exec((err, targetLane) => {
        targetLane.notes.push(movedNote);
        targetLane.save();
      }))
        .then(res.status(200).end());
  });

}

export function updateNotesOrder(req, res) {
  const { laneId, targetId, sourceId } = req.body;
  Lane.findOne({ id: laneId }).exec((err, lane) => {
    Note.findOne({ id: targetId }).exec((err, targetNote) => {
      Note.findOne({ id: sourceId }).exec((err, sourceNote) => {

        console.log(lane);
        console.log(lane.notes);
        console.log(targetNote);
        console.log(sourceNote);

        const sourceIndex = lane.notes.indexOf(sourceNote);
        const targetIndex = lane.notes.indexOf(targetNote);

        console.log(sourceIndex);
        console.log(lane.notes.indexOf(sourceNote));
        console.log(targetIndex);
        console.log(lane.notes.indexOf(targetNote));
        // const newNotesOrder = [...lane.notes];
        // const newOrder = lane.notes.splice(targetIndex, 0, lane.notes.splice(sourceIndex, 1)[0]);
    // lane.notes
    // newNotesOrder.splice(targetIndex, 0, newNotesOrder.splice(sourceIndex, 1)[0]);
      // }).then(() => {
      //   lane.notes = newOrder;
      //   lane.save();
      })
    });
  })
    .then(res.status(200).end());
}

