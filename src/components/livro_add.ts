import { LivroCadastro } from "../interfaces/livros_api.js";
import { addBook } from "../service/connection.js";
import "./button.js";
import "./input.js";

class LivroAdd extends HTMLElement {
    private shadow: ShadowRoot;
    private imagemPreviewUrl: string = "";

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    private render() {
        this.shadow.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                    max-width: 500px;
                    margin: auto;
                    align-items: start;
                }

                textarea {
                    width: 100%;
                    padding: 0.5rem;
                    font-size: 1rem;
                    border: 0.1rem solid transparent;
                    outline: none;
                    color: var(--black, #000);
                    background-color: var(--branco-gelo, #f9f9f9);
                    border-radius: 1rem;
                    font-family: inherit;
                    resize: vertical;
                }

                .preview {
                    max-height: 200px;
                    border-radius: 4px;
                    margin-top: 1rem;
                }

                .mensagem {
                    margin-top: 1rem;
                    font-style: italic;
                    color: green;
                }
            </style>

            <form>
                <my-input id="titulo" placeholder="Título do livro" aria-label="Título"></my-input>
                <textarea id="descricao" placeholder="Descrição"></textarea>
                <my-input id="ano" type="number" placeholder="Ano de publicação" aria-label="Ano"></my-input>
                
                <label>Imagem (arquivo):</label>
                <input type="file" id="imagemArquivo" accept="image/*" />

                <label>Ou link da imagem:</label>
                <my-input id="imagemLink" type="url" placeholder="Cole o link da imagem" aria-label="Link da imagem"></my-input>

                <img id="preview" class="preview" src="" alt="Pré-visualização da imagem" style="display:none;" />

                <my-button class="login" id="salvar">Salvar livro</my-button>

                <div class="mensagem" id="msg"></div>
            </form>
        `;
    }

    private setupListeners() {
        const shadow = this.shadow;
        const preview = shadow.querySelector("#preview") as HTMLImageElement;
        const fileInput = shadow.querySelector("#imagemArquivo") as HTMLInputElement;
        const linkInput = shadow.querySelector("my-input#imagemLink")! as HTMLInputElement;
        const salvarBtn = shadow.querySelector("my-button#salvar")!;
        const msgDiv = shadow.querySelector("#msg")! as HTMLElement;

        
        fileInput.addEventListener("change", () => {
            const file = fileInput.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.imagemPreviewUrl = reader.result as string;
                    preview.src = this.imagemPreviewUrl;
                    preview.style.display = "block";
                };
                reader.readAsDataURL(file);
                (linkInput as any).value = ""; 
            }
        });

        
        linkInput.shadowRoot!.querySelector("input")!.addEventListener("input", () => {
            const url = linkInput.value.trim();
            if (url) {
                this.imagemPreviewUrl = url;
                preview.src = url;
                preview.style.display = "block";
                fileInput.value = ""; 
            }
        });

        
        salvarBtn.addEventListener("onClick", async () => {
            const titulo = (shadow.querySelector("my-input#titulo") as any).value.trim();
            const descricao = (shadow.querySelector("#descricao") as HTMLTextAreaElement).value.trim();
            const ano = (shadow.querySelector("my-input#ano") as any).value.trim();

            const file = fileInput.files?.[0];
            const link = linkInput.value.trim();

            if (!titulo || !descricao || !ano || (!file && !link)) {
                msgDiv.textContent = "Preencha todos os campos corretamente.";
                msgDiv.style.color = "red";
                return;
            }

            const novoLivro: LivroCadastro = {
                titulo,
                descricao,
                ano,
                imagem: file ? "" : link,
                disponivel: true,
            };

            const status = await addBook(novoLivro, file);

            msgDiv.textContent =
                status === 200
                ? "Livro adicionado com sucesso!"
                : status === 401
                ? "Erro ao adicionar o livro!"
                : "Erro interno!";
            msgDiv.style.color = status === 200 ? "green" : "red";

            if (status === 200) {
                // Atualiza sessionStorage com o novo livro:
                const cacheRaw = sessionStorage.getItem("livros");
                let cache = cacheRaw ? JSON.parse(cacheRaw) : { livros: [], timestamp: 0 };

                // Adiciona o novo livro no array
                cache.livros.push(novoLivro);
                // Atualiza o timestamp
                cache.timestamp = Date.now();

                sessionStorage.setItem("livros", JSON.stringify(cache));

                setTimeout(() => {
                // Limpa inputs
                (shadow.querySelector("my-input#titulo") as any).value = "";
                (shadow.querySelector("#descricao") as HTMLTextAreaElement).value = "";
                (shadow.querySelector("my-input#ano") as any).value = "";
                (shadow.querySelector("my-input#imagemLink") as any).value = "";
                fileInput.value = "";
                preview.src = "";
                preview.style.display = "none";
                this.imagemPreviewUrl = "";
                msgDiv.textContent = "";
                }, 1000);
            }
        });
    }
}

customElements.define("livro-add", LivroAdd);
