// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const FoodActivityModelSchema = new Schema({
  name: String,
  start_time: Date,
  end_time: Date,
  restaurant_type: String,
  food_type: String,
  price_range: String,
  address: String,
  avg_rating: String,
});

// Compile model from schema
const FoodActivityModel = mongoose.model(
  'FoodActivityModel',
  FoodActivityModelSchema,
);
