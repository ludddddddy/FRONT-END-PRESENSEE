import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Alunos from "./pages/Alunos"
import Alertas from "./pages/Alertas"
import Frequencia from "./pages/Frequencia"
import Relatorios from "./pages/Relatorios"
import Turmas from "./pages/Turmas"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/alunos" element={<Alunos />} />

        <Route path="/login" element={<Login />} />

        <Route path="/Alertas" element={<Alertas />} />

        <Route path="/Turmas" element={<Turmas />} />

        <Route path="/Frequencia" element={<Frequencia />} />

        <Route path="/Relatorios" element={<Relatorios />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App