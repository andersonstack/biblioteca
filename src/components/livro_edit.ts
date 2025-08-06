import "./input.js";
import { editBook } from "../service/connection.js";

class LivroEdit extends HTMLElement {
  private shadow: ShadowRoot;
  private livros: any[] = [];
  private livroSelecionado: any = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.livros =
      JSON.parse(sessionStorage.getItem("livros") || `{"livros":[]}`).livros ||
      [];
    this.render();
    this.setupBusca();
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
                    margin: auto;

                    my-input {width: 100%;}
                }

                .card {
                    border: 1px solid #ccc;
                    border-radius: 1rem;
                    padding: 1rem;
                    width: 100%;
                    max-width: 25rem;
                    background-color: white;
                    text-align: left;
                    margin: 0.5rem 0 0.5rem 0;
                }

                .card img {
                    max-width: 100%;
                    max-height: 150px;
                    display: block;
                    margin: 0 auto 1rem auto;
                }

                textarea {
                    width: 100%;
                    padding: 0.5rem;
                    font-size: 1rem;
                    border: 0.1rem solid transparent;
                    outline: none;
                    color: var(--black, #000);
                    background-color: var(--secondary);
                    border-radius: 1rem;
                    font-family: inherit;
                    resize: vertical;
                }

                .hidden {
                    display: none;
                }

                #formularioEdicao {
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    width: 100%;
                    gap: 1rem;
                }
            </style>

            <div class="container">
                <my-input class="input__preencher" id="inputBusca" placeholder="Buscar livro para editar..." aria-label="Busca"></my-input>
                <div id="resultadoBusca"></div>
                <div id="formularioEdicao" class="hidden"></div>
            </div>
        `;
  }

  private setupBusca() {
    const inputBusca = this.shadow.querySelector("my-input#inputBusca")!;
    const realInput = inputBusca.shadowRoot!.querySelector("input")!;
    realInput.addEventListener("input", () => {
      const termo = realInput.value.trim().toLowerCase();

      if (termo === "") {
        this.shadow.querySelector("#resultadoBusca")!.innerHTML = "";
        return;
      }

      const encontrados = this.livros.filter((l) =>
        l.titulo.toLowerCase().includes(termo)
      );
      this.renderResultados(encontrados);
    });
  }

  private renderResultados(livros: any[]) {
    const container = this.shadow.querySelector("#resultadoBusca")!;
    container.innerHTML = "";

    if (!livros.length) {
      container.innerHTML = `<p>Nenhum livro encontrado.</p>`;
      return;
    }

    livros.forEach((livro, i) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
                <img src="${livro.imagem_caminho}" />
                <p><strong>Título:</strong> ${livro.titulo}</p>
                <p><strong>Ano:</strong> ${livro.ano}</p>
                <p><strong>Descrição:</strong> ${livro.descricao}</p>
                <p><strong>Disponível:</strong> ${
                  livro.disponibilidade === 1 ? "Sim" : "Não"
                }</p>
                <my-button class="admin">Selecionar livro</my-button>
            `;
      div
        .querySelector("my-button")!
        .addEventListener("onClick", () => this.editarLivro(livro, i, div));
      container.appendChild(div);
    });
  }

  private editarLivro(livro: any, index: number, div: HTMLElement) {
    this.livroSelecionado = { ...livro };
    this.shadow.querySelector("#resultadoBusca")!.innerHTML = "";
    (this.shadow.querySelector(
      "my-input#inputBusca"
    ) as HTMLInputElement)!.value = "";

    const container = this.shadow.querySelector("#formularioEdicao")!;
    container.classList.remove("hidden");

    container.innerHTML = `
            <p><strong>Título</strong></p>
            <my-input class="input__preencher" id="titulo" placeholder="Título" aria-label="Título"></my-input>
            <p><strong>Descrição</strong></p>
            <textarea id="descricao" placeholder="Descrição"></textarea>
            <p><strong>Ano</strong></p>
            <my-input class="input__preencher" id="ano" type="number" placeholder="Ano" aria-label="Ano"></my-input>
            <p><strong>Imagem</strong></p>
            <label>Imagem (arquivo):</label>
            <input type="file" id="imagemArquivo" accept="image/*" />

            <label>Ou link da imagem:</label>
            <my-input class="input__preencher" id="imagemLink" type="url" placeholder="Cole o link da imagem" aria-label="Link da imagem"></my-input>

            <img id="preview" class="preview" style="max-height: 200px; display:block; margin-top:1rem; border-radius:1rem;" src="${
              livro.imagem_caminho.startsWith("data")
                ? livro.imagem_caminho
                : "http://localhost:3000" + livro.imagem_caminho
            }" />

            <my-button class="admin" id="salvarEdicao">Salvar Alterações</my-button>
            <div id="mensagemEdit" class="mensagem"></div>
        `;

    // Preencher os campos
    (
      container.querySelector("my-input#titulo") as any
    ).shadowRoot.querySelector("input")!.value = livro.titulo;
    container.querySelector("textarea")!.value = livro.descricao;
    (container.querySelector("my-input#ano") as any).shadowRoot.querySelector(
      "input"
    )!.value = livro.ano;
    (
      container.querySelector("my-input#imagemLink") as any
    ).shadowRoot.querySelector("input")!.value = livro.imagem_caminho;

    // Imagem preview
    const fileInput = container.querySelector(
      "#imagemArquivo"
    ) as HTMLInputElement;
    const linkInput = container.querySelector("my-input#imagemLink") as any;
    const preview = container.querySelector("#preview") as HTMLImageElement;
    let novaImagem = livro.imagem_caminho;

    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          novaImagem = reader.result as string;
          preview.src = novaImagem;
        };
        reader.readAsDataURL(file);
        linkInput.shadowRoot.querySelector("input")!.value = "";
      }
    });

    linkInput.shadowRoot
      .querySelector("input")!
      .addEventListener("input", () => {
        novaImagem = linkInput.shadowRoot.querySelector("input")!.value;
        preview.src = novaImagem;
        fileInput.value = "";
      });

    // Salvar alterações
    container
      .querySelector("my-button#salvarEdicao")!
      .addEventListener("onClick", async () => {
        const novoTitulo = (
          container.querySelector("my-input#titulo") as any
        ).value.trim();
        const novaDescricao = container.querySelector("textarea")!.value.trim();
        const novoAno = parseInt(
          (container.querySelector("my-input#ano") as any).value
        );
        const file = (
          container.querySelector("#imagemArquivo") as HTMLInputElement
        ).files?.[0];
        const mensagem = container.querySelector("#mensagemEdit")!;

        if (!novoTitulo || !novaDescricao || !novoAno || !novaImagem) {
          mensagem.textContent = "Preencha todos os campos.";
          return;
        }

        // Monta o livro atualizado para envio
        const livroAtualizado = {
          ...livro,
          titulo: novoTitulo,
          descricao: novaDescricao,
          ano: novoAno,
          imagem_caminho: novaImagem,
          disponibilidade: livro.disponibilidade ?? 1,
          id: livro.id,
        };

        mensagem.textContent = "Salvando...";

        const response = await editBook(livroAtualizado, file);

        if (response.status === 201 && response.livro) {
          const realIndex = this.livros.findIndex((l) => l.id === livro.id);
          if (realIndex !== -1) {
            this.livros[realIndex] = response.livro;
          }
          this.livros[realIndex] = response.livro;
          sessionStorage.setItem(
            "livros",
            JSON.stringify({ livros: this.livros, timestamp: Date.now() })
          );
          mensagem.textContent = "Livro atualizado com sucesso!";
        } else {
          mensagem.textContent = "Erro ao atualizar o livro. Tente novamente.";
        }
      });
  }
}

customElements.define("livro-edit", LivroEdit);
