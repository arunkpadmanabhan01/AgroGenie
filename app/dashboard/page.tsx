"use client";

import { useRouter } from "next/navigation";
import { FaSeedling, FaFlask, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundColor: "#e8f5e9",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <button
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 24px",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontSize: "16px",
          fontWeight: "500",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#dc2626";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#ef4444";
          e.currentTarget.style.transform = "none";
        }}
      >
        <FaSignOutAlt /> Sign Out
      </button>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#2d3748",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          AgroGenie Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            padding: "20px",
          }}
        >
          {/* Crop Yield Prediction Card */}
          <div
            onClick={() => router.push("/dashboard/crop-prediction")}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <FaSeedling
              style={{
                fontSize: "48px",
                color: "#48bb78",
                marginBottom: "20px",
              }}
            />
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "12px",
              }}
            >
              Crop Yield Prediction
            </h2>
            <p
              style={{
                color: "#4a5568",
                lineHeight: "1.6",
              }}
            >
              Predict your crop yield based on various environmental factors and
              historical data
            </p>
          </div>

          {/* Fertilizer Recommendation Card */}
          <div
            onClick={() => router.push("/dashboard/fertilizer-recommendation")}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            <FaFlask
              style={{
                fontSize: "48px",
                color: "#4299e1",
                marginBottom: "20px",
              }}
            />
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#2d3748",
                marginBottom: "12px",
              }}
            >
              Fertilizer Recommendation
            </h2>
            <p
              style={{
                color: "#4a5568",
                lineHeight: "1.6",
              }}
            >
              Get personalized fertilizer recommendations based on soil
              conditions and crop type
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
