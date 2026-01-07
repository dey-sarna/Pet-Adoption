import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/applications.css";

export default function Applications() {
 
  const applications = [
    {
      id: 1,
      petName: "Bella",
      status: "Approved",
      appliedOn: "2025-12-05",
    },
    {
      id: 2,
      petName: "Milo",
      status: "Pending",
      appliedOn: "2025-12-08",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="applications-page">
        <h2>Your Adoption Applications 💖</h2>
        <div className="applications-list">
          {applications.map((app) => (
            <div className="application-card" key={app.id}>
              <p><strong>Pet Name:</strong> {app.petName}</p>
              <p><strong>Status:</strong> {app.status}</p>
              <p><strong>Applied On:</strong> {app.appliedOn}</p>
              <button className="view-btn">View Details</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
