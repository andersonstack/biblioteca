interface LivroBD {
  titulo: string;
  imagem_caminho: string;
}

export function renderLivros() {
  document.addEventListener("DOMContentLoaded", () => {
    const livros = JSON.parse(localStorage.getItem("livros") || "[]");

    const container = document.querySelector(".livros_colecao");

    livros.forEach((livroRaw: LivroBD) => {
      const livro = {
        titulo: livroRaw.titulo,
        imagem: `http://localhost:3000${livroRaw.imagem_caminho}`,
        disponivel: Math.random() > 0.5,
      };

      const elemento = document.createElement("livro-estante") as LivroEstante;
      elemento.data = livro;
      container!.appendChild(elemento);
    });
  });
}
