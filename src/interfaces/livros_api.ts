export interface LivroBD {
  titulo: string;
  imagem_caminho: string;
  disponivel: boolean;
}

export interface LivroCache {
  livros: LivroBD[];
  timestamp: number;
}
