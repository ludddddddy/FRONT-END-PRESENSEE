import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "../styles/Login.css"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  function handleLogin(e) {

    e.preventDefault()

    console.log(email)
    console.log(senha)

    navigate("/dashboard")
  }

  return (

    <div className="login-container">

      <div className="left-side">

        <h1>
          Presen<span>See</span>
        </h1>

        <p>
          Sistema inteligente de monitoramento escolar
        </p>

      </div>

      <div className="right-side">

        <div className="login-card">

          <h2>Entrar</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit">
              Entrar
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Login