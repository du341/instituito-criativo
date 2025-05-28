import { useState, useEffect } from 'react';
import '../css/dashboard.css';
import '../css/main.css';
import axios from 'axios';
import { getToken, isAdmin, isProfessor, getPerfil } from '../utils/auth';
import Header from '../components/Header';

const Eventos = () => {
  const [tipoCadastro, setTipoCadastro] = useState('evento');
  const [eventos, setEventos] = useState([]);
  const [preview, setPreview] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const buscarEventos = async () => {
      try {
        const resposta = await axios.get('/api/eventos');
        const lista = Array.isArray(resposta.data)
          ? resposta.data
          : (resposta.data.eventos || []);
        setEventos(lista);
      } catch (erro) {
        console.error('Erro ao buscar eventos:', erro);
      }
    };
    buscarEventos();
  }, []);

  const handleDeleteEvento = async (id) => {
    if (!window.confirm("Deseja realmente excluir este evento?")) return;
    try {
      await axios.delete(`/api/eventos/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setEventos((prev) => prev.filter((ev) => ev.id !== id));
      alert("Evento excluído com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir evento:", erro);
      alert("Erro ao excluir evento. Verifique o console.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const perfil = getPerfil();

    if (tipoCadastro === "evento" && perfil !== "admin") {
      alert("Apenas administradores podem cadastrar eventos.");
      return;
    }

    if (tipoCadastro === "curso" && !(perfil === "admin" || perfil === "professor")) {
      alert("Apenas administradores ou professores podem cadastrar cursos.");
      return;
    }

    const formData = new FormData();

    if (tipoCadastro === "evento") {
      formData.append("titulo", e.target.titulo.value);
      formData.append("descricao", e.target.descricao.value);
      formData.append("data", e.target.data.value);
      formData.append("local", e.target.local.value);
      formData.append("imagem", e.target.imagem.files[0]);
    } else {
      formData.append("titulo", e.target.titulo.value);
      formData.append("descricao", e.target.descricao.value);
      formData.append("cargaHoraria", e.target.cargaHoraria.value);
      formData.append("nivel", e.target.nivel.value);
      formData.append("link", e.target.link.value);
      formData.append("imagem", e.target.imagem.files[0]);
    }

    const url = tipoCadastro === "evento" ? "/api/eventos" : "/api/cursos";

    try {
      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert("Cadastro realizado com sucesso!");
      setPreview(null);
      setModalAberto(false);

      const resposta = await axios.get('/api/eventos');
      const lista = Array.isArray(resposta.data)
        ? resposta.data
        : (resposta.data.eventos || []);
      setEventos(lista);
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);

      if (erro.response?.status === 401) {
        alert("Sua sessão expirou. Faça login novamente.");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Erro ao cadastrar. Verifique o console.");
      }
    }
  };

  const renderCard = (evento) => (
    <div className="event-card" key={evento.id}>
      {evento.imagem && (
        <div className="event-image">
          <img
            src={
              evento.imagem?.startsWith('http')
                ? evento.imagem
                : `/uploads/${evento.imagem}`
            }
            alt={evento.titulo}
            style={{ width: '100%', borderRadius: '8px', marginBottom: '10px', maxHeight: '180px', objectFit: 'cover' }}
          />
        </div>
      )}
      <div className="event-content">
        <h4 className="event-title">{evento.titulo}</h4>
        <p className="event-description">{evento.descricao}</p>
        <div className="event-meta" style={{ marginBottom: '10px' }}>
          <span>📅 {new Date(evento.data).toLocaleDateString()}</span>
          <span>📍 {evento.local}</span>
        </div>
        {isAdmin() && (
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteEvento(evento.id)}
            style={{ marginTop: '0.5rem' }}
          >
            🗑 Excluir
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Header />

      {(isAdmin() || isProfessor()) && (
        <div className="filter-position">
          <button className="btn btn-primary" onClick={() => setModalAberto(true)}>
            + Adicionar Evento ou Curso
          </button>
        </div>
      )}

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
              <li className="nav-item"><a href="/eventos" className="nav-link active">Eventos</a></li>
              <li className="nav-item"><a href="/meus-eventos" className="nav-link">Meus Eventos</a></li>
              <li className="nav-item"><a href="/estatisticas" className="nav-link">Estatísticas</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="card" style={{
            width: '100%',
            maxWidth: '1000px',
            margin: '30px',
            borderRadius: '18px',
            boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
            padding: '1.9rem 1.5rem',
            background: '#fff',
            fontFamily: 'Segoe UI, Arial, sans-serif'
          }}>
            <div className="card-body" style={{ padding: 0 }}>
              {eventos.length === 0 ? (
                <p style={{
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  letterSpacing: '0.5px',
                  color: '#888',
                  margin: '2rem 0'
                }}>
                  Sem eventos cadastrados no momento.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-4" style={{
                  gap: '1.5rem',
                  fontSize: '1.05rem',
                  letterSpacing: '0.2px'
                }}>
                  {eventos.map(renderCard)}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {modalAberto && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          overflowY: 'auto'
        }} onClick={() => setModalAberto(false)}>
          <div style={{
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '700px',
            maxHeight: '85vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Segoe UI, Arial, sans-serif'
          }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
              <h3 style={{
                marginBottom: '0.5rem',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '1.15rem',
                letterSpacing: '0.5px'
              }}>
                Adicionar Novo {tipoCadastro === 'evento' ? 'Evento' : 'Curso'}
              </h3>

              <select className="form-control" value={tipoCadastro} onChange={(e) => setTipoCadastro(e.target.value)}>
                <option value="evento">Evento</option>
                <option value="curso">Curso</option>
              </select>

              {tipoCadastro === 'evento' ? (
                <>
                  <input type="text" name="titulo" placeholder="Título" className="form-control" required />
                  <textarea name="descricao" rows="4" placeholder="Descrição" className="form-control" required />
                  <input type="date" name="data" className="form-control" required />
                  <input type="text" name="local" placeholder="Local" className="form-control" required />
                  <input type="file" name="imagem" accept="image/*" className="form-control" required onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
                  {preview && <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
                </>
              ) : (
                <>
                  <input type="text" name="titulo" placeholder="Título do curso" className="form-control" required />
                  <textarea name="descricao" rows="4" placeholder="Descrição" className="form-control" required />
                  <input type="text" name="cargaHoraria" placeholder="Carga horária" className="form-control" required />
                  <select name="nivel" className="form-control" required>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediário">Intermediário</option>
                    <option value="avançado">Avançado</option>
                  </select>
                  <input type="url" name="link" placeholder="Link do curso" className="form-control" required />
                  <input type="file" name="imagem" accept="image/*" className="form-control" required onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
                  {preview && <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.7rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Eventos;
