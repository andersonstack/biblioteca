import "./input.js";
import "./button.js";
import {
  Livro,
  LivroDevolucao,
  LivroEmprestimo,
} from "../interfaces/livros_api.js";
import { fazerDevolucao, fazerEmprestimo } from "../service/connection.js";

class DevolucaoComponent extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setup();
  }

  private render() {
    this.shadow.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                    height: 100%;
                    margin: auto;
                    align-items: center;
                }

                .mensagem {
                    margin-top: 1rem;
                    font-style: italic;
                    color: green;
                }

                h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 1rem;
                    width: 100%;
                }

                my-input {
                  width: 100%;
                  margin-right: 1rem;
                }

                my-button {
                  width: 50%;
                }
            </style>

            <form>
                <h2>Título do Livro</h2>
                <my-input class="input__preencher" id="titulo-livro" placeholder="Livro" aria-label="ID do Livro"></my-input>
                <h2>UserName do usuário</h2>
                <my-input class="input__preencher" id="username" placeholder="Usuário" aria-label="ID do usuário"></my-input>
                <my-button class="admin" id="enviar">Enviar</my-button>
                <div class="mensagem" id="msg"></div>
            </form>
        `;
  }

  private showMessage(message: boolean | null) {
    const msgDiv = this.shadow.querySelector("#msg")! as HTMLElement;
    if (message === true) {
      msgDiv.textContent = "Devolucação realizada com sucesso!";
      msgDiv.style.color = "green";
    } else if (message === false) {
      msgDiv.textContent = "Falha na devolução do livro!";
      msgDiv.style.color = "orange";
    } else {
      msgDiv.textContent = "Erro no servidor!";
      msgDiv.style.color = "red";
    }
  }

  private setup() {
    this.shadow
      .querySelector("my-button#enviar")!
      .addEventListener("click", async () => {
        const inputTitleLivro = this.shadow.querySelector(
          "my-input#titulo-livro"
        ) as HTMLInputElement;
        const inputUsername = this.shadow.querySelector(
          "my-input#username"
        ) as HTMLInputElement;

        const titleLivro = inputTitleLivro.value;
        const userName = inputUsername.value;

        const livroDevolucao: LivroDevolucao = {
          titleBook: titleLivro,
          userName: userName,
        };

        const devolucao = await fazerDevolucao(livroDevolucao);

        if (devolucao === 200) this.showMessage(true);
        else this.showMessage(false);

        inputTitleLivro.value = "";
        inputUsername.value = "";
      });
  }
}

customElements.define("livro-devolucao", DevolucaoComponent);
