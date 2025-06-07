class MyButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        const label = this.getAttribute('label') || '';

        this.shadowRoot!.innerHTML = `
            <button>${label}</button>
        `
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
