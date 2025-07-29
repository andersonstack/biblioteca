import "../components/livro_estante.js";
import { renderLivros } from "../utils/estante.js";

class TelaPerfil extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setup();
  }

  setup() {
    // Chave específica para os livros emprestados
    renderLivros("livrosEmprestados");
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        h1 {
          font-size: 1.8rem;
          font-weight: bold;
          margin: 1rem 0;
          text-align: center;
        }
      </style>
      <h1>Meus Empréstimos</h1>
    `;
  }
}

customElements.define("tela-perfil", TelaPerfil);
