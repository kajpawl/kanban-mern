import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  task: { type: 'String', required: true },
  description: { type: 'String', required: false },
  id: { type: 'String', required: true, unique: true },
});

export default mongoose.model('Note', noteSchema);
