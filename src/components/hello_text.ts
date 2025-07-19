class HelloText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = sessionStorage.getItem("name");
    const displayName = name ? this.formatName(name) : "";

    this.shadowRoot!.innerHTML = `
      <style>
        span {
          font-family: var(--poppins, sans-serif);
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-right: 1rem;
        }

        @media (max-width: 768px) {
          span {
            display: block;
            margin: 0.5rem 0;
            text-align: center;
          }
        }
      </style>
      ${displayName ? `<span>Olá, ${displayName}!</span>` : ""}
    `;
  }

  formatName(fullName: string): string {
    return fullName.split(" ")[0];
  }
}

customElements.define("hello-text", HelloText);
