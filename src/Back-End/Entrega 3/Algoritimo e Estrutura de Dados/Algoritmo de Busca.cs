using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

class Evento
{
    public string Titulo { get; set; }
    public string Tipo { get; set; }
    public DateTime Data { get; set; }
    public string Horario { get; set; }
    public string Local { get; set; }
    public double? Arrecadacao { get; set; }
    public string Status { get; set; }
    public int? LimiteParticipantes { get; set; }
    public List<string> ListaParticipantes { get; set; } = new List<string>();
    public List<string> ListaPalestrantes { get; set; } = new List<string>();
    public Evento(string titulo, string tipo, DateTime data, string status)
    {
        Titulo = titulo;
        Tipo = tipo;
        Data = data;
        Status = status;
    }
}

class Projeto
{
    public string Nome { get; set; }
    public string Status { get; set; }
    public List<string> ListaColaboradores { get; set; } = new List<string>();
    public double? Arrecadacao { get; set; }
    public Projeto(string nome, string status)
    {
        Nome = nome;
        Status = status;
    }
}

class Dashboard
{
    private List<Evento> eventos = new List<Evento>();
    private List<Projeto> projetos = new List<Projeto>();

    private string Normalizar(string texto)
    {
        if (string.IsNullOrWhiteSpace(texto)) return "";
        string form = texto.ToLower().Normalize(NormalizationForm.FormD);
        return new string(form.Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark).ToArray());
    }

    public void AdicionarEvento()
    {
        Console.Write("Título: ");
        string titulo = Console.ReadLine();
        Console.Write("Tipo (Atividade, Palestra, Workshop, Curso): ");
        string tipo = Console.ReadLine();
        Console.Write("Data (dd/MM/yyyy): ");
        DateTime data;
        while (!DateTime.TryParseExact(Console.ReadLine(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out data))
            Console.Write("Formato inválido! Digite novamente (dd/MM/yyyy): ");
        Console.Write("Qual horário ocorrerá o evento? (formato: 19H55, 20H20): ");
        string horario = Console.ReadLine();
        Console.Write("Local: ");
        string local = Console.ReadLine();
        Console.Write("Status (Não Iniciado/Em andamento/Concluído): ");
        string status = Console.ReadLine();

        Evento novoEvento = new Evento(titulo, tipo, data, status);
        novoEvento.Horario = horario;
        novoEvento.Local = local;

        Console.Write("O evento terá arrecadações? (S/N): ");
        if (Console.ReadLine().ToUpper() == "S")
        {
            Console.Write("Qual será o valor da arrecadação? ");
            novoEvento.Arrecadacao = double.Parse(Console.ReadLine());
        }

        Console.Write("Quantos palestrantes esse evento terá? (mínimo 1): ");
        int qtdPalestrantes = Math.Max(1, int.Parse(Console.ReadLine()));
        for (int i = 0; i < qtdPalestrantes; i++)
        {
            Console.Write($"Nome completo do palestrante {i + 1}: ");
            novoEvento.ListaPalestrantes.Add(Console.ReadLine());
        }

        Console.Write("Deseja definir um limite de participantes? (S/N): ");
        if (Console.ReadLine().ToUpper() == "S")
        {
            Console.Write("Informe o limite: ");
            novoEvento.LimiteParticipantes = int.Parse(Console.ReadLine());

            for (int i = 0; i < novoEvento.LimiteParticipantes; i++)
            {
                Console.Write($"Nome completo do participante {i + 1}: ");
                novoEvento.ListaParticipantes.Add(Console.ReadLine());
                Console.Write("Deseja concluir as configurações? (S/N): ");
                if (Console.ReadLine().ToUpper() == "S") break;
            }
        }

        eventos.Add(novoEvento);
        Console.WriteLine("Evento adicionado com sucesso!");
    }

    public void AdicionarProjeto()
    {
        Console.Write("Nome do projeto: ");
        string nome = Console.ReadLine();
        Console.Write("Status (Não Iniciado/Em Andamento/Concluido): ");
        string status = Console.ReadLine();
        Projeto novoProjeto = new Projeto(nome, status);

        Console.Write("O projeto terá arrecadações? (S/N): ");
        if (Console.ReadLine().ToUpper() == "S")
        {
            Console.Write("Qual será o valor da arrecadação? ");
            novoProjeto.Arrecadacao = double.Parse(Console.ReadLine());
        }

        Console.Write("Quantos Colaboradores esse projeto terá? (mínimo 1): ");
        int qtdColaboradores = Math.Max(1, int.Parse(Console.ReadLine()));
        for (int i = 0; i < qtdColaboradores; i++)
        {
            Console.Write($"Nome completo do Colaborador {i + 1}: ");
            novoProjeto.ListaColaboradores.Add(Console.ReadLine());
        }

        projetos.Add(novoProjeto);
        Console.WriteLine("Projeto adicionado com sucesso!");
    }

    public void ExibirProjetos()
    {
        Console.WriteLine("\nProjetos cadastrados:");
        foreach (var p in projetos)
        {
            Console.WriteLine($"Projeto: {p.Nome} | Status: {p.Status} | Colaboradores: {p.ListaColaboradores.Count}");
        }
    }

    public void ExibirEventosOrdenados()
    {
        var ordenados = eventos.OrderBy(e => e.Data).ToList();
        Console.WriteLine("\nEventos ordenados por data:");
        foreach (var e in ordenados)
            Console.WriteLine($"{e.Titulo} - {e.Tipo} - {e.Data:dd/MM/yyyy} às {e.Horario} - {e.Local} - Status: {e.Status}");
    }

    public void FiltrarEventosPorTipo()
    {
        Console.Write("Digite o tipo de evento: ");
        string tipo = Console.ReadLine();
        var filtrados = eventos.Where(e => Normalizar(e.Tipo) == Normalizar(tipo)).ToList();

        if (filtrados.Count == 0)
            Console.WriteLine("Nenhum evento encontrado.");
        else
        {
            Console.WriteLine("Eventos encontrados:");
            foreach (var e in filtrados)
                Console.WriteLine($"{e.Titulo} - {e.Data:dd/MM/yyyy} - {e.Local}");
        }
    }

    public void BuscarEventoPorPessoa(string tipoPessoa)
    {
        Console.Write($"Digite o nome do {tipoPessoa} para buscar: ");
        string nomeBusca = Normalizar(Console.ReadLine());
        bool encontrado = false;
        Console.WriteLine("\nResultados Encontrados:");

        foreach (var evento in eventos)
        {
            List<string> lista = tipoPessoa == "participante" ? evento.ListaParticipantes : evento.ListaPalestrantes;
            foreach (var nome in lista)
            {
                if (Normalizar(nome).Contains(nomeBusca))
                {
                    Console.WriteLine($"{nome} - Evento: {evento.Titulo} | Local: {evento.Local} | Data: {evento.Data:dd/MM/yyyy} às {evento.Horario}");
                    encontrado = true;
                }
            }
        }

        if (tipoPessoa == "palestrante")
        {
            foreach (var projeto in projetos)
            {
                foreach (var nome in projeto.ListaColaboradores)
                {
                    if (Normalizar(nome).Contains(nomeBusca))
                    {
                        Console.WriteLine($"{nome} - Projeto: {projeto.Nome} | Status: {projeto.Status}");
                        encontrado = true;
                    }
                }
            }
        }

        if (!encontrado)
            Console.WriteLine($"Nenhum evento encontrado com esse {tipoPessoa}.");
    }

    public void EditarEventoOuProjeto()
    {
        Console.Write("Deseja editar um Evento ou Projeto? (E/P): ");
        string escolha = Console.ReadLine().ToUpper();

        if (escolha == "E")
        {
            Console.Write("Digite o título do evento: ");
            string titulo = Console.ReadLine();
            var evento = eventos.FirstOrDefault(e => Normalizar(e.Titulo) == Normalizar(titulo));
            if (evento == null)
            {
                Console.WriteLine("Evento não encontrado.");
                return;
            }

            Console.WriteLine($"\nTítulo: {evento.Titulo}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") evento.Titulo = Console.ReadLine();
            Console.WriteLine($"Tipo: {evento.Tipo}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") evento.Tipo = Console.ReadLine();
            Console.WriteLine($"Data: {evento.Data:dd/MM/yyyy}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") evento.Data = DateTime.ParseExact(Console.ReadLine(), "dd/MM/yyyy", CultureInfo.InvariantCulture);
            Console.WriteLine($"Horário: {evento.Horario}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") evento.Horario = Console.ReadLine();
            Console.WriteLine($"Local: {evento.Local}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") evento.Local = Console.ReadLine();
            Console.WriteLine($"Status: {evento.Status}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") evento.Status = Console.ReadLine();

            Console.Write("Deseja editar o valor da arrecadação? (S/N): ");
            if (Console.ReadLine().ToUpper() == "S")
            {
                Console.Write("O evento terá arrecadações? (S/N): ");
                if (Console.ReadLine().ToUpper() == "S")
                {
                    Console.Write("Qual será o valor da arrecadação? ");
                    evento.Arrecadacao = double.Parse(Console.ReadLine());
                }
                else evento.Arrecadacao = null;
            }
        }
        else if (escolha == "P")
        {
            Console.Write("Digite o nome do projeto: ");
            string nome = Console.ReadLine();
            var projeto = projetos.FirstOrDefault(p => Normalizar(p.Nome) == Normalizar(nome));
            if (projeto == null)
            {
                Console.WriteLine("Projeto não encontrado.");
                return;
            }

            Console.WriteLine($"Nome: {projeto.Nome}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") projeto.Nome = Console.ReadLine();
            Console.WriteLine($"Status: {projeto.Status}"); Console.Write("Editar? (S/N): "); if (Console.ReadLine().ToUpper() == "S") projeto.Status = Console.ReadLine();

            Console.Write("Deseja editar o valor da arrecadação? (S/N): ");
            if (Console.ReadLine().ToUpper() == "S")
            {
                Console.Write("O projeto terá arrecadações? (S/N): ");
                if (Console.ReadLine().ToUpper() == "S")
                {
                    Console.Write("Qual será o valor da arrecadação? ");
                    projeto.Arrecadacao = double.Parse(Console.ReadLine());
                }
                else projeto.Arrecadacao = null;
            }
        }
    }

    public void TotalArrecadacoes()
    {
        double total = 0;
        Console.WriteLine("\n==== Total das Arrecadações ====");
        Console.WriteLine($"{"Descrição",-35} | {"Tipo",-15} | {"Valor (R$)",10}");
        Console.WriteLine(new string('-', 65));
        foreach (var e in eventos)
        {
            if (e.Arrecadacao.HasValue)
            {
                Console.WriteLine($"{e.Titulo + " - " + e.Tipo,-35} | {"Evento",-15} | {e.Arrecadacao.Value,10:F2}");
                total += e.Arrecadacao.Value;
            }
        }
        foreach (var p in projetos)
        {
            if (p.Arrecadacao.HasValue)
            {
                Console.WriteLine($"{p.Nome + " - Projeto",-35} | {"Projeto",-15} | {p.Arrecadacao.Value,10:F2}");
                total += p.Arrecadacao.Value;
            }
        }
        Console.WriteLine(new string('-', 65));
        Console.WriteLine($"{"Total",-35} | {"",-15} | {total,10:F2}");
    }

    public void BuscarPorIntervaloDatasETipoOuStatus()
    {
        Console.Write("Data inicial (dd/MM/yyyy): ");
        DateTime dataInicial;
        while (!DateTime.TryParseExact(Console.ReadLine(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dataInicial))
            Console.Write("Formato inválido! Digite novamente (dd/MM/yyyy): ");

        Console.Write("Data final (dd/MM/yyyy): ");
        DateTime dataFinal;
        while (!DateTime.TryParseExact(Console.ReadLine(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out dataFinal))
            Console.Write("Formato inválido! Digite novamente (dd/MM/yyyy): ");

        Console.Write("Deseja buscar por Eventos (E) ou Projetos (P)? ");
        string escolha = Console.ReadLine().ToUpper();

        if (escolha == "E")
        {
            Console.Write("Digite o tipo de evento: ");
            string tipo = Console.ReadLine();

            var eventosFiltrados = eventos.Where(e =>
                e.Data >= dataInicial &&
                e.Data <= dataFinal &&
                Normalizar(e.Tipo) == Normalizar(tipo)).ToList();

            Console.WriteLine("\n=== Eventos encontrados ===");
            if (eventosFiltrados.Count == 0)
                Console.WriteLine("Nenhum evento encontrado.");
            else
                foreach (var e in eventosFiltrados)
                    Console.WriteLine($"{e.Titulo} - {e.Tipo} - {e.Data:dd/MM/yyyy} às {e.Horario} - {e.Local} - Status: {e.Status}");
        }
        else if (escolha == "P")
        {
            Console.Write("Digite o status do projeto: ");
            string status = Console.ReadLine();

            var projetosFiltrados = projetos.Where(p =>
                Normalizar(p.Status) == Normalizar(status)).ToList();

            Console.WriteLine("\n=== Projetos encontrados ===");
            if (projetosFiltrados.Count == 0)
                Console.WriteLine("Nenhum projeto encontrado.");
            else
                foreach (var p in projetosFiltrados)
                    Console.WriteLine($"{p.Nome} - Status: {p.Status} - Arrecadação: {(p.Arrecadacao.HasValue ? p.Arrecadacao.Value.ToString("C2") : "Sem valor")}");
        }
        else
        {
            Console.WriteLine("Opção inválida.");
        }
    }
}

class Program
{
    static void Main()
    {
        Dashboard dashboard = new Dashboard();
        Console.Write("Você é um administrador? (S/N): ");
        if (Console.ReadLine().ToUpper() != "S")
        {
            Console.WriteLine("Acesso negado.");
            return;
        }

        while (true)
        {
            Console.WriteLine("\n1 - Adicionar Evento");
            Console.WriteLine("2 - Exibir Eventos Ordenados");
            Console.WriteLine("3 - Filtrar Eventos por Tipo");
            Console.WriteLine("4 - Adicionar Projeto");
            Console.WriteLine("5 - Exibir Projetos");
            Console.WriteLine("6 - Buscar Evento por Participante");
            Console.WriteLine("7 - Buscar Evento/Projeto por Palestrante/Colaborador");
            Console.WriteLine("8 - Editar Evento ou Projeto");
            Console.WriteLine("9 - Total das Arrecadações");
            Console.WriteLine("10 - Buscar por intervalo de datas e tipo/status");
            Console.WriteLine("11 - Sair");
            Console.Write("Escolha uma opção: ");
            switch (Console.ReadLine())
            {
                case "1": dashboard.AdicionarEvento(); break;
                case "2": dashboard.ExibirEventosOrdenados(); break;
                case "3": dashboard.FiltrarEventosPorTipo(); break;
                case "4": dashboard.AdicionarProjeto(); break;
                case "5": dashboard.ExibirProjetos(); break;
                case "6": dashboard.BuscarEventoPorPessoa("participante"); break;
                case "7": dashboard.BuscarEventoPorPessoa("palestrante"); break;
                case "8": dashboard.EditarEventoOuProjeto(); break;
                case "9": dashboard.TotalArrecadacoes(); break;
                case "10": dashboard.BuscarPorIntervaloDatasETipoOuStatus(); break;
                case "11": return;
                default: Console.WriteLine("Opção inválida!"); break;
            }
        }
    }
}
