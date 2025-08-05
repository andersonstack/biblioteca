import { getLivros } from "../service/connection.js";
import { Livro, LivroCache } from "../interfaces/livros_api.js";
import "./livro_estante.js";
import "./input_button.js";

const CACHE_KEY = "livros";
const CACHE_TTL = 1000 * 60 * 10; // 10 minutos

class EstanteComponent extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.carregarLivros();
  }

  private async carregarLivros() {
    const container = this.shadow.querySelector(".livros_colecao");

    let livros: Livro[] = [];

    // Tenta usar o cache
    const cacheRaw = sessionStorage.getItem(CACHE_KEY);
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

    // Se necessário, busca do backend
    if (livros.length === 0) {
      console.log("🌐 Buscando livros da API");
      await getLivros();

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
    livros.forEach((livro: Livro) => {
      const elemento = document.createElement("livro-estante") as any;
      elemento.data = livro;
      container!.appendChild(elemento);
    });
  }

  private render() {
    this.shadow.innerHTML =`
      <style>
        #colecao_livros {
          overflow: hidden;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .container_titulo {
          width: 100%;
          background-color: var(--onPrimary);
          padding: 1.5rem;
          font-weight: 600;
          font-size: 1.8rem;
          text-align: center;
          color: var(--branco-gelo);
          font-family: var(--poppins);
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: space-evenly;
          gap: 1rem;
        }

        .livro_container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
          width: 100%;
        }

        .livros_colecao {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
          gap: 2rem;
          justify-items: center;
          width: 100%;
          max-width: 1200px;
          padding: 1rem;
        }

        h2 {
            font-size: clamp(1rem, 1vw + 1rem, 1.5rem);
        }
      </style>

      <section id="colecao_livros">
        <div class="container_titulo">
          <h2>Estante de Livros</h2>
          <input-button id="buscar_livro"></input-button>
        </div>
        <div class="livros_colecao"></div>
      </section>
    `;
  }
}

customElements.define("estante-component", EstanteComponent);
