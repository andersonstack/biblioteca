import "../components/nav.js";
import "../components/text_button.js";
import "../components/livro_estante.js";

class TelaPerfil extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setup();
    this.render();
  }

  setup() {
    window.addEventListener("DOMContentLoaded", () => {
      const containerAtivos = this.shadowRoot!.querySelector(
        "#estante-livros-ativos"
      );
      const containerVencidos = this.shadowRoot!.querySelector(
        "#estante-livros-vencidos"
      );

      if (!containerAtivos || !containerVencidos) return;

      const livrosJSON = sessionStorage.getItem("livrosEmprestados");
      if (!livrosJSON) return;

      try {
        const livros = JSON.parse(livrosJSON);
        if (livros === null) return;

        const hoje = new Date();

        livros.forEach((livro: any) => {
          const vencimento = new Date(livro.data_vencimento);
          const livroElement = document.createElement("livro-estante") as any;
          livroElement.setAttribute("esconder-disponibilidade", "");
          livroElement.data = {
            titulo: livro.titulo,
            imagem_caminho: livro.imagem_caminho,
          };

          if (vencimento >= hoje) {
            containerAtivos.appendChild(livroElement);
          } else if (livro.devolucao === 0) {
            containerVencidos.appendChild(livroElement);
          }
        });
      } catch (error) {
        console.error("Erro ao processar os livros emprestados:", error);
      }
    });
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          font-family: "Poppins", sans-serif;
        }

        .container__perfil {
          display: flex;
          flex-direction: column;
          background-color: var(--primary);
          min-height: 100vh;
          padding: 1rem;
        }

        .container__emprestimo {
          margin-top: 1rem;
          background-color: var(--branco-gelo);
          border: 1px solid var(--destaque);
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .titulo {
          background-color: var(--onPrimary);
          color: var(--branco-gelo);
          padding: 0.75rem 1rem;
          font-size: 1.4rem;
          font-weight: 600;
          border-radius: 0.5rem;
          text-align: center;
        }

        .coluna {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .estante {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
        }

        /* Scrollbar customizado */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: var(--destaque);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-track {
          background-color: transparent;
        }

        /* RESPONSIVO */

        @media (min-width: 768px) {
          .estante {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .container__emprestimo {
            flex-direction: row;
            justify-content: space-between;
          }

          .coluna {
            flex: 1;
          }

          .titulo {
            font-size: 1.6rem;
            text-align: left;
          }
        }

        @media (min-width: 1280px) {
          .estante {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          }
        }
      </style>

      <my-nav></my-nav>
      <section class="container__perfil" aria-label="Perfil do Usuário">
        <section class="container__emprestimo">
          <div class="coluna">
            <div class="titulo">Meus empréstimos ativos</div>
            <div class="estante" id="estante-livros-ativos"></div>
          </div>
          <div class="coluna">
            <div class="titulo">Empréstimos vencidos</div>
            <div class="estante" id="estante-livros-vencidos"></div>
          </div>
        </section>
      </section>
    `;
  }
}

customElements.define("tela-perfil", TelaPerfil);
