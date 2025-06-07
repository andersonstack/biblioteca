class MyNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        nav {
          display: flex;
          gap: 1rem;
          background-color: var(--bege);
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          font-family: Arial, sans-serif;
        }

        section {
          margin-bottom: 1rem;
        }

        ul {
          list-style: none;
          padding: 0;
          display: flex;
          gap: 1rem;
        }

        a {
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }

        input[type="text"] {
          padding: 0.4rem;
          font-size: 1rem;
          width: 200px;
        }

      </style>

      <nav>
        <img src="./src/assets/icons/logo.png" alt="Logo da Biblioteca" />

        <section aria-label="Menu principal">
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Estante</a></li>
          </ul>
        </section>

        <section aria-label="Buscar de livro" role="search">
          <input type="text" placeholder="Busque um livro" aria-label="Buscar por nome do livro" />
          <my-button aria-label="Pesquisar livro">
            <img src="./src/assets/icons/lupa.png" alt="Lupa" />
          </my-button>
        </section>

        <section aria-label="Acesso ao usuário">
          <a href="#">Entrar</a>
          <a href="#">Cadastrar-se</a>
        </section>
      </nav>
    `;
  }
}

customElements.define("my-nav", MyNav);
