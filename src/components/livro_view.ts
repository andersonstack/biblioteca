import "./input.js";

class LivroView extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    this.shadow.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                input {
                    padding: 0.5rem;
                    font-size: 1rem;
                    width: 80%;
                    max-width: 400px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .livros-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-top: 1rem;
                    justify-content: center;
                    position: absolute;
                    top: 5rem;
                }

                .livro-card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 1rem;
                    width: 280px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: left;
                    background: #f9f9f9;
                }

                .livro-card img {
                    max-height: 200px;
                    margin-bottom: 1rem;
                    border-radius: 4px;
                }
            </style>

            <div class="container">
                <my-input id="campoBusca" class="input__preencher" type="text" placeholder="Digite o título do livro..." ></my-input>
                <div class="livros-container" id="resultados">
                </div>
            </div>
        `;

    const myInput = this.shadow.querySelector(
      "my-input#campoBusca"
    )! as HTMLInputElement;
    const realInput = myInput.shadowRoot!.querySelector(
      "input"
    )! as HTMLInputElement;

    realInput.addEventListener("input", () => this.buscar(myInput.value));
    realInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.buscar(myInput.value);
    });
  }

  private buscar(termo: string) {
    const livrosRaw = sessionStorage.getItem("livros");
    if (!livrosRaw) return;

    const livros = JSON.parse(livrosRaw).livros;
    const resultado = livros.filter((l: any) =>
      l.titulo.toLowerCase().includes(termo.trim().toLowerCase())
    );

    this.renderLivros(resultado);
  }

  private renderLivros(livros: any[]) {
    const container = this.shadow.querySelector("#resultados")!;
    if (!livros.length) {
      container.innerHTML = `<p>Nenhum livro encontrado.</p>`;
      return;
    }

    container.innerHTML = livros
      .map(
        (livro) => `
            <div class="livro-card">
                <img src="${livro.imagem_caminho}" alt="${livro.titulo}">
                <p><strong>Título:</strong> ${livro.titulo}</p>
                <p><strong>Ano:</strong> ${livro.ano}</p>
                <p><strong>Descrição:</strong> ${livro.descricao}</p>
                <p><strong>Disponível:</strong> ${
                  livro.disponibilidade === 1 ? "Sim" : "Não"
                }</p>
            </div>
        `
      )
      .join("");
  }
}

customElements.define("livro-view", LivroView);
