# Sistema de Gerenciamento de Eventos e Projetos

Este sistema em C# permite o cadastro, edição e consulta de **eventos** e **projetos**, com funcionalidades voltadas ao controle de dados como palestrantes, participantes, arrecadações e filtros inteligentes por data, tipo e status.

---

## Funcionalidades do Sistema

### 1. Adicionar Evento
Permite cadastrar um novo evento com:
- Título
- Tipo (Atividade, Palestra, Workshop, Curso)
- Data e horário
- Local
- Status (Não Iniciado, Em andamento, Concluído)
- Arrecadação (opcional)
- Palestrantes
- Limite de participantes (opcional)

### 2. Exibir Eventos Ordenados
Exibe todos os eventos cadastrados, ordenados pela data de realização.

### 3. Filtrar Eventos por Tipo
Filtra e exibe eventos com base em seu tipo, como "Curso", "Workshop", etc.

### 4. Adicionar Projeto
Permite cadastrar um novo projeto com:
- Nome
- Status
- Valor de arrecadação (opcional)
- Lista de colaboradores

### 5. Exibir Projetos
Mostra todos os projetos registrados, com status e número de colaboradores.

### 6. Buscar Evento por Participante
Busca eventos nos quais um determinado participante esteja inscrito.

### 7. Buscar Evento/Projeto por Palestrante/Colaborador
Busca eventos com determinado palestrante ou projetos com determinado colaborador.

### 8. Editar Evento ou Projeto
Permite alterar os dados cadastrados de um evento ou projeto, incluindo título, tipo, status, arrecadação e demais informações.

### 9. Total das Arrecadações
Exibe a soma total das arrecadações de todos os eventos e projetos, junto com uma tabela detalhada de cada item.

### 10. Sair
Encerra o sistema.

---

## **Nova Funcionalidade - Opção 11**

### 11. Buscar por Intervalo de Datas e Tipo/Status
Permite realizar uma busca mais refinada com dois critérios simultâneos:

#### a) Para Eventos:
- Intervalo de datas (ex: 01/05/2024 a 30/05/2024)
- Tipo do evento (ex: Workshop)

#### b) Para Projetos:
- Intervalo de datas de eventos relacionados
- Status do projeto (ex: Em Andamento)

A busca retorna somente os registros que **atendem às duas condições ao mesmo tempo**.

---

## Tecnologias Utilizadas

- Linguagem: **C#**
- Biblioteca: `System`, `System.Linq`, `System.Globalization`
- Execução: Console Application

---

## Observações
- O sistema é voltado para **usuários administradores** (verificação no início do programa).
- Os dados são armazenados apenas em **memória (List<T>)** e se perdem ao encerrar o programa.
- O sistema é totalmente baseado em entradas pelo teclado via `Console.ReadLine`.

---

## Link do documento abaixo:
*Todo o arquivo esta organizado nesta pasta.*

**[Clique aqui para acessar a pasta do projeto.](https://github.com/2025-1-NADS2/Projeto6/tree/main/src/Back-End/Entrega%203/Algoritimo%20e%20Estrutura%20de%20Dados)**
