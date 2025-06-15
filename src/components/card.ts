class MyCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        const titulo = this.getAttribute("titulo") || "";
        const ano = this.getAttribute("ano") || "";
        const escritor = this.getAttribute("escritor") || "";
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
                        "img descricao"
                        "img escritor"
                        "img btn";
                    gap: 0.5rem 1rem;
                    width: 100%;
                    max-width: 50rem;
                    padding: 1rem;
                    margin: 1rem auto;
                    background-color: #fff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    font-family: Arial, sans-serif;
                }

                .livro-img {
                    grid-area: img;
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                }

                .livro-titulo {
                    grid-area: titulo;
                    font-size: 1.5rem;
                    margin: 0;
                }

                .livro-ano {
                    grid-area: ano;
                    font-size: 1rem;
                    color: #888;
                    margin: 0;
                }

                .livro-descricao {
                    grid-area: descricao;
                    font-size: 1rem;
                    line-height: 1.4;
                }

                .livro-escritor {
                    grid-area: escritor;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #555;
                }

                .livro-btn {
                    grid-area: btn;
                    justify-self: start;
                }
            </style>

             <section aria-label="${ariaLabel}">
                <img src="${imagem}" class="livro-img" />
                <h2 class="livro-titulo">${titulo}</h2>
                <h3 class="livro-ano">${ano}</h3>
                <p class="livro-descricao">${descricao}</p>
                <h3 class="livro-escritor">${escritor}</h3>
                <div class="livro-btn">
                    <text-button >Ver livro</text-button>
                </div>
            </section>
            `;

    }
}

customElements.define('my-card', MyCard);