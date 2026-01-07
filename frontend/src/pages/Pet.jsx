
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Pet = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/pets")
      .then((res) => {
        setPets(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load pets:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#ffe6f0",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>🐾 Available Pets</h2>

      {pets.length === 0 ? (
        <p>No pets available right now.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {pets.map((pet) => {
            // DB te jodi status null thake, tahole default "Available"
            const statusText = pet.status || "Available";

            return (
              <div
                key={pet.id}
                style={{
                  background: "#e39eb8ff",
                  borderRadius: "14px",
                  padding: "18px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: "16px" }}>
                  {pet.image_url && (
                    <img
                      src={pet.image_url}
                      alt={pet.name}
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "12px",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <div>
                    <h3 style={{ margin: "0 0 6px 0" }}>{pet.name}</h3>
                    <p style={{ margin: "2px 0" }}>
                      <b>Breed:</b> {pet.breed}
                    </p>
                    <p style={{ margin: "2px 0" }}>
                      <b>Age:</b> {pet.age} years
                    </p>
                    <p style={{ margin: "2px 0" }}>
                      <b>Status:</b> {statusText}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/pets/${pet.id}`)}
                  style={{
                    marginTop: "14px",
                    alignSelf: "flex-end",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    background: "#ff69b4",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  View details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pet;