export interface LivroBD {
  titulo: string;
  imagem_caminho: string;
  disponibilidade: boolean;
}

export interface LivroCache {
  livros: LivroBD[];
  timestamp: number;
}

export interface LivroCadastro {
  titulo: string;
  descricao: string;
  ano: string;
  imagem: string;
  disponivel: boolean;
}