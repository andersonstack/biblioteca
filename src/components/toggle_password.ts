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

        p {
          font-family: var(--poppins);
          height: 1.2rem;
          font-weight: 700;
          position: relative;
          width: 100%;
        }

        .text-slide {
          position: absolute;
          left: 0;
          width: 100%;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .mostrar {
          transform: translateY(0%);
          opacity: 1;
        }

        .esconder {
          transform: translateY(100%);
          opacity: 0;
        }

        p.active .mostrar {
          transform: translateY(-100%);
          opacity: 0;
        }

        p.active .esconder {
          transform: translateY(0%);
          opacity: 1;
        }

      </style>

      <div class="container">
        <slot></slot>
        <div class="container_row">
          <img class="eye-icon" src="./src/images/icons/eye-closed.png" alt="mostrar senha" />
          <p id="senha">
            <span class="text-slide mostrar">Mostrar senha</span>
            <span class="text-slide esconder">Esconder senha</span>
          </p>
        </div>
      </div>
    `;
  }

  setup() {
    const slot = this.shadowRoot!.querySelector("slot")!;
    const img = this.shadowRoot!.querySelector(".eye-icon") as HTMLImageElement;
    const senha = this.shadowRoot!.getElementById("senha");

    const configureInput = () => {
      const inputWrapper = slot
        .assignedElements()
        .find((el) => el.tagName === "MY-INPUT") as HTMLElement;

      if (!inputWrapper || !inputWrapper.shadowRoot) return;

      const realInput = inputWrapper.shadowRoot.querySelector(
        "input"
      ) as HTMLInputElement;

      realInput.type = "password";

      img.addEventListener("click", () => {
        const isPassword = realInput.type === "password";

        realInput.type = isPassword ? "text" : "password";
        img.src = isPassword
          ? "./src/images/icons/eye-open.png"
          : "./src/images/icons/eye-closed.png";

        senha?.classList.toggle("active", isPassword);
      });
    };

    configureInput();

    slot.addEventListener("slotchange", configureInput);
  }

}

customElements.define("toggle-password", TogglePassword);
