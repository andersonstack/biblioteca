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

    customElements.whenDefined("input-button").then(() => {
      const busca = this.shadow.querySelector("input-button") as any;
      if (busca?.setTarget) busca.setTarget(this.shadow, ".livros_colecao");
    });
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
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--poppins);
        }

        #colecao_livros {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .container_titulo {
          width: 100%;
          background-color: var(--onPrimary);
          color: var(--branco-gelo);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
        }

        .container_titulo h2 {
          font-size: clamp(1.25rem, 2.5vw, 2rem);
          font-weight: 600;
          margin: 0;
        }

        .livro_container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }

        .livros_colecao {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
          gap: 1.5rem;
          justify-items: center;
          width: 100%;
          max-width: 1280px;
          padding: 1rem;
        }

        @media (min-width: 480px) {
          .container_titulo {
            justify-content: space-between;
            padding: 1rem 2rem;
          }

          .livros_colecao {
            gap: 2rem;
          }
        }

        @media (min-width: 768px) {
          .livros_colecao {
            grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
            padding: 2rem;
          }
        }

        @media (min-width: 1024px) {

          .container_titulo {
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
          }

          .container_titulo h2 {
            font-size: 1.5rem;
          }

          .livros_colecao {
            gap: 2.5rem;
          }
        }

        @media (min-width: 1280px) {
          .livros_colecao {
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
            padding: 2rem 3rem;
          }
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
