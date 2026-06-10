import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Relatorios.css"

function Relatorios(){

  const dados = [

    {
      turma:"1º Ano A",
      frequencia:"92%",
      alunos:35
    },

    {
      turma:"2º Ano B",
      frequencia:"87%",
      alunos:32
    },

    {
      turma:"3º Ano A",
      frequencia:"78%",
      alunos:30
    }

  ]


  return (

    <DashboardLayout>


      <div className="page-header">

        <h1>
          Relatórios
        </h1>


        <button className="report-button">
          Gerar Relatório
        </button>


      </div>



      <div className="report-cards">


        <div className="report-card">

          <h3>
            Frequência Geral
          </h3>

          <p>
            87%
          </p>

        </div>



        <div className="report-card">

          <h3>
            Total de Alunos
          </h3>

          <p>
            120
          </p>

        </div>



        <div className="report-card">

          <h3>
            Alunos em risco
          </h3>

          <p>
            12
          </p>

        </div>


      </div>



      <div className="report-table-container">


        <h2>
          Frequência por Turma
        </h2>



        <table className="report-table">


          <thead>

            <tr>

              <th>
                Turma
              </th>

              <th>
                Alunos
              </th>

              <th>
                Frequência
              </th>


            </tr>


          </thead>



          <tbody>


          {
            dados.map((item,index)=>(


              <tr key={index}>


                <td>
                  {item.turma}
                </td>


                <td>
                  {item.alunos}
                </td>


                <td>
                  {item.frequencia}
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


export default Relatorios