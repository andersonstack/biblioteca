import "../components/livro_estante.js";

class TelaPerfil extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const nome = sessionStorage.getItem("name");
    const userName = sessionStorage.getItem("userName");

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          all: initial;
        }

        .container__perfil {
          display: flex;
          flex-direction: column;
          background-color: var(--primary);
          height: 100vh;
          padding: 1rem;
          overflow: hidden;
        }

        .container__informacoes {
          background-color: var(--secondary);
          color: var(--onSecondary);
          padding: 1rem;
          border-radius: 8px;
          font-family: var(--poppins);
        }

        .container__informacoes h2 {
          margin: 0.2rem 0;
        }

        .container__emprestimo {
          margin-top: 1rem;
          background-color: var(--branco-gelo);
          border: 1px solid var(--destaque);
          border-radius: 8px;
          padding: 1rem;
          overflow-y: auto;
          flex: 1;
        }

        .container__titulo {
          font-family: var(--poppins);
          font-size: 1.2rem;
          color: var(--onPrimary);
          margin-bottom: 0.5rem;
        }

        .estante {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
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
      </style>
      
      <section class="container__perfil" aria-label="Perfil do Usuário">
        <div class="container__informacoes">
          <h2 aria-label="Nome do usuário">${nome}</h2>
          <h2 aria-label="Username">${userName}</h2>
        </div>

        <section class="container__emprestimo">
          <h2 class="container__titulo" aria-label="Título da sessão">
            Meus empréstimos
          </h2>
          <div class="estante" id="estante-livros"></div>
        </section>
      </section>
    `;
  }
}

customElements.define("tela-perfil", TelaPerfil);
