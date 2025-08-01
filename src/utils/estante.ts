import { getLivros } from "../service/connection.js";
import { LivroBD, LivroCache } from "../interfaces/livros_api.js";
import "../components/livro_estante.js";

const CACHE_KEY = "livros";
const CACHE_TTL = 1000 * 60 * 10;

export async function renderLivros() {
  document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".livros_colecao");

    // Tenta carregar do cache
    const cacheRaw = sessionStorage.getItem(CACHE_KEY);
    let livros: LivroBD[] = [];

    if (cacheRaw) {
      try {
        const cache: LivroCache = JSON.parse(cacheRaw);

        const agora = Date.now();
        if (agora - cache.timestamp < CACHE_TTL) {
          livros = cache.livros;
          console.log("Usando livros do cache ✅");
        } else {
          console.log("Cache expirado ❌");
        }
      } catch (e) {
        console.warn("Erro ao ler o cache:", e);
      }
    }

    // Se não tiver cache válido, busca do backend
    if (livros.length === 0) {
      console.log("🌐 Buscando livros da API");
      await getLivros(); // só grava no sessionStorage

      // Agora relê os livros do cache
      const novosDados = sessionStorage.getItem(CACHE_KEY);
      if (novosDados) {
        try {
          const novoCache: LivroCache = JSON.parse(novosDados);
          livros = novoCache.livros;
        } catch (e) {
          console.warn("Erro ao reler cache após fetch", e);
        }
      }
    }

    // Renderiza os livros
    livros.forEach((livroRaw: LivroBD) => {
      const livro = {
        titulo: livroRaw.titulo,
        imagem: `http://localhost:3000${livroRaw.imagem_caminho}`,
        disponivel: livroRaw.disponibilidade,
      };

      const elemento = document.createElement("livro-estante") as any;
      elemento.data = livro;
      container!.appendChild(elemento);
    });
  });
}
