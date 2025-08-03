import "./input.js";
import "./button.js";
import { fazerEmprestimo } from "../service/connection.js";
import { Livro, LivroEmprestimo, LivroCache } from "../interfaces/livros_api.js";

class EmprestimoComponent extends HTMLElement {
    private shadow: ShadowRoot;
    // private livros: Livro[];

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
                <div class="mensagem" id="msg"></div>
            </form>
        `;
    }

    private showMessage(message: boolean | null) {
        switch (message) {
            case true:
                this.shadow.querySelector("#id")!.innerHTML = "Empréstimo realizado com sucesso!";
            case false:
                this.shadow.querySelector("#id")!.innerHTML = "Livro indisponível para empréstimo!";
            default:
                this.shadow.querySelector("#id")!.innerHTML = "Erro no servidor!";
        }
    }

    private setup() {
        const idLivro = (this.shadow.querySelector("my-input#id-livro") as HTMLInputElement).value;
        const idUser = (this.shadow.querySelector("my-input#id-usuario") as HTMLInputElement).value;
        this.verifyLocale(Number(idLivro), Number(idUser));
        
    };
    
    private verifyLocale(idLivro: number, idUser: number): void {
        const livrosSession = sessionStorage.getItem("livros")!;
        console.log(livrosSession);
    }

}

customElements.define("livro-emprestimo", EmprestimoComponent);