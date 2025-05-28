import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/cursosEventos.css';
import { getToken, isAdmin, isProfessor } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const CursosEventos = () => {
  const [cursos, setCursos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('cursos');

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/cursos')
      .then(res => setCursos(res.data))
      .catch(err => console.error('Erro ao buscar cursos', err));

    axios.get('/api/eventos')
      .then(res => setEventos(res.data.eventos))
      .catch(err => console.error('Erro ao buscar eventos', err));
  }, []);

  const excluirItem = async (id, tipo) => {
    const confirmar = window.confirm(`Tem certeza que deseja excluir este ${tipo}?`);
    if (!confirmar) return;

    try {
      const url = tipo === 'curso' ? `/api/cursos/${id}` : `/api/eventos/${id}`;
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (tipo === 'curso') {
        setCursos(cursos.filter(c => c.id !== id));
      } else {
        setEventos(eventos.filter(e => e.id !== id));
      }

      alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} excluído com sucesso!`);
    } catch (error) {
      console.error(`Erro ao excluir ${tipo}:`, error);
      alert('Erro ao excluir. Verifique o console.');
    }
  };

  const editarItem = (id, tipo) => {
    if (tipo === 'curso') {
      navigate(`/cursos/editar/${id}`);
    } else {
      navigate(`/eventos/editar/${id}`);
    }
  };

  const renderCard = (item, tipo) => (
  <div className="course-card" key={item.id}>
    <div className="course-image">
      <img
        src={
          item.imagem?.startsWith('http')
            ? item.imagem
            : `/uploads/${item.imagem}`
        }
        alt={item.titulo}
      />
      <span className="course-tag">{tipo === 'curso' ? item.nivel : 'Evento'}</span>
    </div>
    <div className="course-content">
      <h3>{item.titulo}</h3>
      <p>{item.descricao}</p>
      <div className="course-meta">
        {tipo === 'curso' ? (
          <>
            <span>⏱ {item.cargaHoraria}</span>
            <span>🎓 {item.nivel}</span>
          </>
        ) : (
          <>
            <span>📅 {new Date(item.data).toLocaleDateString()}</span>
            <span>📍 {item.local}</span>
          </>
        )}
      </div>

      {tipo === 'curso' ? (
        <a href={item.link} className="btn btn-small" target="_blank" rel="noopener noreferrer">Acessar curso</a>
      ) : (
        <span className="btn btn-small disabled">Saiba mais</span>
      )}

      {(isAdmin() || (isProfessor() && tipo === 'curso')) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          {isAdmin() && (
            <button className="btn btn-outline btn-small" onClick={() => editarItem(item.id, tipo)}>✏️ Editar</button>
          )}
          <button className="btn btn-danger btn-small" onClick={() => excluirItem(item.id, tipo)}>🗑 Excluir</button>
        </div>
      )}
    </div>
  </div>
);


  return (
    <section className="courses-section" id="cursos">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Nossas soluções educacionais</span>
          <h2 className="section-title">Cursos e Eventos</h2>
          <div className="divider"></div>
        </div>

        <div className="courses-tabs">
          <button
            className={`tab-btn ${abaAtiva === 'cursos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('cursos')}
          >
            Cursos
          </button>
          <button
            className={`tab-btn ${abaAtiva === 'eventos' ? 'active' : ''}`}
            onClick={() => setAbaAtiva('eventos')}
          >
            Eventos
          </button>
        </div>

        <div className="courses-grid">
          {abaAtiva === 'cursos'
            ? cursos.map(c => renderCard(c, 'curso'))
            : eventos.map(e => renderCard(e, 'evento'))}
        </div>
      </div>
    </section>
  );
};

export default CursosEventos;
