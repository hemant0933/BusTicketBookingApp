import mongoose from 'mongoose';

const BusSchema = new mongoose.Schema({
  source: String,
  destination: String,
  date: String,
  arrivalTime: String,
  departureTime: String,
  busName: String,
  busId: String,
});

const Bus = mongoose.model('Bus', BusSchema);

export default Bus;