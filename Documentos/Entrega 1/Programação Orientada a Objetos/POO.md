# Sistema de Gerenciamento de Eventos e Projetos

## Objetivo
Este sistema foi desenvolvido para gerenciar eventos e projetos dentro de uma organização. O código permite a autenticação de usuários, a adição de eventos e projetos, além de exibir eventos ordenados por data e informações sobre os projetos. O sistema distingue entre dois tipos de usuários: **Administradores** e **Comuns**. Apenas administradores podem adicionar eventos e projetos.

## Funcionalidades

1. **Autenticação de Usuário:**
   - O sistema realiza a autenticação de usuários, solicitando nome e tipo de usuário (Administrador ou Comum).
   - O administrador tem permissões adicionais para adicionar eventos e projetos.

2. **Gerenciamento de Eventos:**
   - Administradores podem adicionar eventos com informações como título, tipo, data, local, número de participantes e arrecadação.
   - Os eventos podem ser visualizados em ordem de data.

3. **Gerenciamento de Projetos:**
   - Administradores podem adicionar projetos com informações como nome, status (Em andamento ou Concluído) e número de colaboradores.
   - A lista de projetos pode ser exibida.

### Estrutura de Classes:

- **Evento:**
  Contém as informações sobre os eventos, como título, tipo (atividade, palestra, workshop, etc.), data, local, participantes e arrecadação.

- **Projeto:**
  Contém informações sobre os projetos, como nome, status e número de colaboradores.

- **Usuário:**
  Representa o usuário autenticado no sistema, com seu nome e tipo (Administrador ou Comum).

- **Sistema:**
  Contém a lógica principal do sistema, incluindo métodos para adicionar eventos, adicionar projetos, exibir eventos e projetos e gerenciar o login do usuário.

## Resultados Esperados

- **Eventos:** O administrador pode adicionar eventos e visualizar todos os eventos ordenados por data. A lista de eventos exibirá o título, tipo, data, local, participantes e arrecadação.
  
- **Projetos:** O administrador pode adicionar projetos e visualizar todos os projetos com seu nome, status e número de colaboradores.

## Código

O código-fonte completo pode ser encontrado no arquivo [main](https://github.com/2025-1-NADS2/Projeto6/tree/main/src/Back-End/Entrega%201/Programa%C3%A7%C3%A3o%20Orientada%20a%20Objetos)

