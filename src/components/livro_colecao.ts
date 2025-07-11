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
                background-color: var(--onPrimary);
                width: 15rem;
            }
            
            img {
                width: 100%;
                height: auto;
                border-radius: 1rem 1rem 0 0;
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
            
            text-button {
                padding: 0.5rem;
            }

        </style>

        <section aria-lawidthbel=${secaoName} class="container_livro">
            <img src="./src/images/banners/alem_da_fumaca.jpg" />
            <div class=${disponibilidade}></div>
            <text-button class="actions">Visualizar</text-button>
        </section>
        
    `;
  }
  setup() {}
}

customElements.define("my-collection", MyCollection);
