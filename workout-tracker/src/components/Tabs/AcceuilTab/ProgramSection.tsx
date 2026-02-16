import { useState, useEffect } from "react";
import { fetchRecords } from "../../../services/api";
import "../../../style/tabs/accueil/sectionsLayout.css";

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecords("programs").then(setPrograms);
  }, []);

  const filteredPrograms = programs.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="section programs-section">
      <div className="section-header">
        <div className="section-header-row">
            <h2>Programs</h2> 
            <button className="cta-btn">Create Program</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search programs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="cards-container">
        {filteredPrograms.map((program) => (
          <div className="card" key={program.id}>
            <h3>{program.name}</h3>
            <p>{program.Desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
