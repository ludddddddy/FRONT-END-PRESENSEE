import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../styles/Login.css"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")


  async function handleLogin(e) {

    e.preventDefault()

    if (email === "" || senha === "") {

      setErro("Preencha todos os campos")

      return

    }

    try {

      const response = await api.post("/auth/login", {

        email: email,
        senha: senha

      })

      localStorage.setItem(
        "token",
        response.data.token
      )

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      )

      navigate("/dashboard")

    }

    catch (error) {

      console.log(error)

      setErro("Email ou senha inválidos")

    }

  }


  function handleDemoLogin() {

    localStorage.setItem(
      "token",
      "demo-token"
    )

    localStorage.setItem(
      "usuario",
      JSON.stringify({
        nome: "Usuário de demonstração",
        perfil: "secretaria"
      })
    )

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

          <h2>
            Entrar
          </h2>


          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />


            <p
              className="show-password"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha
                ? "Ocultar senha"
                : "Mostrar senha"
              }
            </p>


            {
              erro && (

                <p className="error-message">
                  {erro}
                </p>

              )
            }


            <button type="submit">
              Entrar
            </button>


            <button
              type="button"
              className="demo-button"
              onClick={handleDemoLogin}
            >
              Entrar em modo demonstração
            </button>


            <p className="forgot-password">
              Esqueci minha senha
            </p>


            <p className="login-info">
              Contas disponibilizadas pela administração escolar.
            </p>

          </form>

        </div>

      </div>

    </div>

  )

}

export default Login