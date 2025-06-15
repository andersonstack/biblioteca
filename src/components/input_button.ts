class InputButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot!.innerHTML = `
        <style>
            my-input,
            my-button {
                z-index: 1;
            }
            section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: transparent;
                width: 100%;
                padding: 0.5rem;
                border-radius: 1rem;
                position: relative;
                overflow: hidden;

                img {
                    width: 2rem;
                }
            }

            section::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: var(--branco-gelo);
                border-radius: 1rem;
                transform: translateX(100%);
                transition: transform 1s ease-in-out;
                z-index: 0;
            }

            section.active::after {
                transform: translateX(0);
            }
            
            my-input {
                opacity: 1;
                transform: translateX(200%);
                transition: transform 1s ease-in-out;
            }

            my-input.active {
                opacity: 1;
                transform: translateY(0);
            }
        </style>

        <section aria-label="Buscar de livro" role="search">
            <my-input 
                type="text"
                placeholder="Busque um livro"
                aria-label="Buscar por nome do livro"
                id="btn"
                >
            </my-input>
            <my-button aria-label="Pesquisar livro">
                <img src="./src/images/icons/lupa.png" alt="Lupa" />
            </my-button>
        </section>
        `

        const btn = this.shadowRoot?.querySelector('my-button');
        const my_input = this.shadowRoot?.querySelector('my-input');
        const section = this.shadowRoot?.querySelector('section');

        btn?.addEventListener('click', () => {
            if (section?.classList.contains('active')){
                section?.classList.remove('active');
                my_input?.classList.remove('active');
            } else {
                section?.classList.add('active');
                my_input?.classList.add('active');
            }
        })
    }
}

customElements.define('input-button', InputButton);