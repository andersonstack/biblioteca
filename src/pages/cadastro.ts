import "../components/input.js";
import "../components/button.js";
import "../components/toggle_password.js";
import "../interfaces/usuario.js";
import { mostrarMensagem } from "../utils/messagem.js";
import { singup } from "../service/connection.js";

class TelaCadastro extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setup();
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
          background-image: url("./images/banners/bg.jpg");
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

        .message {
          position: relative;
          width: 100%;
          align-items: center;
          justify-content: center;
          display: flex;
        }

        .tile-message {
          display: flex;
          position: absolute;
          font-family: var(--poppins);
          font-weight: 800;
          padding: 1rem;
          border-radius: 1rem;
          color: white;
        } 

        .error {
          background-color: red;
          opacity: 0;
        }
        .error.active {
          opacity: 1;
        }

        .sucess {
          background-color: green;
          opacity: 0;
        }
        .sucess.active {
          opacity: 1;
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
          <h2>Cadastro</h2>

          <my-input class="input__credenciais"
            id="nome"
            type="text"
            placeholder="Nome"
            aria-label="Digite seu nome"
          ></my-input>

          <my-input class="input__credenciais"
            id="usuario"
            type="text"
            placeholder="Usuário"
            aria-label="Digite seu usuário"
          ></my-input>

          <toggle-password>
            <my-input class="input__credenciais" id="senha" type="password" placeholder="Senha" aria-label="Digite sua senha"></my-input>
          </toggle-password>

          <my-button class="login" id="submit">Confirmar</my-button>
          <p class="message" id="message"></p>
        </form>
      </section>
    `;
  }

  setup() {
    const nome = this.shadowRoot!.getElementById("nome") as HTMLInputElement;
    const userName = this.shadowRoot!.getElementById(
      "usuario"
    ) as HTMLInputElement;
    const senha = this.shadowRoot!.getElementById("senha") as HTMLInputElement;
    const btn = this.shadowRoot!.getElementById("submit");
    const message = this.shadowRoot!.getElementById("message");

    btn?.addEventListener("click", async (event: Event) => {
      event.preventDefault();

      if (nome.value && userName.value && senha.value) {
        const user: UsuarioCadastro = {
          userName: userName.value,
          name: nome.value,
          senha: senha.value,
          role: "user",
        };
        const res = await singup(user);
        if (res == 200) {
          mostrarMensagem("sucessoC", message!);
        } else if (res == 400) {
          mostrarMensagem("erroC", message!);
        } else {
          mostrarMensagem("server", message!);
        }
      } else {
        mostrarMensagem("vazio", message!);
      }
    });
  }
}

customElements.define("tela-cadastro", TelaCadastro);
