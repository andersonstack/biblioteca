import "../components/nav.js";
import "../components/button.js";
import "../components/text_button.js";
import "../components/livro_view.js";
import "../components/livro_add.js";
import "../components/livro_edit.js";
import "../components/livro_emprestimo.js";
import "../components/modal_component.js";

class TelaAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setup();
    }

    private render() {
        this.shadowRoot!.innerHTML = `
            <style>
                .container__admin {
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 0.8rem;
                    box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
                    padding: 2rem;
                    margin: 2rem auto;
                    max-width: 800px;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 1rem;
                }
            </style>

            <my-nav></my-nav>
            <section class="container__admin">
                <h2>Área Administrativa</h2>
                <my-button class="admin" value="Buscar livro">Buscar livro</my-button>
                <my-button class="admin" value="Adicionar livro">Adicionar livro</my-button>
                <my-button class="admin" value="Atualizar livro">Atualizar livro</my-button>
                <my-button class="admin" value="Realizar empréstimo">Realizar empréstimo</my-button>
                <my-button class="admin" value="Realizar devolução">Realizar devolução</my-button>
            </section>
        `;
    }

    private setup() {
        const buttons = this.shadowRoot!.querySelectorAll("my-button");
        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const value = btn.getAttribute("value") || btn.textContent || "Título";
                this.openModal(value);
            });
        });
    }

    private openModal(title: string) {
        const modal = document.createElement("modal-component");
        modal.setAttribute("title", title);

        let content: HTMLElement;

        if (title === "Buscar livro") {
            content = document.createElement("livro-view");
        } else if (title === "Adicionar livro") {
            content = document.createElement("livro-add");
        } else if (title === "Atualizar livro") {
            content = document.createElement("livro-edit");
        } else if (title === "Realizar empréstimo") {
            content = document.createElement("livro-emprestimo");
        } else {
            content = document.createElement("p");
            content.innerHTML = `Conteúdo da opção: <strong>${title}</strong>`;
        }

        modal.appendChild(content);
        this.shadowRoot!.appendChild(modal);
    }

}

customElements.define("tela-admin", TelaAdmin);
