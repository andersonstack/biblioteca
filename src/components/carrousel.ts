import "./card.js";
import { LivroCarroussel } from "../interfaces/livros_api.js";

class Carrousel extends HTMLElement {
  livros: LivroCarroussel[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getLivros() {
    const data = sessionStorage.getItem("livros");
    if (!data) return;

    const dataLivros = JSON.parse(data);
    const todos = dataLivros.livros.map((livroRaw: any) => ({
      id: livroRaw.id,
      titulo: livroRaw.titulo,
      ano: livroRaw.ano,
      descricao: livroRaw.descricao,
      imagem_caminho: livroRaw.imagem_caminho,
      disponibilidade: livroRaw.disponibilidade,
    }));

    const indices: Set<number> = new Set();

    while (indices.size < 3 && indices.size < todos.length) {
      const aleatorio = Math.floor(Math.random() * todos.length);
      indices.add(aleatorio);
    }

    this.livros = [...indices].map((i) => todos[i]);
  }

  connectedCallback() {
    this.getLivros();
    this.render();
    this.renderLivros();
  }

  renderLivros() {
    const shadow = this.shadowRoot!;
    const slides = shadow.querySelector("#slides")!;
    const manualNavigation = shadow.querySelector("#manual-navigation")!;

    // Radios
    for (let i = 0; i < this.livros.length; i++) {
      const btn = document.createElement("input");
      btn.setAttribute("type", "radio");
      btn.setAttribute("name", "radio-btn");
      btn.setAttribute("id", `radio${i + 1}`);
      slides.appendChild(btn);
    }

    // Cards
    for (const livro of this.livros) {
      const divCard = document.createElement("div");
      divCard.setAttribute("class", "slide");

      const card = document.createElement("my-card") as any;
      const livroCard: LivroCarroussel = {
        id: livro.id,
        titulo: livro.titulo,
        imagem_caminho: livro.imagem_caminho,
        disponibilidade: livro.disponibilidade,
        descricao: livro.descricao,
        ano: livro.ano,
      }
      card.data = livroCard;
      
      if (this.livros.indexOf(livro) === 0) divCard.classList.add("first");

      slides.appendChild(divCard);
      divCard.appendChild(card);
    }

    // Navegação automática
    const navigationAuto = document.createElement("div");
    navigationAuto.classList.add("navigation-auto");
    slides.appendChild(navigationAuto);

    for (let i = 0; i < this.livros.length; i++) {
      const autoBtn = document.createElement("div");
      autoBtn.setAttribute("class", `auto-btn${i + 1}`);
      navigationAuto.appendChild(autoBtn);
    }

    // Labels manuais
    for (let i = 0; i < this.livros.length; i++) {
      const labelNavigation = document.createElement("label");
      labelNavigation.setAttribute("for", `radio${i + 1}`);
      labelNavigation.setAttribute("class", "manual-btn");
      manualNavigation.appendChild(labelNavigation);
    }

    // Ajuste de largura
    (slides as HTMLElement).style.width = `${this.livros.length * 100}%`;
    const allSlides = shadow.querySelectorAll(
      "#slides .slide"
    ) as NodeListOf<HTMLElement>;
    allSlides.forEach((slide) => {
      slide.style.width = `${100 / this.livros.length}%`;
    });

    // Movimento manual dos slides
    const radios = shadow.querySelectorAll('input[name="radio-btn"]');
    radios.forEach((radio, i) => {
      radio.addEventListener("change", () => {
        const slideContainer = shadow.querySelector(".first") as HTMLElement;
        const offset = -i * (100 / this.livros.length);
        slideContainer.style.marginLeft = `${offset}%`;
      });
    });

    // Estilo dinâmico dos botões automáticos
    const style = document.createElement("style");
    let css = "";
    for (let i = 0; i < this.livros.length; i++) {
      css += `
        #radio${i + 1}:checked ~ .navigation-auto .auto-btn${i + 1} {
          background-color: var(--azul-oceanic);
        }
      `;
    }
    style.textContent = css;
    shadow.appendChild(style);
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        #slider {
          background: linear-gradient(var(--primary) -90%, var(--branco-gelo));
          margin: 0 auto;
          width: 100%;
          height: 30rem;
          overflow: hidden;
          position: relative;
        }

        #slides {
          width: 400%;
          height: 25rem;
          display: flex;
        }

        #slides input {
          display: none;
        }

        #slides .slide {
          width: 25%;
          position: inherit;
        }

        #slides .slide.first {
          transition: margin-left 0.5s ease-in-out;
        }

        #manual-navigation {
          position: absolute;
          top: 90%;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .manual-btn {
          border: 0.125rem solid var(--secondary);
          padding: 0.3125rem;
          border-radius: 0.625rem;
          cursor: pointer;
          transition: 1s;
        }

        .manual-btn:hover {
          background-color: var(--secondary);
        }

        .manual-btn:not(:last-child) {
          margin-right: 2.5rem;
        }

        .navigation-auto div {
          border: 0.125rem solid var(--azul-oceanic);
          padding: 0.3125rem;
          border-radius: 0.625rem;
          cursor: pointer;
          transition: 1s;
        }

        .navigation-auto {
          position: absolute;
          width: 100%;
          margin-top: 22.5rem;
          display: flex;
          justify-content: center;
        }

        .navigation-auto div:not(:last-child) {
          margin-right: 2.5rem;
        }
      </style>

      <section id="slider" aria-label="Estante de livros">
        <div id="slides"></div>
        <div id="manual-navigation" class="manual-navigation"></div>
      </section>
    `;
  }
}

customElements.define("my-carrousel", Carrousel);
