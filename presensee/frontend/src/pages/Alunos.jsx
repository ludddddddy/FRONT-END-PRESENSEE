import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Alunos.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Alunos() {

  const navigate = useNavigate()


  const [alunos, setAlunos] = useState([
    {
      nome: "Gabriel Soares",
      matricula: "001",
      turma: "1º Ano A",
      situacao: "Ativo"
    },

    {
      nome: "Pedro Henrique",
      matricula: "002",
      turma: "2º Ano B",
      situacao: "Ativo"
    },

    {
      nome: "Miguel Augusto",
      matricula: "003",
      turma: "3º Ano A",
      situacao: "Em risco"
    }
  ])


  const [alunoEditando, setAlunoEditando] = useState(null)


  function editarAluno(aluno) {

    setAlunoEditando(aluno)

  }


  function salvarEdicao() {

    setAlunos(

      alunos.map((aluno) => {

        if (aluno.matricula === alunoEditando.matricula) {

          return alunoEditando

        }

        return aluno

      })

    )

    setAlunoEditando(null)

  }

  function excluirAluno(matricula) {

  const confirmar = window.confirm(
    "Tem certeza que deseja excluir este aluno?"
  )

  if (!confirmar) {
    return
  }

  setAlunos(
    alunos.filter((aluno) => aluno.matricula !== matricula)
  )

}

  return (

    <DashboardLayout>


      <div className="page-header">

        <h1>
          Alunos
        </h1>


        <button
          className="add-button"
          onClick={() => navigate("/novo-aluno")}
        >

          + Novo Aluno

        </button>


      </div>


      {
        alunoEditando && (

          <div className="edit-form">

            <h2>
              Editar aluno
            </h2>


            <input
              type="text"
              value={alunoEditando.nome}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  nome: e.target.value
                })
              }
            />


            <input
              type="text"
              value={alunoEditando.matricula}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  matricula: e.target.value
                })
              }
            />


            <input
              type="text"
              value={alunoEditando.turma}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  turma: e.target.value
                })
              }
            />


            <select
              value={alunoEditando.situacao}
              onChange={(e) =>
                setAlunoEditando({
                  ...alunoEditando,
                  situacao: e.target.value
                })
              }
            >

              <option value="Ativo">
                Ativo
              </option>

              <option value="Em risco">
                Em risco
              </option>

            </select>


            <button
              className="save-button"
              onClick={salvarEdicao}
            >

              Salvar

            </button>


            <button
              className="cancel-button"
              onClick={() => setAlunoEditando(null)}
            >

              Cancelar

            </button>


          </div>

        )
      }


      <table className="students-table">


        <thead>

          <tr>

            <th>
              Nome
            </th>

            <th>
              Matrícula
            </th>

            <th>
              Turma
            </th>

            <th>
              Situação
            </th>

            <th>
              Ações
            </th>

          </tr>

        </thead>


        <tbody>

          {
            alunos.map((aluno, index) => (

              <tr key={index}>

                <td>
                  {aluno.nome}
                </td>

                <td>
                  {aluno.matricula}
                </td>

                <td>
                  {aluno.turma}
                </td>

                <td>
                  {aluno.situacao}
                </td>

                <td>

                  <button
                    className="edit-button"
                    onClick={() => editarAluno(aluno)}
                  >

                    Editar

                  </button>


                  <button
                    className="delete-button"
                   onClick={() => excluirAluno(aluno.matricula)}
                  >

                    Excluir

                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>


      </table>


    </DashboardLayout>

  )

}


export default Alunos