interface LivroBD {
  titulo: string;
  imagem_caminho: string;
  disponivel: boolean;
}

export function renderLivros() {
  document.addEventListener("DOMContentLoaded", () => {
    const livros = JSON.parse(localStorage.getItem("livros") || "[]");

    const container = document.querySelector(".livros_colecao");

    livros.forEach((livroRaw: LivroBD) => {
      const livro = {
        titulo: livroRaw.titulo,
        imagem: `http://localhost:3000${livroRaw.imagem_caminho}`,
        disponivel: livroRaw.disponivel,
      };

      const elemento = document.createElement("livro-estante") as LivroEstante;
      elemento.data = livro;
      container!.appendChild(elemento);
    });
  });
}
