import { buscarLivro } from "../utils/buscar_livro.js";
import "./input.js";

class InputButton extends HTMLElement {
  private targetRoot: ShadowRoot | null = null;
  private containerSelector: string = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  setTarget(root: ShadowRoot, containerSelector: string) {
    this.targetRoot = root;
    this.containerSelector = containerSelector;
  }

  get value() {
    return (this.shadowRoot!.querySelector("my-input#input")! as any).value;
  }

  private setupListeners() {
    const btn = this.shadowRoot?.querySelector('#btn-lupa');
    const my_input = this.shadowRoot?.querySelector('my-input');
    const section = this.shadowRoot?.querySelector('section');
    const inputElement = my_input?.shadowRoot?.querySelector("input");

    const toggleActive = () => {
      section?.classList.toggle('active');
      my_input?.classList.toggle('active');
    };

    btn?.addEventListener('click', () => {
      toggleActive();
      this.executarBusca();
    });

    inputElement?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.executarBusca();
      }
    });

    inputElement?.addEventListener("input", () => this.executarBusca());
  }

    private executarBusca() {
        if (this.targetRoot) {
            const valor = this.value.trim();
            buscarLivro(this.targetRoot, this.containerSelector, valor);
        }
    }

  private render() {
    this.shadowRoot!.innerHTML = `
      <style>
        my-input,
        my-button {
          z-index: 1;
        }
        section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: transparent;
          width: 100%;
          padding: 0.5rem;
          border-radius: 1rem;
          position: relative;
          overflow: hidden;

          img {
            width: 2rem;
          }
        }

        section::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: var(--branco-gelo);
          border-radius: 1rem;
          transform: translateX(100%);
          transition: transform 1s ease-in-out;
          z-index: 0;
        }

        section.active::after {
          transform: translateX(0);
        }

        my-input {
          opacity: 1;
          transform: translateX(200%);
          transition: transform 1s ease-in-out;
        }

        my-input.active {
          opacity: 1;
          transform: translateY(0);
        }
      </style>

      <section aria-label="Buscar de livro" role="search">
        <my-input 
          type="text"
          placeholder="Busque um livro"
          aria-label="Buscar por nome do livro"
          id="input"
        ></my-input>
        <my-button aria-label="Pesquisar livro" id="btn-lupa">
          <img src="./src/images/icons/lupa.png" alt="Lupa" />
        </my-button>
      </section>
    `;
  }
}

customElements.define("input-button", InputButton);
