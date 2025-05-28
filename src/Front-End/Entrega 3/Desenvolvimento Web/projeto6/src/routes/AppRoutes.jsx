import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Eventos from '../pages/eventos';
import Cadastro from '../pages/cadastro';
import Dashboard from '../pages/dashboard';
import Estatisticas from '../pages/estatisticas';
import MeusEventos from '../pages/meusEventos';
import EditarCurso from '../pages/EditarCurso';
import Login from '../pages/login';
import Cursos from '../pages/Cursos';
import EditarEvento from '../pages/EditarEvento';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/" element={<Home />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/estatisticas" element={<Estatisticas />} />
      <Route path="/meus-eventos" element={<MeusEventos />} />
      <Route path="/cursos/editar/:id" element={<EditarCurso />} />
      <Route path="/login" element={<Login />} />
      <Route path="/eventos/editar/:id" element={<EditarEvento />} />
    </Routes>

  );
};

export default AppRoutes;

