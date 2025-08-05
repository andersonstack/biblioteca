import "./text_button.js";
import "./input.js";
import "./button.js";
import "./hello_text.js";
import { getDecodedToken } from "../service/configure.js";

class MyNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupMenuToggle();
    this.setupLogoutHandler();
    this.setupResizeHandler();
  }

  getUserName(): string | null {
    return sessionStorage.getItem("name");
  }

  isAuthenticated(): boolean {
    return !!this.getUserName();
  }

  setupResizeHandler() {
    const menu = this.shadowRoot?.querySelector(".menu");

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        menu?.classList.remove("active");
      }
    };

    window.addEventListener("resize", handleResize);

    // Opcional: remove o listener ao destruir o componente
    this.addEventListener("disconnected", () => {
      window.removeEventListener("resize", handleResize);
    });
  }

  renderUserSection(): string {
    const userName = this.getUserName();
    if (this.isAuthenticated()) {
      return `
        <hello-text>Olá, ${userName}!</hello-text>
        <text-button id="logout-btn" href="./login.html" class="with_background">Sair</text-button>
      `;
    } else {
      return `
        <text-button href="./login.html">Entrar</text-button>
        <text-button href="./singup.html" class="with_background">Cadastrar-se</text-button>
      `;
    }
  }

  render() {
    const isAdmin = getDecodedToken()?.role === "admin";

    this.shadowRoot!.innerHTML = `
    <style>
      :host {
        font-family: var(--poppins);
      }

      @keyframes rotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .rotate {
        animation: rotation 0.5s linear;
      }

      nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: var(--onPrimary);
        position: relative;
        overflow-x: clip;
      }

      .logo__icon {
        width: 3rem;
        height: auto;
        border-radius: 50%;
        cursor: pointer;
      }

      div {
        display: flex;
        align-items: center;
        gap: 1.5rem;
      }

      div img {
        width: 2rem;
        display: block;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      a {
        text-decoration: none;
        color: #333;
        font-weight: bold;
      }

      .menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 100%;
        width: 100%;
        padding: 1rem 1rem 0 1rem;
        gap: 1.5rem;
        background-color: var(--primary);
        border-radius: 0 0 1rem 1rem;
        z-index: 2;

        transform: translateX(100%);
        opacity: 0;
        visibility: hidden;
        transition: transform 0.4s ease, opacity 0.3s ease;
      }

      .menu.active {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
      }

      .menu__principal,
      .menu__user {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
      }

      .menu__user text-button {
        width: 100%;
        text-align: center;
      }

      /* Breakpoints */
      @media (min-width: 480px) {
        /* sm */
        ul {
          flex-direction: column;
          align-items: center;
        }

        div {
          gap: 2rem;
        }
      }

      @media (min-width: 768px) {
        /* md */
        .menu {
          display: flex;
          flex-direction: row;
          position: static;
          padding: 0;
          background-color: transparent;
          border-radius: 0;
          transform: none;
          opacity: 1;
          visibility: visible;
        }

        div img {
          display: none;
        }

        .menu__principal,
        .menu__user {
          flex-direction: row;
          gap: 2rem;
          width: auto;
        }

        .menu__user text-button {
          width: auto;
        }

        ul {
          flex-direction: row;
          gap: 1rem;
        }
      }

      @media (min-width: 1024px) {
        /* lg */
        div {
          gap: 4rem;
        }

        .menu__user {
          gap: 3rem;
        }
      }

      @media (min-width: 1280px) {
        /* xl */
        nav {
          padding: 1.5rem 2rem;
        }

        .logo__icon {
          width: 3.5rem;
        }
      }
    </style>

      <nav>
        <img class="logo__icon" id="logo-home" src="./images/banners/bg.jpg" alt="Logo da Biblioteca" />
        
        <div>
          <my-button>
            <img src="./images/icons/menu.png" class="toggle-icon"/>
          </my-button>

          <section aria-label="Menu" class="menu">
            <section aria-label="Menu principal" class="menu__principal">
              <ul>
                <li><text-button href="index.html">Início</text-button></li>
                <li><text-button href="profile.html" id="emprestimos">Meus empréstimos</text-button></li>
                ${
                  isAdmin
                    ? `<li><text-button href="admin.html">Administração</text-button></li>`
                    : ""
                }
              </ul>
            </section>

            <section aria-label="Acesso ao usuário" class="menu__user">
              ${this.renderUserSection()}
            </section>
          </section>
        </div>
      </nav>
      `;
  }

  setupMenuToggle() {
    const btn = this.shadowRoot?.querySelector("my-button");
    const img = btn?.querySelector("img");
    const menu = this.shadowRoot?.querySelector(".menu");
    const logo = this.shadowRoot?.querySelector("#logo-home");

    logo?.addEventListener(
      "click",
      () => (window.location.href = "./index.html")
    );

    let isOpen = false;

    btn?.addEventListener("click", () => {
      isOpen = !isOpen;

      if (img) {
        menu?.classList.toggle("active");
        img.classList.remove("rotate");
        void img.offsetWidth;
        img.classList.add("rotate");

        img.src = isOpen
          ? "./images/icons/close.png"
          : "./images/icons/menu.png";
      }

      menu?.classList.toggle("open", isOpen);
    });
  }

  setupLogoutHandler() {
    const logoutBtn = this.shadowRoot?.querySelector("#logout-btn");
    logoutBtn?.addEventListener("click", () => {
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("livrosEmprestados");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("token");
      location.reload(); // Atualiza a navbar após logout
    });
  }
}

customElements.define("my-nav", MyNav);
