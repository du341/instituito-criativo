import React, { useEffect, useState } from 'react';
import '../css/home.css';
import Header from '../components/Header';
import CursosEventos from '../components/CursosEventos';

const Home = () => {
  const [slideAtual, setSlideAtual] = useState(0);
  const imagens = ['imagens/pexels.jpg', 'imagens/arte2.jpg'];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % imagens.length);
    }, 5000); // Troca a cada 5 segundos
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <Header />

      <section className="hero">
        <div className="hero-slider">
          {imagens.map((imagem, index) => (
            <div
              key={index}
              className={`slide ${index === slideAtual ? 'active' : ''}`}
              style={{ backgroundImage: `url(${imagem})` }}
            >
              <div className="overlay"></div>
              <div className="container">
                <div className="hero-content">
                  <h1>Transformando vidas através da educação criativa</h1>
                  <p className="subtitle">
                    Empoderamos pessoas com conhecimento inovador para mudar suas vidas e a sociedade
                  </p>
                  <div className="hero-buttons">
                    <a href="#cursos" className="btn btn-primary">Conheça nossos cursos</a>
                    <a href="#sobre" className="btn btn-outline">Saiba mais</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          <button className="slider-prev" onClick={() => setSlideAtual((slideAtual - 1 + imagens.length) % imagens.length)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="slider-dots">
            {imagens.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === slideAtual ? 'active' : ''}`}
                onClick={() => setSlideAtual(index)}
              ></button>
            ))}
          </div>
          <button className="slider-next" onClick={() => setSlideAtual((slideAtual + 1) % imagens.length)}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </section>

      <CursosEventos />
    </>
  );
};

export default Home;
