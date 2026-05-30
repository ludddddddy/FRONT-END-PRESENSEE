import DashboardLayout from "../layouts/DashboardLayout"

function Alunos() {

  return (
    <DashboardLayout>

      <div className="page-header">
        <h1>Alunos</h1>

        <button className="add-button">
          + Novo Aluno
        </button>
      </div>

      <table className="students-table">

        <thead>
          <tr>
            <th>Nome</th>
            <th>Turma</th>
            <th>Situação</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>Gabriel Soares</td>
            <td>1º Ano A</td>
            <td>Ativo</td>
          </tr>

          <tr>
            <td>Pedro Henrique</td>
            <td>2º Ano B</td>
            <td>Ativo</td>
          </tr>

          <tr>
            <td>Miguel Augusto</td>
            <td>3º Ano A</td>
            <td>Em risco</td>
          </tr>

        </tbody>

      </table>

    </DashboardLayout>
  )
}

export default Alunos