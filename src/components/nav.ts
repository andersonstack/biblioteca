class MyNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
       this.shadowRoot!.innerHTML = `
        <style>
            nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: var(--bege);
                padding: 1rem;
            }
        </style>
        <nav>
            <slot></slot>
        </nav>
       `; 
    }
}

customElements.define("my-nav", MyNav);