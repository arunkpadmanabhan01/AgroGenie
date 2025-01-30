import { NextResponse } from "next/server";
import * as tf from "@tensorflow/tfjs-node";

// Load the model (you'll need to save your trained model in this format)
let model: tf.LayersModel | null = null;

async function loadModel() {
  if (!model) {
    try {
      // Update this path to where your model is stored
      model = await tf.loadLayersModel("file://./ml-models/crop-yield-model/model.json");
    } catch (error) {
      console.error("Error loading model:", error);
      throw new Error("Failed to load ML model");
    }
  }
  return model;
}

// Normalize input data (adjust these values based on your training data)
const normalizeInput = (data: any) => {
  const normalization = {
    nitrogen: { min: 0, max: 140 },
    phosphorus: { min: 5, max: 145 },
    potassium: { min: 5, max: 205 },
    temperature: { min: 8.83, max: 43.68 },
    humidity: { min: 14.26, max: 99.98 },
    ph: { min: 3.5, max: 9.94 },
    rainfall: { min: 20.21, max: 298.56 }
  };

  return [
    (data.nitrogen - normalization.nitrogen.min) / (normalization.nitrogen.max - normalization.nitrogen.min),
    (data.phosphorus - normalization.phosphorus.min) / (normalization.phosphorus.max - normalization.phosphorus.min),
    (data.potassium - normalization.potassium.min) / (normalization.potassium.max - normalization.potassium.min),
    (data.temperature - normalization.temperature.min) / (normalization.temperature.max - normalization.temperature.min),
    (data.humidity - normalization.humidity.min) / (normalization.humidity.max - normalization.humidity.min),
    (data.ph - normalization.ph.min) / (normalization.ph.max - normalization.ph.min),
    (data.rainfall - normalization.rainfall.min) / (normalization.rainfall.max - normalization.rainfall.min)
  ];
};

// Define crop labels (update based on your model's output classes)
const CROPS = [
  "rice", "wheat", "maize", "chickpea", "kidneybeans", "pigeonpeas",
  "mothbeans", "mungbean", "blackgram", "lentil", "pomegranate",
  "banana", "mango", "grapes", "watermelon", "muskmelon", "apple",
  "orange", "papaya", "coconut", "cotton", "jute", "coffee"
];

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const model = await loadModel();

    // Normalize the input data
    const normalizedInput = normalizeInput(data);
    
    // Convert to tensor and reshape for model input
    const inputTensor = tf.tensor2d([normalizedInput]);
    
    // Get model predictions
    const predictions = await model.predict(inputTensor) as tf.Tensor;
    const predictionData = await predictions.data();

    // Process predictions to get top crops
    const results = Array.from(predictionData)
      .map((confidence, index) => ({
        crop: CROPS[index],
        confidence,
        yield: calculateYield(confidence, data) // You'll need to implement this based on your model
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5); // Get top 5 predictions

    // Cleanup tensors
    inputTensor.dispose();
    predictions.dispose();

    return NextResponse.json({ predictions: results });
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to make prediction" },
      { status: 500 }
    );
  }
}

// Helper function to calculate yield (implement based on your model)
function calculateYield(confidence: number, inputData: any): number {
  // This is a placeholder - implement your yield calculation logic
  // You might want to use a separate model or formula for yield prediction
  const baseYield = 5.0; // Base yield in tons/hectare
  return baseYield * confidence;
} 