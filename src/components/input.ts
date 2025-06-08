class MyInput extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        const typeInput = this.getAttribute('type') || 'text';
        const placeHolder = this.getAttribute('placeholder');
        const arialLabel = this.getAttribute('aria-label');

        this.shadowRoot!.innerHTML = `
            <style>
                input {
                    padding: 0.5rem;
                    border: 0.1rem solid transparent;
                    outline: none;
                    color: var(--black);
                    background-color: var(--branco-gelo);
                    font-size: 1rem;
                    border-radius: 1rem;
                    position: relative;
                }
            </style>
            <input 
                type=${typeInput}
                placeholder=${placeHolder}
                aria-label=${arialLabel}
            />
        `;
    }
}

customElements.define('my-input', MyInput);