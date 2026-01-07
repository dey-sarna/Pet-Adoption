
import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  
  useEffect(() => {
    const loadData = async () => {
      setError("");
      setInfo("");

      try {
      
        const res = await api.get("/adoptions/all");
        setApps(res.data || []);
      } catch (err) {
        console.error("Admin apps load failed:", err);
        const msg =
          err.response?.data?.message || "Failed to load applications";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

 
  const handleStatusChange = async (id, status) => {
    setError("");
    setInfo("");

    try {
      await api.put(`/adoptions/${id}`, { status });

      setInfo("Status updated");

      
      const res = await api.get("/adoptions/all");
      setApps(res.data || []);
    } catch (err) {
      console.error("Status update failed:", err);
      const msg = err.response?.data?.message || "Update failed";
      setError(msg);
    }
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading applications...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>📋 All Adoption Applications (Admin)</h2>

      {error && (
        <p style={{ marginTop: "10px", color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}
      {info && (
        <p style={{ marginTop: "10px", color: "green", fontWeight: "bold" }}>
          {info}
        </p>
      )}

      {apps.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <div>
          {apps.map((app) => (
            <div
              key={app.id}
              style={{ 
                marginTop: "15px",
                padding: "15px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <p>
                <b>Pet:</b> {app.pet_name}
              </p>
              <p>
                <b>User:</b> {app.user_name} ({app.user_email})
              </p>
              <p>
                <b>Status:</b> {app.status}
              </p>
              <p>
                <b>Applied At:</b>{" "}
                {app.applied_at
                  ? new Date(app.applied_at).toLocaleString()
                  : ""}
              </p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleStatusChange(app.id, "Approved")}
                  style={{
                    padding: "6px 12px",
                    marginRight: "8px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    background: "#4caf50",
                    color: "#fff",
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(app.id, "Rejected")}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    background: "#f44336",
                    color: "#fff",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;