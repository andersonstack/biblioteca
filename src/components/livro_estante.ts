interface Livro {
  titulo: string;
  imagem: string;
  disponivel: boolean;
}

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
    const titulo = this.livro.titulo;
    const imagem = this.livro.imagem;
    const disponivel = token != null ? this.livro.disponivel : false;

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
      height: 23rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
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
    }

    .titulo {
      font-weight: 600;
      font-size: 1rem;
      text-align: center;
      padding: 0.5rem 1rem;
      color: var(--branco-gelo);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    text-button.actions {
      margin: 0.5rem 0 1rem 0;
      color: var(--secondary);
      background: none;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.2s;
    }

    text-button.actions:hover {
      color: var(--destaque);
    }

    .container_infor {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      align-items: center;
      height: 100%;
    }
  </style>

    <div class="container_livro">
      <div class="livro_disponibilidade" title="${
        disponivel ? "Disponível" : "Indisponível"
      }"></div>
      <img src="${imagem}" alt="${titulo}" />
      <h2 class="titulo">${titulo}</h2>
      <text-button class="actions">Visualizar</text-button>
    </div>
  `;
  }

  connectedCallback() {}
}

customElements.define("livro-estante", LivroEstante);
