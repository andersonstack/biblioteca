export interface Livro {
  id: number;
  titulo: string;
  imagem_caminho: string;
  disponibilidade: number;
  descricao: string;
}

export interface LivroCache {
  livros: Livro[];
  timestamp: number;
}

export interface LivroCadastro {
  titulo: string;
  descricao: string;
  ano: string;
  imagem: string;
  disponivel: boolean;
}