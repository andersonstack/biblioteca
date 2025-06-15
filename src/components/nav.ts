class MyNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        @keyframes rotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .rotate {
          animation: rotation 0.5s linear;
        }

        nav {
          display: flex;
          background-color: var(--bege);
          justify-content: center;
          align-items: center;
          padding: 0.5rem;
          font-family: Arial, sans-serif;
          position: relative; 
          overflow-x: clip;
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
            
            &::after{
              content: "";
              background-color: var(--azul);
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
        <img src="./src/images/icons/logo.png" alt="Logo da Biblioteca" />
        
        <div>
          <input-button></input-button>
          <my-button >
            <img src="./src/images/icons/menu.png" class="toggle-icon"/>
          </my-button>

          <section aria-label="Menu" class="menu">
            <section aria-label="Menu principal" class="menu__principal">
              <ul>
                <li><text-button href="#">Início</text-button></li>
                <li><text-button href="#">Estante</text-button></li>
              </ul>
            </section>

            
            <section aria-label="Acesso ao usuário" class="menu__user">
              <text-button href="./login.html">Entrar</text-button>
              <text-button href="./singup.html" class="with_background">Cadastrar-se</text-button>
            </section>
          </section>
        <div>

      </nav>
    `;

    const btn = this.shadowRoot?.querySelector("my-button");
    const img = btn?.querySelector("img");
    const menu = this.shadowRoot?.querySelector(".menu");
    let isOpen = false;

    btn?.addEventListener('click', () => {
    isOpen = !isOpen;

    if (img) {
      if(menu?.classList.contains("active")){
        menu?.classList.remove("active");
      } else {
        menu?.classList.add("active");
      }

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
}

customElements.define("my-nav", MyNav);
