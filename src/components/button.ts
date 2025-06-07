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
