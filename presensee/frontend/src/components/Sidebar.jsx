import { NavLink } from "react-router-dom"

function Sidebar() {

  return (

    <div className="sidebar">


      <h2 className="logo">
        PresenSee
      </h2>


      <ul className="menu">


        <li>
          <NavLink to="/dashboard">
            📊 Dashboard
          </NavLink>
        </li>


        <li>
          <NavLink to="/alunos">
            👨‍🎓 Alunos
          </NavLink>
        </li>


        <li>
          <NavLink to="/novo-aluno">
            ➕ Cadastrar Aluno
          </NavLink>
        </li>


        <li>
          <NavLink to="/turmas">
            🏫 Turmas
          </NavLink>
        </li>


        <li>
          <NavLink to="/frequencia">
            📅 Frequência
          </NavLink>
        </li>


        <li>
          <NavLink to="/alertas">
            ⚠️ Alertas
          </NavLink>
        </li>


        <li>
          <NavLink to="/relatorios">
            📑 Relatórios
          </NavLink>
        </li>

        <li>
            🚪 Sair
        </li>


      </ul>


    </div>

  )

}


export default Sidebar