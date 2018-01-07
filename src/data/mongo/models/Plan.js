// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const PlanModelSchema = new Schema({
  city: String,
  date: Date,
  permalink: String,
  foodActivityId: [Schema.Types.ObjectId],
  eventActivityId: [Schema.Types.ObjectId],
});

// Compile model from schema
const PlanModel = mongoose.model('PlanModel', PlanModelSchema);
