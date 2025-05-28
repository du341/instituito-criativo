using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

class Evento
{
    public string Titulo { get; set; }
    public string Tipo { get; set; } // Atividade, Palestra, Workshop, Curso
    public DateTime Data { get; set; }
    public string Local { get; set; }
    public int Participantes { get; set; }
    public double Arrecadacao { get; set; }

    public Evento(string titulo, string tipo, DateTime data, string local, int participantes, double arrecadacao)
    {
        Titulo = titulo;
        Tipo = tipo;
        Data = data;
        Local = local;
        Participantes = participantes;
        Arrecadacao = arrecadacao;
    }
}

class Projeto
{
    public string Nome { get; set; }
    public string Status { get; set; } // Em andamento, Concluído
    public int Colaboradores { get; set; }

    public Projeto(string nome, string status, int colaboradores)
    {
        Nome = nome;
        Status = status;
        Colaboradores = colaboradores;
    }
}

class Dashboard
{
    private List<Evento> eventos = new List<Evento>();
    private List<Projeto> projetos = new List<Projeto>();

    public void AdicionarEvento()
    {
        Console.Write("Título: ");
        string titulo = Console.ReadLine();

        Console.Write("Tipo (Atividade, Palestra, Workshop, Curso): ");
        string tipo = Console.ReadLine();

        Console.Write("Data (dd/MM/yyyy): ");
        DateTime data;
        while (!DateTime.TryParseExact(Console.ReadLine(), "dd/MM/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out data))
        {
            Console.Write("Formato inválido! Digite novamente (dd/MM/yyyy): ");
        }

        Console.Write("Local: ");
        string local = Console.ReadLine();

        Console.Write("Número de participantes: ");
        int participantes = int.Parse(Console.ReadLine());

        Console.Write("Arrecadação: ");
        double arrecadacao = double.Parse(Console.ReadLine());

        eventos.Add(new Evento(titulo, tipo, data, local, participantes, arrecadacao));
    }

    public void ExibirEventosOrdenados()
    {
        eventos = eventos.OrderBy(e => e.Data).ToList();

        Console.WriteLine("\nEventos Ordenados por Data:");
        foreach (var e in eventos)
        {
            Console.WriteLine($"{e.Titulo} - {e.Tipo} - {e.Data.ToString("dd/MM/yyyy")} - {e.Local} - {e.Participantes} participantes - R${e.Arrecadacao}");
        }
    }

    public void AdicionarProjeto()
    {
        Console.Write("Nome do projeto: ");
        string nome = Console.ReadLine();

        Console.Write("Status (Em andamento/Concluído): ");
        string status = Console.ReadLine();

        Console.Write("Número de colaboradores: ");
        int colaboradores = int.Parse(Console.ReadLine());

        projetos.Add(new Projeto(nome, status, colaboradores));
    }

    public void ExibirProjetos()
    {
        Console.WriteLine("\nProjetos:");
        foreach (var p in projetos)
        {
            Console.WriteLine($"{p.Nome} - {p.Status} - {p.Colaboradores} colaboradores");
        }
    }

    public void FiltrarEventosPorTipo()
    {
        Console.Write("Filtrar por tipo de evento: ");
        string tipoFiltro = Console.ReadLine();

        var eventosFiltrados = eventos.Where(e => e.Tipo.ToLower() == tipoFiltro.ToLower()).ToList();

        if (eventosFiltrados.Count == 0)
        {
            Console.WriteLine("Nenhum evento encontrado para esse tipo.");
            return;
        }

        Console.WriteLine($"\nEventos do tipo {tipoFiltro}:");
        foreach (var e in eventosFiltrados)
        {
            Console.WriteLine($"{e.Titulo} - {e.Data.ToString("dd/MM/yyyy")} - {e.Local} - {e.Participantes} participantes");
        }
    }
}

class Program
{
    static void Main()
    {
        Dashboard dashboard = new Dashboard();

        Console.Write("Você é um administrador? (S/N): ");
        string isAdmin = Console.ReadLine();

        if (isAdmin.ToUpper() == "S")
        {
            while (true)
            {
                Console.WriteLine("\n1 - Adicionar Evento");
                Console.WriteLine("2 - Exibir Eventos Ordenados");
                Console.WriteLine("3 - Filtrar Eventos por Tipo");
                Console.WriteLine("4 - Adicionar Projeto");
                Console.WriteLine("5 - Exibir Projetos");
                Console.WriteLine("6 - Sair");
                Console.Write("Escolha uma opção: ");
                int opcao = int.Parse(Console.ReadLine());

                switch (opcao)
                {
                    case 1:
                        dashboard.AdicionarEvento();
                        break;
                    case 2:
                        dashboard.ExibirEventosOrdenados();
                        break;
                    case 3:
                        dashboard.FiltrarEventosPorTipo();
                        break;
                    case 4:
                        dashboard.AdicionarProjeto();
                        break;
                    case 5:
                        dashboard.ExibirProjetos();
                        break;
                    case 6:
                        return;
                    default:
                        Console.WriteLine("Opção inválida!");
                        break;
                }
            }
        }
        else
        {
            Console.WriteLine("Acesso negado. Apenas administradores podem acessar o dashboard.");
        }
    }
}
