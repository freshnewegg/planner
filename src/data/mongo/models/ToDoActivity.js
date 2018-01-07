// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const ToDoActivityModelSchema = new Schema({
  name: String,
  start_time: Date,
  end_time: Date,
  activity_type: String,
  price_range: String,
  address: String,
  avg_rating: String,
});

// Compile model from schema
const ToDoActivityModel = mongoose.model(
  'ToDoActivityModel',
  ToDoActivityModelSchema,
);
