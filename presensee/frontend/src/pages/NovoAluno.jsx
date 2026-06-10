import DashboardLayout from "../layouts/DashboardLayout"
import "../styles/NovoAluno.css"

function NovoAluno(){

  return (

    <DashboardLayout>


      <h1>
        Cadastrar Aluno
      </h1>


      <form className="student-form">


        <input
          type="text"
          placeholder="Nome completo"
        />


        <input
          type="text"
          placeholder="Matrícula"
        />


        <input
          type="text"
          placeholder="Turma"
        />


        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="date"
        />


        <input
          type="file"
        />


        <button type="submit">

          Salvar Aluno

        </button>


      </form>


    </DashboardLayout>

  )

}


export default NovoAluno