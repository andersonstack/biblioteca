import "../components/input.js";
import "../components/button.js";
import "../components/toggle_password.js";
import "../interfaces/usuario.js";

class TelaCadastro extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          gap: 1rem;
          background-image: url("src/images/banners/bg.jpg");
          background-size: cover;
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
          backdrop-filter: blur(7px);
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

        @media screen and (min-width: 700px) {
          .credenciais {
            width: 50%;
          }
  
          h2 {
            font-size: 2rem;
          }

          form {
            width: 100%;
          }

          my-input {
            width: 90%;
          }

          toggle-password {
            width: 100%;
          }
        }
      </style>

      <section aria-label="Credenciais de cadastro" type="submit" id="section">
        <form class="credenciais" id="credenciais">
          <img class="logo" src="./src/images/icons/logo.png" alt="Logo do sistema" />
          <h2>Cadastro</h2>

          <my-input
            id="nome"
            type="text"
            placeholder="Nome"
            aria-label="Digite seu nome"
          ></my-input>

          <my-input
            id="usuario"
            type="text"
            placeholder="Usuário"
            aria-label="Digite seu usuário"
          ></my-input>

          <toggle-password>
            <my-input id="senha" type="password" placeholder="Senha" aria-label="Digite sua senha"></my-input>
          </toggle-password>

            <my-button class="login" id="submit">Confirmar</my-button>
        </form>
      </section>
    `;
  }
}

customElements.define("tela-cadastro", TelaCadastro);
