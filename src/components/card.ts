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
                    display: grid;
                    grid-template-columns: 12rem 1fr;
                    grid-template-areas:
                        "img titulo"
                        "img ano"
                        "img escritor"
                        "img escritor"
                        "img btn";
                    gap: 0.5rem 1rem;
                    max-width: 20rem;
                    padding: 1rem;
                    margin: 1rem auto;
                    background-color: #fff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }

                .livro-img {
                    grid-area: img;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                }

                .livro-titulo {
                    grid-area: titulo;
                    font-size: 1.5rem;
                    margin: 0;
                    font-family: var(--poppins);
                    font-weight: 600;
                }

                .livro-ano {
                    grid-area: ano;
                    font-size: 1rem;
                    color: #888;
                    margin: 0;
                    font-family: var(--poppins);
                    font-weight: 600;
                }

                .livro-descricao {
                    display: none;
                    grid-area: descricao;
                    font-size: 1rem;
                    line-height: 1.4;
                    font-family: var(--poppins);
                    font-weight: 400;
                }

                .livro-escritor {
                    grid-area: escritor;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #555;
                    font-family: var(--poppins);
                    font-weight: 500;
                }

                .livro-btn {
                    grid-area: btn;
                    justify-self: start;
                }

                @media screen and (min-width: 720px){
                    section {
                        grid-template-areas:
                            "img titulo"
                            "img ano"
                            "img descricao"
                            "img escritor"
                            "img btn";
                        max-width: 40rem;
                    }
                    .livro-descricao {
                        display: -webkit-box;
                        -webkit-line-clamp: 6;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                @media screen and (min-width: 110px) {
                    section {
                        max-width: 35rem;
                    }
                }
            </style>

             <section aria-label="${ariaLabel}">
                <img src="${imagem}" class="livro-img" />
                <h2 class="livro-titulo">${titulo}</h2>
                <h3 class="livro-ano">${ano}</h3>
                <p class="livro-descricao">${descricao}</p>
                <div class="livro-btn">
                    <text-button >Ver livro</text-button>
                </div>
            </section>
            `;
  }
}

customElements.define("my-card", MyCard);
