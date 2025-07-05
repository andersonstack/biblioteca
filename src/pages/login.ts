import "../components/input.js";
import "../components/button.js";

class TelaLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
        <section aria-label="Credenciais de login">
            <my-input 
                    type="text"
                    placeholder="Usuário"
                    aria-label="Digite seu usário"
                    id="btn"
                    >
            </my-input>
            <div>
            <my-input 
                    type="text"
                    placeholder="Usuário"
                    aria-label="Digite seu usário"
                    id="btn"
                    >
            </my-input>
            <my-button>
                <img src="./src/images/icons/eye-closed.png" />
            </my-button>
            </div>
            <my-button>Entrar</my-button>
            <my-button>Cadastrar-se</my-button>
        </section>

    `;
  }
}

customElements.define("tela-login", TelaLogin);
