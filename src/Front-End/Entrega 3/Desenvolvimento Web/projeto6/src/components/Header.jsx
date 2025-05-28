// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/home.css';

const Header = () => {
  const navigate = useNavigate();

  const isLogado = !!localStorage.getItem('token'); // Verifica se há token

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    localStorage.removeItem('nome');
    navigate('/'); // Redireciona para a home ou login
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/imagens/logo3.png" alt="Instituto Criativo" style={{ height: "40px" }} />
          </Link>

          <nav className="desktop-nav">
            <ul className="nav-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/eventos">Eventos</Link></li>
              <li><Link to="/meus-eventos">Meus Eventos</Link></li>
              <li><Link to="/estatisticas">Estatísticas</Link></li>
            </ul>

            <div className="nav-buttons">
              {!isLogado ? (
                <>
                  <button className="btn btn-primary" onClick={() => navigate('/cadastro')}>Criar Conta</button>
                  <button className="btn btn-outline" onClick={() => navigate('/login')}>Acessar Plataforma</button>
                </>
              ) : (
                <button className="btn btn-outline" onClick={handleLogout}>Sair</button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
