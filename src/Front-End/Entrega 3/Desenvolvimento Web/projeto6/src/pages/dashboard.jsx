import React, { useEffect } from 'react';
import '../css/main.css';
import '../css/dashboard.css';
import { isAdmin, isProfessor } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  const editarCurso = (id) => {
    navigate(`/cursos/editar/${id}`);
  };

  return (
    <>
      <Header />

      {(isAdmin() || isProfessor()) && (
  <div style={{
    position: 'absolute',
    top: '100px',
    right: '40px',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-end'
  }}>
   <button onClick={() => editarCurso(1)} className="btn btn-outline">
      Editar Curso Exemplo
    </button>
  </div>
)}

      <div className="dashboard-layout" style={{ padding: '100px 40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Estatísticas */}
        <div className="stats-grid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '50px' }}>
          <div className="stat-card">
            <div className="stat-value">1,248</div>
            <div className="stat-label">Total de Inscrições</div>
            <div className="stat-change up">
              <span>12% em relação ao mês passado</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">48</div>
            <div className="stat-label">Eventos Ativos</div>
            <div className="stat-change up">
              <span>5 novos eventos</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">R$ 24.560</div>
            <div className="stat-label">Arrecadação</div>
            <div className="stat-change down">
              <span>8% em relação ao mês passado</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">87%</div>
            <div className="stat-label">Taxa de Satisfação</div>
            <div className="stat-change up">
              <span>3% em relação ao mês passado</span>
            </div>
          </div>
        </div>

        {/* Cards de eventos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card" style={{ minHeight: '300px' }}>
            <div className="card-header">
              <h3>Próximos Eventos</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-3 gap-4" id="upcomingEvents"></div>
            </div>
            <div className="card-footer text-center">
              <a href="/eventos" className="text-link">Ver todos os eventos</a>
            </div>
          </div>

          <div className="card" style={{ minHeight: '300px' }}>
            <div className="card-header">
              <h3>Minhas Inscrições</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-4" id="myRegistrations"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
