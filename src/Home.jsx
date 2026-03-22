import ash2 from '/ash2.png'
import ash3 from '/ash3.png'
import cole from '/cole.png'
import ata from '/ata.png'
import jensen from '/jensen.png'
import zach from '/zach.png'

export default function Home() {
  const team = [
    {name:'Ella Natter', role:'Team Lead', image: ash2},
    {name:'Zach Brown', role:'Systems Integration Lead', image: zach},
    {name:'Cole DenBleyker', role:'Communications Lead', image: cole},
    {name:'Jensen DeRosier', role:'Frontend Lead', image: jensen},
    {name:'Ash Franklin', role:'Backend Lead', image: ash3},
    {name:'Ata Noor', role:'Database Lead', image: ata},
  ]

  return (
    <div className="page-container">
      <section className="hero-section">
        <div className="hero-tag">// PROJECT OVERVIEW //</div>
        <h2 className="hero-title">Cognitive Work<br/>Analysis Tool</h2>
        <p className="hero-sub">An open-source platform for analyzing complex sociotechnical systems</p>
      </section>

      <section className="info-section">
        <h3 className="section-heading">
          {/*unicode marking for a little > shape */}
          <span className="heading-marker">&#x25B6;</span>
          The Project
        </h3>
        <p className="body-text">
          This project aims to develop an open-source software tool that supports Cognitive Work Analysis (CWA)
          across all six stages, enabling more efficient analysis of complex sociotechnical systems. CWA is a
          holistic, work-centered framework that examines the constraints that shape human-system interactions.
        </p>
        <p className="body-text">
          The software tool will automate the collection, storage, organization, and presentation of data
          required for each stage of CWA — ensuring outputs from each stage are directly usable as inputs to
          subsequent stages. Internal processes must remain tractable and verifiable.
        </p>
        <p className="body-text">
          The software adheres strictly to the established CWA framework as documented in the open literature,
          with Lintern (2009) as the primary reference. The final deliverable will be a fully functional,
          well-documented, open-source tool suitable for rigorous usability testing.
        </p>
      </section>

      <section className="team-section">
        <h3 className="section-heading">
          <span className="heading-marker">&#x25B6;</span>
          The Team
        </h3>
        <div className="team-grid">
          {team.map(({ name, role, image }) => (
            <div key={name} className="team-card">
              <div className="team-avatar">
                <img src={image} alt={name} className="team-avatar-img" />
              </div>
              <div className="team-info">
                <div className="team-name">{name}</div>
                <div className="team-role">{role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}