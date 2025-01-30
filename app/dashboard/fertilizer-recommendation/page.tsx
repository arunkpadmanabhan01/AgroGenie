"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function FertilizerRecommendation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Add your recommendation logic here
    setLoading(false);
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
            backgroundColor: "#4299e1",
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
            e.currentTarget.style.backgroundColor = "#357abd";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#4299e1";
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
            Fertilizer Recommendation
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "20px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Soil pH
                </label>
                <input
                  type="number"
                  required
                  name="ph"
                  min="0"
                  max="14"
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
                  Nitrogen Content (%)
                </label>
                <input
                  type="number"
                  required
                  name="nitrogen"
                  min="0"
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
                  Phosphorus Content (%)
                </label>
                <input
                  type="number"
                  required
                  name="phosphorus"
                  min="0"
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
                  Potassium Content (%)
                </label>
                <input
                  type="number"
                  required
                  name="potassium"
                  min="0"
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
                  Crop Type
                </label>
                <select
                  required
                  name="cropType"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select crop type</option>
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="maize">Maize</option>
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#4a5568",
                  }}
                >
                  Soil Type
                </label>
                <select
                  required
                  name="soilType"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  }}
                >
                  <option value="">Select soil type</option>
                  <option value="loamy">Loamy</option>
                  <option value="sandy">Sandy</option>
                  <option value="clay">Clay</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px",
                backgroundColor: "#4299e1",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Analyzing..." : "Get Recommendation"}
            </button>
          </form>

          {recommendation && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                backgroundColor: "#ebf8ff",
                borderRadius: "4px",
                borderLeft: "4px solid #4299e1",
              }}
            >
              <h3 style={{ color: "#2c5282", marginBottom: "8px" }}>
                Recommended Fertilizer
              </h3>
              <p style={{ color: "#2d3748" }}>{recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
