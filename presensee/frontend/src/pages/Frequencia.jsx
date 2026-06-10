import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Frequencia.css"

function Frequencia(){

  const alunos = [

    {
      nome:"Gabriel Soares",
      presente:true
    },

    {
      nome:"Pedro Henrique",
      presente:false
    },

    {
      nome:"Miguel Augusto",
      presente:true
    }

  ]


  return (

    <DashboardLayout>


      <div className="page-header">

        <h1>
          Frequência
        </h1>


        <button className="save-button">
          Salvar Frequência
        </button>


      </div>



      <div className="frequency-card">


        <h2>
          Turma: 1º Ano A
        </h2>


        <p>
          Data: 10/06/2026
        </p>



        <table className="frequency-table">


          <thead>

            <tr>

              <th>
                Aluno
              </th>


              <th>
                Presença
              </th>


            </tr>

          </thead>



          <tbody>


          {
            alunos.map((aluno,index)=>(

              <tr key={index}>


                <td>
                  {aluno.nome}
                </td>



                <td>


                  <input
                    type="checkbox"
                    defaultChecked={aluno.presente}
                  />

                  Presente


                </td>


              </tr>


            ))
          }


          </tbody>



        </table>



      </div>



    </DashboardLayout>

  )

}


export default Frequencia