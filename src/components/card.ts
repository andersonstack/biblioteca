class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const titulo = this.getAttribute("titulo") || "";
    const ano = this.getAttribute("ano") || "";
    const descricao = this.getAttribute("descricao") || "";
    const imagem = this.getAttribute("imagem") || "";
    const ariaLabel = `Livro ${titulo}`;

    this.shadowRoot!.innerHTML = `
      <style>
        section {
          display: flex;
          flex-direction: column;
          max-width: 15rem;
          margin: 1rem auto;
          background-color: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .livro-img {
          width: 100%;
          height: 15rem;
          object-fit: cover; /* corta a imagem */
        }

        .livro-content {
          padding: 1rem;
        }

        .livro-titulo {
          font-size: 1.5rem;
          margin: 0 0 0.5rem;
          font-family: var(--poppins);
          font-weight: 600;
        }

        .livro-ano {
          font-size: 1rem;
          color: #888;
          margin: 0;
          font-family: var(--poppins);
          font-weight: 600;
        }

        .livro-descricao,
        .livro-escritor,
        .livro-btn {
          display: none;
        }

        /* Telas maiores que 768px */
        @media (min-width: 768px) {
          section {
            flex-direction: row;
            max-width: 45rem;
            height: 23rem;
          }

          .livro-img {
            width: 40%;
            height: 100%;
            object-fit: cover;
          }

          .livro-content {
            width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1rem;
          }

          .livro-descricao,
          .livro-escritor,
          .livro-btn {
            display: block;
            font-family: var(--poppins);
          }

          .livro-descricao {
            font-size: 1rem;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          }

          .livro-escritor {
            font-size: 1rem;
            font-weight: 500;
            color: #555;
            margin-top: 0.5rem;
          }

          .livro-btn {
            align-self: start;
            margin-top: 1rem;
          }
        }
      </style>

      <section aria-label="${ariaLabel}">
        <img src="${imagem}" alt="Capa do livro ${titulo}" class="livro-img" />
        <div class="livro-content">
          <h2 class="livro-titulo">${titulo}</h2>
          <h3 class="livro-ano">${ano}</h3>
          <p class="livro-descricao">${descricao}</p>
          <div class="livro-escritor">Escritor desconhecido</div>
          <div class="livro-btn">
            <text-button>Ver livro</text-button>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("my-card", MyCard);
