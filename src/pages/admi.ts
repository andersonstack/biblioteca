import "../components/nav.js";

class TelaAdmin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
        this.setup();
    }

    private render() {
        this.shadowRoot!.innerHTML = `
            <my-nav></my-nav>
        `;
    };

    private setup() {};
}

customElements.define("tela-admin", TelaAdmin);
