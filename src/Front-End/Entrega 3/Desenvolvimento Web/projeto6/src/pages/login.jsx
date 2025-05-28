import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';
import '../css/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await axios.post('/api/auth/login', { email, senha });
      const { token, usuario } = resposta.data;

      if (token && usuario) {
        localStorage.setItem('token', token);
        localStorage.setItem('perfil', usuario.perfil);
        localStorage.setItem('nome', usuario.nome);

        alert('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        alert('Resposta inválida do servidor. Tente novamente.');
      }
    } catch (erro) {
      console.error('Erro ao fazer login:', erro);
      alert(
        erro.response?.data?.mensagem ||
        erro.message ||
        'Erro ao fazer login. Verifique suas credenciais.'
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Bem-vindo de volta</h1>
          <p>Faça login para acessar o dashboard</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              className="form-control"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="form-group form-options">
            <label className="checkbox">
              <input type="checkbox" defaultChecked />
              <span>Lembrar de mim</span>
            </label>
            <a href="#" className="text-link">Esqueceu a senha?</a>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Entrar</button>

          <div className="auth-footer">
            <p>
              Não tem uma conta? <a href="/cadastro" className="text-link">Cadastre-se</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
