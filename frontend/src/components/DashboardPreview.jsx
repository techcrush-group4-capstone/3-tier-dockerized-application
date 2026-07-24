import "../styles/dashboard.css";
function DashboardPreview() {
  return (
    <section className="dashboard-preview">
      <h2>Platform Overview</h2>

      <div className="cards">

        <div className="card">
          <h3>Total Forms</h3>
          <p>34</p>
        </div>

        <div className="card">
          <h3>Responses</h3>
          <p>214</p>
        </div>

        <div className="card">
          <h3>System Status</h3>
          <p>Healthy ✅</p>
        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;