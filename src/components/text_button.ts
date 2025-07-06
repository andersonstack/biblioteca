class TextButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const page = this.getAttribute("href") || "#";
    const classButton = this.getAttribute("class") || "default";

    this.shadowRoot!.innerHTML = `
            <style>
            .with_background,
            .btn_filter,
            .default {
                text-decoration: none;
                border-radius: 1rem;
                font-family: var(--poppins);
                font-weight: 400;
            }

            .with_background {
                background-color: var(--secondary);
                padding: 1rem;
                width: 100%;
                color: black;
                font-weight: 500;
                transition: 0.5s ease-in-out;
                
                &:hover {
                    background-color: var(--primary);
                    color: black;
                }

            }

            .btn_filter {
                background-color: var(--onPrimary);
                padding: 1rem;
                width: 100%;
                color: white;
                font-weight: 500;
            }

            .default {
                background-color: transparent;
                text-decoration: none;
                color: black;
                transition: 0.5s ease-in-out;

                &:hover {
                    color: var(--primary);
                }
            }
            @media screen and (max-width: 1120px){
                .default:hover{
                    color: var(--destaque);
                    font-wight: 500;
                }
                .with_background:hover{
                    background-color: var(--onSecondary);
                    color: var(--branco-gelo);
                }
            }
            </style>

            <a href=${page} class=${classButton}>
                <slot></slot>
            </a>
        `;
  }
}

customElements.define("text-button", TextButton);
