
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const PetDetails = () => {
  const { id } = useParams();         
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    api
      .get(`/pets/${id}`)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!pet) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "40px", backgroundColor: "#ffe6f0", minHeight: "100vh" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 14px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "14px",
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        }}
      >
        {pet.image_url && (
          <img
            src={pet.image_url}
            alt={pet.name}
            style={{ width: "100%", borderRadius: "10px", marginBottom: "20px" }}
          />
        )}

        <h2>{pet.name}</h2>
        <p><b>Breed:</b> {pet.breed}</p>
        <p><b>Age:</b> {pet.age} years</p>
        <p><b>Gender:</b> {pet.gender}</p>
        <p><b>Status:</b> {pet.status}</p>
        <p><b>Description:</b> {pet.description}</p>

        <button
          onClick={() => navigate(`/adoption-form/${pet.id}`)}   
          style={{
            marginTop: "20px",
            padding: "10px 18px",
            background: "#ff69b4",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          💌 Apply for Adoption
        </button>
      </div>
    </div>
  );
};

export default PetDetails;