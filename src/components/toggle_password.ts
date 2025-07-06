class TogglePassword extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setup();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .eye-icon {
          cursor: pointer;
          width: 1.2rem;
        }

        .container_row {
          position: relative;
          display: flex;
          align-items: center;
          width: 90%;
          justify-content: start;
          gap: 1rem;
        }

        ::slotted(my-input) {
          width: 100%;
        }
      </style>

      <div class="container">
        <slot></slot>
        <div class="container_row">
          <img class="eye-icon" src="./src/images/icons/eye-closed.png" alt="mostrar senha" />
          <p>Mostrar senha</p>
        </div>
      </div>
    `;
  }

  setup() {
    const slot = this.shadowRoot!.querySelector("slot")!;
    const img = this.shadowRoot!.querySelector(".eye-icon") as HTMLImageElement;

    slot.addEventListener("slotchange", () => {
      const inputWrapper = slot
        .assignedElements()
        .find((el) => el.tagName === "MY-INPUT") as HTMLElement;

      if (!inputWrapper || !inputWrapper.shadowRoot) return;

      const realInput = inputWrapper.shadowRoot.querySelector(
        "input"
      ) as HTMLInputElement;

      img.addEventListener("click", () => {
        if (realInput.type === "password") {
          realInput.type = "text";
          img.src = "./src/images/icons/eye-open.png";
        } else {
          realInput.type = "password";
          img.src = "./src/images/icons/eye-closed.png";
        }
      });
    });
  }
}

customElements.define("toggle-password", TogglePassword);
