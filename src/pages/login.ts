import "../components/input.js";
import "../components/button.js";
import "../components/text_button.js";

class TelaLogin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
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
                background-color: var(--bege);
                position: relative;
            }

            img {
                width: 1rem;
                position: relative;
                left: -6rem;
            }
            
            .buttons {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                align-items: center;

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
                background: rgba( 255, 255, 255, 0.35 );    
                box-shadow: 0 8px 32px 0 rgba(92, 92, 92, 0.37);
                backdrop-filter: blur( 13.5px );
                -webkit-backdrop-filter: blur( 13.5px );
                padding: 1rem;
                position: relative;
            }

            .logo {
                width: 6rem;
                text-align: center;
                position: absolute;
                top: -10%;
                left: 45%;
            }
        </style>

        <section aria-label="Credenciais de login">
            <div class="credenciais">
                <img class="logo" src="./src/images/icons/logo.png" />
                <h2>Login</h2>
                <my-input
                    type="text"
                    placeholder="Usuário"
                    aria-label="Digite seu usário"
                    id="btn"
                    >
                </my-input>
                <my-input 
                    type="password"
                    placeholder="Senha"
                    aria-label="Digite sua senha"
                    id="btn"
                    >
                </my-input>
                <my-button>
                    <img src="./src/images/icons/eye-closed.png" />
                </my-button>
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
