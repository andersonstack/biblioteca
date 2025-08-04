class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
      const styleClass = this.getAttribute("class") || "default";
      this.shadowRoot!.innerHTML = `
          <style>
              button {
                  font-family: var(--poppins);
                  font-weight: 500;
                  border-radius: 0.6rem;
                  cursor: pointer;
                  border: none;
                  transition: all 0.2s ease-in-out;
              }

              .default {
                  background: transparent;
                  color: var(--onPrimary);
                  font-size: 1.1rem;
                  padding: 0.5rem 1rem;
              }

              .actions {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    padding: 0.5rem 0.5rem;
                    background-color: var(--primary);
                    color: var(--black, #000);
                    margin-bottom: 0.5rem;
                }

              .admin {
                  background-color: var(--onPrimary, #1a237e);
                  color: white;
                  font-size: 1rem;
                  padding: 0.8rem 1.5rem;
                  min-width: 200px;
                  width: 100%;
                  text-align: center;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
              }

              .admin:hover {
                  background-color: #0d153f;
              }

              .login {
                  background-color: var(--onSecondary);
                  color: white;
                  font-size: 1rem;
                  padding: 1rem;
                  border-radius: 1rem;
              }
          </style>
          <button class="${styleClass}"><slot></slot></button>
      `;
      this.shadowRoot!.querySelector("button")!.addEventListener("click", () => {
          this.dispatchEvent(new CustomEvent("onClick", { bubbles: true }));
      });
  }
}

customElements.define("my-button", MyButton);
