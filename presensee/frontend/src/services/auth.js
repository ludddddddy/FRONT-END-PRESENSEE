export function getToken() {
  return localStorage.getItem("token")
}


export function getUsuario() {

  const usuario = localStorage.getItem("usuario")

  if (!usuario) {
    return null
  }

  try {
    return JSON.parse(usuario)
  } catch (error) {

    console.log("Erro ao ler usuário:", error)

    return null

  }

}


export function isAuthenticated() {
  return !!getToken()
}


export function logout() {

  localStorage.removeItem("token")
  localStorage.removeItem("usuario")

}