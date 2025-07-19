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
        a {
          display: inline-block;
          border-radius: 0.75rem;
          font-family: var(--poppins, sans-serif);
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease-in-out;
          padding: 0.75rem 1.25rem;
          text-align: center;
          user-select: none;
        }

        a:focus {
          outline: 2px solid var(--primary, #000);
          outline-offset: 2px;
        }

        /* Default: transparente */
        .default {
          background: transparent;
          color: var(--black, #000);
        }
        .default:hover {
          color: var(--primary, #6200ee);
        }

        /* Com fundo */
        .with_background {
          background-color: var(--secondary, #e0e0e0);
          color: var(--black, #000);
        }
        .with_background:hover {
          background-color: var(--primary, #6200ee);
          color: #fff;
        }

        /* Filtro */
        .btn_filter {
          background-color: var(--onPrimary, #333);
          color: #fff;
        }
        .btn_filter:hover {
          background-color: var(--primary, #6200ee);
          color: #fff;
        }

        /* Ações */
        .actions {
          background-color: var(--highlight, #f5f5f5);
          color: var(--black, #000);
        }
        .actions:hover {
          background-color: var(--primary, #6200ee);
          color: #fff;
        }

        @media screen and (max-width: 1120px) {
          a {
            width: 100%;
            padding: 1rem;
          }

          .default:hover {
            color: var(--destaque, #ff4081);
          }

          .with_background:hover {
            background-color: var(--onSecondary, #444);
            color: var(--branco-gelo, #fdfdfd);
          }
        }
      </style>

      <a href="${page}" class="${classButton}" role="button">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define("text-button", TextButton);
