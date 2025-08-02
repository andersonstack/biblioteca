class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connetedCallback() {
        this.render();
        this.setup();
    }
    
    private render() {

    }

    private setup() {
        
    }

}

customElements.define("modal", Modal);
