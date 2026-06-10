import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Alunos.css"
import { useNavigate } from "react-router-dom"

function Alunos() {
  const navigate = useNavigate()
  const alunos = [
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
  ]


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


        {alunos.map((aluno,index)=>(


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


              <button className="edit-button">
                Editar
              </button>


              <button className="delete-button">
                Excluir
              </button>


            </td>


          </tr>


        ))}


        </tbody>



      </table>


    </DashboardLayout>

  )
}


export default Alunos