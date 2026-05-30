import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Alunos from "./pages/Alunos"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/alunos" element={<Alunos />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App