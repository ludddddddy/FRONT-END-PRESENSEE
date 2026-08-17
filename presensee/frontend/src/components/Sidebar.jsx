import { NavLink, useNavigate } from "react-router-dom"
import { logout } from "../services/auth"

function Sidebar() {

  const navigate = useNavigate()


  function handleLogout() {

    logout()

    navigate("/login")

  }


  return (

    <div className="sidebar">

      <h2 className="logo">
        PresenSee
      </h2>


      <ul className="menu">

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            📊 Dashboard
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/alunos"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            👨‍🎓 Alunos
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/novo-aluno"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            ➕ Cadastrar Aluno
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/turmas"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            🏫 Turmas
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/frequencia"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            📅 Frequência
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/alertas"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            ⚠️ Alertas
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/relatorios"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            📑 Relatórios
          </NavLink>
        </li>

      </ul>


      <button
        className="logout-button"
        onClick={handleLogout}
      >
        🚪 Sair
      </button>

    </div>

  )

}

export default Sidebar