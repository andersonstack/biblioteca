import "../components/nav.js";
import "../components/button.js";
import "../components/text_button.js";
import "../components/livro_view.js";
import "../components/livro_add.js";
import "../components/livro_edit.js";

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

                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .modal {
                    width: 70%;
                    max-width: 900px;
                    height: 70%;
                    background: #f9f9f9;
                    border-radius: 0.8rem;
                    padding: 2rem;
                    position: relative;
                    transform: scale(0);
                    transition: transform 0.3s ease-in-out;
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    align-items: stretch;
                    overflow: auto;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }

                .modal.show {
                    transform: scale(1);
                }

                .close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 32px;
                    height: 32px;
                    cursor: pointer;
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
        const modal = document.createElement("div");
        modal.classList.add("overlay");

        let content = "";

        if (title === "Buscar livro") {
            content = `
                <livro-view></livro-view>
            `;
        } else if (title === "Adicionar livro") {
            content = `
                <livro-add></livro-add>
            `;
        } else if (title === "Atualizar livro") {
            content = `
                <livro-edit></livro-edit>
            `;
        } else {
            content = `<p>Conteúdo da opção: <strong>${title}</strong></p>`;
        }

        modal.innerHTML = `
            <div class="modal">
                <img src="./src/images/icons/close.png" alt="Fechar" class="close-btn" />
                <h2>${title}</h2>
                ${content}
            </div>
        `;

        this.shadowRoot!.appendChild(modal);

        requestAnimationFrame(() => {
            modal.querySelector(".modal")?.classList.add("show");
        });

        const closeBtn = modal.querySelector(".close-btn");
        closeBtn?.addEventListener("click", () => {
            modal.querySelector(".modal")?.classList.remove("show");
            setTimeout(() => modal.remove(), 300);
        });
    }
}

customElements.define("tela-admin", TelaAdmin);
