import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import GaugeChart from "../components/GaugeChart";
import AlunoModal from "../components/AlunoModal";
import { alunos, intervencoes as intervencoesMock, TIPOS_INTERVENCAO, formatarData, dataHoje } from "../data/diarioMock";
import "../styles/Diario.css";

export default function AlunoPerfil() {
  const { id } = useParams();

  // Seleciona o aluno do mock (pelo ID da URL ou seleciona Cirilo Santos)
  const aluno = alunos.find((a) => String(a.id) === String(id)) || alunos[0];

  // Modais de Controle
  const [modalDadosAberto, setModalDadosAberto] = useState(false);
  const [modalNovaIntervencao, setModalNovaIntervencao] = useState(false);
  const [modalHistorico, setModalHistorico] = useState(false);

  // Lista local de intervenções (permite adicionar novas dinamicamente)
  const [listaIntervencoes, setListaIntervencoes] = useState(intervencoesMock);

  // Formulário de Nova Intervenção
  const [novoTipo, setNovoTipo] = useState(TIPOS_INTERVENCAO[0]);
  const [novaDescricao, setNovaDescricao] = useState("");

  // Pendências mapeadas a partir das strings do mock
  const [pendencias, setPendencias] = useState([]);

  // Atualiza as pendências sempre que o aluno mudar
  useEffect(() => {
    if (aluno && aluno.pendencias) {
      setPendencias(
        aluno.pendencias.map((p, idx) => ({ id: idx + 1, texto: p, concluida: false }))
      );
    }
  }, [aluno]);

  // Intervenções filtradas do aluno
  const intervencoesDoAluno = listaIntervencoes.filter((i) => i.alunoId === aluno.id);
  const ultimaIntervencao = intervencoesDoAluno[0] || null;

  // Toggle de Checkbox das Pendências
  const togglePendencia = (pendenciaId) => {
    setPendencias((prev) =>
      prev.map((p) => (p.id === pendenciaId ? { ...p, concluida: !p.concluida } : p))
    );
  };

  // Salvar Nova Intervenção
  const handleSalvarIntervencao = (e) => {
    e.preventDefault();
    if (!novaDescricao.trim()) return;

    const nova = {
      id: Date.now(),
      alunoId: aluno.id,
      tipo: novoTipo,
      data: dataHoje(),
      descricao: novaDescricao,
    };

    setListaIntervencoes([nova, ...listaIntervencoes]);
    setNovaDescricao("");
    setModalNovaIntervencao(false);
  };

  return (
    <DashboardLayout>
      <div className="perfil-aluno-container">
        
      <div className="perfil-voltar-container">
    <Link to="/diario" className="btn-voltar">
      ← Voltar para o Diário
    </Link>
  </div>

        {/* GRID SUPERIOR */}
        <div className="perfil-grid-top">
          
          {/* Card 1: Informações do Aluno */}
          <div className="perfil-card perfil-card-info">
            <div className="perfil-header-info">
              <div className="perfil-avatar-placeholder"></div>
              <div className="perfil-nome-turma">
                <h2>{aluno.nome}</h2>
                <span>{aluno.turma}</span>
              </div>
            </div>

            <div className="perfil-status-tags">
              <div className="status-item red">
                <span className="dot red-dot"></span>
                {aluno.status}
              </div>
              <div className="status-item red">
                <span className="dot red-dot"></span>
                Risco Atual: {aluno.risco}%
              </div>
            </div>

            <div className="perfil-dropdown-container">
              <button 
                type="button"
                className="btn-purple-dropdown" 
                onClick={() => setModalDadosAberto(true)}
              >
                Dados do Aluno
                <span className="chevron">▾</span>
              </button>
            </div>
          </div>

          {/* Card 2: Frequência com Gráfico */}
          <div className="perfil-card card-gauge">
            <h3>Frequência</h3>
            <div className="gauge-wrapper" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <GaugeChart value={aluno.frequencia} />
            </div>
          </div>

          {/* Card 3: Faltas */}
          <div className="perfil-card card-faltas">
            <h3>Faltas</h3>
            <div className="stat-number">{aluno.faltas}</div>
          </div>

        </div>

        {/* GRID INTERMEDIÁRIO */}
        <div className="perfil-grid-middle">
          
          {/* Card 4: Quantidade de Intervenções */}
          <div className="perfil-card card-intervencoes">
            <div className="card-top-row">
              <h3>Quantidade de Intervenções</h3>
              <span className="stat-number-small">{intervencoesDoAluno.length}</span>
            </div>
            
            <button 
              type="button"
              className="btn-purple-action"
              onClick={() => setModalNovaIntervencao(true)}
            >
              Nova intervenção <span className="plus-icon">+</span>
            </button>
          </div>

          {/* Card 5: Última Intervenção */}
          <div className="perfil-card card-ultima-intervencao">
            <h3>Última intervenção</h3>
            <div className="intervencao-detalhe">
              {ultimaIntervencao ? (
                <>
                  <strong>{formatarData(ultimaIntervencao.data)}</strong>
                  <p>
                    <span className="highlight-purple">{ultimaIntervencao.tipo}</span> - {ultimaIntervencao.descricao}
                  </p>
                </>
              ) : (
                <p>Nenhuma intervenção registrada.</p>
              )}
            </div>

            <button 
              type="button" 
              className="btn-purple-dropdown full-width"
              onClick={() => setModalHistorico(true)}
            >
              Ver todas as informações
              <span className="chevron">▾</span>
            </button>
          </div>

        </div>

        {/* SEÇÃO INFERIOR: Pendências */}
        <div className="perfil-pendencias-secao">
          <div className="pendencias-header">
            <h2>Pendências</h2>
          </div>
          <div className="pendencias-list">
            {pendencias.length > 0 ? (
              pendencias.map((item) => (
                <label key={item.id} className={`pendencia-item ${item.concluida ? 'concluida' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={item.concluida} 
                    onChange={() => togglePendencia(item.id)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="pendencia-texto">{item.texto}</span>
                </label>
              ))
            ) : (
              <p style={{ color: "#888", fontStyle: "italic", padding: "10px" }}>Nenhuma pendência para este aluno.</p>
            )}
          </div>
        </div>

      </div>

      {/* MODAL 1: Dados do Aluno */}
      {modalDadosAberto && (
        <AlunoModal aluno={aluno} onClose={() => setModalDadosAberto(false)} />
      )}

      {/* MODAL 2: Criar Nova Intervenção */}
      {modalNovaIntervencao && (
        <div className="perfil-modal-overlay" onClick={() => setModalNovaIntervencao(false)}>
          <div className="perfil-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="perfil-modal-header">
              <h2>Nova Intervenção - {aluno.nome}</h2>
              <button className="perfil-modal-close" onClick={() => setModalNovaIntervencao(false)}>✕</button>
            </div>
            <form onSubmit={handleSalvarIntervencao} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>Tipo de Intervenção:</label>
                <select 
                  value={novoTipo} 
                  onChange={(e) => setNovoTipo(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                >
                  {TIPOS_INTERVENCAO.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>Descrição / Observações:</label>
                <textarea 
                  rows="4"
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                  placeholder="Descreva o que foi tratado durante a intervenção..."
                  required
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button 
                  type="button" 
                  onClick={() => setModalNovaIntervencao(false)}
                  style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #ccc", background: "none", cursor: "pointer" }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="btn-purple-action"
                  style={{ width: "auto" }}
                >
                  Salvar Intervenção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Histórico Completo de Intervenções */}
      {modalHistorico && (
        <div className="perfil-modal-overlay" onClick={() => setModalHistorico(false)}>
          <div className="perfil-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="perfil-modal-header">
              <h2>Histórico de Intervenções ({intervencoesDoAluno.length}) - {aluno.nome}</h2>
              <button className="perfil-modal-close" onClick={() => setModalHistorico(false)}>✕</button>
            </div>
            <div style={{ padding: "20px", maxHeight: "400px", overflowY: "auto" }}>
              {intervencoesDoAluno.length > 0 ? (
                intervencoesDoAluno.map((item) => (
                  <div key={item.id} style={{ padding: "12px 0", borderBottom: "1px solid #eee" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ color: "#6c47ff" }}>{item.tipo}</strong>
                      <span style={{ fontSize: "12px", color: "#666" }}>{formatarData(item.data)}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>{item.descricao}</p>
                  </div>
                ))
              ) : (
                <p>Nenhuma intervenção registrada para este aluno.</p>
              )}
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}