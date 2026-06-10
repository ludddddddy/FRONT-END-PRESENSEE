import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Turmas.css"

function Turmas() {


  const turmas = [

    {
      nome: "1º Ano A",
      curso: "Ensino Médio",
      alunos: 35,
      turno: "Manhã"
    },


    {
      nome: "2º Ano B",
      curso: "Ensino Médio",
      alunos: 32,
      turno: "Tarde"
    },


    {
      nome: "3º Ano A",
      curso: "Ensino Médio",
      alunos: 30,
      turno: "Manhã"
    }

  ]


  return (

    <DashboardLayout>


      <div className="page-header">


        <h1>
          Turmas
        </h1>


        <button className="add-button">

          + Nova Turma

        </button>


      </div>




      <table className="classes-table">


        <thead>

          <tr>

            <th>
              Turma
            </th>


            <th>
              Curso
            </th>


            <th>
              Alunos
            </th>


            <th>
              Turno
            </th>


            <th>
              Ações
            </th>


          </tr>


        </thead>



        <tbody>


        {
          turmas.map((turma,index)=>(


            <tr key={index}>


              <td>
                {turma.nome}
              </td>


              <td>
                {turma.curso}
              </td>


              <td>
                {turma.alunos}
              </td>


              <td>
                {turma.turno}
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


          ))
        }


        </tbody>


      </table>



    </DashboardLayout>

  )

}


export default Turmas