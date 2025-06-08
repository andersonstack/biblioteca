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
          background-color: var(--bege);
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          font-family: Arial, sans-serif;
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

        .menu {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 40%;
        }

        .menu__principal {
          display: flex;
          align-items: center;
        }

        .menu__user {
          display: flex;
          align-items: center;
          gap: 5rem;
          padding: 1rem;
        }

      </style>

      <nav>
        <img src="./src/assets/icons/logo.png" alt="Logo da Biblioteca" />

        <section aria-label="Menu" class="menu">
          <section aria-label="Menu principal" class="menu__principal">
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#">Estante</a></li>
            </ul>
          </section>

          
          <section aria-label="Acesso ao usuário" class="menu__user">
          <input-button></input-button>
            <a href="#">Entrar</a>
            <a href="#">Cadastrar-se</a>
          </section>
        </section>

      </nav>
    `;
  }
}

customElements.define("my-nav", MyNav);
