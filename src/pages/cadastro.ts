import "../components/input.js";
import "../components/button.js";
import "../components/toggle_password.js";
import "../interfaces/usuario.js";
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
          <p class="message" id="message">
            <span class="tile-message sucess">Cadastro efetuado com sucesso!</span>
            <span class="tile-message error">Usuário já existente!</span>
            <span class="tile-message error">Preencha todos os campos!</span>
          </p>
        </form>
      </section>
    `;
  }

  setup() {
    function mostrarMensagem(tipo: String) {
      const mensagens = message?.querySelectorAll(".tile-message")!;
      mensagens.forEach((msg) => msg.classList.remove("active"));

      switch (tipo) {
        case "sucesso":
          mensagens[0].classList.add("active"); // sucesso
          break;
        case "erro":
          mensagens[1].classList.add("active"); // erro
          break;
        case "vazio":
          mensagens[2].classList.add("active"); // campos vazios
          break;
      }

      setTimeout(() => {
        mensagens.forEach((msg) => msg.classList.remove("active"));
        if (tipo == "sucesso") window.location.href = "login.html";
      }, 2000);
    }

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
        };
        const res = await singup(user);
        if (res) {
          mostrarMensagem("sucesso");
        } else {
          mostrarMensagem("erro");
        }
      } else {
        mostrarMensagem("vazio");
      }
    });
  }
}

customElements.define("tela-cadastro", TelaCadastro);
