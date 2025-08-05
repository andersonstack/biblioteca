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
    const btn = this.shadowRoot?.querySelector("#btn-lupa");
    const my_input = this.shadowRoot?.querySelector("my-input");
    const section = this.shadowRoot?.querySelector("section");
    const inputElement = my_input?.shadowRoot?.querySelector("input");

    const toggleActive = () => {
      section?.classList.toggle("active");
      my_input?.classList.toggle("active");
    };

    btn?.addEventListener("click", () => {
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
        section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--branco-gelo);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.3s ease;
        }

        section:focus-within {
          box-shadow: 0 0 0 2px var(--primary);
        }

        my-input {
          flex: 1;
        }

        my-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        my-button img {
          width: 1.5rem;
          height: 1.5rem;
        }

        @media (max-width: 480px) {
          section {
            max-width: 100%;
            padding: 0.5rem 0.75rem;
          }

          my-button img {
            width: 1.25rem;
            height: 1.25rem;
          }
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
          <img src="./images/icons/lupa.png" alt="Lupa" />
        </my-button>
      </section>
    `;
  }
}

customElements.define("input-button", InputButton);
