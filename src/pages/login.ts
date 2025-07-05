import "../components/input.js";
import "../components/button.js";
import "../components/text_button.js";
import "../components/toggle_password.js";

class TelaLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = /*html*/ `
      <style>
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          gap: 1rem;
          background-color: var(--bege);
          position: relative;
        }

        .credenciais {
          width: 80%;
          height: 50vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          border: 1px solid var(--bege);
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 32px 0 rgba(92, 92, 92, 0.37);
          backdrop-filter: blur(13.5px);
          -webkit-backdrop-filter: blur(13.5px);
          padding: 1rem;
          position: relative;
        }

        .logo {
          width: 6rem;
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
        }

        h2 {
          margin-top: 2rem;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }
      </style>

      <section aria-label="Credenciais de login">
        <div class="credenciais" id="credenciais">
          <img class="logo" src="./src/images/icons/logo.png" alt="Logo do sistema" />
          <h2>Login</h2>

          <my-input
            id="usuario"
            type="text"
            placeholder="Usuário"
            aria-label="Digite seu usuário"
          ></my-input>

          <toggle-password>
            <my-input id="senha" type="password" placeholder="Senha" aria-label="Digite sua senha"></my-input>
          </toggle-password>

          <div class="buttons">
            <my-button class="login">Entrar</my-button>
            <text-button class="btn_filter" href="./singup.html">Cadastrar-se</text-button>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("tela-login", TelaLogin);
