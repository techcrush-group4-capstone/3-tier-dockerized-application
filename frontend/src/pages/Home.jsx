import "../styles/home.css";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Automate Your Forms with Confidence</h1>

        <p>
          FormFlow is a modern form management platform built
          using React, Node.js, PostgreSQL, Docker, and GitHub Actions.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>

          <button className="secondary-btn">Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default Home;