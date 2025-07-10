interface Livro {
  titulo: String;
  imagem: String;
  disponivel: boolean;
}

class MyCollection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setup();
  }

  render() {
    const secaoName = this.getAttribute("aria-label") || "Seção de ficção";
    const disponibilidade = this.getAttribute("class") || "indisponivel";

    this.shadowRoot!.innerHTML = `
        <style>
            .container_livro {
                position: relative;
                margin-left: 1rem;
                border-radius: 1rem;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background-color: var(--primary);
                width: 15rem;
            }
            
            img {
                width: 100%;
                height: auto;
                border-radius: 1rem;
                object-fit: cover;
            }

            .livro {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .livro_disponibilidade {
                position: relative;
                display: flex;
                align-items: center;
            }

            .disponivel,
            .indisponivel {
                position: absolute;
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                top: -2%;
                left: 0;
            }

            .disponivel {
                background-color: green;
            }
            .indisponivel {
                background-color: red;
            }
            
            .buttons_actions {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 1.5rem;
                position: absolute;
                top: 90%;
                background-color: var(--onPrimary);
                border-radius: 0 0 1rem 1rem;
            }

        </style>

        <section aria-lawidthbel=${secaoName} class="container_livro">
            <img src="./src/images/banners/alem_da_fumaca.jpg" />
            <div class=${disponibilidade}></div>
            <div class="buttons_actions">
                <text-button class="actions">Pegar emprestado</text-button>
                <text-button class="actions">Visualizar livro</text-button>
            </div>
        </section>
        
    `;
  }
  setup() {}
}

customElements.define("my-collection", MyCollection);
