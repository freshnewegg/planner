// Require Mongoose
const mongoose = require('mongoose');
const shortid = require('shortid');

// Define a schema
const Schema = mongoose.Schema;

const PlanModelSchema = new Schema({
  city: String,
  date: Date,
  activities: Array,
  permalink: {
    type: String,
    default: shortid.generate,
  },
});

PlanModelSchema.index({ permalink: 1 });

// Compile model from schema
export default mongoose.model('PlanModel', PlanModelSchema);
