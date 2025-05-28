using System;
using System.Collections.Generic;
using System.Linq;

// Classe Evento
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

// Classe Projeto
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

// Classe Usuário (para autenticação)
class Usuario
{
    public string Nome { get; set; }
    public string Tipo { get; set; } // Administrador ou Comum

    public Usuario(string nome, string tipo)
    {
        Nome = nome;
        Tipo = tipo;
    }
}

// Classe principal do sistema
class Sistema
{
    private List<Evento> eventos = new List<Evento>();
    private List<Projeto> projetos = new List<Projeto>();
    private Usuario usuarioAtual;

    public void Login()
    {
        Console.Write("Nome de usuário: ");
        string nome = Console.ReadLine();

        Console.Write("Tipo de usuário (Administrador/Comum): ");
        string tipo = Console.ReadLine();

        usuarioAtual = new Usuario(nome, tipo);

        Console.WriteLine($"\nBem-vindo, {usuarioAtual.Nome} ({usuarioAtual.Tipo})");
    }

    public void AdicionarEvento()
    {
        if (usuarioAtual == null || usuarioAtual.Tipo != "Administrador")
        {
            Console.WriteLine("Apenas administradores podem adicionar eventos.");
            return;
        }

        Console.Write("Título: ");
        string titulo = Console.ReadLine();

        Console.Write("Tipo (Atividade, Palestra, Workshop, Curso): ");
        string tipo = Console.ReadLine();

        Console.Write("Data (yyyy-mm-dd): ");
        DateTime data = DateTime.Parse(Console.ReadLine());

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
            Console.WriteLine($"{e.Titulo} - {e.Tipo} - {e.Data.ToShortDateString()} - {e.Local} - {e.Participantes} participantes - R${e.Arrecadacao}");
        }
    }

    public void AdicionarProjeto()
    {
        if (usuarioAtual == null || usuarioAtual.Tipo != "Administrador")
        {
            Console.WriteLine("Apenas administradores podem adicionar projetos.");
            return;
        }

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

    public void Executar()
    {
        Login();

        while (true)
        {
            Console.WriteLine("\n1 - Adicionar Evento");
            Console.WriteLine("2 - Exibir Eventos Ordenados");
            Console.WriteLine("3 - Adicionar Projeto");
            Console.WriteLine("4 - Exibir Projetos");
            Console.WriteLine("5 - Sair");
            Console.Write("Escolha uma opção: ");
            int opcao = int.Parse(Console.ReadLine());

            switch (opcao)
            {
                case 1:
                    AdicionarEvento();
                    break;
                case 2:
                    ExibirEventosOrdenados();
                    break;
                case 3:
                    AdicionarProjeto();
                    break;
                case 4:
                    ExibirProjetos();
                    break;
                case 5:
                    return;
                default:
                    Console.WriteLine("Opção inválida!");
                    break;
            }
        }
    }
}

class Program
{
    static void Main()
    {
        Sistema sistema = new Sistema();
        sistema.Executar();
    }
}
