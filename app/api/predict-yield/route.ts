import { NextResponse } from "next/server";

// Temporary mock data for testing the UI
const MOCK_PREDICTIONS = [
  {
    crop: "Rice",
    confidence: 0.85,
    yield: 4.2,
  },
  {
    crop: "Wheat",
    confidence: 0.75,
    yield: 3.8,
  },
  {
    crop: "Maize",
    confidence: 0.65,
    yield: 5.1,
  }
];

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Return mock predictions for now
    return NextResponse.json({ 
      predictions: MOCK_PREDICTIONS 
    });

  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to make prediction" },
      { status: 500 }
    );
  }
} 