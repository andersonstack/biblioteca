class MyInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const typeInput = this.getAttribute("type") || "text";
    const placeHolder = this.getAttribute("placeholder");
    const arialLabel = this.getAttribute("aria-label");
    const classInput = this.getAttribute("class") || "";

    this.shadowRoot!.innerHTML = `
      <style>
        input {
          padding: 0.5rem 0.75rem;
          border: none;
          outline: none;
          background-color: transparent;
          color: var(--black);
          font-size: 1rem;
          width: 100%;
        }

        .input__credenciais {
          padding: 1rem;
          background-color: white;
          border-radius: 1rem;
        }

        .input__admin {
          background-color: var(--secondary);
          color: black;
          font-weight: 500;
        }

        .input__preencher {
          background-color: white;
          border-radius: 1rem;
          padding: 0.5rem;
        }
      </style>

      <input 
          class=${classInput}
          type=${typeInput}
          placeholder=${placeHolder}
          aria-label=${arialLabel}
      />
        `;
  }

  get value() {
    return this.shadowRoot!.querySelector("input")!.value;
  }

  set value(val: string) {
    this.shadowRoot!.querySelector("input")!.value = val;
  }
}

customElements.define("my-input", MyInput);
