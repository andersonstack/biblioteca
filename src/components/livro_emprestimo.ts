import "./input.js";
import "./button.js";
import { Livro, LivroEmprestimo } from "../interfaces/livros_api.js";
import { fazerEmprestimo } from "../service/connection.js";

class EmprestimoComponent extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    private render() {
        this.shadow.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    width: 100%;
                    margin: auto;
                    align-items: start;
                }

                .mensagem {
                    margin-top: 1rem;
                    font-style: italic;
                    color: green;
                }

                h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 1rem;
                }
            </style>

            <form>
                <h2>ID do Livro</h2>
                <my-input id="id-livro" placeholder="Livro" aria-label="ID do Livro"></my-input>
                <h2>UserName do usuário</h2>
                <my-input id="id-usuario" placeholder="Usuário" aria-label="ID do usuário"></my-input>
                <my-button class="admin" id="enviar">Enviar</my-button>
                <div class="mensagem" id="msg"></div>
            </form>
        `;
    }

    private showMessage(message: boolean | null) {
        const msgDiv = this.shadow.querySelector("#msg")! as HTMLElement;
        if (message === true) {
            msgDiv.textContent = "Empréstimo realizado com sucesso!";
            msgDiv.style.color = "green";
        } else if (message === false) {
            msgDiv.textContent = "Livro indisponível para empréstimo!";
            msgDiv.style.color = "orange";
        } else {
            msgDiv.textContent = "Erro no servidor!";
            msgDiv.style.color = "red";
        }
    }

    private setup() {
        this.shadow.querySelector("my-button#enviar")!.addEventListener(
            "click", async () => {
                const inputIdLivro = this.shadow.querySelector("my-input#id-livro") as HTMLInputElement;
                const inputUsername = this.shadow.querySelector("my-input#id-usuario") as HTMLInputElement;

                const idLivro = inputIdLivro.value;
                const userName = inputUsername.value;
                const localDisponivel = this.verifyLocale(Number(idLivro));

                if (localDisponivel === false) {
                    this.showMessage(false);
                    inputIdLivro.value = "";
                    inputUsername.value = "";
                } else if (localDisponivel === true) {
                    const livroEmprestado: LivroEmprestimo = {
                        idBook: Number(idLivro),
                        userName: userName,
                    }
                    const emprestimo = await fazerEmprestimo(livroEmprestado);
                    if (emprestimo === 200) {
                        this.showMessage(true);
                    } else {
                        this.showMessage(false);
                    }
                    
                    inputIdLivro.value = "";
                    inputUsername.value = "";
                }
            }
        )
        };
    
    private verifyLocale(idLivro: number): boolean {
        const livrosSession = sessionStorage.getItem("livros")!;
        const jsonLivrosSession = JSON.parse(livrosSession);
        const todosLivros: Livro[] = jsonLivrosSession["livros"];
        let livroDisponivel = true;

        // Verifica se existe algum livro com o ID e que esteja disponível
        todosLivros.forEach(livro => {
            if (livro.id === idLivro) {
                livroDisponivel = livro.disponibilidade === 1;
                return;
            }
        });

        return livroDisponivel;
    }


}

customElements.define("livro-emprestimo", EmprestimoComponent);