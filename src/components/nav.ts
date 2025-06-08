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
          width: auto;
        }

      </style>

      <nav>
        <img src="./src/assets/icons/logo.png" alt="Logo da Biblioteca" />

        <section aria-label="Menu" class="menu">
          <section aria-label="Menu principal" class="menu__principal">
            <ul>
              <li><text-button href="#">Início</text-button></li>
              <li><text-button href="#">Estante</text-button></li>
            </ul>
          </section>

          
          <section aria-label="Acesso ao usuário" class="menu__user">
          <input-button></input-button>
            <text-button href="./login.html">Entrar</text-button>
            <text-button href="./singup.html" class="with_background">Cadastrar-se</text-button>
          </section>
        </section>

      </nav>
    `;
  }
}

customElements.define("my-nav", MyNav);
