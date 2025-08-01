import "../components/nav.js";
import "../components/text_button.js";
import "../components/livro_estante.js";

class TelaPerfil extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.setup();
    this.render();
  }

  setup() {
    window.addEventListener("DOMContentLoaded", () => {
      const containerAtivos = this.shadowRoot!.querySelector("#estante-livros-ativos");
      const containerVencidos = this.shadowRoot!.querySelector("#estante-livros-vencidos");

      if (!containerAtivos || !containerVencidos) return;

      const livrosJSON = sessionStorage.getItem("livrosEmprestados");
      if (!livrosJSON) return;

      try {
        const livros = JSON.parse(livrosJSON);
        const hoje = new Date();

        livros.forEach((livro: any) => {
          const vencimento = new Date(livro.data_vencimento);
          const livroElement = document.createElement("livro-estante") as any;
          livroElement.setAttribute("esconder-disponibilidade", "");
          livroElement.data = {
            titulo: livro.titulo,
            imagem: `http://localhost:3000${livro.imagem_caminho}`,
          };

          if (vencimento >= hoje) {
            containerAtivos.appendChild(livroElement);
          } else {
            if (livro.devolucao === 0){
              containerVencidos.appendChild(livroElement);
            }
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
          font-family: "Poppins";
        }

        .container__perfil {
          display: flex;
          flex-direction: column;
          background-color: var(--primary);
          height: 100vh;
          padding: 1rem;
          overflow: hidden;
        }

        .container__emprestimo {
          margin-top: 1rem;
          background-color: var(--branco-gelo);
          border: 1px solid var(--destaque);
          border-radius: 0.625rem;
          padding: 1rem;
          overflow-y: auto;
          flex: 1;
        }

        .container__titulo {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--onPrimary);
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        .estante {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          width: 100%;
        }

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

        @media (min-width: 600px) {
          .estante {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      </style>

      <section class="container__perfil" aria-label="Perfil do Usuário">
        <section class="container__emprestimo">
          <h2 class="container__titulo">Meus empréstimos ativos</h2>
          <div class="estante" id="estante-livros-ativos"></div>

          <h2 class="container__titulo">Empréstimos vencidos</h2>
          <div class="estante" id="estante-livros-vencidos"></div>
        </section>
      </section>
    `;
  }
}

customElements.define("tela-perfil", TelaPerfil);
