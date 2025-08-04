import { abrirLivro } from "../utils/abrir_livro.js";
import { Livro } from "../interfaces/livros_api.js";
import "../components/button.js";

class LivroEstante extends HTMLElement {
  livro!: Livro;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set data(livro: Livro) {
    this.livro = livro;
    this.render();
  }

  render() {
    if (!this.livro) return;

    const token = sessionStorage.getItem("token");
    const idLivro = this.livro.id;
    const titulo = this.livro.titulo;
    const imagem = this.livro.imagem_caminho;
    const disponivel = token != null ? this.livro.disponibilidade : false;

    const esconderDisponibilidade = this.hasAttribute("esconder-disponibilidade");

    this.shadowRoot!.innerHTML = `
    <style>
      :host {
        font-family: var(--poppins);
      }

      .container_livro {
        background-color: var(--onPrimary);
        border-radius: 1rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 15rem;
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        ${esconderDisponibilidade ? "height: 20rem" : "23rem"};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
      }

      .container_livro:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
      }

      img {
        width: 15rem;
        height: 15rem;
        object-fit: cover;
      }

      .livro_disponibilidade {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: ${disponivel ? "#28a745" : "#dc3545"};
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        border: 2px solid var(--branco-gelo);
        ${esconderDisponibilidade ? "display: none" : ""};
      }

      .titulo {
        font-weight: 600;
        font-size: 1rem;
        text-align: center;
        color: var(--branco-gelo);
        text-overflow: ellipsis;
        withe-space: nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      my-button.actions {
        ${esconderDisponibilidade ? "display: none" : ""};
      }

      my-button.actions:hover {
        color: var(--destaque);
      }
    </style>

    <div id=${idLivro} class="container_livro">
      <div class="livro_disponibilidade" title="${
        disponivel ? "Disponível" : "Indisponível"
      }"></div>
      <img src="${imagem}" alt="${titulo}" />
      <h2 class="titulo">${titulo}</h2>
      <my-button id="btn-visualizar" class="actions">Visualizar</my-button>
    </div>
  `;
  }

  connectedCallback() {
    this.setup();
  }

  private setup() {
    const btnVisualizar = this.shadowRoot!.querySelector("my-button#btn-visualizar")!;

    btnVisualizar.addEventListener("click", () => {
      abrirLivro(this.livro, this.shadowRoot!);
    })
  }
}

customElements.define("livro-estante", LivroEstante);
