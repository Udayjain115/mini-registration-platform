const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
console.log('connecting to', url);

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.date = returnedObject.date.toISOString().split('T')[0];
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Event', eventSchema);
