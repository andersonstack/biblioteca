class ModalComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupCloseEvents();
        requestAnimationFrame(() => {
            this.shadowRoot!.querySelector(".modal")?.classList.add("show");
        });
    }

    private render() {
        const title = this.getAttribute("title") || "";

        this.shadowRoot!.innerHTML = `
            <style>
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
                    background: var(--primary, white);
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
                    padding: 1rem;
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

            <div class="overlay">
                <div class="modal">
                    <img src="./src/images/icons/close-modal.png" alt="Fechar" class="close-btn" />
                    <h2>${title}</h2>
                    <slot></slot>
                </div>
            </div>
        `;
    }

    private setupCloseEvents() {
        const overlay = this.shadowRoot!.querySelector(".overlay")!;
        const modal = this.shadowRoot!.querySelector(".modal")!;
        const closeBtn = this.shadowRoot!.querySelector(".close-btn")!;

        // Clique no X
        closeBtn.addEventListener("click", () => this.closeModal());

        // Clique fora do modal
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                this.closeModal();
            }
        });
    }

    private closeModal() {
        const modal = this.shadowRoot!.querySelector(".modal")!;
        modal.classList.remove("show");
        setTimeout(() => this.remove(), 300);
    }
}

customElements.define("modal-component", ModalComponent);
