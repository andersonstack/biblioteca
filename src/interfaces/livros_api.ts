export interface Livro {
  id: number;
  titulo: string;
  imagem_caminho: string;
  disponibilidade: number;
  descricao: string;
}

export interface LivroCarroussel extends Livro {
  ano: number
}

export interface LivroCache {
  livros: Livro[];
  timestamp: number;
}

export interface LivroEmprestimo {
  userName: string,
  idBook: number,
}

export interface LivroDevolucao {
  userName: string,
  titleBook: string,
}

export interface LivroCadastro {
  id?: number;
  titulo: string;
  descricao: string;
  ano: string;
  imagem_caminho: string;
  disponibilidade: boolean;
}