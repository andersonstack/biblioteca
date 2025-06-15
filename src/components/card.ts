class MyCard extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        const ariaLabel = this.getAttribute('aria-label') || '';

        this.shadowRoot!.innerHTML = `
            <section aria-label=${ariaLabel}>
                <h2>Meu Card</h2>
            </section>
        `
    }
}

customElements.define('my-card', MyCard);