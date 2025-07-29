import "./text_button.js";
import "./input_button.js";
import "./input.js";
import "./button.js";
import "./hello_text.js";

class MyNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupMenuToggle();
    this.setupLogoutHandler();
  }

  getUserName(): string | null {
    return sessionStorage.getItem("name");
  }

  isAuthenticated(): boolean {
    return !!this.getUserName();
  }

  renderUserSection(): string {
    const userName = this.getUserName();
    if (this.isAuthenticated()) {
      return `
        <hello-text>Olá, ${userName}!</hello-text>
        <text-button id="logout-btn" class="with_background">Sair</text-button>
      `;
    } else {
      return `
        <text-button href="./login.html">Entrar</text-button>
        <text-button href="./singup.html" class="with_background">Cadastrar-se</text-button>
      `;
    }
  }

  render() {
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
          background-color: var(--onPrimary);
          justify-content: center;
          align-items: center;
          padding: 0.5rem;
          position: relative; 
          overflow-x: clip;

          img {
            width: 3rem;
            height: auto;
            border-radius: 50%;
          }
        }

        div {
          display: flex;
          align-items: center;
          gap: 5rem;

          img {
            width: 2rem;
            display: none;
          }
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
          gap: 5rem;
        }

        .menu__principal {
          display: flex;
          align-items: center;
        }

        .menu__user {
          display: flex;
          align-items: center;
          gap: 5rem;
          width: auto;
        }

        @media screen and (max-width: 1120px) {
          nav {
            padding: 0 0.5rem;
            justify-content: space-between;
          }

          div {
            gap: 2rem;

            img {
              display: block;
            }
          }

          .menu {
            flex-direction: column;
            position: absolute;
            right: 0;
            top: 100%;
            align-items: center;
            gap: 2rem;
            width: 100%;
            transform: translateX(100%);
            transition: transform 0.5s linear;
            z-index: 2;
            
            &::after{
              content: "";
              background-color: var(--primary);
              width: 100%;
              height: 120%;
              border-radius: 0 0 1rem 1rem;
              top: 0;
              left: 0;
              position: absolute;
              z-index: -1;
            }
          }

          .menu.active {
            transform: translateX(0);
          }

          .menu__user {
            flex-direction: column;
            align-items: center;
            padding: 0;
            gap: 2rem;
          }

          .menu__principal {
            flex-direction: column;

            ul {
              display: flex;
              flex-direction: column;
            }
          }

          @media screen and (max-width: 480px){
            nav {
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 1rem;
            }

            div {
              align-items: center;
              justify-contente: center;
              gap: 1rem;
              
              input-button {
                width: 100%;
              }
            }
          }
        }
      </style>

      <nav>
        <img src="./src/images/banners/bg.jpg" alt="Logo da Biblioteca" />
        
        <div>
          <input-button></input-button>
          <my-button>
            <img src="./src/images/icons/menu.png" class="toggle-icon"/>
          </my-button>

          <section aria-label="Menu" class="menu">
            <section aria-label="Menu principal" class="menu__principal">
              <ul>
                <li><text-button href="index.html">Início</text-button></li>
                <li><text-button href="profile.html" id="emprestimos">Meus empréstimos</text-button></li>
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
    let isOpen = false;

    btn?.addEventListener("click", () => {
      isOpen = !isOpen;

      if (img) {
        menu?.classList.toggle("active");
        img.classList.remove("rotate");
        void img.offsetWidth;
        img.classList.add("rotate");

        img.src = isOpen
          ? "./src/images/icons/close.png"
          : "./src/images/icons/menu.png";
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
      location.reload(); // Atualiza a navbar após logout
    });
  }
}

customElements.define("my-nav", MyNav);
