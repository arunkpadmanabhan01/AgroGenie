import mongoose from 'mongoose';

const PredictionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  inputs: {
    soil_ph: Number,
    rainfall: Number,
    temperatures: [Number],
    season: String
  },
  predictions: [{
    crop_name: String,
    predicted_yield: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Prediction || mongoose.model('Prediction', PredictionSchema); 