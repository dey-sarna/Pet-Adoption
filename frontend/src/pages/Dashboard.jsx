
import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/adoptions/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApplications(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load applications:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#ffe6f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Loading your applications...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffe6f0",
        padding: "60px 16px",
      }}
    >
      {/* Centered container */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            marginBottom: "24px",
            textAlign: "left",
            fontSize: "26px",
            fontWeight: "700",
          }}
        >
          📄 My Adoption Applications
        </h2>

        {applications.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: "4px" }}>No applications found</p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Go to <b>Available Pets</b> and apply for adoption to see them
              here.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {applications.map((app) => {
              const petId = app.pet_id ?? app.petId ?? app.petID;
              const appliedAtRaw = app.applied_at ?? app.appliedAt;
              const appliedAt = appliedAtRaw
                ? new Date(appliedAtRaw).toLocaleString()
                : "";

              return (
                <div
                  key={app.id}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "18px 22px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  
                  {app.image_url && (
                    <img
                      src={app.image_url}
                      alt={app.pet_name || "Pet"}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  )}

                  <div>
                    <p style={{ margin: "4px 0" }}>
                      <b>Pet ID:</b> {petId}
                    </p>
                    {app.pet_name && (
                      <p style={{ margin: "4px 0" }}>
                        <b>Pet Name:</b> {app.pet_name}
                      </p>
                    )}
                    <p style={{ margin: "4px 0" }}>
                      <b>Status:</b> {app.status}
                    </p>
                    {appliedAt && (
                      <p style={{ margin: "4px 0" }}>
                        <b>Applied At:</b> {appliedAt}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;