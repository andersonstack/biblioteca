import { Livro } from "../interfaces/livros_api";
import "../components/modal_component.js";

export function abrirLivro(livro: Livro, shadowRoot: ShadowRoot) {
    const containerLivro = document.createElement("modal-component");
    const divInformacoes = document.createElement("div");
    divInformacoes.classList.add("informacoes__livro");

    const informacoesLivro = `
        <style>
            .informacoes__livro {
                display: grid;
                grid-template-areas:
                    "h2"
                    "img"
                    "disponibilidade"
                    "descricao";
                gap: 1rem;
                padding: 1.5rem;
                border-radius: 8px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #333;
                max-width: 600px;
                margin: auto;
                box-sizing: border-box;
            }

            .livro__titulo {
                grid-area: h2;
                font-size: 1.5rem;
                margin: 0;
                color: #2c3e50;
            }

            .livro__img {
                grid-area: img;
                width: 100%;
                max-width: 200px;
                justify-self: center;
                border-radius: 4px;
                object-fit: cover;
            }

            .livro__disponibilidade {
                grid-area: disponibilidade;
                font-weight: 500;
                color: ${livro.disponibilidade === 0 ? "red" : "gren"};
            }

            .livro__descricao {
                grid-area: descricao;
                line-height: 1.6;
                text-align: justify;
            }

            @media screen and (min-width: 768px) {
                .informacoes__livro {
                    grid-template-columns: 200px 1fr;
                    grid-template-areas:
                        "h2 h2"
                        "img disponibilidade"
                        "img descricao";
                    box-shadow: none;
                }

                .livro__titulo {
                    font-size: 2rem;
                }
            }
        </style>

        <h2 class="livro__titulo">${livro.titulo}</h2>
        <img class="livro__img" src="${livro.imagem_caminho}" alt="Capa do livro ${livro.titulo}" />
        <p class="livro__disponibilidade"><strong>Disponível:</strong> ${livro.disponibilidade === 0 ? "Indisponível" : "Disponível"}</p>
        <p class="livro__descricao">${livro.descricao}</p>
    `;

    divInformacoes.innerHTML = informacoesLivro;
    containerLivro.appendChild(divInformacoes);
    shadowRoot.appendChild(containerLivro);
}
