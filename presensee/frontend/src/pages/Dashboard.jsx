import DashboardLayout from "../layouts/DashboardLayout"
import { useEffect, useState } from "react"
import api from "../services/api"
import { getUsuario, getToken } from "../services/auth"


function Dashboard() {

  const [dados, setDados] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  const alertas = [
    {
      aluno: "Gabriel Soares",
      motivo: "4 faltas consecutivas"
    },

    {
      aluno: "Pedro Henrique",
      motivo: "27% de faltas"
    },

    {
      aluno: "Miguel Augusto",
      motivo: "Risco de evasão escolar"
    }
  ]

  


  useEffect(() => {

    setUsuario(getUsuario())
  

  }, [])


useEffect(() => {

  const token = getToken()


  if (token === "demo-token") {

    setDados({
      totalAlunos: 120,
      alunosRisco: 12,
      taxaFrequenciaGeral: 87,
      alertasAbertos: 5
    })

    setCarregando(false)

    return
  }


  api.get("/dashboard/resumo")

    .then(response => {

      setDados(response.data)

      setCarregando(false)

    })

    .catch(error => {

      console.log(error)

      setErro("Não foi possível carregar os dados do dashboard.")

      setCarregando(false)

    })

}, [])


  if (carregando) {

    return (
      <DashboardLayout>

        <p>
          Carregando dashboard...
        </p>

      </DashboardLayout>
    )

  }

  if (erro) {

  return (
    <DashboardLayout>

      <div className="dashboard-error">

        ⚠️ {erro}

      </div>

    </DashboardLayout>
  )

}


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

          <strong>
            {usuario?.nome}
          </strong>

          <span>
            {usuario?.perfil}
          </span>

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


       {
       alertas.map((alerta, index) => (

    <div
      className="alert-item"
      key={index}
    >

      ⚠️ {alerta.aluno} — {alerta.motivo}

    </div>

  ))
}

      </div>


    </DashboardLayout>

  )

}

export default Dashboard