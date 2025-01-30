"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface PredictionResult {
  crop: string;
  yield: number;
  confidence: number;
}

export default function CropPrediction() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/predict-yield", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nitrogen: formData.get("nitrogen"),
          phosphorus: formData.get("phosphorus"),
          potassium: formData.get("potassium"),
          temperature: formData.get("temperature"),
          humidity: formData.get("humidity"),
          ph: formData.get("ph"),
          rainfall: formData.get("rainfall"),
          location: formData.get("location"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.predictions);
      }
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#e8f5e9",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
            padding: "12px 20px",
            backgroundColor: "#48bb78",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            fontSize: "16px",
            fontWeight: "500",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#3da066";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#48bb78";
          }}
        >
          <FaArrowLeft /> Back to Dashboard
        </button>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2d3748",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Crop Yield Prediction
          </h1>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              {/* Soil Nutrients */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Nitrogen (N) mg/kg
                </label>
                <input
                  type="number"
                  name="nitrogen"
                  required
                  step="0.01"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Phosphorus (P) mg/kg
                </label>
                <input
                  type="number"
                  name="phosphorus"
                  required
                  step="0.01"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Potassium (K) mg/kg
                </label>
                <input
                  type="number"
                  name="potassium"
                  required
                  step="0.01"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              {/* Environmental Factors */}
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  name="temperature"
                  required
                  step="0.1"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Humidity (%)
                </label>
                <input
                  type="number"
                  name="humidity"
                  required
                  min="0"
                  max="100"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  pH Level
                </label>
                <input
                  type="number"
                  name="ph"
                  required
                  step="0.1"
                  min="0"
                  max="14"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Rainfall (mm)
                </label>
                <input
                  type="number"
                  name="rainfall"
                  required
                  step="0.1"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Location/Region
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#48bb78",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Predicting..." : "Predict Yield"}
            </button>
          </form>

          {results.length > 0 && (
            <div
              style={{
                marginTop: "24px",
                padding: "20px",
                backgroundColor: "#f0fff4",
                borderRadius: "8px",
                border: "1px solid #48bb78",
              }}
            >
              <h3
                style={{
                  color: "#2f855a",
                  marginBottom: "16px",
                  fontSize: "18px",
                }}
              >
                Predicted Yields
              </h3>
              <div style={{ display: "grid", gap: "12px" }}>
                {results.map((result, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div style={{ fontWeight: "500", color: "#2d3748" }}>
                      {result.crop}
                    </div>
                    <div style={{ color: "#4a5568" }}>
                      Predicted Yield: {result.yield.toFixed(2)} tons/hectare
                    </div>
                    <div style={{ color: "#718096", fontSize: "0.875rem" }}>
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
