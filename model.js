import mongoose from 'mongoose';

const InfoSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  vacancy: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  note: String,
});

export default mongoose.model('Info', InfoSchema);
