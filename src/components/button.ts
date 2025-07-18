class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const style = this.getAttribute("class") || "default";
    this.shadowRoot!.innerHTML = `
            <style>
            .default {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background-color: transparent;
                border: none;
                cursor: pointer;
                font-family: var(--poppins);
                font-weight: 800;
            }
            .login {
                background-color: var(--onSecondary);
                border: none;
                cursor: pointer;
                font-family: var(--poppins);
                color: white;
                font-weight: 500;
                font-size: 1rem;
                padding: 1rem;
                border-radius: 1rem;
                width: auto;
            }
            </style>
            <button class=${style}><slot></slot></button>
        `;
    this.shadowRoot!.querySelector("button")!.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("onClick", { bubbles: true }));
    });
  }
}

customElements.define("my-button", MyButton);
