
import { useMemo, useState } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import {
  alunos,
  intervencoes,
  TIPOS_INTERVENCAO,
  formatarData,
  dataHoje,
} from "../data/diarioMock"
import "../styles/Intervencao.css"

function Intervencao() {
  const [registros, setRegistros] = useState(intervencoes)
  const [busca, setBusca] = useState("")
  const [tipoSelecionado, setTipoSelecionado] = useState("Todos")
  const [modalAberto, setModalAberto] = useState(false)

  const [alunoId, setAlunoId] = useState("")
  const [tipo, setTipo] = useState(TIPOS_INTERVENCAO[0])
  const [data, setData] = useState(dataHoje())
  const [descricao, setDescricao] = useState("")
  const [erro, setErro] = useState("")

  const listaFiltrada = useMemo(() => {
    return registros
      .filter((item) => {
        const aluno = alunos.find((a) => a.id === item.alunoId)
        const nome = aluno?.nome || "Aluno não encontrado"

        const correspondeBusca = nome
          .toLowerCase()
          .includes(busca.toLowerCase().trim())

        const correspondeTipo =
          tipoSelecionado === "Todos" || item.tipo === tipoSelecionado

        return correspondeBusca && correspondeTipo
      })
      .sort((a, b) => b.data.localeCompare(a.data))
  }, [registros, busca, tipoSelecionado])

  function abrirModal() {
    setAlunoId("")
    setTipo(TIPOS_INTERVENCAO[0])
    setData(dataHoje())
    setDescricao("")
    setErro("")
    setModalAberto(true)
  }

  function salvarIntervencao(e) {
    e.preventDefault()

    if (!alunoId || !tipo || !data || !descricao.trim()) {
      setErro("Preencha todos os campos para continuar.")
      return
    }

    const novaIntervencao = {
      id: Date.now(),
      alunoId: Number(alunoId),
      tipo,
      data,
      descricao: descricao.trim(),
    }

    setRegistros((anterior) => [novaIntervencao, ...anterior])
    setBusca("")
    setTipoSelecionado("Todos")
    setModalAberto(false)
  }

  function iniciais(nome) {
    return nome
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join("")
      .toUpperCase()
  }

  function classeTipo(tipoIntervencao) {
    if (tipoIntervencao === "Conversa Individual") return "conversa"
    if (tipoIntervencao === "Contato com responsável") return "responsavel"
    return "encaminhamento"
  }

  return (
    <DashboardLayout>
      <main className="intervencao-page">
        <header className="intervencao-header">
          <div>
            <h1>Intervenções</h1>
            <p>
              Registre ações, consulte o histórico e acompanhe os alunos.
            </p>
          </div>

          <button
            type="button"
            className="intervencao-botao-principal"
            onClick={abrirModal}
          >
            <span aria-hidden="true">+</span>
            Nova intervenção
          </button>
        </header>

        <section className="intervencao-resumo">
          <article className="intervencao-card">
            <div className="intervencao-card-topo">
              <span>Total de registros</span>
              <span className="intervencao-icone">▤</span>
            </div>
            <strong>{registros.length}</strong>
            <small>Intervenções cadastradas nesta sessão</small>
          </article>

          <article className="intervencao-card">
            <div className="intervencao-card-topo">
              <span>Tipos disponíveis</span>
              <span className="intervencao-icone">◎</span>
            </div>
            <strong>{TIPOS_INTERVENCAO.length}</strong>
            <small>Modalidades de acompanhamento</small>
          </article>

          <article className="intervencao-card">
            <div className="intervencao-card-topo">
              <span>Registros encontrados</span>
              <span className="intervencao-icone">⌕</span>
            </div>
            <strong>{listaFiltrada.length}</strong>
            <small>De acordo com a busca e os filtros</small>
          </article>
        </section>

        <section className="intervencao-lista-card">
          <div className="intervencao-lista-cabecalho">
            <div>
              <h2>Registros de intervenção</h2>
              <p>Consulte as ações realizadas com cada aluno.</p>
            </div>
            <span className="intervencao-contador">
              {listaFiltrada.length}{" "}
              {listaFiltrada.length === 1 ? "registro" : "registros"}
            </span>
          </div>

          <div className="intervencao-filtros">
            <label className="intervencao-busca">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Buscar pelo nome do aluno..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                aria-label="Buscar pelo nome do aluno"
              />
            </label>

            <select
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
              aria-label="Filtrar por tipo de intervenção"
            >
              <option value="Todos">Todos os tipos</option>
              {TIPOS_INTERVENCAO.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>

          {listaFiltrada.length > 0 ? (
            <div className="intervencao-lista">
              {listaFiltrada.map((item) => {
                const aluno = alunos.find((a) => a.id === item.alunoId)
                const nome = aluno?.nome || "Aluno não encontrado"

                return (
                  <article className="intervencao-item" key={item.id}>
                    <div className="intervencao-avatar" aria-hidden="true">
                      {iniciais(nome)}
                    </div>

                    <div className="intervencao-item-info">
                      <div className="intervencao-aluno-linha">
                        <h3>{nome}</h3>
                        <span className="intervencao-turma">
                          {aluno?.turma || "Turma não informada"}
                        </span>
                      </div>

                      <span
                        className={`intervencao-etiqueta ${classeTipo(item.tipo)}`}
                      >
                        {item.tipo}
                      </span>

                      <p>{item.descricao}</p>
                    </div>

                    <time className="intervencao-data" dateTime={item.data}>
                      <span aria-hidden="true">◷</span>
                      {formatarData(item.data)}
                    </time>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="intervencao-vazio">
              <span aria-hidden="true">⌕</span>
              <h3>Nenhuma intervenção encontrada</h3>
              <p>
                Tente mudar o nome pesquisado ou selecionar outro tipo de
                intervenção.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBusca("")
                  setTipoSelecionado("Todos")
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </section>

        {modalAberto && (
          <div
            className="intervencao-modal-fundo"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setModalAberto(false)
            }}
          >
            <section
              className="intervencao-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="intervencao-modal-titulo"
            >
              <div className="intervencao-modal-cabecalho">
                <div>
                  <span className="intervencao-eyebrow">
                    NOVO REGISTRO
                  </span>
                  <h2 id="intervencao-modal-titulo">
                    Nova intervenção
                  </h2>
                  <p>Informe os dados da ação pedagógica realizada.</p>
                </div>

                <button
                  type="button"
                  className="intervencao-modal-fechar"
                  onClick={() => setModalAberto(false)}
                  aria-label="Fechar formulário"
                >
                  ×
                </button>
              </div>

              <form
                className="intervencao-formulario"
                onSubmit={salvarIntervencao}
              >
                <label>
                  Aluno
                  <select
                    value={alunoId}
                    onChange={(e) => setAlunoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione um aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome} — {aluno.turma}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Tipo de intervenção
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    {TIPOS_INTERVENCAO.map((opcao) => (
                      <option key={opcao} value={opcao}>
                        {opcao}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Data da intervenção
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    max={dataHoje()}
                    required
                  />
                </label>

                <label>
                  Descrição da intervenção
                  <textarea
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Descreva a ação realizada e os principais pontos tratados..."
                    rows={4}
                    maxLength={1000}
                    required
                  />
                  <small>{descricao.length}/1000 caracteres</small>
                </label>

                {erro && (
                  <p className="intervencao-erro" role="alert">
                    {erro}
                  </p>
                )}

                <div className="intervencao-formulario-acoes">
                  <button
                    type="button"
                    className="intervencao-botao-secundario"
                    onClick={() => setModalAberto(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="intervencao-botao-principal"
                  >
                    Salvar intervenção
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>
    </DashboardLayout>
  )
}

export default Intervencao
