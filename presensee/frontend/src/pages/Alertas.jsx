import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/Alertas.css"

function Alertas(){


  const alertas = [

    {
      aluno:"Gabriel Soares",
      motivo:"4 faltas consecutivas",
      nivel:"Alto"
    },


    {
      aluno:"Pedro Henrique",
      motivo:"27% de faltas",
      nivel:"Médio"
    },


    {
      aluno:"Miguel Augusto",
      motivo:"Risco de evasão escolar",
      nivel:"Alto"
    }

  ]


  return (

    <DashboardLayout>


      <div className="page-header">

        <h1>
          Alertas
        </h1>


      </div>



      <div className="alerts-container">


      {
        alertas.map((alerta,index)=>(


          <div 
          className="alert-card"
          key={index}
          >


            <div>

              <h3>
                {alerta.aluno}
              </h3>


              <p>
                {alerta.motivo}
              </p>


            </div>



            <span className={
              alerta.nivel === "Alto"
              ? "high"
              : "medium"
            }>


              {alerta.nivel}


            </span>


          </div>


        ))
      }


      </div>



    </DashboardLayout>

  )

}


export default Alertas