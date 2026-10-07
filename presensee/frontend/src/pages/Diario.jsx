import { useState } from "react"
import { Link } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import GaugeChart from "../components/GaugeChart"
import AlunoModal from "../components/AlunoModal"
import { MascotAvatar } from "../components/Icons"
import {
  alunos,
  intervencoes,
  turmas,
  anotacoes,
  resumoDiario,
  formatarData,
  nivelRisco
} from "../data/diarioMock"
import "../styles/Diario.css"

function nomeDoAluno(id) {
  return alunos.find(aluno => aluno.id === id)?.nome
}

function DiarioModal({ tipo, onClose, onAlunoClick }) {
  const titulos = {
    intervencoes: "Intervenções",
    turmas: "Turmas",
    alunos: "Alunos",
    anotacoes: "Anotações"
  }

  return (
    <div className="diario-modal-overlay" onClick={onClose}>
      <div
        className="diario-modal"
        onClick={event => event.stopPropagation()}
      >
        <div className="diario-modal-header">
          <h2>{titulos[tipo]}</h2>

          <button
            type="button"
            className="diario-modal-fechar"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className="diario-modal-conteudo">

          {tipo === "intervencoes" && (
            <>
              {intervencoes.length > 0 ? (
                <div className="diario-modal-lista">
                  {intervencoes.map(intervencao => (
                    <div
                      className="diario-modal-item"
                      key={intervencao.id}
                    >
                      <div className="diario-modal-item-topo">
                        <strong>
                          {nomeDoAluno(intervencao.alunoId)}
                        </strong>

                        <small>
                          {formatarData(intervencao.data)}
                        </small>
                      </div>

                      <span className="diario-modal-tag">
                        {intervencao.tipo}
                      </span>

                      <p>{intervencao.descricao}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="diario-vazio">
                  Nenhuma intervenção registrada.
                </p>
              )}
            </>
          )}

          {tipo === "turmas" && (
            <>
              {turmas.length > 0 ? (
                <div className="diario-modal-lista">
                  {turmas.map(turma => (
                    <div
                      className="diario-modal-item"
                      key={turma.nome}
                    >
                      <div className="diario-modal-item-topo">
                        <strong>{turma.nome}</strong>

                        <small>
                          {turma.risco}% de risco
                        </small>
                      </div>

                      <p>
                        {turma.alunos} alunos matriculados
                      </p>

                      <div className="diario-turma-risco">
                        <span>Risco de evasão</span>

                        <strong>
                          {turma.risco}%
                        </strong>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="diario-vazio">
                  Nenhuma turma cadastrada.
                </p>
              )}
            </>
          )}

          {tipo === "alunos" && (
            <>
              {alunos.length > 0 ? (
                <div className="diario-modal-lista">
                  {alunos.map(aluno => (
                    <div
                      className="diario-modal-item diario-modal-aluno"
                      key={aluno.id}
                    >
                      <div className="diario-modal-item-topo">
                        <div className="diario-modal-aluno-nome">
                          <span
                            className={`risk-dot ${nivelRisco(aluno.risco)}`}
                          ></span>

                          <strong>{aluno.nome}</strong>
                        </div>

                        <small>{aluno.turma}</small>
                      </div>

                      <div className="diario-aluno-resumo">
                        <div>
                          <span>Frequência</span>
                          <strong>{aluno.frequencia}%</strong>
                        </div>

                        <div>
                          <span>Risco</span>
                          <strong>{aluno.risco}%</strong>
                        </div>

                        <div>
                          <span>Faltas</span>
                          <strong>{aluno.faltas}</strong>
                        </div>
                      </div>

                      <div className="diario-modal-aluno-acoes">
                        <button
                          type="button"
                          className="diario-ver-dados"
                          onClick={() => onAlunoClick(aluno)}
                        >
                          Ver dados
                        </button>

                        <Link
                          to={`/diario/aluno/${aluno.id}`}
                          className="diario-acompanhar"
                          onClick={onClose}
                        >
                          Acompanhar
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="diario-vazio">
                  Nenhum aluno cadastrado.
                </p>
              )}
            </>
          )}

          {tipo === "anotacoes" && (
            <>
              {anotacoes.length > 0 ? (
                <div className="diario-modal-lista">
                  {anotacoes.map(nota => (
                    <div
                      className="diario-modal-item diario-modal-nota"
                      key={nota.id}
                    >
                      <small>{formatarData(nota.data)}</small>

                      <p>{nota.texto}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="diario-vazio">
                  Nenhuma anotação ainda.
                </p>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  )
}

function Diario() {
  const [modalAberto, setModalAberto] = useState(null)
  const [alunoModal, setAlunoModal] = useState(null)

  const avatar = localStorage.getItem("avatarUsuario") || ""

  function abrirModal(tipo) {
    setModalAberto(tipo)
  }

  function fecharModal() {
    setModalAberto(null)
  }

  function abrirAlunoModal(aluno) {
    setAlunoModal(aluno)
  }

  const cards = [
    {
      chave: "intervencoes",
      titulo: "Intervenções",
      descricao: "Consulte todas as intervenções registradas.",
      quantidade: intervencoes.length,
      textoQuantidade: "registros"
    },
    {
      chave: "turmas",
      titulo: "Turmas",
      descricao: "Visualize as turmas acompanhadas.",
      quantidade: turmas.length,
      textoQuantidade: "turmas"
    },
    {
      chave: "alunos",
      titulo: "Alunos",
      descricao: "Consulte os alunos em acompanhamento.",
      quantidade: alunos.length,
      textoQuantidade: "alunos"
    },
    {
      chave: "anotacoes",
      titulo: "Anotações",
      descricao: "Visualize as anotações registradas no diário.",
      quantidade: anotacoes.length,
      textoQuantidade: "anotações"
    }
  ]

  return (
    <DashboardLayout>
      <div className="diario-page">

        <div className="dashboard-header">
          <div className="dashboard-header-left">

            <div className="dashboard-avatar diario-avatar">
              {avatar ? (
                <img src={avatar} alt="Foto do usuário" />
              ) : (
                <MascotAvatar size={72} />
              )}
            </div>

            <h1>
              Diário do Monitor
            </h1>

          </div>
        </div>

        <div className="diario-grid">

          <div className="diario-coluna-esquerda">

            <div className="diario-total">
              <h2 className="diario-total-titulo">
                Total de Intervenções
              </h2>

              <strong className="diario-total-valor">
                {intervencoes.length}
              </strong>
            </div>

            <div className="diario-cards">

              {cards
                .filter(
                  card =>
                    card.chave === "intervencoes" ||
                    card.chave === "turmas"
                )
                .map(card => (
                  <button
                    type="button"
                    className="diario-card"
                    key={card.chave}
                    onClick={() => abrirModal(card.chave)}
                  >
                    <div className="diario-card-conteudo">
                      <h3>
                        {card.titulo}
                      </h3>

                      <p>
                        {card.descricao}
                      </p>

                      <div className="diario-card-quantidade">
                        <strong>
                          {card.quantidade}
                        </strong>

                        <span>
                          {card.textoQuantidade}
                        </span>
                      </div>
                    </div>

                    <span className="diario-card-link">
                      Ver detalhes
                      <span>→</span>
                    </span>
                  </button>
                ))}

              <div className="diario-card diario-gauge-card">
                <div className="diario-card-conteudo">
                  <h3>
                    Risco de evasão geral
                  </h3>

                  <div className="diario-gauge">
                    <GaugeChart
                      value={resumoDiario.riscoEvasaoGeral}
                    />
                  </div>
                </div>
              </div>

              {cards
                .filter(
                  card =>
                    card.chave === "alunos" ||
                    card.chave === "anotacoes"
                )
                .map(card => (
                  <button
                    type="button"
                    className="diario-card"
                    key={card.chave}
                    onClick={() => abrirModal(card.chave)}
                  >
                    <div className="diario-card-conteudo">
                      <h3>
                        {card.titulo}
                      </h3>

                      <p>
                        {card.descricao}
                      </p>

                      <div className="diario-card-quantidade">
                        <strong>
                          {card.quantidade}
                        </strong>

                        <span>
                          {card.textoQuantidade}
                        </span>
                      </div>
                    </div>

                    <span className="diario-card-link">
                      Ver detalhes
                      <span>→</span>
                    </span>
                  </button>
                ))}

              <div className="diario-card diario-gauge-card">
                <div className="diario-card-conteudo">
                  <h3>
                    Seu desempenho
                  </h3>

                  <div className="diario-gauge">
                    <GaugeChart
                      value={resumoDiario.desempenhoMonitor}
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {modalAberto && (
        <DiarioModal
          tipo={modalAberto}
          onClose={fecharModal}
          onAlunoClick={abrirAlunoModal}
        />
      )}

      {alunoModal && (
        <AlunoModal
          aluno={alunoModal}
          onClose={() => setAlunoModal(null)}
        />
      )}

    </DashboardLayout>
  )
}

export default Diario