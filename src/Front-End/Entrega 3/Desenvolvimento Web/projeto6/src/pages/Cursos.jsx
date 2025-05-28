import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../css/dashboard.css';
import '../css/main.css';
import { isAdmin } from '../utils/auth';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const buscarCursos = async () => {
      try {
        const resposta = await axios.get('/api/cursos');
        console.log("Cursos recebidos:", resposta.data); 
        console.log("Resposta da API:", resposta.data);
        setCursos(Array.isArray(resposta.data) ? resposta.data : (resposta.data.cursos || []));
        
      } catch (erro) {
        console.error('Erro ao buscar cursos:', erro);
        alert('Erro ao carregar cursos. Tente novamente mais tarde.');
      }
    };

    buscarCursos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este curso?')) {
      try {
        await axios.delete(`/api/cursos/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCursos((prev) => prev.filter((curso) => curso.id !== id));
        alert('Curso excluído com sucesso!');
      } catch (erro) {
        console.error('Erro ao excluir curso:', erro);
        alert('Erro ao excluir curso.');
      }
    }
  };

  return (
    <>
      <Header />

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li className="nav-item"><a href="/dashboard" className="nav-link">Dashboard</a></li>
              <li className="nav-item"><a href="/eventos" className="nav-link">Eventos</a></li>
              <li className="nav-item"><a href="/cursos" className="nav-link active">Cursos</a></li>
              <li className="nav-item"><a href="/estatisticas" className="nav-link">Estatísticas</a></li>
            </ul>
          </nav>
        </aside>

        <main className="main-content">
          <div className="card" style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
            <div className="card-body">
              {cursos.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Sem cursos cadastrados no momento.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {cursos.map((curso) => (
                    <div key={curso.id} className="event-card">
                      <h4>{curso.titulo}</h4>
                      <p>{curso.descricao}</p>
                      <p><strong>Carga horária:</strong> {curso.cargaHoraria}</p>
                      <p><strong>Nível:</strong> {curso.nivel}</p>
                      {curso.imagem && (
                        <img
                          src={`/uploads/${curso.imagem}`}
                          alt={`Imagem do curso ${curso.titulo}`}
                          loading="lazy"
                          style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
                        />
                      )}

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        marginTop: '1rem'
                      }}>
                        <a
                          href={curso.link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                        >
                          Acessar curso
                        </a>

                        {isAdmin() && (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(curso.id)}
                          >
                            🗑 Excluir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cursos;
