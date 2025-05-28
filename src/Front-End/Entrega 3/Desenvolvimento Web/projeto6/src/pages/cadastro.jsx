import React, { useState } from 'react';
import '../css/auth.css';
import '../css/main.css';
import axios from 'axios';

const Cadastro = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    perfil: '',
    codigoAcesso: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Validação do perfil com código de acesso
    let perfilFinal = 'aluno'; // padrão

    if (form.perfil === 'admin') {
      if (form.codigoAcesso !== 'ADM2024') {
        alert('Código de acesso inválido para Administrador.');
        return;
      }
      perfilFinal = 'admin';
    } else if (form.perfil === 'professor') {
      perfilFinal = 'professor';
    }

    try {
      await axios.post('/api/auth/register', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        perfil: perfilFinal
      });

      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert(
        error.response?.data?.mensagem ||
        error.message ||
        'Erro ao cadastrar. Verifique os dados.'
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Crie sua conta</h1>
          <p>Preencha os dados abaixo para se cadastrar</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome" className="form-label">Nome Completo</label>
            <input
              type="text"
              id="nome"
              className="form-control"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              className="form-control"
              value={form.senha}
              onChange={handleChange}
              required
              minLength="8"
            />
            <small className="form-hint">Mínimo de 8 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha" className="form-label">Confirme sua Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              className="form-control"
              value={form.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="perfil" className="form-label">Tipo de Usuário</label>
            <select
              id="perfil"
              className="form-control"
              value={form.perfil}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="professor">Professor</option>
              <option value="admin">Administrador (com código de acesso)</option>
            </select>
          </div>

          {form.perfil === 'admin' && (
            <div className="form-group">
              <label htmlFor="codigoAcesso" className="form-label">Código de Acesso</label>
              <input
                type="text"
                id="codigoAcesso"
                className="form-control"
                value={form.codigoAcesso}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group form-options">
            <label className="checkbox">
              <input type="checkbox" required />
              <span>
                Eu concordo com os <a href="#" className="text-link">Termos de Serviço</a> e{' '}
                <a href="#" className="text-link">Política de Privacidade</a>
              </span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Criar Conta</button>

          <div className="auth-footer">
            <p>Já tem uma conta? <a href="/" className="text-link">Faça login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
