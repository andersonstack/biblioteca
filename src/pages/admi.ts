import "../components/nav.js";
import "../components/button.js";
import "../components/text_button.js";

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
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: column;
                    align-items: start;
                    gap: 1rem;
                    padding: 2rem;
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
                    z-index: 1;
                }

                .modal {
                    width: 80%;
                    height: 80%;
                    background: white;
                    border-radius: 1rem;
                    padding: 2rem;
                    position: relative;
                    transform: scale(0);
                    transition: transform 0.3s ease-in-out;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
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
                    margin-bottom: 2rem;
                }
            </style>

            <my-nav></my-nav>
            <section class="container__admin">
                <my-button value="Buscar livro">Buscar livro</my-button>
                <my-button value="Adicionar livro">Adicionar livro</my-button>
                <my-button value="Inativar livro">Inativar livro</my-button>
                <my-button value="Atualizar livro">Atualizar livro</my-button>
                <my-button value="Fazer empréstimo">Fazer empréstimo</my-button>
                <my-button value="Realizar empréstimo">Realizar empréstimo</my-button>
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
        modal.innerHTML = `
            <div class="modal">
                <img src="./src/images/icons/close.png" alt="Fechar" class="close-btn" />
                <h2>${title}</h2>
                <p>Conteúdo da opção: <strong>${title}</strong></p>
            </div>
        `;
        
        this.shadowRoot!.appendChild(modal);

        requestAnimationFrame(() => {
            const innerModal = modal.querySelector(".modal");
            innerModal?.classList.add("show");
        });

        const closeBtn = modal.querySelector(".close-btn");
        closeBtn?.addEventListener("click", () => {
            const innerModal = modal.querySelector(".modal");
            innerModal?.classList.remove("show");


            setTimeout(() => {
                modal.remove();
            }, 300);
        });
    }
}

customElements.define("tela-admin", TelaAdmin);
