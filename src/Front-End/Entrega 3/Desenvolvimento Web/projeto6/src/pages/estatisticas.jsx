import React, { useEffect, useRef, useState } from 'react';
import '../css/main.css';
import '../css/dashboard.css';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';
import Header from '../components/Header'; // ✅ Adicionando o Header

const Estatisticas = () => {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState(30);

  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);

  useEffect(() => {
    if (!isAdmin()) {
      alert('Acesso restrito.');
      navigate('/dashboard');
      return;
    }

    const gerarDadosAleatorios = (length) => {
      return Array.from({ length }, () => Math.floor(Math.random() * 100) + 20);
    };

    const labels = Array.from({ length: periodo }, (_, i) => `Dia ${i + 1}`);

    chart1Ref.current?.destroy();
    chart2Ref.current?.destroy();
    chart3Ref.current?.destroy();

    chart1Ref.current = new Chart(document.getElementById('registrationsChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Inscrições',
          data: gerarDadosAleatorios(periodo),
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.4
        }]
      }
    });

    chart2Ref.current = new Chart(document.getElementById('eventTypesChart'), {
      type: 'doughnut',
      data: {
        labels: ['Palestras', 'Workshops', 'Cursos'],
        datasets: [{
          data: [12, 9, 15],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
        }]
      }
    });

    chart3Ref.current = new Chart(document.getElementById('revenueChart'), {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'R$',
          data: gerarDadosAleatorios(periodo).map(n => n * 30),
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
      }
    });
  }, [periodo, navigate]);

  return (
    <>
      <Header /> {/* ✅ Cabeçalho com logo clicável */}

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
              <li className="nav-item"><a href="/eventos" className="nav-link">Eventos</a></li>
              <li className="nav-item"><a href="/meus-eventos" className="nav-link">Meus Eventos</a></li>
              <li className="nav-item"><a href="/estatisticas" className="nav-link active">Estatísticas</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="filtro-periodo-header">
            <select className="form-control" onChange={(e) => setPeriodo(parseInt(e.target.value))} value={periodo}>
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 3 meses</option>
              <option value="365">Último ano</option>
            </select>
          </div>

          <div className="stats-grid mb-4">
            <div className="stat-card">
              <div className="stat-value">1,248</div>
              <div className="stat-label">Total de Inscrições</div>
              <div className="stat-change up">
                <i className="fas fa-arrow-up"></i> <span>12% em relação ao período anterior</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">R$ 24.560</div>
              <div className="stat-label">Arrecadação Total</div>
              <div className="stat-change down">
                <i className="fas fa-arrow-down"></i> <span>8% em relação ao período anterior</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">48</div>
              <div className="stat-label">Eventos Realizados</div>
              <div className="stat-change up">
                <i className="fas fa-arrow-up"></i> <span>+5 eventos</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-value">87%</div>
              <div className="stat-label">Satisfação</div>
              <div className="stat-change up">
                <i className="fas fa-arrow-up"></i> <span>+3%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="card">
              <div className="card-header"><h3>Inscrições por Período</h3></div>
              <div className="card-body"><canvas id="registrationsChart"></canvas></div>
            </div>
            <div className="card">
              <div className="card-header"><h3>Tipos de Eventos</h3></div>
              <div className="card-body"><canvas id="eventTypesChart"></canvas></div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Arrecadação Mensal</h3></div>
            <div className="card-body"><canvas id="revenueChart"></canvas></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Estatisticas;
 