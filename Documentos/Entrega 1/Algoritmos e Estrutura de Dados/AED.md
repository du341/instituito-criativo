# Entrega AED

## 📌 Descrição do Projeto
Este projeto implementa um **algoritmo de ordenação** para gerenciar eventos dentro de um **dashboard administrativo**. A estrutura permite o cadastro e organização de eventos (atividades, palestras, workshops, cursos) com base na data, garantindo uma visualização eficiente no sistema.

## 📂 Estrutura do Projeto
- **`Evento.cs`** → Classe que representa um evento com informações como título, tipo, data, local, participantes e arrecadação.
- **`Projeto.cs`** → Classe que representa projetos em andamento ou concluídos.
- **`Dashboard.cs`** → Implementação do dashboard com funcionalidades para adicionar, listar e filtrar eventos e projetos.
- **`Program.cs`** → Arquivo principal para interação com o sistema e gerenciamento do dashboard.

## 🔍 Funcionalidades Implementadas
✅ **Cadastro de eventos** → Permite adicionar eventos dinamicamente (com validação de entrada de data).
✅ **Ordenação por data (QuickSort)** → Os eventos são organizados do mais próximo ao mais distante.
✅ **Filtragem por tipo de evento** → Possibilita exibir apenas eventos de um tipo específico.
✅ **Cadastro e exibição de projetos** → Gerencia projetos em andamento e concluídos.
✅ **Controle de acesso** → Apenas administradores podem acessar o dashboard.

## 🛠 Tecnologias Utilizadas
- **C#** para a lógica do sistema.
- **Paradigma Orientado a Objetos (POO)**.
- **QuickSort** como algoritmo de ordenação.
- **LINQ** para manipulação de listas e filtragem de eventos.

## 🏗 Exemplo de Uso
### 🔹 Adicionar Evento
```sh
Título: Workshop de Design
Tipo: Workshop
Data (dd/MM/yyyy): 12/04/2025
Local: Online
Número de participantes: 120
Arrecadação: 5000
```
### 🔹 Exibir Eventos Ordenados
```sh
Eventos Ordenados por Data:
Workshop de Design - Workshop - 15/04/2025 - Online - 120 participantes - R$5000
```
### 🔹 Filtrar Eventos por Tipo
```sh
Filtrar por tipo de evento: Workshop
Eventos do tipo Workshop:
Workshop de Design - 15/04/2025 - Online - 120 participantes
```

## 🚀 Como Executar o Projeto
1. [Clique aqui para acessar a pasta do codigo](https://github.com/2025-1-NADS2/Projeto6/tree/main/src/Back-End/Entrega%201/Algoritimo%20e%20Estrutura%20de%20Dados)
2. Abra o projeto em um ambiente C# (.NET).
3. Compile e execute `ListaOrdenada.cs`.
4. Siga as instruções do menu interativo para testar as funcionalidades.

---
📌 **Observação**: Este sistema faz parte do **dashboard do Instituto Criativo (que ainda será feito em breve, pois focamos mais no Front-End)**, onde será usado para gerenciar eventos e arrecadações. Somente administradores terão acesso ao painel de gerenciamento.
