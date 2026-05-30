import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">

      <h2 className="logo">
        PresenSee
      </h2>

      <ul className="menu">

        <li>
          <Link to="/dashboard">
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/alunos">
            👨‍🎓 Alunos
          </Link>
        </li>

        <li>
          <Link to="/turmas">
            🏫 Turmas
          </Link>
        </li>

        <li>
          <Link to="/frequencia">
            📅 Frequência
          </Link>
        </li>

        <li>
          <Link to="/alertas">
            ⚠️ Alertas
          </Link>
        </li>

        <li>
          <Link to="/relatorios">
            📑 Relatórios
          </Link>
        </li>

      </ul>

    </div>
  )
}

export default Sidebar