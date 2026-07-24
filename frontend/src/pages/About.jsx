function About() {
  return (
    <div className="page-container">
      <h1>About Us</h1>

      <p>
        Group4 modern web-based Form Management System designed to
        simplify the creation, management, and tracking of digital forms.
      </p>

      <br />

      <p>
        This application is built as a Dockerized 3-Tier Architecture using:
      </p>

      <ul>
        <li>⚛️ React.js (Frontend)</li>
        <li>🟢 Node.js & Express.js (Backend API)</li>
        <li>🐘 PostgreSQL (Database)</li>
        <li>🐳 Docker & Docker Compose</li>
        <li>⚙️ GitHub Actions for CI/CD</li>
      </ul>

      <br />

      <p>
        Dockerized-3Tier-APP deployed using DevOps best
        practices.
      </p>
    </div>
  );
}

export default About;