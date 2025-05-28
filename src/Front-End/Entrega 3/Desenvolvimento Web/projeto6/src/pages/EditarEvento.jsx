import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { getToken } from '../utils/auth';

const EditarEvento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    titulo: '',
    descricao: '',
    data: '',
    local: '',
    imagem: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const buscarEvento = async () => {
      try {
        const resposta = await axios.get(`/api/eventos/${id}`);
        const eventoEncontrado = resposta.data;
        setEvento({
          ...eventoEncontrado,
          imagem: null
        });
        if (eventoEncontrado.imagem) {
          setPreview(`/uploads/${eventoEncontrado.imagem}`);
        }
      } catch (erro) {
        console.error("Erro ao buscar evento:", erro);
        alert("Erro ao carregar dados do evento.");
      }
    };
    buscarEvento();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') {
      setEvento({ ...evento, imagem: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setEvento({ ...evento, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', evento.titulo);
    formData.append('descricao', evento.descricao);
    formData.append('data', evento.data);
    formData.append('local', evento.local);
    if (evento.imagem) {
      formData.append('imagem', evento.imagem);
    }

    try {
      await axios.put(`/api/eventos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Evento atualizado com sucesso!");
      navigate('/eventos');
    } catch (erro) {
      console.error("Erro ao atualizar evento:", erro);
      alert("Erro ao atualizar evento.");
    }
  };

  return (
    <>
      <Header />
      <div className="form-page" style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>Editar Evento</h2>
        <form onSubmit={handleSubmit} className="card p-4">
          <input
            type="text"
            name="titulo"
            value={evento.titulo}
            onChange={handleChange}
            placeholder="Título"
            className="form-control mb-3"
            required
          />

          <textarea
            name="descricao"
            value={evento.descricao}
            onChange={handleChange}
            placeholder="Descrição"
            rows="4"
            className="form-control mb-3"
            required
          />

          <input
            type="date"
            name="data"
            value={evento.data?.slice(0, 10)}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />

          <input
            type="text"
            name="local"
            value={evento.local}
            onChange={handleChange}
            placeholder="Local"
            className="form-control mb-3"
            required
          />

          <input
            type="file"
            name="imagem"
            accept="image/*"
            className="form-control mb-3"
            onChange={handleChange}
          />

          {preview && (
            <img src={preview} alt="Preview" style={{ maxWidth: '200px', marginBottom: '1rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
          )}

          <button type="submit" className="btn btn-primary">Salvar alterações</button>
        </form>
      </div>
    </>
  );
};

export default EditarEvento;
