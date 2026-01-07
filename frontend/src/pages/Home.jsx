import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="home-hero">
        <div className="hero-content">
          <h1>Adopt a Friend, Change a Life 🐾</h1>
          <p>
            Give a homeless pet a loving forever home. Browse hundreds of
            cute, loving companions waiting just for you.
          </p>
          <a href="/pets" className="explore-btn">
            Explore Pets
          </a>
        </div>
        <div className="hero-image">
          <img src="/Pet.jpg" alt="Pet" />
        </div>
      </section>

      <section className="home-how">
        <h2>How It Works</h2>
        <div className="how-cards">
          <div className="how-card">
            <h3>1. Browse Pets</h3>
            <p>Explore hundreds of pets categorized by breed, age, and type.</p>
          </div>
          <div className="how-card">
            <h3>2. Apply for Adoption</h3>
            <p>Fill out an easy adoption form and submit required documents.</p>
          </div>
          <div className="how-card">
            <h3>3. Take Home Your Friend</h3>
            <p>Once approved, adopt your new furry friend and start a new journey!</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
