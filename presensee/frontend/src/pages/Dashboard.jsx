import DashboardLayout from "../layouts/DashboardLayout"
import { useEffect, useState } from "react"
import api from "../services/api"

function Dashboard() {
  const [dados,setDados] = useState(null)


useEffect(()=>{

api.get("/dashboard/resumo")

.then(response=>{

setDados(response.data)

})

.catch(error=>{

console.log(error)

})

},[])
  return (
    <DashboardLayout>


      <div className="dashboard-header">

        <div>

          <h1>
            Dashboard
          </h1>

          <p>
            Bem-vindo ao PresenSee
          </p>

        </div>


        <div className="user-info">

          Secretaria

        </div>


      </div>



      <div className="system-status">

        <p>
          🟢 Reconhecimento facial online
        </p>

      </div>




      <div className="cards-container">


        <div className="card">

          <h3>
            Alunos cadastrados
          </h3>

          <p>
            {dados?.totalAlunos}
          </p>
        </div>



        <div className="card">

          <h3>
            Alunos em risco
          </h3>

          <p>
            {dados?.alunosRisco}
          </p>

        </div>



        <div className="card">

          <h3>
            Frequência Média
          </h3>

          <p>
            {dados?.taxaFrequenciaGeral}%
          </p>

        </div>



        <div className="card">

          <h3>
            Alertas Ativos
          </h3>

          <p>
            {dados?.alertasAbertos}
          </p>

        </div>


      </div>




      <div className="alerts-section">


        <h2>
          Últimos Alertas
        </h2>



        <div className="alert-item">

          ⚠️ Gabriel Soares atingiu 4 faltas consecutivas

        </div>



        <div className="alert-item">

          ⚠️ Pedro Henrique está com 27% de faltas

        </div>



        <div className="alert-item">

          ⚠️ Miguel Augusto está com risco de evasão

        </div>


      </div>



    </DashboardLayout>
  )
}

export default Dashboard