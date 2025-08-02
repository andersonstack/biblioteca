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
                    padding: 0.5rem;
                    border: 0.1rem solid transparent;
                    outline: none;
                    color: var(--black);
                    background-color: var(--branco-gelo);
                    font-size: 1rem;
                    border-radius: 1rem;
                    position: relative;
                    width: 100%;
                }
                .input__admin {
                  background-color: var(--secondary);
                  color: black;
                  font-weight: 500;
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
