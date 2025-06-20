class MyButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.shadowRoot!.innerHTML = `
            <style>
            button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-family: var(--poppins);
                font-weight: 800;
            }
            </style>
            <button><slot></slot></button>
        `;
        this.shadowRoot!.querySelector('button')!.addEventListener(
            'click', () => {
                this.dispatchEvent(
                    new CustomEvent('onClick', {bubbles: true})
                )
            }
        )
    }
    
}

customElements.define('my-button', MyButton);
