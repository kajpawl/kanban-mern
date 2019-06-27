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
        // console.log('Note deleted!');
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
  // console.log('Lane updated');
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
      // console.log(sourceLane);
      // console.log(movedNote);
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
        let newNotes = [];
        // console.log(lane);
        // console.log(targetNote);
        // console.log(sourceNote);
        // console.log(lane.notes.length);
        for (let i = 0; i < lane.notes.length; i++) {
          console.log('iterating');
          if (lane.notes[i].id == targetId) {
            newNotes.push(sourceNote, lane.notes[i]);
          }
          else if (lane.notes[i].id == sourceId) {
            console.log('Here is the moved note');
          }
          else {
            newNotes.push(lane.notes[i]);
          }
        };
        // console.log('\n\n\n' + newNotes + '\n\n\n');
        lane.notes = newNotes;
        lane.save();
      });
    });
  })
    .then(res.status(200).end());
}
